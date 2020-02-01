import { Component, OnInit } from "@angular/core";
import { TrainLeaveService } from "../services/train-leave.service";
import { Observable } from "rxjs";
import { IMonitor } from "../model/monitor.model";

@Component({
  selector: "app-next-train",
  templateUrl: "./next-train.component.html",
  styleUrls: ["./next-train.component.scss"]
})
export class NextTrainComponent {
  private siemensId = "1292105";
  private geiselId = "8101555";

  trainSiemens$: Observable<IMonitor>;
  trainGeisel$: Observable<IMonitor>;

  constructor(private tls: TrainLeaveService) {
    this.trainSiemens$ = this.tls.getLeave(this.siemensId);
    this.trainGeisel$ = this.tls.getLeave(this.geiselId);
  }
}
