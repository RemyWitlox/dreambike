import { EventData } from "tns-core-modules/data/observable";
import { Page } from "tns-core-modules/ui/page";
import { MainView } from "./main-view-model";

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function onNavigatedTo(args: EventData): void {
    const page = args.object as Page;

    page.bindingContext = new MainView();
}
