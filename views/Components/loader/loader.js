function showLoader() {
  const loader = document.getElementById('globalLoader');
  if (loader) {
    loader.classList.remove('hidden'); // Mostrar el loader
    loader.style.display = 'flex'; // Asegúrate de que esté visible
  } else {
    console.error("El elemento del loader no se encontró en el DOM.");
  }
}

function hideLoader() {
  const loader = document.getElementById('globalLoader');
  if (loader) {
    loader.classList.add('hidden'); // Ocultar el loader
    loader.style.display = 'none'; // Asegúrate de que esté oculto
  } else {
    console.error("El elemento del loader no se encontró en el DOM.");
  }
}

// Mostrar el mensaje de "No hay datos disponibles"
function showNoDataMessage() {
  const noDataMessage = document.getElementById('noDataMessage');
  if (noDataMessage) {
    noDataMessage.classList.remove('hidden'); // Mostrar mensaje de no hay datos
  }
}

// Ocultar el mensaje de "No hay datos disponibles"
function hideNoDataMessage() {
  const noDataMessage = document.getElementById('noDataMessage');
  if (noDataMessage) {
    noDataMessage.classList.add('hidden'); // Ocultar mensaje de no hay datos
  }
}

// Función para ocultar detalles, ajustar según tus necesidades
function ocultarDetalles() {
  const detallesElement = document.getElementById('detalles'); // Asegúrate de que este ID sea correcto
  if (detallesElement) {
    detallesElement.style.display = 'none'; // Ocultar el elemento
  }
}

