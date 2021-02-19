const BASE_URL=`http://127.0.0.1:8000`;
const TOKEN_KEY = 'token';

const params = new URLSearchParams(document.location.search.substring(1));
const nombre = params.get("nombre");
const precio = params.get("precio");
const venta = params.get("venta");
const tags = params.get("tags");
const adId = params.get("id");
const page = params.get("page") || 1;
const limit = params.get("limit") || 10;


const queryString = `${ (adId ? `id=${adId}`: ``)}${ (nombre ? `nombre_like=${nombre}`: ``)}${ (precio ? `&precio=${precio}`: ``)}${ (venta ? `&venta=${venta}`: ``)}${ (tags ? `&tags_like=${tags}`: ``)}&_page=${page}&_limit=${limit}`;


//const url = 'https://raw.githubusercontent.com/usuario616/anuncios/main/anuncios.json';
const database = `/api/anuncios/`
const url = `${BASE_URL}${database}?${ queryString }`;

// if(adId){
//     url = `http://localhost:8000/api/anuncios/${ adId }`;
// }

export default {

    getStringQueries: () => {
        return {
            id: adId,
            nombre,
            precio,
            venta,
            tags,
            page,
            limit
        }
    },

    getAds: async () => {
        const response = await fetch(url);
        if (response.ok) {
            let data = response.json();
            return data;
        } else {
            throw new Error(`HTTP Error: ${response.status}`)
        }
    },

    getAd: async (id) => {
        const response = await fetch(`${BASE_URL}${database}?id=${id}`);
        if (response.ok) {
            let data = response.json();
            return data;
        } else {
            throw new Error(`HTTP Error: ${response.status}`)
        }
    },

    // getNumAds: async() => {
    //     const response = await fetch(baseUrl);
    //     if (response.ok) {
    //         let data = response.json();
    //         console.log(data.length)
    //         return await data.length;
    //     } else {
    //         throw new Error(`HTTP Error: ${response.status}`)
    //     }
    // }

    post: async function(url, postData) {
        const config = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData)  // convierte el objeto de usuarios en un JSON
        };
        const token = await this.getToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        const response = await fetch(url, config);
        const data = await response.json();  // respuesta del servidor sea OK o sea ERROR.
        if (response.ok) {
            return data;
        } else {            
            // TODO: mejorar gestión de errores
            // TODO: si la respuesta es un 401 no autorizado, debemos borrar el token (si es que lo tenemos);
            throw new Error(data.message || JSON.stringify(data));
        }
    },

    registerUser: async function(user) {
        const url = `${BASE_URL}/auth/register`;
        return await this.post(url, user);
    },

    login: async function(user) {
        const url = `${BASE_URL}/auth/login`;
        return await this.post(url, user);
    },

    logout: async function() {
        localStorage.removeItem(TOKEN_KEY);
    },

    saveToken: async function(token) {
        localStorage.setItem(TOKEN_KEY, token);
    },

    getToken: async function() {
        return localStorage.getItem(TOKEN_KEY);
    },

    isUserLogged: async function() {
        const token = await this.getToken();
        if(token !== null) console.log('logged')
        return token !== null;  // esto devuelve true o false
    },

    saveAd: async function(ad) {
        const url = `${BASE_URL}/api/anuncios`;
        return await this.post(url, ad);
    },

    getUserDetails: function() {
        const userDetails = this.parseJwt(localStorage.getItem(TOKEN_KEY));
        return userDetails;
    },

    parseJwt: function (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    }
};