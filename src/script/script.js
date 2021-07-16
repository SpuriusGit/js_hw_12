import '../css/style.scss';
import * as basicLightbox from 'basiclightbox';
import "../../node_modules/basiclightbox/dist/basicLightbox.min.css";

const refs = {
    form: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    galleryItem: document.querySelector('.gallery-item'),
    paginationList: document.querySelector('.pagination-list'),
    loadMore: document.querySelector('.load-more')
}
let keyAPI = '22461943-9f424322bef97d692efdefdf4';
let count = 1;

function fetching(){
    let url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${event.target.value}&page=${count}&per_page=12&key=${keyAPI}`;
    fetch(url)
    .then(response => response.json())
    .then(res =>{ 
        renderFullInfo(res);
        return renderList(res.hits)});
    
}
function searchImage(){
    refs.form.addEventListener('input',(event)=>{
        refs.gallery.innerHTML = '';
        fetching();
    });
}
searchImage();
function renderList(items){
    items.forEach((e)=>{
        let listItem = document.createElement('li');
        listItem.classList.add('list-item');
        listItem.innerHTML = `<img src=${e.webformatURL} alt=""/>`;
        refs.gallery.append(listItem);
    });
    renderButton();
};
function renderButton(){
        refs.loadMore.classList.add('show');
        refs.loadMore.classList.remove('hide');
}
refs.loadMore.addEventListener('click',()=>{
    count++;
    fetching();
});
function renderFullInfo(res){
    refs.gallery.addEventListener('click',(e)=>{
        if(e.target.nodeName !== 'IMG') return;
        res.hits.forEach((item)=>{
            if(e.target.src == item.webformatURL){
                let {largeImageURL,likes,views,comments,downloads} = item;
                const instance = basicLightbox.create(
                    `<div class="photo-card">
                    <img src=${largeImageURL} alt="" />
                    <div class="stats">
                      <p class="stats-item">
                        <i class="material-icons">thumb_up</i>
                        ${likes}
                      </p>
                      <p class="stats-item">
                        <i class="material-icons">visibility</i>
                        ${views}
                      </p>
                      <p class="stats-item">
                        <i class="material-icons">comment</i>
                        ${comments}
                      </p>
                      <p class="stats-item">
                        <i class="material-icons">cloud_download</i>
                        ${downloads}
                      </p>
                    </div>
                  </div>`
                )
                
                instance.show();
            }
        });
    });
}
