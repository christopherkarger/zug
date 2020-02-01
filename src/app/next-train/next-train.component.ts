import { Component, OnInit } from "@angular/core";
import { TrainLeaveService } from "../services/train-leave.service";

@Component({
  selector: "app-next-train",
  templateUrl: "./next-train.component.html",
  styleUrls: ["./next-train.component.scss"]
})
export class NextTrainComponent implements OnInit {
  constructor(private tls: TrainLeaveService) {
    this.tls.getLeave(11).subscribe(res => {
      console.log(res);
    });
  }

  ngOnInit() {}
}
