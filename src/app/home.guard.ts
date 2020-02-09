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
    if (!savedDirections) {
      this.router.navigate(["/options"]);
      return false;
    }
    return true;
  }
}
