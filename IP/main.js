var header = ('Access-Control-Allow-Origin: *'); 
let url = ('https://worldtimeapi.org/api/ip');

fetch (url).then(resposta => resposta.json()).then((ip) => {

    let localDate = new Date().toLocaleDateString('pt-BR', {timeZone: ip.timezone});
    let localTime = new Date().toLocaleTimeString('pt-BR', {timeZone: ip.timezone}); 

    const cardIP = document.getElementById('ip');

    cardIP.innerHTML = `<div class="title_card">
    <h1 class="title" id="titleTimezone">${ip.timezone}</h1>
</div>

<div class="data_hora">
    <p class="paragrafoDateTime" id="pDate">${localDate}</p>
    <p class="paragrafoDateTime" id="pTime">${localTime}</p>
</div>

<div class="fuso">
    <p>UTC ${ip.utc_offset}</p>
</div>

<div class="meuIp">
    <p class="paragrafoMeuIp">Meu ip: ${ip.client_ip}</p>
</div>`

    setInterval(
        function(){ 
        contador(); 
        }, 1000);

    document.querySelector('.load').style.display = 'none';
})

//Converte o Date para o formato pt-BR e atribui a variáveis para poder imprimir a data e o horário separados
function contador(){
       
    let timezoneValue = document.getElementById('titleTimezone').innerText;
    let localDate = new Date().toLocaleDateString('pt-BR', {timeZone: timezoneValue});
    let localTime = new Date().toLocaleTimeString('pt-BR', {timeZone: timezoneValue});
    document.getElementById('pDate').innerHTML = localDate;
    document.getElementById('pTime').innerHTML = localTime;

}