import { Component, OnInit, Input } from "@angular/core";
import { Observable, of, EMPTY, merge } from "rxjs";
import { IMonitorLoad } from "../model/monitor.model";
import { TrainLeaveService } from "../services/train-leave.service";
import { DirectionsCacheService } from "../services/directions.cache.service";
import { catchError } from "rxjs/operators";

@Component({
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  stationA$: Observable<IMonitorLoad>;
  stationB$: Observable<IMonitorLoad>;

  private awayStationA: string;
  private awayStationB: string;
  private homeStationA: string;
  private homeStationB: string;

  private savedStations: string[];
  private directions: string[];

  @Input()
  station$: Observable<IMonitorLoad>;

  constructor(
    private tls: TrainLeaveService,
    private directionCache: DirectionsCacheService
  ) {
    this.savedStations = this.directionCache.getSavedStations();
    this.directions = this.directionCache.getSavedDirections().split(",");

    if (this.savedStations.length === 2) {
      this.awayStationA = this.homeStationB = this.savedStations[0];
      this.awayStationB = this.homeStationA = this.savedStations[1];
    } else if (this.savedStations.length === 4) {
      this.awayStationA = this.savedStations[0];
      this.awayStationB = this.savedStations[1];
      this.homeStationA = this.savedStations[2];
      this.homeStationB = this.savedStations[3];
    } else {
      throw new Error("not enough saved stations");
    }

    this.stationA$ = merge(
      of({ loading: true }),
      this.tls.getLeave(this.awayStationA, this.awayStationB).pipe(
        catchError(() => {
          console.error(this.stationFailedMsg());
          return of({ failed: true });
        })
      )
    );
    this.stationB$ = merge(
      of({ loading: true }),
      this.tls.getLeave(this.homeStationA, this.homeStationB).pipe(
        catchError(() => {
          console.error(this.stationFailedMsg());
          return of({ failed: true });
        })
      )
    );
  }

  stationFailedMsg(): string {
    return `Zugverbindung konnte nicht geladen werden! Versuche es erneut oder wähle eine andere Verbindung aus.`;
  }

  ngOnInit(): void {}
}
