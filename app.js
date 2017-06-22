var form = document.querySelector('#form'),
    losuj = document.querySelector('#losuj'),
    Nrazy = document.querySelector('#Nrazy'),
    losujNrazy = document.querySelector('#losujNrazy'),
    liczbaTrafionych = document.querySelector("#iletrafionych"),
    najWynikP = document.querySelector("#najWynik"),
    trafione = document.querySelector("#trafione");
var label, check, opis, span, wygraneLiczby, zaznaczone, wylosowane, wpis, wartosc;
var liczbaGier = 0,
    lwygranych = 0,
    najWynik = 0;


for(var i=1; i <= 49; i++){
  lab = document.createElement("label");
  check = document.createElement("input");
  opis = document.createTextNode(i);
  span = document.createElement("span");
  check.type = "checkbox";
  check.value = i;
  lab.appendChild(check);
  span.appendChild(opis);
  lab.appendChild(span);
  lab.addEventListener("click", (event) => zaznaczonoWart(event));
  form.appendChild(lab);
  if (i%7==0) {
    var b = document.createElement("br");
    form.appendChild(b);
  }
}

function zaznaczonoWart(event){
  if (policz()) {
    losuj.disabled = false;
    sprawdzIlosc();
  }else{
    losuj.disabled = true;
  }
}

function policz(){
  var selected = document.querySelectorAll('input[type="checkbox"]:checked').length;
  if(selected == 6){
    return 1;
  }else{
    return 0;
  }
}
losujNrazy.style.display = "none";
losuj.addEventListener('click', zatwierdz);
Nrazy.addEventListener('keyup', sprawdzIlosc);


function sprawdzIlosc(){
  if(Nrazy.value > 0 && Nrazy.value <= 10000 && policz()){
    losujNrazy.style.display = "block";
    losujNrazy.disabled = false;
    losujNrazy.innerHTML = "Losuj "+Nrazy.value+" razy";
  }else{
    losujNrazy.disabled = true;
    losujNrazy.style.display = "none";
  }
}

losujNrazy.addEventListener('click', losujLoop);

function losujLoop() {
  for(i = 1; i <= parseInt(Nrazy.value); i++){
    setTimeout(() => {
      zatwierdz();
    }, 100);
  }
}

function zatwierdz(){
  document.querySelector('#typy').innerHTML = '';
  var checked = document.querySelectorAll('input:checked');
  zaznaczone = [];
  for(i=0; i <= 5; i++){
    zaznaczone[i] = checked[i].value;
  }
  document.querySelector('#typy').innerHTML += zaznaczone;
  generuj();
}
function genereujLiczbe(){
  return Math.floor((Math.random() * 49) + 1);
}
function generuj(){
  wylosowane = [];
  var liczba = 0;
  for (i = 0; i <= 5; i++) {
    do {
      liczba = genereujLiczbe();
    }
    while (wylosowane.indexOf(liczba) > -1);
      wylosowane[i] = liczba;

  }

  wylosowane.sort(function(a, b){return a-b});
  wygrane();
}

function srednia(wygrana){
  liczbaGier++;
  lwygranych += wygrana;
  if(wygrana >= najWynik){
    najWynikP.innerHTML = wygrana;
    najWynik = wygrana;
  }
  document.querySelector("#srednia").innerHTML = (lwygranych/liczbaGier).toFixed(2);
  document.querySelector("#iloscGier").innerHTML = liczbaGier;
}

function wygrane(){
  liczbaTrafionych.innerHTML = '';
  wygraneLiczby = [];
  var ileWygranych = 0;
  var kule = document.querySelectorAll('.kula');
  for(var i=0; i<=5;i++){
    kule[i].classList.remove("yellow");
    kule[i].classList.remove("green");
    document.querySelector("#id_"+i).innerHTML = wylosowane[i];
    document.querySelector("#id_"+i).parentNode.className += " yellow";
    for(var j=0; j<=5; j++){
      if(wylosowane[i]==zaznaczone[j]){
        wygraneLiczby.push(wylosowane[i]);
        ileWygranych++;
        document.querySelector("#id_"+i).parentNode.classList.remove("yellow");
        document.querySelector("#id_"+i).parentNode.className += " green";
      }
    }
  }
  liczbaTrafionych.innerHTML = ileWygranych;
  srednia(ileWygranych);
}
