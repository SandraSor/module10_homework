const wrapper=document.querySelector('.wrapper');
const page=document.querySelector('.page');
const limit=document.querySelector('.limit');
const btn= document.querySelector('.btn_req');
const result= document.querySelector('.result');

const fetchData = (page, limit) => {
  return fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`)
  .then(res => return res.json())
  .then(json => return json)
  .catch(() => { console.log('error') });
}

function showResult(apiData) {
    let cards = '';
    apiData.forEach(item => {
        const cardBlock = `
            <div class="card">
                <img class="card-image" src="${item.download_url}">
                <p>${item.author}</p>
            </div>
        `;
        cards += cardBlock;
    });

    result.innerHTML = cards;
    result.style.display = 'flex';
}

document.addEventListener("DOMContentLoaded", () => {
    storageItem = localStorage.getItem('lastResponse')
    if (storageItem) {
        showResult(JSON.parse(storageItem));
    }
});

btn.addEventListener('click', async ()=>{
  let elem = document.createElement('p');
  elem.className = "alert";
  let flag=true;
  if((page.value <1) || (page.value >10)){
    elem.innerHTML = "Номер страницы вне диапазона от 1 до 10";
    result.append(elem);
    flag=false;
  }
  if((limit.value <1) || (limit.value >10)){
    elem.innerHTML = "Лимит вне диапазона от 1 до 10";
    result.append(elem);
    flag=false;
  }
  if(((page.value <1) || (page.value >10)) && ((limit.value <1) || (limit.value >10))){
    elem.innerHTML = "Номер страницы и лимит вне диапазона от 1 до 10";
    result.append(elem);
    flag=false;
  }
  
  if(flag){
    const requestResult = await fetchData(page.value, limit.value);
    console.log('requestResult', requestResult);
    localStorage.setItem('lastResponse', JSON.stringify(requestResult));
    showResult(requestResult);
  }
})
