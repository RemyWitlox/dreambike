import { Observable } from "tns-core-modules/data/observable";

export class MainView extends Observable {
    private _counter: number;
    private _message: string;

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

    onTap() {
        this._counter--;
        this.updateMessage();
    }

    onLogin() {
        this._message = "You are loged in!";
    }

    private updateMessage() {
        if (this._counter <= 0) {
            this.message = "There are no more bikes to rent!!";
        } else {
            this.message = `${this._counter} bikes left to rent`;
        }
    }
}
