import { NgModule } from "@angular/core/core";
import { Routes } from "@angular/router/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { BrowseComponent } from "./browse.component";

const routes: Routes = [{ path: "default", component: BrowseComponent }];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class BrowseRoutingModule {}
