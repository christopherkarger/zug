import { TrainLeaveService } from "./train-leave.service";
import { HttpService } from "./http.service";
import { environment } from "src/environments/environment";
import { requestOptions } from "./request-options";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { IMonitor } from "../model/monitor.model";

export class TrainLeaveHttpService extends TrainLeaveService {
  constructor(private httpService: HttpService) {
    super();
  }

  getLeave(id: number): Observable<IMonitor> {
    return this.httpService
      .get<string>(
        environment.api.domain + environment.api.leave,
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
            stationName: convertedResult.stationName,
            boardType: convertedResult.boardType,
            journey: convertedResult.journey
          };
        })
      );
  }
}
