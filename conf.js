var considerarNumeroDeParada = false;
var availability;
var mttr;
var mtbfInDays;
var tempoDeParada;
var tempoParadaInHours;
var tempoReparoInHours;
var numeroParada;

//Criando botão para pegar o form -3

try {
    const form = document.getElementById('form-3');  
    form.addEventListener('submit', queryATagToConf);   

    
} catch (error) {
    console.log('Erro form');
}

async function queryATagToConf(event){
    
    const disponibilidadeDiv = document.getElementById('availabilityBackEnd');
    const availabilityData = document.getElementById('availabilityData'); //availability
    const MTTRData = document.getElementById('MTTRData'); //mttr
    const MTBFData = document.getElementById('MTBFData'); //mtbfInDays
    const numberOfEventsData = document.getElementById('numberOfEventsData'); //numero de parada
    const tempoParadaData = document.getElementById('tempoParadaData'); //tempoParadaInHours;
    const tempoReparoData = document.getElementById('tempoReparoData'); //tempoReparoInHours
    

    event.preventDefault();
    const form = document.getElementById('form-3');
    var tag = form.selectedTag.value;
    console.log("valor da tag:", tag);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {

        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    }

    const queryTag = await fetch(`https://maintenanceappbr.herokuapp.com/api/event/tag/${tag}`, requestOptions)
        .then(response => response.json());
        
    var numeroParada = queryTag.length;
    console.log("numero de parada:", numeroParada); 
    numberOfEventsData.textContent = numeroParada;


    function findStopTimeInHour(numeroParada){

         var timeInMinutes = [];
        for (var i = 0; i < numeroParada; i++){
            tempoDeParada = queryTag[i]["tempoParada"];    
            timeInMinutes.push(parseInt(tempoDeParada));
                    
        }
        var minutes = timeInMinutes.reduce((a,b)=>a+b, 0);
        tempoParadaInHours = minutes/60;
        tempoParadaData.textContent = tempoParadaInHours.toFixed(2);              
        return tempoParadaInHours;

    }
    
    function findRepairTimeInHour(numeroParada){

        var timeInMinutes = [];
       for (var i = 0; i < numeroParada; i++){
           var tempoDeReparo = queryTag[i]["tempoReparo"];    
           timeInMinutes.push(parseInt(tempoDeReparo));
                   
       }
       var minutes = timeInMinutes.reduce((a,b)=>a+b, 0);
       tempoReparoInHours = minutes/60;  
       tempoReparoData.textContent = tempoReparoInHours.toFixed(2);     
       return tempoReparoInHours;

   }
 

   function calcDiffDatasInDays(numeroParada){

     const datas = [];
     const datasForAvg = [];
     

        for (var i = 0; i < numeroParada; i++){

            var dataOcorrencia = queryTag[i]["data"];
            let parts = dataOcorrencia.split('-');             
            let date = new Date(parts[0], parts[1] - 1, parts[2]);            
            datas.push(date);
            console.log(datas);

            if ( i > 0) {

                var diffInMiliSecForAvg = datas[i] - datas[i - 1];
                var diffInDaysForAvg = diffInMiliSecForAvg / (1000 * 60 * 60 * 24);
                var modulo = Math.abs(diffInDaysForAvg);
                datasForAvg.push(modulo);
                console.log("resultado é para media: ", modulo);
                if (modulo == 0) {
                    
                    considerarNumeroDeParada = true;
                    console.log(considerarNumeroDeParada);
                    

                }
                console.log(datasForAvg);                
            }
        } 
            return datasForAvg;
   }







    function calcMTBFinDays () {

        console.log(considerarNumeroDeParada); 

        
        if (!considerarNumeroDeParada) {

          var datas = calcDiffDatasInDays(numeroParada);                            
          var somaModulos =  datas.reduce((a,b) => a+b, 0);
          console.log("somaModulos é: ", somaModulos);
          mtbfInDays = somaModulos/numeroParada;
          console.log("MTBF em dias é: ", mtbfInDays);
          MTBFData.textContent = mtbfInDays.toFixed(2);       
                 
            

        } else {  

          var mtbfInDays = numeroParada/numeroParada;            
          MTBFData.textContent = mtbfInDays.toFixed(2);
          console.log("MTBF em dias é: ", mtbfInDays);

        }

        console.log(mtbfInDays);
        return mtbfInDays;   
}
    function calcMTTR(){

        var tempoDeReparoHora = findRepairTimeInHour(numeroParada);
        mttr = tempoDeReparoHora/numeroParada;
        console.log('mttr é', mttr);
        MTTRData.textContent = mttr.toFixed(2);
        return mttr;
    }

    function calcAvailability(){

        var MTBFa = calcMTBFinDays();
        console.log("MTBFa", MTBFa);
        var MTTRa = calcMTTR();
        console.log("MTTRa", MTTRa);
        var MTBFhora = MTBFa * 24;
        console.log("MTBFHR", MTBFhora);
        availability = (MTBFhora/(MTBFhora+MTTRa))*100;        
        console.log('Disponibilidade é: ', availability);
        availabilityData.textContent = availability.toFixed(3);
    }

    

    findStopTimeInHour(numeroParada);
    calcAvailability();
    console.log(queryTag);


    var variableSelector = document.getElementById('variable-selector');
    variableSelector.addEventListener("change", updateChart);
    
    var variableNames = ['Ocorrências', 'Tempo Parada', 'Tempo Reparo', 'Disponibilidade', 'MTTR', 'MTBF'];
    var variableDatas = [
        { id: 'ocorrencias', label: 'Ocorrências', data: numeroParada },
        { id: 'tempoParada', label: 'Tempo Parada', data: tempoParadaInHours },
        { id: 'tempoReparo', label: 'Tempo Reparo', data: tempoReparoInHours },
        { id: 'disponibilidade', label: 'Disponibilidade', data: availability },
        { id: 'mttr', label: 'MTTR', data: mttr },
        { id: 'mtbf', label: 'MTBF', data: mtbfInDays }
      ];
      
    
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: variableDatas.map(y => y.label),
        datasets: [{
          data: variableDatas.map(x => x.data),
          backgroundColor: [
            '#a6ff96',
            '#C9BCE1',
            '#a6ff96',
            '#C9BCE1',
            '#a6ff96',
            '#C9BCE1'
          ],
          borderColor: [
            '#a6ff96',
            '#C9BCE1',
            '#a6ff96',
            '#C9BCE1',
            '#a6ff96',
            '#C9BCE1'
          ],
          borderWidth: 1
        }]
      },
      options: {
        legend: {
          display: false
        },
        tooltip: {
          mode: 'index',
          intersect: true
        },
        // Define as escalas do gráfico
        scales: {
            yAxes: [{
            ticks: {
                beginAtZero: true,
                min: 0, // define o valor mínimo como 0
                max: 100,
            }
            }]
  }
  
          
      }
    });
       
      
    function updateChart() {
        var selectedVariableIndex = variableSelector.selectedIndex;
        var selectedVariable = variableDatas[selectedVariableIndex];
      
        // Verifica se o objeto selecionado existe
        if (selectedVariable) {
          // Define os novos dados do gráfico
          myChart.data.datasets[0].data = [selectedVariable.data];
          // Define a nova label do gráfico
          myChart.data.labels = [selectedVariable.label];
          //myChart.scales.yAxes.
          // Atualiza o gráfico
          myChart.update();
        }
      }
      


}

