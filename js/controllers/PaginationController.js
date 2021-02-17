import BaseController from './BaseController.js';
import dataService from '../services/DataService.js';
import { paginationView } from '../views.js'


export default class PaginationController extends BaseController {

    constructor(element){
        super(element);
        this.pubSub.subscribe(this.events.FINISH_LOADING, (numAds) => {
            this.render(numAds);
        });
    }

    render() {
        const queries = dataService.getStringQueries();
        const paginationForm = document.createElement('form');
        paginationForm.innerHTML = paginationView(queries);
        this.element.appendChild(paginationForm);
    }

}
