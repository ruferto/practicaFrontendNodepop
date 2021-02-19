import { detailView } from '../views.js';
import BaseController from './BaseController.js';
import dataService from '../services/DataService.js';

export default class DetailController extends BaseController {

    constructor(element){
        super(element);
    }

    async renderDetail() {
        try{
            this.pubSub.publish(this.events.START_LOADING, {});
            const adId = dataService.getStringQueries().id;
            const ad = await dataService.getAd(adId);
            const username = await dataService.getUsername(ad[0].userId)
            const article = document.createElement('article');
            article.innerHTML = ad.length>0 ? detailView(ad[0], username) : "El artículo no existe";  
            this.element.appendChild(article);
        }catch(error){
            this.pubSub.publish(this.events.ERROR, error);
        }finally{
            this.pubSub.publish(this.events.FINISH_LOADING, {});
        }
    }
}
