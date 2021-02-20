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

            if(ad.length == 0){
                const article = document.createElement('article');
                article.innerHTML =  "El artículo no existe";  
                this.element.appendChild(article);
                
            }else{
                
                const userActive = await dataService.getUserDetails();
                const isAuthor = (userActive && ad[0].userId == userActive.userId );
                const username = isAuthor ? 'mí' : await dataService.getUsername(ad[0].userId);
                
                const article = document.createElement('article');
                article.innerHTML = ad.length>0 ? detailView(ad[0], username) : "El artículo no existe";  
                this.element.appendChild(article);

                if(isAuthor){

                    const editBtn = this.element.querySelector('.edit-button');
                    editBtn.addEventListener('click', (event) => {
                        console.log(`Editar anuncio ${ad[0].nombre} (${ad[0].id})`);
                    })
                    editBtn.classList.remove('hidden');
                    
                    const deleteBtn = this.element.querySelector('.delete-button');
                    deleteBtn.addEventListener('click', (event) => {
                        console.log(`Borrar anuncio ${ad[0].nombre} (${ad[0].id})`);
                    })
                    deleteBtn.classList.remove('hidden');
                }
            }
        }catch(error){
            this.pubSub.publish(this.events.ERROR, error);
        }finally{
            this.pubSub.publish(this.events.FINISH_LOADING, {});
        }
    }
}
