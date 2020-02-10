import { Component, OnInit, Input } from "@angular/core";
import { Observable, of, EMPTY } from "rxjs";
import { IMonitor } from "../model/monitor.model";
import { TrainLeaveService } from "../services/train-leave.service";
import { DirectionsCacheService } from "../services/directions.cache.service";
import { stations } from "../model/stations";
import { catchError } from "rxjs/operators";

@Component({
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  stationAfailed = false;
  stationBfailed = false;

  private stationAId: string;
  private stationBId: string;

  stationA$: Observable<IMonitor>;
  stationB$: Observable<IMonitor>;

  directions: string[];

  @Input()
  station$: Observable<IMonitor>;

  constructor(
    private tls: TrainLeaveService,
    private directionCache: DirectionsCacheService
  ) {
    const savedStations = this.directionCache.getSavedStations();
    this.directions = this.directionCache.getSavedDirections().split(",");
    this.stationAId = savedStations[0];
    this.stationBId = savedStations[1];

    this.stationA$ = this.tls.getLeave(this.stationAId, this.stationBId).pipe(
      catchError(() => {
        this.stationAfailed = true;
        throw new Error(this.stationFailedMsg(0, 1));
      })
    );
    this.stationB$ = this.tls.getLeave(this.stationBId, this.stationAId).pipe(
      catchError(() => {
        this.stationBfailed = true;
        throw new Error(this.stationFailedMsg(1, 0));
      })
    );
  }

  stationFailedMsg(from: number, to: number): string {
    return `Verbindung von ${this.directions[from]} nach ${this.directions[to]} konnte nicht geladen werden!`;
  }

  ngOnInit(): void {}
}
