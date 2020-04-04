import { EventData } from "tns-core-modules/data/observable";
import { Page } from "tns-core-modules/ui/page";
import { LoginView } from "./login-view-model";

// Event handler for Page "navigatingTo" event attached in login-page.xml
export function navigatingTo(args: EventData) {
    const page = <Page>args.object;

    page.bindingContext = new LoginView();
}
