console.log('Hello World')

const tabla = document.querySelector('form')

tabla.addEventListener('submit', e => {
    e.preventDefault()
    
    const tarea = e.target.tarea.value
    const hi = e.target.hi.value
    const hf = e.target.hf.value
    const dia = e.target.dia.value

    const hiHoras = Number(hi.slice(0,2))
    const hiMins = Number(hi.slice(3, ))
    const hfHoras = Number(hf.slice(0,2))
    const hfMins = Number(hf.slice(3, ))

    if(hiMins !== 0 || hfMins !== 0){
        alert('Ya te dije que deben ser bloques de horas, no puedes poner minutos 😠')
    } else {
        const pasa = validarDatos(tarea, hiHoras, hfHoras)
        pasa ? crearBloque(tarea, hiHoras, hfHoras, dia) : null
    }
} ) 
const validarDatos = (tarea, hiHoras, hfHoras = 0) => {

    let validacion = false
    if(tarea === '' || hiHoras === ''){
        alert('Todos los campos son obligatorios')
    } else if(hfHoras !== 0){
        if(hiHoras > hfHoras){
            alert('La hora de inicio no puede ser mayor a la hora de finalización')
        } 
    } else if(hiHoras === hfHoras){
        alert('La hora de inicio no puede ser igual a la hora de finalización')
    } else if(hiHoras < 8 || hfHoras > 20){

        alert('La hora de inicio y finalización no puede ser menor a 8am o mayor a 8pm, por ahora.')
    }  else {
        validacion = true
    }

    return validacion
}

const listaHoras = document.querySelectorAll('#hora')
const objHoras = {
    8: listaHoras[0],
    9: listaHoras[1],
    10: listaHoras[2],
    11: listaHoras[3],
    12: listaHoras[4],
    13: listaHoras[5],
    14: listaHoras[6],
    15: listaHoras[7],
    16: listaHoras[8],
    17: listaHoras[9],
    18: listaHoras[10],
    19: listaHoras[11],
    20: listaHoras[12] 
}

const crearBloque = (tarea, hiHoras, hfHoras = 0, dia) => {
   
    const filaInicial = objHoras[hiHoras].parentNode
    const hayHf = hfHoras !== 0
    if(hayHf){
        const filaFinal = objHoras[hfHoras].parentNode
        filaFinal.removeChild(filaFinal.lastChild())
        const diferenciaHoras = hfHoras - hiHoras
    }
    const diaInicial = filaInicial.children[hallarDia(dia)] 

    diaInicial.innerText = tarea

}

const hallarDia = (dia) => {
    let respuesta
    if(dia === 'Lunes'){
        respuesta = 1
    } else if(dia === 'Martes'){
        respuesta = 2
    } else if(dia === 'Miércoles'){
        respuesta = 3
    } else if(dia === 'Jueves'){
        respuesta = 4
    } else if(dia === 'Viernes'){
        respuesta = 5
    } else if(dia === 'Sábado'){
        respuesta = 6
    } else if(dia === 'Domingo'){
        respuesta = 7
    }
    return respuesta
}