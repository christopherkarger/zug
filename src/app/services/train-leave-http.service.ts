import { TrainLeaveService } from "./train-leave.service";
import { HttpService } from "./http.service";
import { environment } from "src/environments/environment";
import { requestOptions } from "./request-options";

export class TrainLeaveHttpService extends TrainLeaveService {
  constructor(private httpService: HttpService) {
    super();
  }

  getLeave(id: number) {
    this.httpService
      .get<string>(
        environment.api.domain + environment.api.leave,
        requestOptions
      )
      .subscribe(res => {
        console.log(res);
      });
  }
}
