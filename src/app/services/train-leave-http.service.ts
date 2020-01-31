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
      .subscribe((res: string) => {
        let convertedResult: object;
        try {
          convertedResult = JSON.parse(res.replace("journeysObj = ", ""));
        } catch {
          throw new Error("Cant convert oebb object");
        }
        console.log(convertedResult);
      });
  }
}
