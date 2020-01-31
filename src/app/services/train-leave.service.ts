import { Injectable } from "@angular/core";

@Injectable()
export abstract class TrainLeaveService {
  abstract getLeave(id: number): void;
}
