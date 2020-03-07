import { TrainLeaveService } from "./train-leave.service";
import { HttpService } from "./http.service";
import { environment } from "src/environments/environment";
import { requestOptions } from "./request-options";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { IMonitor, IMonitorLoad } from "../model/monitor.model";
import { StringUtilities } from "../string-utilities";
import { Validator } from "src/validator";
import { DirectionsCacheService } from "./directions.cache.service";

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
        map(res => {
          let convertedResult: IMonitor;
          try {
            convertedResult = JSON.parse(res.replace("journeysObj = ", ""));
          } catch {
            throw new Error("Can't convert oebb object");
          }
          return {
            entity: {
              fromStationName: Validator.require(
                this.directionCache.getStationNameById(from)
              ),
              toStationName: Validator.require(
                this.directionCache.getStationNameById(to)
              ),
              boardType: Validator.require(convertedResult.boardType),
              journey: convertedResult.journey ? convertedResult.journey : []
            }
          };
        })
      );
  }
}
