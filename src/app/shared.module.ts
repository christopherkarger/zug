import { NgModule } from "@angular/core";
import { HeaderComponent } from "./components/header/header.component";
import { CleanStationNamePipe } from "./clean-station-name.pipe";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

const components = [HeaderComponent, CleanStationNamePipe];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, RouterModule],
  exports: [...components]
})
export class SharedModule {}
