import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TrainLeaveService } from "./services/train-leave.service";

import { TrainLeaveHttpService } from "./services/train-leave-http.service";
import { HttpService } from "./services/http.service";
import { HttpClientModule } from "@angular/common/http";
import { SharedModule } from "./shared-modules/shared.module";
import { DirectionsCacheService } from "./services/directions.cache.service";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, SharedModule],
  providers: [
    {
      provide: TrainLeaveService,
      useFactory: (
        httpClient: HttpService,
        directionCache: DirectionsCacheService
      ) => {
        return new TrainLeaveHttpService(httpClient, directionCache);
      },
      deps: [HttpService, DirectionsCacheService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
