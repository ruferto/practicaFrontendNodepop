import BaseController from './BaseController.js';
import dataService from '../services/DataService.js';
import { adView } from '../views.js';
import PaginationController from './PaginationController.js';
// import pubSub from '../services/Pubsub.js';
// import AdController from './AdController.js';
// import LoaderController from './LoaderController.js'

export default class AdsListController extends BaseController {

    render(ads) {

        if(ads.length==0){
            const article = document.createElement('article');
            article.innerHTML = '<div style="font-size:1.4rem;padding-bottom:3.6rem;">No hay resultados</div>';
            this.element.appendChild(article);
        }else{

            for (const ad of ads) {

                const article = document.createElement('article');
                article.innerHTML = adView(ad);
                article.itemId=ad.nombre;
                this.element.appendChild(article);
                article.addEventListener('click', (event) => {
                    console.log(article.itemId);
                    window.location.href = `detalle.html?id=${ad.id}`;////////TODO
                });
                //const controller = new AdController(this.element);
            }
        }
    }

    async loadAds() {
        this.pubSub.publish(this.events.START_LOADING, {});
        //let num=0;
        try {
            // let params = new URLSearchParams(document.location.search.substring(1));
            // let name = params.get("nombre");
            const ads = await dataService.getAds();
            //num = ads.length;
            this.render(ads);
        } catch (error) {
            console.error(error);
            this.pubSub.publish(this.events.ERROR, error);
        } finally {
            // esto se ejecuta siempre, vaya bien o vaya mal
            this.pubSub.publish(this.events.FINISH_LOADING, {});
            
        }
    }

}
