export default class ProgressBar {
    private viewWithProgressBar: any;

    constructor(view: any) {
        this.viewWithProgressBar = view;

        webix.extend(view, webix.ProgressBar);
    }

    showProgress(): void {
        this.viewWithProgressBar.showProgress({type: 'icon'});
    }

    hideProgress(): void {
        if (this.viewWithProgressBar.$view) {
            this.viewWithProgressBar.hideProgress();
        }
    }
}
