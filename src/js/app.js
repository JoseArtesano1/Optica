 
// Ejecutar hasta que se haya cargado el DOM
window.addEventListener('load', function() {
 
   //document.getElementById("duracion").disabled = true;
   controlHora();
   cambioFechas();
   seleccion();
   seleccionServFecha();
  
   
});


let arrayCarrusel=['./build/img/monturas.jpg', './build/img/monturas2.jpg',
'./build/img/test.jpg', './build/img/lente.jpg'];

const img=document.getElementById('img');
let i=0;

const showImg=()=>{
    img.src=arrayCarrusel[i];
    i=(i<arrayCarrusel.length-1)? i+1:0;
}

const interval=()=>{
    setInterval(showImg,3000);
}

(function (){

    var map = L.map('mapa').setView([42.343665, -3.693928], 18);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    L.marker([42.343665, -3.693928]).addTo(map)
        .bindPopup('Optica Jose Antonio.<br> Servicio Personal.')
        .openPopup();

}());




function controlHora(){
    const inputHora = document.querySelector('#hora');
    const inputFecha=document.querySelector('#fecha');
    inputHora.addEventListener('input', function(e){
      if(!inputFecha.value){
        mostrarAlerta('Primero fecha', 'error', inputHora,'.formulario' );
        setTimeout(() => {
        }, 2000);
      }
    });
 }

  

function controlHorario(){

   const  inputHora = document.querySelector('#hora');
  const inputFecha = document.querySelector('#fecha');
   const dia = new Date(inputFecha.value).getDay();

    let horaValor=inputHora.value;
     let hora=horaValor.split(':');
     
    if(dia===6){  //sabados
     
      if((hora[0] < 09 || hora[0] > 13)) {   //horario solo de mañana
          mostrarAlerta('Hora no válida', 'error', inputHora,'.formulario' );
           setTimeout(() => {
                       inputHora.value=''; //sustituir
           
          }, 2000); 
       
      }
    } else{ //resto de dias
      
       if((hora[0] < 09 || hora[0] > 13) && (hora[0] < 17 || hora[0] > 19)  ) {  //horario mañana y tarde
           mostrarAlerta('Hora no válida', 'error', inputHora,'.formulario' );
           setTimeout(() => {
              inputHora.value='';
           }, 2000);
        
       } 
    }

}


 function cambioFechas(){
    const inputFecha = document.querySelector('#fecha');
    const dia = new Date(inputFecha.value).getDay(); // getUTCDay nos retorna el día de la semana de 0 a 6 siendo 0 domingo
     
        switch (dia){
           case 0: 
                   mostrarAlerta( 'Domingos no permitidos', 'error', inputFecha,'.formulario');
                   inputHora.value='';
          break;
 
          case 1:
          break;
 
          case 2:
          break;
 
          case 3:
          break;
 
          case 4:
          break;
 
          case 5:
          break;
 
          case 6:
          break;
          
          default:
            mostrarAlerta( 'Seleccione fecha de nuevo', 'error', inputFecha,'.formulario');
             inputHora.value='';
             break;
        }
          
} 



function mostrarAlerta( mensaje, tipo = null, elemento = null, elemento2=null ) {

    // Si la alerta existe no crear una nueva
    const alertaPrevia = document.querySelector('.alerta');
    if(alertaPrevia) {
        return;
    }

    const alerta = document.createElement('DIV');
    alerta.textContent = mensaje;
    alerta.classList.add('alerta');

    if(tipo === 'error') {
        alerta.classList.add('error')
    } else {
        alerta.classList.add('exito');
    }

    const formulario = document.querySelector(elemento2);
    formulario.appendChild(alerta);

    setTimeout( () => {
        alerta.remove();
        if( elemento ) {
            elemento.value = '';
            
        }
    }, 2000);
}


function convertDateFormat(fecha) {
    const options = {year: 'numeric', month: '2-digit', day: '2-digit' };
    const info = new Date(fecha).toLocaleDateString("es-MX", options);
    return info;
  }


function generar_Informacion(texto, texto2){

    const seccion1=document.querySelector('#origenTabla');
         const divMensaje= document.createElement('DIV');
         divMensaje.classList.add('informacion');
         const parrafo1=  document.createElement('P');
         const parrafo2=  document.createElement('P');
         parrafo1.innerHTML=texto;
         parrafo2.innerHTML=texto2;
         divMensaje.appendChild(parrafo1);
         divMensaje.appendChild(parrafo2);
         seccion1.appendChild(divMensaje);

}


 async function generar_Tabla(valorDia,servicio){
   
  try { 
      //  const url = 'http://localhost:3000/citasFecha.php';
       const url = '/citasFechaaXz1Ha';
        
        const resultado = await fetch(url);
    
        const db1 = await resultado.json();
       
       let filtraServicio=db1.filter(function(cita){
           return cita.idServicio==servicio;
         }); 
     
        let filtrado= filtraServicio.filter(function(cita){
           return cita.fechas===valorDia;
        });
       
         existeTabla('.informacion', 'informacion');
    
        if (filtrado.length!=0){
           const seccion=document.querySelector('#origenTabla');
            let divSegundo;
            let lineah3;      
          //creamos h3
            lineah3=document.createElement("h3");
            lineah3.textContent="Citas Reservadas";
         // Crea un elemento <table> y un elemento <tbody>
  
           divSegundo=document.createElement("DIV");
           divSegundo.classList.add('tablas');
           divSegundo.appendChild(lineah3);
           const tabla = document.createElement("table");
           tabla.classList.add('ConsultaTabla');
           tabla.classList.add('tablasConf');

          const tblHead= document.createElement("thead");
          const hileraH=document.createElement("tr");
          const celdaH1 = document.createElement("td");
          const textoCeldaH1 = document.createTextNode("Servicio");
          celdaH1.appendChild(textoCeldaH1);
          hileraH.appendChild(celdaH1);

          const celdaH4=document.createElement("td");
          const textoCeldaH4 =document.createTextNode("Fecha");
          celdaH4.appendChild(textoCeldaH4);
          hileraH.appendChild(celdaH4);

          const celdaH2 = document.createElement("td");
          const textoCeldaH2 = document.createTextNode("Hora Inicio");
          celdaH2.appendChild(textoCeldaH2);
          hileraH.appendChild(celdaH2); 

          const celdaH3 = document.createElement("td");
          const textoCeldaH3 = document.createTextNode("Hora Final");
          celdaH3.appendChild(textoCeldaH3);
          hileraH.appendChild(celdaH3);
       
          const tblBody = document.createElement("tbody");
 
         // Crea las celdas
         filtrado.forEach(citado => {
       
           const { id, fechas, inicio, fin, servicio } = citado;
           let fechaConvertida=convertDateFormat(fechas);
           // Crea las hileras o filas de la tabla
           const hilera = document.createElement("tr");
      
           // Crea un elemento <td> y un nodo de texto, haz que el nodo de
           // texto sea el contenido de <td>, ubica el elemento <td> al final
           // de la hilera de la tabla
           const celda1 = document.createElement("td");
           const imagenCelda1 = document.createElement("img");
      
           imagenCelda1.classList.add('imagen-tabla');
           imagenCelda1.src="/imagenes/"+servicio;
           celda1.appendChild(imagenCelda1);
           hilera.appendChild(celda1);

           const celda4=document.createElement("td");
           const textoCelda4=document.createTextNode(fechaConvertida);
           celda4.appendChild(textoCelda4);
           hilera.appendChild(celda4);

           const celda2 = document.createElement("td");
           const textoCelda2 = document.createTextNode(inicio);
           celda2.appendChild(textoCelda2);
           hilera.appendChild(celda2);

           const celda3 = document.createElement("td");
           const textoCelda3 = document.createTextNode(fin);
           celda3.appendChild(textoCelda3);
           hilera.appendChild(celda3);
  
          // agrega la hilera al final de la tabla (al final del elemento tblbody)
          tblBody.appendChild(hilera);
      });

          tblHead.appendChild(hileraH);
          tabla.appendChild(tblHead);
          tabla.appendChild(tblBody);
          divSegundo.appendChild(tabla);
         
          seccion.appendChild(divSegundo);
          tabla.setAttribute("border", "2");

      } else{
               
        let fechaSeleccionada=convertDateFormat(valorDia);
        generar_Informacion(' Horario laboral 9-14 ó 17-20 y Sábados por la mañana ',
        " En esta fecha: " + fechaSeleccionada + " tiene todo el horario disponible.");
        
      }
   }catch (error) {
    console.log(error)
   }

 } 


//borrado de tablas
function existeTabla(identificador, identificador1){
  let div2=  document.querySelector(identificador)
  if(div2){
      div2.remove();
      div2.classList.remove(identificador1);
    }
}



async function generar_Tabla2(serv){
    try { 
     
      const miTabla=document.querySelector('#origenTabla1');
      const tableBody=  document.createElement("tbody");
      tableBody.classList.add('tabla1');

       const url = '/servidor';
       const resultado = await fetch(url);
      
       const db2 = await resultado.json();   
        
        let filtrado1= db2.filter(function(cita){
        return cita.idservicio===serv;
       });
                       
             if (filtrado1.length!=0){
      
                filtrado1.forEach(cita=>{
                    
                    const { id, nombre, telefono, correo, fechas, inicio, fin, servicio, denominacion } = cita;
                     let valor=convertDateFormat(fechas);
                    let Id = `<td>${id}</td>`;
                    let Nombre = `<td>${nombre}</td>`;
                    let Movil = `<td>${telefono}</td>`;
                    let Email=`<td>${correo}</td>`;
                    let Servicio = `<td><img src="/imagenes/${servicio}" class="imagen-tabla">${denominacion}</td>`;
                    let Fecha = `<td>${valor}</td>`;
                    let Inicio = `<td>${inicio}</td>`;
                    let Fin = `<td>${fin}</td>`;
                    let boton=` <td>
                    <form method="POST" class="w-100" action="/cita/eliminarCita">
                         <input type="hidden"  
                         name="id" value="${id}"> 
                         <input type="hidden"  
                         name="tipo" value="cita"> 
                         <input type="submit" class="boton-rojo-block" value="Eliminar">
                    </form> 
                    </td> `
                    
                    tableBody.innerHTML += `<tr>${Id + Nombre + Movil + Email + Servicio + Fecha + Inicio + Fin +boton}</tr>`
                });
               
               miTabla.appendChild(tableBody);
             } 
     
    }catch (error) {
      console.log(error)
    }
} 


function seleccion(){
    const selector=document.querySelector("#id_servicio");
     existeTabla('.tabla1', 'tabla1')
     generar_Tabla2(selector.value);
}


function seleccionServFecha(){

    let fechaSelect= document.querySelector('#buscarFecha').value;
    let miSeleccion=document.querySelector("#idServ").value;
   const indice=document.querySelector("#idServ");
    const inpFecha=document.querySelector('#buscarFecha');
        
    //borrado de tabla si existe
    existeTabla(".tablas", "tablas");
    if(miSeleccion>0 && fechaSelect!=null){
      generar_Tabla(fechaSelect,miSeleccion);
      inpFecha.value='';
    } else{

      if(fechaSelect!=null){
        mostrarAlerta('Primero Servicio', 'error', null,'#consultar');
        setTimeout(() => {
                  inpFecha.value='';
        }, 1000);
      }
    } 

}




