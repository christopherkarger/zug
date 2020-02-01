import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IMonitor } from "../model/monitor.model";

@Injectable()
export abstract class TrainLeaveService {
  abstract getLeave(id: number): Observable<IMonitor>;
}
