import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-msg-box",
  templateUrl: "./msg-box.component.html",
  styleUrls: ["./msg-box.component.scss"]
})
export class MsgBoxComponent implements OnInit {
  @Input()
  message?: string;

  @Input()
  boxstyle?: string;

  constructor() {}

  ngOnInit() {}
}
