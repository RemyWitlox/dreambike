import { Observable } from "tns-core-modules/data/observable";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { registerElement } from "nativescript-angular/element-registry";
import { MapView, Marker, Position } from "nativescript-google-maps-sdk";
import * as geolocation from "nativescript-geolocation";
import { Accuracy } from "tns-core-modules/ui/enums";

geolocation.enableLocationRequest();
geolocation.getCurrentLocation({
    desiredAccuracy: Accuracy.high,
    maximumAge: 5000,
    timeout: 20000,
});

registerElement(
    "MapView",
    () => require("nativescript-google-maps-sdk").MapView
);

export class MainView extends Observable {
    private mapView: MapView;
    private _counter: number;
    private _message: string;
    private _locations: ObservableArray<geolocation.Location>;

    constructor() {
        super();
        this._counter = 42;
        this.updateMessage();
    }

    get message(): string {
        return this._message;
    }

    set message(value: string) {
        if (this._message !== value) {
            this._message = value;
            this.notifyPropertyChange("message", value);
        }
    }

    get locations(): ObservableArray<geolocation.Location> {
        if (!this._locations) {
            this._locations = new ObservableArray<geolocation.Location>();
        }
        return this._locations;
    }

    set locations(value: ObservableArray<geolocation.Location>) {
        if (this._locations !== value) {
            this._locations = value;
            this.notifyPropertyChange("locations", value);
        }
    }

    onTap() {
        this._counter--;
        console.log("tapped");
        this.updateMessage();
    }

    private updateMessage() {
        if (this._counter <= 0) {
            this.message = "There are no more bikes to rent!!";
        } else {
            this.message = `${this._counter} bikes left to rent`;
        }
    }

    OnMapReady(event) {
        this.mapView = event.object;

        const NA_CENTER_LATITUDE = 39.8283459;
        const NA_CENTER_LONGITUDE = -98.5816737;

        this.mapView.latitude = NA_CENTER_LATITUDE;
        this.mapView.longitude = NA_CENTER_LONGITUDE;
        this.mapView.zoom = 3;

        let stLouisCoordinates = {
            latitude: 38.619081,
            longitude: -90.196846,
        };

        let stLouisMarker = new Marker();
        stLouisMarker.position = Position.positionFromLatLng(
            stLouisCoordinates.latitude,
            stLouisCoordinates.longitude
        );
        stLouisMarker.title = "St. Louis, MO";
        stLouisMarker.snippet = "Go Cardinals!";
        stLouisMarker.color = "#6B8E23";
        this.mapView.addMarker(stLouisMarker);
    }
}
