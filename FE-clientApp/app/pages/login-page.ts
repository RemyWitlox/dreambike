import { EventData } from "tns-core-modules/data/observable";
import { Page, NavigatedData } from "tns-core-modules/ui/page";
import { LoginView } from "./login-view-model";
import { getFrameById, NavigationEntry } from "tns-core-modules/ui/frame";
import { AnimationCurve } from "tns-core-modules/ui/enums";

// Event handler for Page "navigatingTo" event attached in login-page.xml
export function onLoaded(args: EventData): void {
    const page = args.object as Page;

    page.bindingContext = new LoginView();
}

export function onNavigatedTo(args: NavigatedData) {
    console.log("Page navigatedTo");
    const page = args.object as Page;
    console.log("Page reference from navigatedTo event: ", page);
}

export function navigate() {
    const frame = getFrameById("root-frame");
    const navigationEntry: NavigationEntry = {
        moduleName: "pages/main-page",
        clearHistory: true,
        animated: true,
        transition: {
            name: "slide",
            duration: 380,
            curve: AnimationCurve.easeIn,
        },
    };
    frame.navigate(navigationEntry);
}
