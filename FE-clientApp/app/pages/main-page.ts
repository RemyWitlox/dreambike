import { EventData } from "tns-core-modules/data/observable";
import { Page } from "tns-core-modules/ui/page";
import { MainView } from "./main-view-model";
import * as geolocation from "nativescript-geolocation";
import { Accuracy } from "tns-core-modules/ui/enums";

let page: Page;
let model = new MainView();
let watchIds = [];

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function onNavigatedTo(args: EventData): void {
    page = args.object as Page;
    page.bindingContext = model;
}

export function enableLocationTap() {
    geolocation.isEnabled().then(
        function (isEnabled) {
            if (!isEnabled) {
                geolocation
                    .enableLocationRequest(true, true)
                    .then(
                        () => {
                            console.log("User Enabled Location Service");
                        },
                        (e) => {
                            console.log("Error: " + (e.message || e));
                        }
                    )
                    .catch((ex) => {
                        console.log("Unable to Enable Location", ex);
                    });
            }
        },
        function (e) {
            console.log("Error: " + (e.message || e));
        }
    );
}

export function buttonGetLocationTap() {
    geolocation
        .getCurrentLocation({
            desiredAccuracy: Accuracy.high,
            maximumAge: 5000,
            timeout: 10000,
        })
        .then(
            function (loc) {
                if (loc) {
                    console.log(loc);
                    model.locations.push(loc);
                }
            },
            function (e) {
                console.log("Error: " + (e.message || e));
            }
        );
}

export function buttonStartTap() {
    try {
        watchIds.push(
            geolocation.watchLocation(
                function (loc) {
                    if (loc) {
                        model.locations.push(loc);
                    }
                },
                function (e) {
                    console.log("Error: " + e.message);
                },
                {
                    desiredAccuracy: Accuracy.high,
                    updateDistance: 1,
                    updateTime: 3000,
                    minimumUpdateTime: 100,
                }
            )
        );
    } catch (ex) {
        console.log("Error: " + ex.message);
    }
}

export function buttonStopTap() {
    let watchId = watchIds.pop();
    while (watchId != null) {
        geolocation.clearWatch(watchId);
        console.log(watchId);
        watchId = watchIds.pop();
    }
}

export function buttonClearTap() {
    model.locations.splice(0, model.locations.length);
}
