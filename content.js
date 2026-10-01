

chrome.runtime.onMessage.addListener(
  (mensaje) => {

    if (
      mensaje.tipo ===
      "buscarComision"
    ) {

      iniciarMonitoreo(
        mensaje.comision
      );

    }


    if (
      mensaje.tipo ===
      "detenerMonitoreo"
    ) {

      detenerMonitoreo();

    }

  }
);