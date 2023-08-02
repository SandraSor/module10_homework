const input_number=document.querySelector('.input_number');
const btn_send=document.querySelector('.btn_send');
const resultNode = document.querySelector('.j-result');

function useRequest(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  
  xhr.onload = function() {
    if (xhr.status != 200) {
      console.log('Статус ответа: ', xhr.status);
    } else {
      const result = JSON.parse(xhr.response);
      if (callback) {
        callback(result);
      }
    }
  };
  
  xhr.onerror = function() {
    console.log('Ошибка! Статус ответа: ', xhr.status);
  };
  
  xhr.send();
};

function displayResult(apiData) {
  let cards = '';
  // console.log('start cards', cards);
  
  apiData.forEach(item => {
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
    
  resultNode.innerHTML = cards;
}

btn_send.addEventListener('click', ()=>{
  if(input_number.value>0 && input_number.value<=10){
    useRequest(`https://picsum.photos/v2/list?limit=${input_number.value}`, displayResult);
  }else{
    console.log('Число вне диапазона 1-10');
  }
})
