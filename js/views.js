//import dataService from "./services/DataService.js";

function getTags (tagsArray){
  let tags = '';
  tagsArray.forEach(tag => {
    tags += `<a href="/?tags=${tag}">${tag}</a>&nbsp;`;
  });
  return tags;
}

export const adView = (ad) => {
  
  const adImage = `<img class="img-ad" src="${ ad.foto || 'http://127.0.0.1:8000//none.png'}" width="180" alt=${ad.foto } /><br>`;
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
  const { nombre, precio, venta, tags, page, limit } = queries;
  return `<form class="search-form">
  <img src="/public/images/lupa-icon.png" width="15px" />
  <label for="nombre">Nombre: </label>
  <input type="text" action="" id="nombre" name="nombre" value="${nombre ? nombre : ''}">
  <label for="precio">Precio: </label>
  <input type="number" style="width: 60px;" step="0.05" min="0" action="" id="precio" name="precio" value="${precio ? precio : ''}">
  <select id="venta" name="venta">
    <option value="">Todos</option>
    <option value="true" ${venta ? ( venta == 'true' ? 'selected' : '') : ''}>Venta</option>
    <option value="false" ${venta ? ( venta == 'false' ? 'selected' : '') : ''}>Compra</option>
  </select>
  <label for="tag">Etiqueta: </label>
  <input id="tags" name="tags" value="${tags ? tags : ''}">
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
  <span class="name-label"><b>${ad.nombre}</b></span><br>
  <span class="price">${ ad.precio % 1 != 0 ? Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(ad.precio) : Intl.NumberFormat('de-DE').format(ad.precio)+' €' }</span><br>
  Etiquetas: ${getTags(ad.tags)}<br>
  Subido por 
  ${ username }
  <div class="button-container">
  <div><button class="edit-button hidden">Editar</button></div>
  <div><button class="delete-button hidden">Eliminar</button></div>
  </div>
  </div>
  <div class="detail-photo" style="position: relative;top: 0;">
  <img src="${ad.foto || 'http://127.0.0.1:8000//none.png'}">
  </div>
  
  </div>`;
  
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

export const editFormView = (ad) => {
  return `<form action="" method="PUT">

  <div class="first"><label for="nombre"><br>Nombre</label></div>
  <input type="text" value="${ad.nombre}" name="nombre" class="ad-name" id="nombre" placeholder="Artículo" required>
  <label for="precio">Precio</label>

  <input type="number" value="${ad.precio}" step="0.05" min="0" name="precio" id="precio" class="ad-price" placeholder="0,00" required>
  <select class="ad-sale select-css" name="venta" id="venta">
      <option value="true" ${ad.venta ? 'selected' : ''}>Vender</option>
      <option value="false" ${!ad.venta ? 'selected' : ''}>Comprar</option>
  </select>

  <input type="text" value="${ad.foto ? ad.foto : 'http://127.0.0.1:8000//none.png'}" name="ad-foto" id="ad-foto" class="ad-photo">
  <input type="hidden" value="${ad.id}" name="id" id="id" class="ad-id">
  <input type="hidden" value="${ad.userId}" name="userId" id="userId" class="ad-userId">
  <label for="tags">Tags</label>
  <input type="text" value="${ad.tags}" class="ad-tags" name="tags" id="tags" placeholder="Separados por comas" required>
  <!-- <input type="file" class="ad-photo" name="foto" id="foto" accept="image/*">  -->
  <br>
  <button type="submit" class="buttonAdd">Editar</button>
</form>`;
};