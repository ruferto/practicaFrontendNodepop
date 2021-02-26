import BaseController from './BaseController.js';
import dataService from '../services/DataService.js';
import { adView } from '../views.js';

export default class AdsListController extends BaseController {

    render(ads) {
        if(ads.length==0){
            const article = document.createElement('article');
            article.innerHTML = '<div class="message">No hay resultados</div>';
            this.element.appendChild(article);
        }else{

            for (const ad of ads) {

                const article = document.createElement('article');
                article.innerHTML = adView(ad);
                this.element.appendChild(article);
                article.addEventListener('click', (event) => {
                    window.location.href = `detail.html?id=${ad.id}`;////////TODO
                });
            }
        }
    }

    async loadAds() {
        this.pubSub.publish(this.events.START_LOADING, {});
        try {
            
            const ads = await dataService.getAds();
            this.render(ads);

        } catch (error) {
            console.error(error);
            this.pubSub.publish(this.events.ERROR, error);
        } finally {
            this.pubSub.publish(this.events.FINISH_LOADING, {});
        }
    }

}
