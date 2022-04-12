
const formulario = document.querySelector("form")
const tabla = document.querySelector("table")
const paImprimir = document.querySelector("body")

formulario.addEventListener("submit", (e) => {
    e.preventDefault()

    const tarea = e.target.tarea.value
    const hi = e.target.hi.value
    const hf = e.target.hf.value
    const dia = e.target.dia.value

    const hiHoras = Number(hi.slice(0, 2))
    const hiMins = Number(hi.slice(3))
    const hfHoras = Number(hf.slice(0, 2))
    const hfMins = Number(hf.slice(3))

    if (hiMins !== 0 || hfMins !== 0) {
        alert(
            "Ya te dije que deben ser bloques de horas, no puedes poner minutos 😠"
        )
    } else {
        const pasa = validarDatos(tarea, hiHoras, hfHoras)
        pasa
            ? crearBloque(tarea, hiHoras, hfHoras, dia)
            : console.log("not entering")
    }
})
const validarDatos = (tarea, hiHoras, hfHoras = 0) => {
    let validacion = false

    if (tarea === "" || hiHoras === "") {
        alert("Todos los campos son obligatorios")
    } else if (hfHoras !== 0) {
        if (hiHoras > hfHoras) {
            alert("La hora de inicio no puede ser mayor a la hora de finalización")
        }
    }
    if (hiHoras === hfHoras) {
        alert("La hora de inicio no puede ser igual a la hora de finalización")
    } else if (hiHoras < 8 || hfHoras > 21) {
        alert(
            "La hora de inicio y finalización no puede ser menor a 8am o mayor a 8pm, por ahora."
        )
    } else {
        validacion = true
    }

    return validacion
}

const listaHoras = document.querySelectorAll("#hora")
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
    20: listaHoras[12],
}
const diccionarioHoras = {
    "08:00 am": 8,
    "09:00 am": 9,
    "10:00 am": 10,
    "11:00 am": 11,
    "12:00 pm": 12,
    "01:00 pm": 13,
    "02:00 pm": 14,
    "03:00 pm": 15,
    "04:00 pm": 16,
    "05:00 pm": 17,
    "06:00 pm": 18,
    "07:00 pm": 19,
    "08:00 pm": 20,
}

const crearBloque = (tarea, hiHoras, hfHoras = 0, dia) => {

    const filaInicial = objHoras[hiHoras].parentNode
    const hayHf = hfHoras !== 0

    const diaInicial = filaInicial.children[hallarDia(dia)]
    if (diaInicial.classList.contains("ocupado")) {
        alert("Ya hay un bloque en ese horario. Has click sobre el bloque, elimínalo y vuelve a intentarlo.")
    } else {
        diaInicial.classList.add("ocupado")

        if (hayHf) {
            const diferenciaHoras = hfHoras - hiHoras

            for (let i = 0; i < diferenciaHoras; i++) {
                let filaInterna = objHoras[hiHoras + i].parentNode
                let diaInterno = filaInterna.children[hallarDia(dia)]
                diaInterno.classList.add("ocupado")
                diaInterno.innerText = tarea
            }
        }

        diaInicial.innerText = tarea
    }
}

const hallarDia = (dia) => {
    let respuesta
    if (dia === "Lunes") {
        respuesta = 1
    } else if (dia === "Martes") {
        respuesta = 2
    } else if (dia === "Miércoles") {
        respuesta = 3
    } else if (dia === "Jueves") {
        respuesta = 4
    } else if (dia === "Viernes") {
        respuesta = 5
    } else if (dia === "Sábado") {
        respuesta = 6
    } else if (dia === "Domingo") {
        respuesta = 7
    }
    return respuesta
}
const btnGuardar = document.querySelector("#guardar")
btnGuardar.addEventListener("click", () => {

    html2pdf()
    .set({
        margin: .3,
        filename: 'agendaSemanal_Time-Blocking.pdf',
        
        html2canvas: {
            scale: 2, // A mayor escala, mejores gráficos, pero más peso
            letterRendering: true,
        },
        jsPDF: {
            unit: "in",
            format: "a1",
            orientation: 'landscape' // landscape o portrait
        }
    })
    .from(paImprimir)
    .save()
    .catch(err => console.log(err));

})