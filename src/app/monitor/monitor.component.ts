import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { IMonitor } from "../model/monitor.model";
import { map } from "rxjs/operators";
import { TrainLeaveService } from "../services/train-leave.service";

@Component({
  selector: "app-monitor",
  templateUrl: "./monitor.component.html",
  styleUrls: ["./monitor.component.scss"]
})
export class MonitorComponent implements OnInit {
  private siemensId = "1292105";
  private geiselbergId = "1291104";

  siemens$: Observable<IMonitor>;
  geiselberg$: Observable<IMonitor>;

  constructor(private tls: TrainLeaveService) {
    this.siemens$ = this.tls.getLeave(this.siemensId, this.geiselbergId);
    this.geiselberg$ = this.tls.getLeave(this.geiselbergId, this.siemensId);
  }

  ngOnInit() {}
}
