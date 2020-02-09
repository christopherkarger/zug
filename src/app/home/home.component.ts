import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";
import { IMonitor } from "../model/monitor.model";
import { TrainLeaveService } from "../services/train-leave.service";
import { DirectionsCacheService } from "../services/directions.cache.service";
import { stations } from "../model/stations";

@Component({
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  private stationAId: string;
  private stationBId: string;

  stationA$: Observable<IMonitor>;
  stationB$: Observable<IMonitor>;

  @Input()
  station$: Observable<IMonitor>;

  constructor(
    private tls: TrainLeaveService,
    private directionCache: DirectionsCacheService
  ) {
    const savedStations = this.directionCache.getSavedStations();
    this.stationAId = savedStations[0];
    this.stationBId = savedStations[1];

    this.stationA$ = this.tls.getLeave(this.stationAId, this.stationBId);
    this.stationB$ = this.tls.getLeave(this.stationBId, this.stationAId);
  }

  ngOnInit(): void {}
}
