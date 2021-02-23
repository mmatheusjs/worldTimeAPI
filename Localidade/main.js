let url = 'https://worldtimeapi.org/api/timezone/'
var header = ('Access-Control-Allow-Origin: *'); 


document.getElementById('continente').addEventListener('change', function() {
    
    let $regiao = document.getElementById('regiao');
    $regiao.innerHTML += `<option value="" selected hidden disable>Carregando..</option>`


    const selectContValue = document.getElementById('continente').value;
   
       fetch(`${url}${selectContValue}`).then(resp => resp.json()).then((response) => {
        $regiao.innerHTML = `<option value="" selected hidden disable>Selecione uma regiao..</option>`
        
        let paises = [];
        for (let i = 0; i < response.length; i++) {
            const pais = response[i];
            
            //A condition includes verifica se a resposta da requisição já está dentro do array
            if (paises.includes(pais) === false) {
               paises.push(pais);
            }
        }
        for (let i = 0; i < paises.length; i++) {
            $regiao.innerHTML += "<option value=" + paises[i] + ">" + paises[i] + "</option>"
        }

        
    })
})

document.getElementById('regiao').addEventListener("change", function() {

    
    loadPaisDetalhes();    

    //Set um intervalo de 1s para atualizar a função contador, fazendo os o horário atualizar automaticamente
    setInterval(
        function(){ 
        contador(); 
        }, 1000);
    
            
})

        function loadPaisDetalhes() {
            
            const selectRegValue = document.getElementById('regiao').value;

        fetch(`${url}/${selectRegValue}`).then(resp => resp.json()).then((response) => {
            
            let localDate = new Date().toLocaleDateString('pt-BR', {timeZone: response.timezone});
            let localTime = new Date().toLocaleTimeString('pt-BR', {timeZone: response.timezone});         
            const containerDetalhes = document.getElementById('containerDetalhes');
    
            containerDetalhes.innerHTML = `
              
            <div class="detalhes">
              <div class="title_card">
                    <h1 class="title" id="titleTimezone">${response.timezone}</h1>
              </div>
    
              <div class="data_hora">
                    <p class="paragrafoDateTime" id="pDate">${localDate}</p>
                    <p class="paragrafoDateTime" id="pTime">${localTime}</p>
              </div>
    
              <div class="fuso">
                    <p>UTC ${response.utc_offset}</p>
              </div>
            </div>`

              
        })
       
}  
    
//Converte o Date para o formato pt-BR e atribui a variáveis para poder imprimir a data e o horário separados
    function contador(){
       
            let timezoneValue = document.getElementById('titleTimezone').innerText;
            let localDate = new Date().toLocaleDateString('pt-BR', {timeZone: timezoneValue});
            let localTime = new Date().toLocaleTimeString('pt-BR', {timeZone: timezoneValue});
            document.getElementById('pDate').innerHTML = localDate;
            document.getElementById('pTime').innerHTML = localTime;
        
    }