import { Injectable } from "@angular/core";
import { stations } from "../model/stations";

@Injectable({
  providedIn: "root"
})
export class DirectionsCacheService {
  getSavedDirections(): string {
    return localStorage.getItem("directions");
  }

  getSavedStations(): string[] {
    const savedDirections = this.getSavedDirections().split(",");
    const savedStations: string[] = [];
    stations.forEach(elm => {
      if (elm.title === savedDirections[0]) {
        savedStations[0] = elm.id;
      }

      if (elm.title === savedDirections[1]) {
        savedStations[1] = elm.id;
      }
    });

    return savedStations;
  }

  saveDirections(directionA: string, directionB: string): void {
    localStorage.setItem("directions", `${directionA},${directionB}`);
  }
}
