import LoaderController from './controllers/LoaderController.js';
import ErrorController from './controllers/ErrorController.js';
import EditAdFormController from './controllers/EditAdFormController.js';

window.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.lds-ring');
    const loaderController = new LoaderController(loader);

    const errorsElement = document.querySelector('.global-errors');
    const errorController = new ErrorController(errorsElement);

    const formElement = document.querySelector('.new-ad-container');
    const formController = new EditAdFormController(formElement);
    formController.render();
});
