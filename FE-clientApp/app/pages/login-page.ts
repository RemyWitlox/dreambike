import { EventData } from "tns-core-modules/data/observable";
import { Page } from "tns-core-modules/ui/page";
import { LoginView } from "./login-view-model";
import { Frame } from "tns-core-modules/ui/frame/frame";

// Event handler for Page "navigatingTo" event attached in login-page.xml
export function onLoaded(args: EventData): void {
    const page = args.object as Page;

    page.bindingContext = new LoginView();
}

export function onNavigatedTo() {
    console.log("Page navigatedTo");
}

export function goBack() {
    const myFrame = Frame.getFrameById("root-frame");
    myFrame.goBack();
}
