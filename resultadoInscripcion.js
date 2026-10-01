

function mostrarResultadoInscripcion(
  exito,
  mensaje = ""
) {



  const popupAnterior =
    document.getElementById(
      "unc-resultado-popup"
    );

  if (popupAnterior) {

    popupAnterior.remove();

  }


  
  const fondo =
    document.createElement("div");

  fondo.id =
    "unc-resultado-popup";


  fondo.style.position = "fixed";

  fondo.style.top = "0";

  fondo.style.left = "0";

  fondo.style.width = "100vw";

  fondo.style.height = "100vh";

  fondo.style.background =
    "rgba(0, 0, 0, 0.55)";

  fondo.style.display = "flex";

  fondo.style.alignItems = "center";

  fondo.style.justifyContent = "center";

  fondo.style.zIndex =
    "2147483647";


  
  const popup =
    document.createElement("div");


  popup.style.width = "420px";

  popup.style.maxWidth = "90%";

  popup.style.background = "#fad0e5";

  popup.style.borderRadius = "14px";

  popup.style.padding = "30px";

  popup.style.boxShadow =
    "0 10px 40px rgba(0,0,0,0.3)";

  popup.style.fontFamily =
    "Arial, sans-serif";

  popup.style.textAlign =
    "center";


  if (exito) {

    popup.innerHTML = `

      <div style="
        font-size: 50px;
        margin-bottom: 10px;
      ">
      </div>

      <h2 style="
        margin: 0 0 15px 0;
      ">
        ¡Inscripción exitosa!
      </h2>

      <p style="
        color: #555;
        margin-bottom: 25px;
      ">
        Te inscribiste correctamente a la comisión.
      </p>

      <button
        id="cerrarResultado"
        style="
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 8px;
          background: #fad0e5;
          color: white;
          font-size: 16px;
          cursor: pointer;
        "
      >
        Cerrar
      </button>

    `;



    fondo.appendChild(popup);

    document.body.appendChild(fondo);


    
    document
      .getElementById("cerrarResultado")
      .addEventListener(
        "click",
        () => {

          fondo.remove();

        }
      );


    return;
  }


  
  popup.innerHTML = `

    <div style="
      font-size: 50px;
      margin-bottom: 10px;
    ">
    </div>

    <h2 style="
      margin: 0 0 15px 0;
      color: #b12e2e;
    ">
      No se pudo realizar la inscripción
    </h2>

    <div style="
      margin-top: 15px;
      margin-bottom: 20px;
      padding: 12px;
      background: #fad0e5;
      border-radius: 8px;
      color: #555;
      text-align: left;
      max-height: 180px;
      overflow-y: auto;
      white-space: pre-wrap;
    ">
      ${mensaje}
    </div>

    <p style="
      margin-bottom: 20px;
    ">
      ¿Querés seguir monitoreando la comisión?
    </p>

    <div style="
      display: flex;
      gap: 10px;
    ">

      <button
        id="seguirMonitoreando"
        style="
          flex: 1;
          padding: 12px;
          border: none;
          border-radius: 8px;
          background: #50b87b;
          color: white;
          font-size: 15px;
          cursor: pointer;
        "
      >
        Sí, seguir
      </button>

      <button
        id="detenerMonitoreo"
        style="
          flex: 1;
          padding: 12px;
          border: none;
          border-radius: 8px;
          background: #b12e2e;
          color: white;
          font-size: 15px;
          cursor: pointer;
        "
      >
        No, detener
      </button>

    </div>

  `;



  fondo.appendChild(popup);

  document.body.appendChild(fondo);


  
  document
    .getElementById("seguirMonitoreando")
    .addEventListener(
      "click",
      () => {

       


        fondo.remove();



        if (comisionActual) {

          iniciarMonitoreo(
            comisionActual
          );

        } else {

          console.log(
            "❌ No hay una comisión para volver a monitorear"
          );

        }

      }
    );


  
  document
    .getElementById("detenerMonitoreo")
    .addEventListener(
      "click",
      () => {

    


        fondo.remove();



        detenerMonitoreo();

      }
    );

}