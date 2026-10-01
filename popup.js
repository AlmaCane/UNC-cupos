const inputComision = document.getElementById("comision");
const botonIniciar = document.getElementById("iniciar");
const estado = document.getElementById("estado");

botonIniciar.addEventListener("click", async () => {

  const comision = inputComision.value.trim();

  if (!comision) {
    estado.textContent = "⚠️ Escribí una comisión";
    return;
  }

  await chrome.storage.local.set({
    comision: comision
  });

  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });

  if (tab && tab.id) {

    chrome.tabs.sendMessage(tab.id, {
      tipo: "buscarComision",
      comision: comision
    });

  }

  estado.textContent = "🟢 Monitoreando: " + comision;

});