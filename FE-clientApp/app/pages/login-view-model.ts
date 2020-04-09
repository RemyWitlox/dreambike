import { Observable } from "tns-core-modules/data/observable";
import { NavigationEntry, Frame } from "tns-core-modules/ui/frame/frame";
import { AnimationCurve } from "tns-core-modules/ui/enums/enums";

export class LoginView extends Observable {
    private _message: string;
    private _loginBtn: string;
    private _logedIn: boolean;

    constructor() {
        super();
        this._logedIn = true;
        this.updateView();
    }

    get message(): string {
        return this._message;
    }

    set message(v: string) {
        this._message = v;
        this.notifyPropertyChange("message", v);
    }

    get loginBtn(): string {
        return this._loginBtn;
    }

    set loginBtn(v: string) {
        this._loginBtn = v;
        this.notifyPropertyChange("loginBtn", v);
    }

    get logedIn(): boolean {
        return this._logedIn;
    }

    set logedIn(v: boolean) {
        this._logedIn = v;
        this.notifyPropertyChange("logedIn", v);
    }

    onLogin() {
        this.updateView();
        this.navigate();
    }

    private updateView() {
        if (this._logedIn == false) {
            this.logedIn = true;
            this.loginBtn = "Logout";
            this.message = "You are loged in!";
        } else {
            this.logedIn = false;
            this.loginBtn = "Login";
            this.message = "Please log in";
        }
    }

    navigate() {
        console.log("Navigate");
        const frame = Frame.getFrameById("root-frame");
        const navigationEntry: NavigationEntry = {
            moduleName: "pages/main-page",
            animated: true,
            transition: {
                name: "slide",
                duration: 380,
                curve: AnimationCurve.easeIn,
            },
        };
        frame.navigate(navigationEntry);
    }
}
