import DetailController from './controllers/DetailController.js';
import LoaderController from './controllers/LoaderController.js';
import ErrorController from './controllers/ErrorController.js';
import SubtitleController from './controllers/SubtitleController.js';

window.addEventListener('DOMContentLoaded', async (event) => {
  const loader = document.querySelector('.lds-ring');
  const loaderController = new LoaderController(loader);
  
  const detail = document.querySelector('.ad-detail-container');
  const detailController = new DetailController(detail);
  detailController.renderDetail();

  const subtitle = document.querySelector('.subtitle-container');
  const subtitleController = new SubtitleController(subtitle);
  subtitleController.render();

  const errorsElement = document.querySelector('.global-errors');
  const errorController = new ErrorController(errorsElement);
});