


// Mapeo de palabras clave a URLs
const pageLinks = {
    "radicar solicitudes": "http://fut.redp.edu.co/FUT-web/#/fut/999/Contactenos",
    "matricula 2023": "https://procesomatriculas.educacionbogota.edu.co/ords/r/edu_inscripciones/matr%C3%ADculas-sed/106",
    colpensiones: "https://sub.colpensionestransaccional.gov.co/LoginDaMLayout.aspx?tagcliente=cup",
    boletines: "https://apoyoescolar.educacionbogota.edu.co/apoyo_escolar/Inicio.dos;jsessionid=WKMS8T83zHPRtNfZhS-2kTfsDE_ovrSeP86JKIoG2xhXqwM7F8F4!1969911938",
    "impuestos 2024": "https://nuevaoficinavirtual.shd.gov.co/bogota/es/descargaFacturaVA",
    "impuestos 2025": "https://nuevaoficinavirtual.shd.gov.co/bogota/es/descargaFacturaVA", // Ejemplo de año siguiente
    icfes: "https://www2.icfesinteractivo.gov.co/resultados-saber2016-web/pages/publicacionResultados/autenticacion/consultaSnp.jsf#No-back-button",
    historico: "https://resultadoshistoricos.icfes.gov.co/",
    radiografias: "https://radiofam.hiruko.com.co/portal/login",
    colsubsidio: "https://riscolsubsidio.hiruko.com.co/portal/login",
    rut: "https://muisca.dian.gov.co/WebRutVirtualInscripcion/#/proceso-guiado/tipoPersona",
    citas: "https://agendamientodigiturno.dian.gov.co/Player.aspx?recurso=NavegacionDian",
};

// Referencias a los elementos del DOM
const searchInput = document.getElementById("search-input");
const suggestionsList = document.getElementById("suggestions");

// Actualiza las sugerencias mientras el usuario escribe
searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    suggestionsList.innerHTML = ""; // Limpia las sugerencias previas

    // Encuentra coincidencias
    const matches = Object.keys(pageLinks).filter((key) =>
        key.includes(query)
    );

    if (matches.length > 0) {
        suggestionsList.style.display = "block"; // Muestra las sugerencias

        // Añade cada coincidencia a la lista
        matches.forEach((match) => {
            const listItem = document.createElement("li");
            listItem.textContent = match;
            listItem.addEventListener("click", () => {
                // Redirige al hacer clic en una sugerencia
                window.location.href = pageLinks[match];
            });
            suggestionsList.appendChild(listItem);
        });
    } else {
        suggestionsList.style.display = "none"; // Oculta la lista si no hay coincidencias
    }
});

// Redirige al hacer clic en el botón de búsqueda
document.getElementById("search-button").addEventListener("click", () => {
    const query = searchInput.value.toLowerCase();
    const matchedPage = Object.keys(pageLinks).find((key) =>
        key.includes(query)
    );

    if (matchedPage) {
        window.location.href = pageLinks[matchedPage];
    } else {
        alert("No se encontró una página que coincida con la búsqueda.");
    }
});

// Oculta las sugerencias al hacer clic fuera del campo de búsqueda
document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target) && !suggestionsList.contains(e.target)) {
        suggestionsList.style.display = "none";
    }
});