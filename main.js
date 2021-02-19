const url = "https://worldtimeapi.org/api/timezone/";
const paises = [];
const container = document.getElementById('container_cards');

fetch(url).then(resp => resp.json()).then(async(response) => {
    
    for (let i = 1; i<=12; i++){
        let pais = Math.floor(Math.random() * response.length);
        let respPais = response[pais];
        paises.push(respPais);
    }
     
     for (let index = 0; index < paises.length; index++) {
         const pais = paises[index];
         await loadPaisesDetalhes(pais, index);
         
     }
     
     setInterval(
        function(){ 
        contador(); 
        }, 1000);
     
        document.querySelector('.load').style.display = 'none';
})

async function loadPaisesDetalhes(pais, index){
    fetch(`${url}${pais}`).then(resp => resp.json()).then((detalhe) => {
        let localDate = new Date().toLocaleDateString('pt-BR', {timeZone: detalhe.timezone});
        let localTime = new Date().toLocaleTimeString('pt-BR', {timeZone: detalhe.timezone});

       container.innerHTML +=
      `<div class="card">
            <div class="title_card">
                <h1 class="title" id="titleTimezone${index}">${detalhe.timezone}</h1>
            </div>

            <div class="data_hora">
                <p class="paragrafoDateTime" id="pDate${index}">${localDate}</p>
                <p class="paragrafoDateTime" id="pTime${index}">${localTime}</p>
            </div>

            <div class="fuso">
                <p>Fuso Horário</p>
            </div>

        </div> `  
        
    })
    
}

function contador(){
    for (let i = 0; i < 12; i++){
        let timezoneValue = document.getElementById('titleTimezone' + i).innerText;
        let localDate = new Date().toLocaleDateString('pt-BR', {timeZone: timezoneValue});
        let localTime = new Date().toLocaleTimeString('pt-BR', {timeZone: timezoneValue});
        document.getElementById('pDate' + i).innerHTML = localDate;
        document.getElementById('pTime' + i).innerHTML = localTime;
    }
}

