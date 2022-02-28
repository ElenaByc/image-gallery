const imgContainer = document.querySelector('.image-container');
const searchInput = document.querySelector('.search-term');
const searchButton = document.querySelector('.search-button');
const clearButton = document.querySelector('.clear-button');
const galeryHeader = document.querySelector('.galery-header');

const APIurl = 'https://api.unsplash.com/search/photos?';
let searchTerm = 'hummingbird';
let query = 'query=' + searchTerm + '&per_page=30&orientation=landscape';
const key = '&client_id=wmi64JCkUCv14gIPMXevK1__Ao0yfMtcbeie20iKEVI';
let requestUrl = APIurl + query + key;

async function getData(requestUrl) {
    const res = await fetch(requestUrl);
    const data = await res.json();
    showData(data);
}

function showData(data) {
    const len = data.results.length;
    if (len === 0) {
        galeryHeader.textContent = 'Oops! Nothing found';
    } else {
        galeryHeader.textContent = 'Search result for ' + searchTerm;
    }
    for (let i = 0; i < len; i++) {
        createAndAddImg(data.results[i].urls.regular)
    }
}

function createAndAddImg(url) {
    const img = document.createElement('div');
    img.classList.add('gallery-img')
    img.style.backgroundImage = 'url(' + url+ ')';
    imgContainer.append(img);
}

getData(requestUrl);


searchButton.addEventListener('click', changeSearchTerm);
searchInput.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      searchButton.click();
    }
});

clearButton.addEventListener('click', clearSearchTerm);

function changeSearchTerm() {
    searchTerm = searchInput.value;
    query = 'query=' + searchTerm + '&per_page=30&orientation=landscape';
    requestUrl = APIurl + query + key;
    clearImageGalery();
    getData(requestUrl);
}

function clearSearchTerm() {
    searchInput.value = '';
    // searchInput.ariaPlaceholder = 'Search...';
}

function clearImageGalery() {
    imgContainer.innerHTML = '';
}



/*------ Self Estimation ------*/

console.log(`
1. Вёрстка +10
   ° на странице есть несколько фото и строка поиска +5 ✔
   ° в футере приложения есть ссылка на гитхаб автора приложения, 
     год создания приложения, логотип курса со ссылкой на курс +5 ✔

2. При загрузке приложения на странице отображаются 
   полученные от API изображения +10  ✔
  
3. Если в поле поиска ввести слово и отправить поисковый запрос, 
   на странице отобразятся изображения соответствующей тематики, 
   если такие данные предоставляет API +10  ✔ 

4. Поиск +30
   ° при открытии приложения курсор находится в поле ввода +5  ✔
   ° есть placeholder +5  ✔
   ° автозаполнение поля ввода отключено 
     (нет выпадающего списка с предыдущими запросами) +5  ✔
   ° поисковый запрос можно отправить нажатием клавиши Enter +5  ✔
   ° после отправки поискового запроса и отображения результатов поиска, 
     поисковый запрос продолжает отображаться в поле ввода +5  ✔
   ° в поле ввода есть крестик при клике по которому поисковый запрос 
     из поля ввода удаляется и отображается placeholder +5  ✔
     
_____________________
    Итого: 60 баллов
`);
