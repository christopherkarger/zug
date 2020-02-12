import { TrainLeaveService } from "./train-leave.service";
import { HttpService } from "./http.service";
import { environment } from "src/environments/environment";
import { requestOptions } from "./request-options";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { IMonitor, IMonitorLoad } from "../model/monitor.model";
import { StringUtilities } from "../string-utilities";
import { Validator } from "src/validator";

export class TrainLeaveHttpService extends TrainLeaveService {
  constructor(private httpService: HttpService) {
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
              stationName: Validator.require(convertedResult.stationName),
              boardType: Validator.require(convertedResult.boardType),
              journey: convertedResult.journey ? convertedResult.journey : []
            }
          };
        })
      );
  }
}
