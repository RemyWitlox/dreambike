import { NgModule } from "@angular/core/core";
import { Routes } from "@angular/router/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { SearchComponent } from "./search.component";

const routes: Routes = [{ path: "default", component: SearchComponent }];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class SearchRoutingModule {}
