import BaseController from './BaseController.js';
import dataService from '../services/DataService.js';

export default class SubtitleController extends BaseController {

    constructor(element){
        super(element);
        this.pubSub.subscribe(this.events.FINISH_LOADING, () => {
            this.hideLoading();
        });

        this.pubSub.subscribe(this.events.START_LOADING, () => {
            this.showLoading();
        });
    }

    render() {
        const logged = dataService.isUserLogged();
        if(logged) {
            try{
            const user = dataService.getUserDetails();
            const article = document.querySelector('.subtitle');
            article.innerHTML = `<div style="font-size: 0.7rem;">Conectado como</div> ${user.username}<div><div style="font-size: 0.8rem;border-style:solid;border-radius:5px;border-width:1px;padding-right: 4px;"><a href="">Desconectar</a></div></div>`;
            }catch(e){
                console.log(e);
            }
        }
        // article.itemId=ad.nombre;
        // this.element.appendChild(article);
        // article.addEventListener('click', (event) => {
        //     console.log(article.itemId);
        //     window.location.href = `detalle.html?id=${ad.id}`;////////TODO
        // });        
    }

    showLoading() {
        this.element.classList.remove('hidden');
    }

    hideLoading() {
        this.element.classList.add('hidden');
    }

}
