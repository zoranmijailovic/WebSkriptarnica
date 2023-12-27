// varijabla da ostavlja vidljivost
let korpaVisible = false;

if(document.readyState=='loading'){
  document.addEventListener('DOMContentLoaded',ready)
}else {
  ready();
}

function ready(){
  // dodajem na ove obrisi buttone funckiju
  let obrisiDugme = document.getElementsByClassName('btn-eliminar');
  for(i = 0; i < obrisiDugme.length; i++){
    let baton = obrisiDugme[i];
    baton.addEventListener('click', obrisiItem);
  }

  // dodajem funckionalnost dugmetu za dodavanje kolicine

  let dodajKolicinu = document.getElementsByClassName('saberi-iznos');
  for(let i=0; i < dodajKolicinu.length; i++){
    let button = dodajKolicinu[i];
    button.addEventListener('click', kolicinuDodaj);
    

  }

   // dodajem funckionalnost dugmetu za oduzimanje kolicine

   let oduzmiKolicinu = document.getElementsByClassName('oduzmi-iznos');
   for(let i=0; i < oduzmiKolicinu.length; i++){
     let button = oduzmiKolicinu[i];
     button.addEventListener('click', kolicinuOduzmi);
 
   }

   //dodajem funckiju dugmadi dodaj u korpu
   let dugmadDodajUkorpu = document.getElementsByClassName('item-button');
   for(let i=0; i<dugmadDodajUkorpu.length; i++){
    let button = dugmadDodajUkorpu[i];
    button.addEventListener('click', dodajKliknuto);
   }
   // dodajemo funckionalnost dugmetu za placanje
   document.getElementsByClassName('btn-plati')[0].addEventListener('click',platiKlik)
}

// da izbrisemo izabran item iz korpe

function obrisiItem(event){
  let batonClicked = event.target;
  batonClicked.parentElement.parentElement.remove();

  //azuiraram ukupno kada obrisemo neki item

  azuiranjeTotala();

  // sledeca funkcija proverava da li ima artikala u korpi nakon sto je obrisana
  // a ako nema sakricemo korpu
  sakriKorpu();
}

function azuiranjeTotala(){
  let korpaKontejner = document.getElementsByClassName('korpa')[0];
  let korpaItems = korpaKontejner.getElementsByClassName('korpa-item');
  let total = 0;

  for(let i = 0; i < korpaItems.length; i++){
    let item = korpaItems[i];
    let cenaElement = item.getElementsByClassName('korpa-item-cena')[0];
    

    //uklanjamo dolar 
    let cena = parseFloat(cenaElement.innerText.replace('$',''));
    

    let iznosItem = item.getElementsByClassName('korpa-item-iznos')[0];
    let iznos = iznosItem.value;
    

    total = total + (cena * iznos);

  }
  total = Math.round(total*100)/100;
  document.getElementsByClassName('kopra-cena-total')[0].innerText = 'rsd ' + total;
}

function sakriKorpu(){
  let korpaItems =  document.getElementsByClassName('korpa-items')[0];
  if(korpaItems.childElementCount==0){
    let korpa = document.getElementsByClassName('korpa')[0];
    korpa.style.marginRight = '-100%';
    korpa.style.opacity = '0';
    korpaVisible = false;

    // MAKS KONTEJNER ELEMENATA
    let items = document.getElementsByClassName('container-items')[0];
    items.style.width = '100%';
  }
}

// sada za jedan dodajemo kolicinu na izabrani element
function kolicinuDodaj(event){
  let batonClicked = event.target;
  let selector = batonClicked.parentElement;
  let trenutniIznos = selector.getElementsByClassName('korpa-item-iznos')[0].value;
  
  trenutniIznos++;
  selector.getElementsByClassName('korpa-item-iznos')[0].value = trenutniIznos;

  // sad cemo i total da namestimo

  azuiranjeTotala();
}

function kolicinuOduzmi(event){
  let batonClicked = event.target;
  let selector = batonClicked.parentElement;
  let trenutniIznos = selector.getElementsByClassName('korpa-item-iznos')[0].value;
  
  trenutniIznos--;

  if(trenutniIznos >= 1){
    selector.getElementsByClassName('korpa-item-iznos')[0].value = trenutniIznos;
    azuiranjeTotala();
  }
  
}
function dodajKliknuto(event){
  let button = event.target;
  let item = button.parentElement;
  let naslov = item.getElementsByClassName('naslov-itema')[0].innerText;
  
  let cena = item.getElementsByClassName('cena-itema')[0].innerText;
  let slikaSrc = item.getElementsByClassName('img-item')[0].src;
 
  // sad funkcija da dodaje elemente u korpu
  dodajIteme(naslov, cena, slikaSrc);
  // cinimo korpu vidljivom kada prvi put dodamo
  vidljivaKorpa();
}

function dodajIteme(naslov, cena, slikaSrc){
  let item = document.createElement('div');
  item.classList.add = 'item';
  let korpaItems = document.getElementsByClassName('korpa-items')[0];

  let brojItemaKorpi = korpaItems.getElementsByClassName('korpa-item-naslov');
  for(let i=0; i<brojItemaKorpi.length;i++){
    if(brojItemaKorpi[i].innerText==naslov){
     alert('ovaj item je vec u korpi');
     return;
  }
  }
  let itemKorpaSadrzaj = `
  <div class="korpa-item">
    <img src="${slikaSrc}" alt="" width="80px">
    <div class="korpa-item-detalji">
        <span class="korpa-item-naslov">${naslov}</span>
        <div class="selector-iznosa">
            <i class="fa-solid fa-minus oduzmi-iznos"></i>
            <input type="text" value="0" class="korpa-item-iznos" disabled>
            <i class="fa-solid fa-plus saberi-iznos"></i>
        </div>
        <span class="korpa-item-cena">${cena}</span>
    </div>
    <span class="btn-eliminar">
        <i class="fa-solid fa-trash"></i>
    </span>
  </div>
  `
  item.innerHTML = itemKorpaSadrzaj;
  korpaItems.append(item);

  //dodajemo funckiju ukloni iz korpe
  item.getElementsByClassName('btn-eliminar')[0].addEventListener('click',obrisiItem);
  //dodajemo funkciju za dodavanje
  let dodajKolicinu = item.getElementsByClassName('saberi-iznos')[0];
  dodajKolicinu.addEventListener('click', kolicinuDodaj);

  //dodajemo funkciju za oduzimanjer
  let oduzmiKolicinu = item.getElementsByClassName('oduzmi-iznos')[0];
  oduzmiKolicinu.addEventListener('click', kolicinuOduzmi);
}
function platiKlik(event){
  alert('Hvala vam na kupovini nasih proizvoda!');
  // sada sklanjamo elemnte iz korpe
  let korpaItems = document.getElementsByClassName('korpa-items')[0];
  while(korpaItems.hasChildNodes()){
    korpaItems.removeChild(korpaItems.firstChild);
  }
  azuiranjeTotala();
  //funkcija da sakrije korpu
  sakriKorpu();
}
function vidljivaKorpa(){
  korpaVisible = true;
  let korpa = document.getElementsByClassName('korpa')[0];
  korpa.style.marginRight = '0';
  korpa.style.opacity = '1';

  let items = document.getElementsByClassName('container-items')[0];
  items.style.width = '60%';
}