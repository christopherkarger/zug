import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { stations } from "../model/stations";
import { DirectionsCacheService } from "../services/directions.cache.service";
import { Router } from "@angular/router";

@Component({
  templateUrl: "./options.component.html",
  styleUrls: ["./options.component.scss"]
})
export class OptionsComponent implements OnInit {
  options: FormGroup;
  stations = stations;
  stationASelected = false;

  constructor(
    private fb: FormBuilder,
    private directionCache: DirectionsCacheService,
    private router: Router
  ) {
    this.options = this.fb.group({
      stationA: "",
      stationB: ""
    });
  }

  selectedStationA(): void {
    this.stationASelected = true;
  }

  selectedStationB(): void {
    const dirA = this.options.value.stationA;
    const dirB = this.options.value.stationB;
    this.directionCache.saveDirections(dirA, dirB);
    this.router.navigate(["/"]);
  }

  ngOnInit(): void {}
}
