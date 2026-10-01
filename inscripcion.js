async function inscribirse() {

  console.log(
    "📝 Intentando inscripción automática..."
  );


  const materiaInput =
    document.querySelector(
      'input[name="materia"]'
    );

  const comisionInput =
    document.querySelector(
      'input[name="comision"]'
    );

  const csrfInput =
    document.querySelector(
      'input[name="__csrf"]'
    );


  if (
    !materiaInput ||
    !comisionInput ||
    !csrfInput
  ) {

    console.log(
      "❌ No se encontraron los datos necesarios"
    );


    mostrarResultadoInscripcion(
      false,
      "No se encontraron los datos necesarios para realizar la inscripción."
    );

    return;
  }


  const materia =
    materiaInput.value;

  const comision =
    comisionInput.value;

  const csrf =
    csrfInput.value;



  const datos =
    new URLSearchParams();


  datos.append(
    "materia",
    materia
  );

  datos.append(
    "comision",
    comision
  );

  datos.append(
    "__csrf",
    csrf
  );


  try {

    const respuesta =
      await fetch(
        "/cursada/inscribir",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded",

            "X-Requested-With":
              "XMLHttpRequest"
          },

          credentials: "include",

          body:
            datos.toString()
        }
      );


   


    const resultado =
      await respuesta.text();




    const datosRespuesta =
      JSON.parse(resultado);


  

    if (
      datosRespuesta.cod === "0"
    ) {

   

      mostrarResultadoInscripcion(
        true,
        "La inscripción se realizó correctamente."
      );


      return;
    }

    let mensajeError =
      datosRespuesta.cont ||
      "No se pudo realizar la inscripción.";


    if (
      datosRespuesta.mensajes &&
      datosRespuesta.mensajes.length > 0
    ) {

      mensajeError =
        datosRespuesta.mensajes
          .map(mensaje =>
            mensaje.mcuerpo
          )
          .join("\n");

    }


  

    mostrarResultadoInscripcion(
      false,
      mensajeError
    );


  } catch (error) {

 
    mostrarResultadoInscripcion(
      false,
      "Ocurrió un error al intentar realizar la inscripción."
    );

  }
}