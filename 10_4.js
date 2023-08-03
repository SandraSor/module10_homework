const width= document.querySelector('.width').value;
const height= document.querySelector('.height').value;
const btn_submit= document.querySelector('.btn');
const result= document.querySelector('.result');

const fetchData = () => {
  return fetch(`https://picsum.photos/${width}/${height}`)
  .then(res => return res.json())
  .then(json => return json)
  .catch(() => { console.log('error') });
}

btn.addEventListener('click', async () => {
  console.log('start');
  
  if((typeof width === 'number') && (typeof height === 'number') && (width>=100 && width<=300) && (height>=100 && height<=300)){
    const requestResult = await useRequest();
    console.log('requestResult', requestResult);
    result.innerHTML=`<div class="card">
        <img
          src="${requestResult.download_url}"
          class="card-image"
        />
        <p>${requestResult.author}</p>
      </div>`
  } else {
    result.innerHTML = `<div> Одно из чисел вне диапазона от 100 до 300 </div>`;
  }
  
  console.log('end');
});
