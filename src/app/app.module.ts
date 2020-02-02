import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NextTrainComponent } from "./next-train/next-train.component";
import { TrainLeaveService } from "./services/train-leave.service";

import { TrainLeaveHttpService } from "./services/train-leave-http.service";
import { HttpService } from "./services/http.service";
import { HttpClientModule } from "@angular/common/http";
import { MonitorComponent } from './monitor/monitor.component';

@NgModule({
  declarations: [AppComponent, NextTrainComponent, MonitorComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [
    {
      provide: TrainLeaveService,
      useFactory: (httpClient: HttpService) => {
        return new TrainLeaveHttpService(httpClient);
      },
      deps: [HttpService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
