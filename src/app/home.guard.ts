import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { DirectionsCacheService } from "./services/directions.cache.service";

@Injectable({ providedIn: "root" })
export class HomeGuard implements CanActivate {
  constructor(
    private directionCache: DirectionsCacheService,
    private router: Router
  ) {}
  canActivate(): boolean {
    const savedDirections = this.directionCache.getSavedDirections();
    const dirArr = savedDirections.split(",");
    const validStations = dirArr.length === 2 || dirArr.length === 4;

    if (!savedDirections || !validStations) {
      this.router.navigate(["/options"]);
      return false;
    }
    return true;
  }
}
