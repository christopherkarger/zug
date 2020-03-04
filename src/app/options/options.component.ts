import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
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
  awaySelected = false;

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
    const awayStationA = this.options.get("awayStationA").value;
    const awayStationB = this.options.get("awayStationB").value;
    this.awaySelected = this.checkStations(awayStationA, awayStationB);
  }

  private checkHome() {
    const homeStationA = this.options.get("homeStationA").value;
    const homeStationB = this.options.get("homeStationB").value;
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
    const awayStationA = this.options.get("awayStationA").value;
    const awayStationB = this.options.get("awayStationB").value;
    const homeStationA = this.options.get("homeStationA").value;
    const homeStationB = this.options.get("homeStationB").value;
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
