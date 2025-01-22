// Referencias a los elementos del DOM
const searchInput = document.getElementById("search-input");
const suggestionsList = document.getElementById("suggestions");
const addPageButton = document.getElementById("add-page-button");
const addPageModal = document.getElementById("add-page-modal");
const closeModal = document.querySelector(".modal .close");
const addPageForm = document.getElementById("add-page-form");

// Leer los enlaces desde el LocalStorage o inicializar el objeto
const pageLinks = JSON.parse(localStorage.getItem("pageLinks")) || {
    "radicar solicitudes": "http://fut.redp.edu.co/FUT-web/#/fut/999/Contactenos",
    "matricula 2023": "https://procesomatriculas.educacionbogota.edu.co/ords/r/edu_inscripciones/matr%C3%ADculas-sed/106",
    colpensiones: "https://sub.colpensionestransaccional.gov.co/LoginDaMLayout.aspx?tagcliente=cup",
};

// Guardar los enlaces actualizados en el LocalStorage
function savePageLinks() {
    localStorage.setItem("pageLinks", JSON.stringify(pageLinks));
}

// Función para actualizar las sugerencias en tiempo real
function updateSuggestions() {
    const query = searchInput.value.toLowerCase();
    suggestionsList.innerHTML = "";

    const matches = Object.keys(pageLinks).filter((key) => key.includes(query));

    if (matches.length > 0) {
        suggestionsList.style.display = "block";
        matches.forEach((match) => {
            const listItem = document.createElement("li");
            listItem.textContent = match;
            listItem.addEventListener("click", () => {
                if (pageLinks[match]) {
                    window.location.href = pageLinks[match];
                } else {
                    alert("La URL no es válida.");
                }
            });
            suggestionsList.appendChild(listItem);
        });
    } else {
        suggestionsList.style.display = "none";
    }
}

// Evento de entrada en el campo de búsqueda
searchInput.addEventListener("input", updateSuggestions);

// Ocultar las sugerencias cuando se hace clic fuera del campo de búsqueda o las sugerencias
document.addEventListener("click", (e) => {
    if (!e.target.closest("#search-input") && !e.target.closest("#suggestions")) {
        suggestionsList.style.display = "none";
    }
});

// Función para abrir el modal de añadir página
addPageButton.addEventListener("click", () => {
    addPageModal.style.display = "block";
});

// Función para cerrar el modal
closeModal.addEventListener("click", () => {
    addPageModal.style.display = "none";
});

// Manejar el envío del formulario para añadir nuevas páginas
addPageForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const pageName = document.getElementById("page-name").value.toLowerCase().trim();
    const pageURL = document.getElementById("page-url").value.trim();

    if (pageName && pageURL) {
        pageLinks[pageName] = pageURL;
        savePageLinks(); // Guardar los enlaces en el LocalStorage
        alert(`La página \"${pageName}\" ha sido añadida correctamente.`);
        addPageModal.style.display = "none";
        addPageForm.reset();
    } else {
        alert("Por favor, completa todos los campos antes de añadir la página.");
    }
});

// Función para cargar los enlaces almacenados al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    Object.keys(pageLinks).forEach((name) => {
        console.log(`Enlace cargado: ${name} -> ${pageLinks[name]}`);
    });
});

// Cerrar el modal si se hace clic fuera de él
window.addEventListener("click", (e) => {
    if (e.target === addPageModal) {
        addPageModal.style.display = "none";
    }
});

// Referencia al botón de descarga
const downloadPagesButton = document.getElementById("download-pages-button");

// Función para descargar las páginas guardadas
downloadPagesButton.addEventListener("click", () => {
    const savedPages = JSON.parse(localStorage.getItem("pageLinks")) || {};
    const dataStr = JSON.stringify(savedPages, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "pages.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url); // Limpia el URL generado
});
