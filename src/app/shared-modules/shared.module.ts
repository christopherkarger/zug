import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "../components/header/header.component";
import { CleanStationNamePipe } from "../clean-station-name.pipe";
import { MsgBoxComponent } from "../components/msg-box/msg-box.component";

const components = [HeaderComponent, MsgBoxComponent, CleanStationNamePipe];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, RouterModule],
  exports: [...components]
})
export class SharedModule {}
