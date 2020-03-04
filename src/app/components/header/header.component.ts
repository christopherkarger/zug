import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { DirectionsCacheService } from "src/app/services/directions.cache.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  showOptionsLink = false;
  showHomeLink = false;

  constructor(
    private router: Router,
    private directionCache: DirectionsCacheService
  ) {
    this.router.events.subscribe(evt => {
      if (evt instanceof NavigationEnd) {
        if (evt.url === "/") {
          this.showHomeLink = false;
        } else {
          this.showHomeLink = true;
        }

        if (evt.url === "/options") {
          this.showOptionsLink = false;
          const savedDirections = this.directionCache.getSavedDirections();
          const dirArr = savedDirections.split(",");
          const validStations = dirArr.length === 2 || dirArr.length === 4;

          if (!savedDirections || !validStations) {
            this.showHomeLink = false;
          }
        } else {
          this.showOptionsLink = true;
        }
      }
    });
  }

  ngOnInit(): void {}
}
