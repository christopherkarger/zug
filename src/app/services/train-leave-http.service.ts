import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Validator } from "src/validator";
import { IMonitor, IMonitorLoad } from "../model/monitor.model";
import { StringUtilities } from "../string-utilities";
import { DirectionsCacheService } from "./directions.cache.service";
import { HttpService } from "./http.service";
import { requestOptions } from "./request-options";
import { TrainLeaveService } from "./train-leave.service";

export class TrainLeaveHttpService extends TrainLeaveService {
  constructor(
    private httpService: HttpService,
    private directionCache: DirectionsCacheService
  ) {
    super();
  }

  getLeave(from: string, to: string): Observable<IMonitorLoad> {
    return this.httpService
      .get<string>(
        StringUtilities.replace(
          environment.api.domain + environment.api.leave,
          [from, to]
        ),
        requestOptions
      )
      .pipe(
        map((res) => {
          let convertedResult: IMonitor;
          try {
            convertedResult = JSON.parse(res.replace("journeysObj = ", ""));
          } catch {
            throw new Error("Can't convert oebb object");
          }

          const journey = convertedResult.journey
            ? convertedResult.journey
            : [];

          return {
            entity: {
              fromStationName: Validator.require(
                this.directionCache.getStationNameById(from)
              ),
              toStationName: Validator.require(
                this.directionCache.getStationNameById(to)
              ),
              boardType: Validator.require(convertedResult.boardType),
              journey: journey.filter((j) => !!j.tr && !Number.isNaN(+j.tr)),
            },
          };
        })
      );
  }
}
