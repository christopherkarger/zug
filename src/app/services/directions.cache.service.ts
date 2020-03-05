import { Injectable } from "@angular/core";
import { stations } from "../model/stations";

@Injectable({
  providedIn: "root"
})
export class DirectionsCacheService {
  getSavedDirections(): string {
    return localStorage.getItem("directions");
  }

  isValid(): boolean {
    if (!this.getSavedDirections()) {
      return false;
    }
    const savedDirections = this.getSavedDirections().split(",");
    return savedDirections.length === 2 || savedDirections.length === 4;
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
