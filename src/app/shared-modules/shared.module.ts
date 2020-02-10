import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "../components/header/header.component";
import { CleanStationNamePipe } from "../clean-station-name.pipe";
import { ErrorComponent } from "../components/error/error.component";

const components = [HeaderComponent, ErrorComponent, CleanStationNamePipe];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, RouterModule],
  exports: [...components]
})
export class SharedModule {}
