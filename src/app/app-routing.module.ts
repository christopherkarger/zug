import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { HomeGuard } from "./home.guard";

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./home/home.module").then(m => m.HomeModule),
    pathMatch: "full",
    canActivate: [HomeGuard]
  },
  {
    path: "options",
    loadChildren: () =>
      import("./options/options.module").then(m => m.OptionsModule),
    pathMatch: "full"
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
