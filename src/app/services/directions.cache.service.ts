import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class DirectionsCacheService {
  getSavedDirections(): string {
    return localStorage.getItem("directions");
  }

  saveDirections(directionA: string, directionB: string): void {
    localStorage.setItem("directions", `${directionA},${directionB}`);
  }
}
