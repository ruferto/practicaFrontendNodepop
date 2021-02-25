import BaseController from './BaseController.js';
import dataService from '../services/DataService.js';


export default class RegisterFormController extends BaseController {

    constructor(element) {
        super(element);
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

        this.element.querySelectorAll('input[type="password"]').forEach(input => {
            input.addEventListener('keyup', event => { 
                const passInput = this.element.elements['login-password'];
                const passConfirmInput = this.element.elements['login-password2'];
                if (passInput.value !== passConfirmInput.value) {
                    passInput.setCustomValidity('Las contraseñas no coinciden'); // marco el input como erróneo
                    passConfirmInput.setCustomValidity('Las contraseñas no coinciden'); // marco el input como erróneo
                    passInput.validationMessage = passConfirmInput.validationMessage = 'Las contraseñas no coinciden'
                } else {
                    passInput.setCustomValidity(''); // el input está ok
                    passConfirmInput.setCustomValidity(''); // el input está ok
                }
                this.checkInputErrors();
            });
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
