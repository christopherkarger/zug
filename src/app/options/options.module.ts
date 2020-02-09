import { NgModule } from "@angular/core";
import { OptionsComponent } from "./options.component";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared.module";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
  {
    path: "",
    component: OptionsComponent
  }
];

@NgModule({
  declarations: [OptionsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class OptionsModule {}
