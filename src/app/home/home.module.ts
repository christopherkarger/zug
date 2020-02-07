import { NgModule } from "@angular/core";
import { HomeComponent } from "./home.component";
import { RouterModule, Routes } from "@angular/router";
import { NextTrainComponent } from "./../components/next-train/next-train.component";
import { SharedModule } from "../shared.module";
import { CommonModule } from "@angular/common";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  }
];

@NgModule({
  declarations: [HomeComponent, NextTrainComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)]
})
export class HomeModule {}
