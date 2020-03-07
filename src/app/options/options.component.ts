import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { stations } from "../model/stations";
import { DirectionsCacheService } from "../services/directions.cache.service";
import { Router } from "@angular/router";
import { Validator } from "src/validator";

@Component({
  templateUrl: "./options.component.html",
  styleUrls: ["./options.component.scss"]
})
export class OptionsComponent implements OnInit {
  options: FormGroup;
  stations = stations;
  awaySelected = false;

  getStation(station: string): string | undefined {
    const st = this.options.get(station);
    if (st) {
      return st.value;
    }
    return undefined;
  }

  constructor(
    private fb: FormBuilder,
    private directionCache: DirectionsCacheService,
    private router: Router
  ) {
    const awayStationA = new FormControl("");
    const awayStationB = new FormControl("");
    const homeStationA = new FormControl("");
    const homeStationB = new FormControl("");

    this.options = this.fb.group({
      awayStationA: awayStationA,
      awayStationB: awayStationB,
      homeStationA: homeStationA,
      homeStationB: homeStationB
    });

    awayStationA.valueChanges.subscribe({
      next: val => {
        this.checkAway();
      }
    });

    awayStationB.valueChanges.subscribe({
      next: val => {
        this.checkAway();
      }
    });

    homeStationA.valueChanges.subscribe({
      next: val => {
        this.checkHome();
      }
    });

    homeStationB.valueChanges.subscribe({
      next: val => {
        this.checkHome();
      }
    });
  }

  private checkAway() {
    const awayStationA = Validator.require(this.getStation("awayStationA"));
    const awayStationB = Validator.require(this.getStation("awayStationB"));
    this.awaySelected = this.checkStations(awayStationA, awayStationB);
  }

  private checkHome() {
    const homeStationA = Validator.require(this.getStation("homeStationA"));
    const homeStationB = Validator.require(this.getStation("homeStationB"));
    if (this.checkStations(homeStationA, homeStationB)) {
      this.selectedbackHome();
    }
  }

  private checkStations(stationA: string, stationB: string): boolean {
    if (stationA === "" || stationB === "") {
      return false;
    } else if (stationA !== stationB) {
      return true;
    }

    return false;
  }

  private selectedbackHome(): void {
    const awayStationA = Validator.require(this.getStation("awayStationA"));
    const awayStationB = Validator.require(this.getStation("awayStationB"));
    const homeStationA = Validator.require(this.getStation("homeStationA"));
    const homeStationB = Validator.require(this.getStation("homeStationB"));
    this.directionCache.saveDirections([
      awayStationA,
      awayStationB,
      homeStationA,
      homeStationB
    ]);
    this.router.navigate(["/"]);
  }

  ngOnInit(): void {}
}
