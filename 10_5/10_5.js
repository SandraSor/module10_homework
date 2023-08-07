const wrapper=document.querySelector('.wrapper');
const page=document.querySelector('.page');
const limit=document.querySelector('.limit');
const btn= document.querySelector('.btn_req');
const result= document.querySelector('.result');

const fetchData = () => {
  return fetch(`https://picsum.photos/v2/list?page=${page.value}&limit=${limit.value}`)
  .then(res => return res.json())
  .then(json => return json)
  .catch(() => { console.log('error') });
}

btn.addEventListener('click', ()=>{
  let div = document.createElement('div');
  div.className = "alert";
  let flag=true;
  if((page.value <1) || (page.value >10)){
    div.innerHTML = "Номер страницы вне диапазона от 1 до 10";
    flag=false;
  }
  if((limit.value <1) || (limit.value >10)){
    div.innerHTML = "Лимит вне диапазона от 1 до 10";
    flag=false;
  }
  if(((page.value <1) || (page.value >10)) && ((limit.value <1) || (limit.value >10))){
    div.innerHTML = "Номер страницы и лимит вне диапазона от 1 до 10";
    flag=false;
  }
  wrapper.after(div);
  
  if(flag){
    const requestResult = await fetchData();
    console.log('requestResult', requestResult);
    let cards = '';
  // console.log('start cards', cards);
  
  requestResult.forEach(item => {
    const cardBlock = `
      <div class="card">
        <img
          src="${item.download_url}"
          class="card-image"
        />
        <p>${item.author}</p>
      </div>
    `;
    cards = cards + cardBlock;
  });
  
  // console.log('end cards', cards);
    
  result.innerHTML = cards;
  }
})
