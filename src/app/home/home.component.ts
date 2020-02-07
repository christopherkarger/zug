import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";
import { IMonitor } from "../model/monitor.model";
import { TrainLeaveService } from "../services/train-leave.service";

@Component({
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  // Siemens
  private stationAId = "1292105";

  // Geiselberg
  private stationBId = "1291104";

  stationA$: Observable<IMonitor>;
  stationB$: Observable<IMonitor>;

  @Input()
  station$: Observable<IMonitor>;

  constructor(private tls: TrainLeaveService) {
    this.stationA$ = this.tls.getLeave(this.stationAId, this.stationBId);
    this.stationB$ = this.tls.getLeave(this.stationBId, this.stationAId);
  }

  ngOnInit(): void {}
}
