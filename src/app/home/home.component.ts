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

  private stationAId: string;
  private stationBId: string;
  private directions: string[];

  @Input()
  station$: Observable<IMonitorLoad>;

  constructor(
    private tls: TrainLeaveService,
    private directionCache: DirectionsCacheService
  ) {
    const savedStations = this.directionCache.getSavedStations();
    this.directions = this.directionCache.getSavedDirections().split(",");
    this.stationAId = savedStations[0];
    this.stationBId = savedStations[1];

    this.stationA$ = merge(
      of({ loading: true }),
      this.tls.getLeave(this.stationAId, this.stationBId).pipe(
        catchError(() => {
          console.error(this.stationFailedMsg(0, 1));
          return of({ failed: true });
        })
      )
    );
    this.stationB$ = merge(
      of({ loading: true }),
      this.tls.getLeave(this.stationBId, this.stationAId).pipe(
        catchError(() => {
          console.error(this.stationFailedMsg(1, 0));
          return of({ failed: true });
        })
      )
    );
  }

  stationFailedMsg(from: number, to: number): string {
    return `Verbindung von ${this.directions[from]} nach ${this.directions[to]} konnte nicht geladen werden!`;
  }

  ngOnInit(): void {}
}
