import BaseController from './BaseController.js';

export default class LoaderController extends BaseController {

    constructor(element){
        super(element);
        this.pubSub.subscribe(this.events.FINISH_LOADING, () => {
            this.hideLoading();
        });

        this.pubSub.subscribe(this.events.START_LOADING, () => {
            this.showLoading();
        });
    }
    showLoading() {
        this.element.classList.remove('hidden');
    }

    hideLoading() {
        this.element.classList.add('hidden');
    }

}
