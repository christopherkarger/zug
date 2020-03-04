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
      savedDirections.forEach((dir, index) => {
        if (elm.title === dir) {
          savedStations[index] = elm.id;
        }
      });
    });

    return savedStations;
  }

  saveDirections(directions: [string, string, string, string]): void {
    localStorage.setItem("directions", `${[...directions]}`);
  }
}
