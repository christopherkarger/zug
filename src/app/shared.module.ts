import { NgModule } from "@angular/core";
import { HeaderComponent } from "./components/header/header.component";
import { CleanStationNamePipe } from "./clean-station-name.pipe";
import { AppRoutingModule } from "./app-routing.module";
import { RouterModule } from "@angular/router";

const components = [HeaderComponent, CleanStationNamePipe];

@NgModule({
  declarations: [...components],
  imports: [RouterModule],
  exports: [...components]
})
export class SharedModule {}
