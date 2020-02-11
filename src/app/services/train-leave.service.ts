import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IMonitorLoad } from "../model/monitor.model";

@Injectable()
export abstract class TrainLeaveService {
  abstract getLeave(from: string, to: string): Observable<IMonitorLoad>;
}
