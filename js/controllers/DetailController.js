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

            const userActive = await dataService.getUserDetails();

            if(!userActive){
                const loginLink = document.querySelector('.login-link');
                loginLink.setAttribute('href', `/login.html?next=detail.html?id=${adId}`);
            }
            
            const isAuthor = (userActive && ad.userId == userActive.userId );
            const username = isAuthor ? 'mí' : await dataService.getUsername(ad.userId);

            const article = document.createElement('article');
            article.innerHTML = detailView(ad, username);  
            this.element.appendChild(article);

            const backBtn = this.element.querySelector('.back-icon');
            backBtn.addEventListener('click', (event) => {
                window.history.back();
            });

            if(isAuthor){

                const editBtn = this.element.querySelector('.edit-button');
                editBtn.addEventListener('click', (event) => {
                    window.location.href=`edit-ad.html?id=${ad.id}`;
                });
                editBtn.classList.remove('hidden');
                
                const deleteBtn = this.element.querySelector('.delete-button');
                deleteBtn.addEventListener('click', async (event) => {
                    const deleteConfirm = confirm('¿Estás seguro de querer eliminar este anuncio?\nEsta acción no se podrá deshacer.');
                    if(deleteConfirm){
                        await dataService.deleteAd(ad);
                        window.location.href='/?mensaje=deleteOK';
                    }
                });
                deleteBtn.classList.remove('hidden');
            }
            
        }catch(error){
            if(error.toString() == 'Error: HTTP Error: 404'){
                const article = document.querySelector('.ad-detail-container');
                article.innerHTML = `<div class="message">Anuncio no encontrado<br><br><a href="/">Volver</a></div>`;
            }
            this.pubSub.publish(this.events.ERROR, error);
        }finally{
            this.pubSub.publish(this.events.FINISH_LOADING, {});
        }
    }
}
