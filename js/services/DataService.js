const BASE_URL=`http://127.0.0.1:8000`;
const TOKEN_KEY = 'token';

//const url = 'https://raw.githubusercontent.com/usuario616/anuncios/main/anuncios.json';

export default {

    getStringQueries: () => {
        const params = new URLSearchParams(document.location.search.substring(1));
        const nombre = params.get("nombre");
        const min = params.get("min");
        const max = params.get("max");
        const venta = params.get("venta");
        const tags = params.get("tags");
        const adId = params.get("id");
        const page = params.get("page") || 1;
        const limit = params.get("limit") || 10;
        const sort = params.get("sort");
        const order = params.get("order");
        return {
            id: adId,
            nombre,
            min,
            max,
            venta,
            tags,
            page,
            limit,
            sort,
            order
        }
    },

    getAds: async function(total=true) {
        const queries = this.getStringQueries();
        const queryString = `${ (queries.id ? `id=${queries.id}`: ``)}${ (queries.nombre ? `nombre_like=${queries.nombre}`: ``)}${ (queries.min ? `&precio_gte=${queries.min}`: ``)}${ (queries.max ? `&precio_lte=${queries.max}`: ``)}${ (queries.venta ? `&venta=${queries.venta}`: ``)}${ (queries.tags ? `&tags_like=${queries.tags}`: ``)}&_page=${queries.page}&_limit=${queries.limit}&_sort=${queries.sort ? queries.sort : 'id'}&_order=${queries.order ? queries.order : 'desc'}`;
        const response = await fetch(`${BASE_URL}/api/anuncios/?${queryString}`);
        if (response.ok) {
            let data = response.json();
            return data;
        } else {
            throw new Error(`HTTP Error: ${response.status}`)
        }
    },

    getTotalPages: async function() {
        const queries = this.getStringQueries();
        const queryString = `${ (queries.id ? `id=${queries.id}`: ``)}${ (queries.nombre ? `nombre_like=${queries.nombre}`: ``)}${ (queries.min ? `&precio_gte=${queries.min}`: ``)}${ (queries.max ? `&precio_lte=${queries.max}`: ``)}${ (queries.venta ? `&venta=${queries.venta}`: ``)}${ (queries.tags ? `&tags_like=${queries.tags}`: ``)}`;
        const response = await fetch(`${BASE_URL}/api/anuncios/?${queryString}`);
        if (response.ok) {
            let data = await response.json();
            return data.length;
        } else {
            throw new Error(`HTTP Error: ${response.status}`);
        }
    },

    getAd: async (id) => {
        const response = await fetch(`${BASE_URL}/api/anuncios/${id}`);
        if (response.ok) {
            let data = response.json();
            return data;
        } else {
            throw new Error(`HTTP Error: ${response.status}`);
        }
    },

    post: async function(url, postData, json=true) {
        return await this.request('POST', url, postData, json);
    },

    delete: async function(url) {
        return await this.request('DELETE', url, {});
    },

    edit: async function(url, postdata, json=true) {
        return await this.request('PUT', url, postdata, json);
    },

    put: async function(url, putData, json=true) {
        return await this.request('PUT', url, putData, json);
    },

    request: async function(method, url, postData, json=true) {
        const config = {
            method: method,
            headers: {},
            body: null
        };
        if(json){
            config.headers['Content-Type'] = 'application/json';
            config.body = JSON.stringify(postData);
        } else {
            config.body = postData;
        }
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
        return token !== null;  // esto devuelve true o false
    },

    saveAd: async function(ad) {
        const url = `${BASE_URL}/api/anuncios`;

        if (ad.foto) {
            const imageURL = await this.uploadImage(ad.foto);
            ad.foto = imageURL;
        }
        
        return await this.post(url, ad);
    },

    uploadImage: async function(image) {
        const form = new FormData();
        form.append('file', image);
        const url = `${BASE_URL}/upload`;
        const response = await this.post(url, form, false);
        return response.path || null;
    },

    getUserDetails: async function() {
        try{
            const payloadBase64 = localStorage.getItem(TOKEN_KEY).split('.')[1];
            var jsonPayload = atob(payloadBase64);
            const {username, userId} = JSON.parse(jsonPayload);
            return {username, userId};
        }catch(error){
            return null;
        }
    },

    getUsername: async function(id) {
        const response = await fetch(`${BASE_URL}/api/users/?id=${id}`);
        if (response.ok) {
            let data = await response.json();
            return data[0].username;
        } else {
            throw new Error(`HTTP Error: ${response.status}`);
        }
    },

    deleteAd: async function(ad) {
        const url = `${BASE_URL}/api/anuncios/${ad.id}`;
        return await this.delete(url);
    },

    editAd: async function(ad) {
        const url = `${BASE_URL}/api/anuncios/${ad.id}`;
        return await this.edit(url, ad);
    }
};