import { NgModule } from "@angular/core";
import { AppHeaderComponent } from "./appheader.component";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        AppHeaderComponent
    ],
    imports: [CommonModule],
    exports: [AppHeaderComponent]
    })

export class AppHeaderModule { }