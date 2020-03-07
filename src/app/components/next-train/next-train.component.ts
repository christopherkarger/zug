import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";
import { IMonitor } from "../../model/monitor.model";

@Component({
  selector: "app-next-train",
  templateUrl: "./next-train.component.html",
  styleUrls: ["./next-train.component.scss"]
})
export class NextTrainComponent {
  @Input()
  station?: IMonitor;
}
