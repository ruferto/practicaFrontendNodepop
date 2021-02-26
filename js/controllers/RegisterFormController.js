import BaseController from './BaseController.js';
import dataService from '../services/DataService.js';
import { registerView } from '../views.js';
import { debounce } from '../utils.js';


export default class RegisterFormController extends BaseController {

    constructor(element) {
        super(element);
        this.element.innerHTML=registerView();
        this.attachEventListener();
    }

    async makePost (user) {
        await dataService.registerUser(user);
        alert('Usuario creado con éxito!');
        window.location.href = '/login.html';  // envía al usuario a la página de login
    }

    attachEventListener() {

        this.element.addEventListener('submit', async (event) => {
            event.preventDefault();
            const user = {
                username: this.element.querySelector('.form-login-email').value,
                password: this.element.querySelector('.form-login-password').value
            };
            this.publish(this.events.START_LOADING);
            try {
                await this.makePost(user);
            } catch(error) {
                this.publish(this.events.ERROR, error);
            } finally {
                this.publish(this.events.FINISH_LOADING);
            }
        });

        this.element.querySelectorAll('input').forEach(input => {
            input.addEventListener('keyup', debounce(event => { 
                const checkEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                const emailInput = document.querySelector('.form-login-email');
                const passInput = this.element.elements['login-password'];
                const passConfirmInput = this.element.elements['login-password2'];
                const notificaction = document.querySelector('.notification');

                if(!checkEmail.test(emailInput.value)){
                    emailInput.setCustomValidity('Debe ser un email válido');
                    notificaction.innerText='Debe ser un email válido';
                    notificaction.classList.remove('is-hidden');
                    
                }else{
                    emailInput.setCustomValidity('');
                    if(passInput.value!='' && !passInput.value.match(/^[a-z0-9]+$/i)){
                        
                        notificaction.innerText='Solo se permiten caracteres alfanúmericos';
                        notificaction.classList.remove('is-hidden');
                        
                    }else{
                        if (passInput.value !== passConfirmInput.value) {
                            passInput.setCustomValidity('Las contraseñas no coinciden');
                            passConfirmInput.setCustomValidity('Las contraseñas no coinciden');
                            
                            notificaction.innerText='Las contraseñas no coinciden';
                            notificaction.classList.remove('is-hidden');
                            
                        } else {
                            notificaction.classList.add('is-hidden');
                            passInput.setCustomValidity('');
                            passConfirmInput.setCustomValidity('');
                        }
                    }
                }
                this.checkInputErrors();
            }, 500));
        });
    }

    checkInputErrors() {
        this.element.querySelectorAll('input').forEach(input => {
            const button = this.element.querySelector('button');
            if (input.validity.valid) {
                button.disabled=true;
            } else {
                button.disabled=false;
            }

            if (this.element.checkValidity()) {
                button.removeAttribute('disabled');
            } else {
                button.setAttribute('disabled', true);
            }
        });
    }

}
