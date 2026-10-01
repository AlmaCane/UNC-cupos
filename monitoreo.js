let intervalo = null;
let disponiblesAnterior = null;
let comisionActual = null;



function buscarComision(comisionBuscada) {

  if (!comisionBuscada) {
    console.log("⚠️ No hay comisión seleccionada");
    return;
  }

  console.log(
    "🔎 Revisando comisión:",
    comisionBuscada
  );


  const comisiones =
    [...document.querySelectorAll("h4")]
      .filter(h4 =>
        h4.innerText.includes("Comisión:")
      );


  let encontrada = false;


  comisiones.forEach(h4 => {

    const textoComision =
      h4.innerText.trim();


    if (
      !textoComision
        .toLowerCase()
        .includes(
          comisionBuscada.toLowerCase()
        )
    ) {
      return;
    }


    encontrada = true;


    let bloque =
      h4.parentElement;


    while (
      bloque &&
      !bloque.innerText.match(
        /Cupo:\s*\d+\s*\|\s*Inscriptos:\s*\d+/i
      )
    ) {

      bloque =
        bloque.parentElement;
    }


    if (!bloque) {

      console.log(
        "❌ No se encontró el bloque de cupos"
      );

      return;
    }


    const match =
      bloque.innerText.match(
        /Cupo:\s*(\d+)\s*\|\s*Inscriptos:\s*(\d+)/i
      );


    if (!match) {

      console.log(
        "❌ No se pudo obtener cupo/inscriptos"
      );

      return;
    }


    const cupo =
      Number(match[1]);

    const inscriptos =
      Number(match[2]);

    const disponibles =
      cupo - inscriptos;


    let disponiblesPrueba =
      disponibles;


    if (disponiblesAnterior === null) {

      disponiblesPrueba = 0;

    } else if (disponiblesAnterior === 0) {

      disponiblesPrueba = 1;
    }


    console.log({

      comision: textoComision,

      cupo,

      inscriptos,

      disponibles,

      hayCupo:
        disponibles > 0,

      disponiblesAnterior

    });


   
    if (

      disponiblesAnterior !== null &&

      disponiblesAnterior === 0 &&

      disponiblesPrueba > 0

    ) {

      console.log(
        "🚨 ¡APARECIÓ UN CUPO!"
      );


      detenerMonitoreo();


      chrome.runtime.sendMessage({

        tipo:
          "cupoEncontrado",

        comision:
          textoComision,

        disponibles:
          disponibles

      });


      inscribirse();
    }


    disponiblesAnterior =
      disponiblesPrueba;

  });


  if (!encontrada) {

    console.log(
      "❌ No se encontró esa comisión"
    );

  }
}


function iniciarMonitoreo(comision) {

  detenerMonitoreo();

  comisionActual = comision;

  disponiblesAnterior = null;

  buscarComision(comision);

  intervalo = setInterval(() => {

    buscarComision(comision);

  }, 5000);

  console.log(
    "⏱️ Monitoreo iniciado cada 5 segundos"
  );
}



function detenerMonitoreo() {

  if (intervalo) {

    clearInterval(intervalo);

    intervalo = null;

    console.log(
      "⏹️ Monitoreo detenido"
    );
  }
}