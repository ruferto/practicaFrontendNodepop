//import dataService from "./services/DataService.js";

function getTags (tagsArray){
  let tags = '';
  tagsArray.forEach(tag => {
    tags += `<a href="/?tags=${tag}">${tag}</a>&nbsp;`;
  });
  return tags;
}

export const adView = (ad) => {
  
  const adImage = ad.foto ? `<img class="img-ad" src="${ ad.foto }" width="180" alt=${ad.foto } /><br>` : '';
  return `
  <div class="ad-container">
  ${ (ad.venta) ? 'Se vende' : 'Se compra' }:<br>
  <span class="ad-name"><b>${ ad.nombre }</b></span><br>
  <div class="img-container">
    ${adImage}
  </div>
  <span class="price">${ ad.precio % 1 != 0 ? Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(ad.precio) : Intl.NumberFormat('de-DE').format(ad.precio)+' €' }</span>
  <span class="tags">Etiquetas: &nbsp;${ getTags(ad.tags) }
  </span>
</div>
`;
};


export const errorView = (errorMessage) => {
  return `<article class="message is-danger">
    <div class="message-header">
      <p>Error</p>
      <button class="delete" aria-label="delete"></button>
    </div>
    <div class="message-body">
      ${errorMessage}
    </div>
  </article>`
};

export const formView = (queries) => {
  const { nombre, precio, venta, page, limit } = queries;
  return `<form class="search-form">
  <span class="icon-text">
    <span class="icon">
      <i class="fas fa-spinner fa-pulse"></i>
    </span>
  </span>
  <label for="nombre">Nombre: </label>
  <input type="text" action="" id="nombre" name="nombre" value="${nombre ? nombre : ''}">
  <label for="precio">Precio: </label>
  <input type="number" step="0.05" min="0" action="" id="precio" name="precio" value="${precio ? precio : ''}">
  <select id="venta" name="venta">
    <option value="">Todos</option>
    <option value="true" ${venta ? ( venta == 'true' ? 'selected' : '') : ''}>Venta</option>
    <option value="false" ${venta ? ( venta == 'false' ? 'selected' : '') : ''}>Compra</option>
  </select>
  <label for="page">Página: </label>
  <input type="number" min="1" action="" id="page" name="page" value="${page}" style="width: 50px;">
  <label for="limit">Límite: </label>
  <input type="number" min="0" action="" id="limit" name="limit" value="${limit}" style="width: 50px;">
  <button type="submit">Buscar</button>
</form>`;
};

export const logInfoView = (user) => {
  return `<div style="font-size: 0.7rem;">
  Conectado como
  </div>
  ${user}&nbsp;<a href=""><img class="logout-icon" src="./public/images/logout.png" width="15"/></a>`;
}

export const detailView = (ad, username) => {

  return `<div class="ad-detail">
  <div class="detail-container">
  <div class="detail-content">
  ${ad.venta ? 'Se vende' : 'Se compra'}<br>
  <span style="font-size: 1.5rem;"><b>${ad.nombre}</b></span><br>
  <span class="price">${ ad.precio % 1 != 0 ? Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(ad.precio) : Intl.NumberFormat('de-DE').format(ad.precio)+' €' }</span><br>
  Etiquetas: ${getTags(ad.tags)}<br>
  Subido por:<br>
  ${ username }
  </div>
  <div class="detail-photo">
  <img src="${ad.foto}">
  </div>
  </div>
  <button style="float:right;margin: 50px;" class="delete-button hidden">Eliminar</button>`;
};

export const paginationView = (queries) => {
  const { page, limit } = queries;
  return `<form class="pagination-form">
  <label for="page">Página: </label>
  <input type="number" min="0" action="" id="page" name="page" value="${page}" style="width: 50px;">
  <label for="limit">Límite: </label>
  <input type="number" min="0" action="" id="limit" name="limit" value="${limit}" style="width: 50px;">
  <button type="submit">Buscar</button>
</form>`;
};
