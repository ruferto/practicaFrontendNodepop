//import dataService from "./services/DataService.js";

function getTags (tagsArray){
  let tags = '';
  tagsArray.forEach(tag => {
    tags += `<a href="/?tags=${tag}">${tag}</a>&nbsp;`;
  });
  return tags;
}

export const adView = (ad) => {
  
  const adImage = `<img class="img-ad" src="${ ad.foto || 'http://127.0.0.1:8000//none.png'}" width="180" alt=${ad.nombre} /><br>`;
  return `
  <div class="ad-container">
  ${ (ad.venta) ? 'Se vende' : 'Se compra' }:
  <div class="ad-name"><b>${ ad.nombre }</b></div>
  <div class="img-container">
    ${adImage}
  </div>
  <div class="price">${ ad.precio % 1 != 0 ? Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(ad.precio) : Intl.NumberFormat('de-DE').format(ad.precio)+' €' }</div>
  <div class="tags">Etiquetas: &nbsp;${ getTags(ad.tags) }
  </div>
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
  </article>`;
};

export const formView = (queries, total, tagList) => {

  const { nombre, min, max, venta, tags, page, limit } = queries;
  let tagsDatalist =`<datalist id="tags-datalist">`;
  tagList.sort();
  tagList.forEach( tag => {
    tagsDatalist += `<option value="${tag}">`;
  });
  tagsDatalist += `</datalist>`;

  let htmlForm =  `<form class="search-form">
  <img src="/public/images/lupa-icon.png" width="15px" />
  <label for="nombre">Nombre: </label>
  <input type="text" action="" id="nombre" name="nombre" value="${nombre ? nombre : ''}">
  <label for="min">Mín: </label>
  <input type="number" style="width: 60px;" step="0.05" min="0" action="" id="min" name="min" value="${min ? min : ''}">
  <label for="max">Máx: </label>
  <input type="number" style="width: 60px;" step="0.05" min="0" action="" id="max" name="max" value="${max ? max : ''}">
  <select id="venta" name="venta">
    <option value="">Todos</option>
    <option value="true" ${venta ? ( venta == 'true' ? 'selected' : '') : ''}>Venta</option>
    <option value="false" ${venta ? ( venta == 'false' ? 'selected' : '') : ''}>Compra</option>
  </select>
  <label for="tag">Etiqueta: </label>
  <input id="tags" list="tags-datalist" name="tags" value="${tags ? tags : ''}">
  ${tagsDatalist}
  <input type="hidden" class="page-input" id="page" name="page">
  <label for="limit">Por página: </label>
  <select class="limit-input" id="limit" name="limit" style="width: 50px;">
  <option value=1 ${ limit == 1 ? 'selected' : '' }>1</option>
    <option value=5 ${ limit == 5 ? 'selected' : '' }>5</option>
    <option value=10 ${ limit == 10 ? 'selected' : '' }>10</option>
    <option value=20 ${ limit == 20 ? 'selected' : '' }>20</option>
    <option value=50 ${ limit == 50 ? 'selected' : '' }>50</option>
  </select>
  <button class="search-button" type="submit">Buscar</button>
</form><br><div style="text-align: center;">`;
  
  if(total>20){
    htmlForm += `<br><button class="pag-button${page ==1 ? ' current' : ''}" value=1>1</button>`;
    for(let i=1;i<total-1;i++){
      // if((i+1) > page-3 && (i+1) < page+3)
      if((i+1) > page-3 && (i-3) < page-1)
        htmlForm += `<button class="pag-button${i+1 == page ? ' current' : ''}" value=${i+1}>${i+1}</button>`;
      else{
        htmlForm += '...';
        if((i+1) < page-3){
          i=page-4;
        }else if((i-3) > page-2){
          i=total-2;
        }
      }
    }
    htmlForm += `<button class="pag-button${page == total ? ' current' : ''}" value=${total}>${total}</button>`;
  }else{
    for(let i=0;i<total;i++){
      htmlForm += `<button class="pag-button${i+1 == page ? ' current' : ''}" value=${i+1}>${i+1}</button>`;
    }
  }
  htmlForm += `</div>`;
  return htmlForm;
};

export const logInfoView = (user) => {
  return `<div style="font-size: 0.7rem;">
  Conectado como
  </div>
  ${user}&nbsp;<a href=""><img class="logout-icon" src="./public/images/logout.png" width="15"/></a>`;
};

export const detailView = (ad, username) => {

  return `<div class="ad-detail">
  <div class="detail-container">
  <div class="back-icon"><img src="/public/images/back.png" width="35" /></div>
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
  return `<form class="form-edit" action="" method="PUT">

  <div><label for="nombre"><br>Nombre</label><br>
  <input type="text" value="${ad.nombre}" name="nombre" class="ad-name" id="nombre" placeholder="Artículo" required></div>
  <div><label for="precio">Precio</label><br>

  <input type="number" value="${ad.precio}" step="0.01" min="0" name="precio" id="precio" class="ad-price" placeholder="0,00" required>
  <select class="ad-sale select-css" name="venta" id="venta">
      <option value="true" ${ad.venta ? 'selected' : ''}>Vender</option>
      <option value="false" ${!ad.venta ? 'selected' : ''}>Comprar</option>
  </select></div>
  <div><label for="tags">Tags</label><br>
  <input type="text" value="${ad.tags}" class="ad-tags" name="tags" id="tags" placeholder="Separados por comas" required></div>
  
  <div class="photo-container">
  <img class="image-selected" src="${ad.foto ? ad.foto : 'http://127.0.0.1:8000//none.png'}" width="50"/>
  <button class="change-photo">Cambiar foto</button>
  </div>
  
  <div class="change-image-input"></div>
  <input type="hidden" value="${ad.foto}" name="ad-foto" id="ad-foto" class="ad-photo">
  <input type="hidden" value="${ad.id}" name="id" id="id" class="ad-id">
  <input type="hidden" value="${ad.userId}" name="userId" id="userId" class="ad-userId">
  
  <br>
  <div><button style="margin-right: 2rem;" class="button-cancel">Cancelar</button><button class="buttonAdd">Editar</button></div>
</form>`;
};

export const registerView = () => {
  return `<form class="form-login" action="./index.html" method="GET">
  <input class="form-login-email" name="login-email" id="login-email" type="email" placeholder="email" required>
  <input class="form-login-password" name="login-password" id="login-password" type="password" pattern="[a-zA-Z0-9]+" placeholder="Contraseña" required>
  <input class="form-login-password2" name="login-password2" id="login-password2" type="password" pattern="[a-zA-Z0-9]+" placeholder="Confirma la contraseña" required>
  <span style="font-size: .6rem;padding-left: 1rem;">Solo letras y/o números</span>
  <button type="submit" class="login-button" action="./index.html">Registro</button>
  
</form>
<a class="login-link" href="/login.html">¿Ya estás registrado? Haz login</a>`;
}