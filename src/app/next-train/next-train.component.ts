import { Component, OnInit, Input } from "@angular/core";
import { IMonitor } from "../model/monitor.model";
import { Observable } from "rxjs";

@Component({
  selector: "app-next-train",
  templateUrl: "./next-train.component.html",
  styleUrls: ["./next-train.component.scss"]
})
export class NextTrainComponent {
  @Input()
  station$: Observable<IMonitor>;
}
