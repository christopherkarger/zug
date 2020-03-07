import { Component, OnInit, Input } from "@angular/core";
import { Observable, of, EMPTY, merge } from "rxjs";
import { IMonitorLoad } from "../model/monitor.model";
import { TrainLeaveService } from "../services/train-leave.service";
import { DirectionsCacheService } from "../services/directions.cache.service";
import { catchError } from "rxjs/operators";
import { Validator } from "src/validator";

@Component({
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  stationA$: Observable<IMonitorLoad>;
  stationB$: Observable<IMonitorLoad>;

  @Input()
  station$?: Observable<IMonitorLoad>;

  constructor(
    private tls: TrainLeaveService,
    private directionCache: DirectionsCacheService
  ) {
    const stationsIds = Validator.require(
      this.directionCache.getSavedStations(true)
    );

    this.stationA$ = merge(
      of({ loading: true }),
      this.tls
        .getLeave(stationsIds.awayStationA, stationsIds.awayStationB)
        .pipe(
          catchError(() => {
            console.error(this.stationFailedMsg());
            return of({ failed: true });
          })
        )
    );
    this.stationB$ = merge(
      of({ loading: true }),
      this.tls
        .getLeave(stationsIds.homeStationA, stationsIds.homeStationB)
        .pipe(
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
