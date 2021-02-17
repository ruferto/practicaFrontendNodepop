import BaseController from './BaseController.js';
import { errorView } from '../views.js';

export default class ErrorController extends BaseController {

    constructor(element) {
        super(element);
        this.pubSub.subscribe(this.events.ERROR, (error) => {
            this.showError(error);
        })
    }

    showError(errorMessage) {
        this.element.innerHTML = errorView(errorMessage);
        this.element.classList.remove('hidden');
        this.element.addEventListener('click', (event) => {
            if (event.target == this.element || event.target.classList.contains('delete')) {
                this.element.classList.add('hidden');
            }
        });

        const options = {once: true};
        document.body.addEventListener('keydown', (event) => {
            if(event.code == "Escape"){
                this.element.classList.add('hidden');
            }
        }, options);
    }

}
