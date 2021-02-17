import BaseController from './BaseController.js';
import { formView } from '../views.js';
import dataService from '../services/DataService.js';


export default class SearchFormController extends BaseController {

    constructor(element){
        super(element);
    }

    render() {
        const queries = dataService.getStringQueries();
        const searchForm = document.createElement('form');
        searchForm.innerHTML = formView(queries);
        this.element.appendChild(searchForm);
    }
}
