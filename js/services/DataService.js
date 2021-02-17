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
const baseUrl=`http://localhost:8000/api/anuncios/`;
const url = `${baseUrl}?${ queryString }`;

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
        const response = await fetch(`${baseUrl}?id=${id}`);
        if (response.ok) {
            let data = response.json();
            return data;
        } else {
            throw new Error(`HTTP Error: ${response.status}`)
        }
    },

    getNumAds: async() => {
        const response = await fetch(baseUrl);
        if (response.ok) {
            let data = response.json();
            console.log(data.length)
            return 20;
        } else {
            throw new Error(`HTTP Error: ${response.status}`)
        }
    }
};