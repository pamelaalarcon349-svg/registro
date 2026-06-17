$(document).ready(function () {
  console.log("jQuery está funcionando correctamente");

  // Función para mostrar el modal
  function showModal() {
    const modalHTML = `
          <style>
              .modal-backdrop {
                  z-index: 1040 !important;
              }
              .modal-content {
                  z-index: 1100 !important;
              }
              .modal {
                  display: block;
                  position: fixed;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  overflow: hidden;
                  z-index: 1050;
                  outline: 0;
                  background-color: rgba(0, 0, 0, 0.5); /* Filtro oscuro */
              }
          </style>
          <div class="modal">
              <div class="modal-dialog" role="document">
                  <div class="modal-content">
                      <div class="modal-header">
                          <h5 class="modal-title">Ejemplo de ventana modal</h5>
                          <button type="button" class="close" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                          </button>
                      </div>
                      <div class="modal-body">
                          <p>Ejemplo de texto interno.</p>
                      </div>
                      <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" aria-label="Close">Cerrar</button>
                          <button type="button" class="btn btn-primary">Guardar</button>
                      </div>
                  </div>
              </div>
          </div>
      `;

    // Insertamos el modal en el body
    $('body').append(modalHTML);

    // Cerrar el modal al hacer clic en la X o en el botón Cerrar
    $('.modal .close, .modal .btn-secondary').click(function () {
      $('.modal').remove();
    });

    // Cerrar el modal al hacer clic fuera del contenido del modal
    $(window).click(function (e) {
      if ($(e.target).hasClass('modal')) {
        $('.modal').remove();
      }
    });
  }

  // Delegar el evento al botón para abrir el modal
  $(document).on('click', '#openModal', function () {
    console.log("Botón de modal clickeado");
    showModal();
  });
});
