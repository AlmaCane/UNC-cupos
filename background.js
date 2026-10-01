
chrome.runtime.onMessage.addListener((mensaje) => {
  console.log("Mensaje recibido:", mensaje);

  if (mensaje.tipo === "cupoEncontrado") {
    console.log("¡CUPO ENCONTRADO!");

    chrome.notifications.create({
      type: "basic",
      iconUrl: "icon.png",
      title: "UNC Cupos",
      message: `Hay ${mensaje.disponibles} cupo(s) disponible(s) en la comisión.`
    });
  }
});