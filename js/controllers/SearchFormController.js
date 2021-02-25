import BaseController from './BaseController.js';
import { formView } from '../views.js';
import dataService from '../services/DataService.js';


export default class SearchFormController extends BaseController {

    constructor(element){
        super(element);
    }

    async render() {

        const tagList = await dataService.getTagsList();
        
        const queries = dataService.getStringQueries();
        queries.limit = window.sessionStorage.getItem('limit') || 10;
        const total = Math.ceil(await dataService.getTotalPages()/queries.limit);
        const searchForm = document.createElement('form');
        searchForm.innerHTML = formView(queries, total, tagList);
        this.element.appendChild(searchForm);

        const pageInput = document.querySelector('.page-input');
        pageInput.addEventListener('change', (event) => {
            searchForm.submit();
        });

        const limitInput = document.querySelector('.limit-input');
        limitInput.addEventListener('change', (event) => {
            window.sessionStorage.setItem("limit",limitInput.value.toString());
            searchForm.submit();
        });
        
        const searchButton = document.querySelector('.search-button');
        searchButton.addEventListener('click', (event) => {
            pageInput.value=1;
        });

        const pagButtons = document.querySelectorAll('.pag-button');
        pagButtons.forEach( button => {
            button.addEventListener('click', (event) => {
                pageInput.value=button.value;
            })
        })
    }
}
