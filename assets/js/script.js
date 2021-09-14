$(document).ready(()=>{
  
  $('#form').submit((e)=>{
    e.preventDefault();
    if (validate($('#superHeroNumber').val())==true){
      $.ajax({
        type: 'GET',
        url: `https://superheroapi.com/api.php/1624468557751615/${$('#superHeroNumber').val()}`,
        dataType:'json',
        // contentType:'applicaton/json',
        //headers: {'Access-Control-Allow-Origin': 'https://superheroapi.com/api/', 'Accept': '*/*', 'User-Agent': 'Thunder Client (https://www.thunderclient.io)'},
        crossDomain: true,
        success: function (data){
          if (validate($('#superHeroNumber').val())==true){
            mostrarCards();
            limpiarContenido();
            cargarInfo(data);
            window.scrollTo(0,document.body.scrollHeight);
          }
        },
        error: ()=>{
          msgError()
        },
         async:true,
      })
    }
  });

});

 //RegEx
 const regex = new RegExp('^[0-9]+$');

 //Función Validar
 let validate = (data) => {
   //condition
   let condition = true;
   if (regex.test(data) == false || data == "") {
     condition = false;
   }
   return condition;
 };

 let mostrarCards =()=>{
   document.getElementById('cards').classList.remove('d-none');
 }

 let limpiarContenido=()=>{
   document.getElementById('cardTitle').innerHTML='';
   document.getElementById('image').innerHTML='';
   document.getElementById('cardContent').innerHTML=''
   document.getElementById('chartContainer').innerHTML='';
 }

let cargarInfo=(data)=>{
  $('#cardTitle').append(`SuperHero Encontrado`);
  $('#image').append(`<img src="${data.image.url}" class="img-fluid rounded-start" alt="superHeroImage">`);
  $('#cardContent').append(`<p class='fw-bold'>Nombre: ${data.name}</p>`);
  $('#cardContent').append(`<p>Conexiones: ${data.connections['group-affiliation']}</p>`);
  $('#cardContent').append(`<ul class="list-group list-group-flush"><li class="list-group-item"><i>Publicado por: </i>${data.biography.publisher}</li><li class="list-group-item"><i>Ocupación: </i>${data.work.occupation}</li><li class="list-group-item"><i>Primera Aparición: </i>${data.biography['first-appearance']}</li><li class="list-group-item"><i>Altura: </i>${data.appearance.height.join(' - ')}</li><li class="list-group-item"><i>Peso: </i>${data.appearance.weight.join(' - ')}</li><li class="list-group-item"><i>Alianzas: </i>${data.biography.aliases. join(', ')}</li></ul>`);


  //Extraer powerstats a arreglo
  let porwerStats=new Array

  for(let item in data.powerstats){
    porwerStats.push({
      label: item, y: parseFloat(data.powerstats[item])
    })
  }

  //Gráfico
   let chart = new CanvasJS.Chart("chartContainer", {

     title:{
       text: `Estadísticas de Poder para ${data.name}`               
     },
     data: [//array of dataSeries              
       { //dataSeries object

        /*** Change type "column" to "bar", "area", "line" or "pie"***/
        type: "pie",
        showInLegend: true,
        legendText: '{label}',
        indexLabel: '{label} ({y})',
        dataPoints: porwerStats
      }
      ]
    });

   chart.render();

  // $('#chartContainer').CanvasJSChart(chart);
}

let msgError=()=>{
  alert('Ingrese sólo números!')
}