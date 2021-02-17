import AdsListController from './controllers/AdsListController.js';
import LoaderController from './controllers/LoaderController.js';
import ErrorController from './controllers/ErrorController.js';
import SearchFormController from './controllers/SearchFormController.js';
//import PaginationController from './controllers/PaginationController.js';

window.addEventListener('DOMContentLoaded', async (event) => {
  const loader = document.querySelector('.lds-ring');
  const loaderController = new LoaderController(loader);

  const element = document.querySelector('.ads-list');
  const controller = new AdsListController(element);
  controller.loadAds();

  const element2 = document.querySelector('.search-form-container');
  const searchFormController = new SearchFormController(element2);
  searchFormController.render();

  // const element3 = document.querySelector('.pagination-form-container');
  // const paginationFormController = new PaginationController(element3);
  // paginationFormController.render();

  const errorsElement = document.querySelector('.global-errors');
  const errorController = new ErrorController(errorsElement);
});