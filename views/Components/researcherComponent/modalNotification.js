$(document).ready(function () {
  console.log("jQuery está funcionando correctamente");

  // Función para mostrar el modal con el contenido recibido vía AJAX
  function showModal(content, title = 'Notificaciones', modalType = 'main') {
    const modalId = `modal-${modalType}-${new Date().getTime()}`;

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
                .modal-body {
                    max-height: 70vh; /* Ajusta según tus necesidades */
                    overflow-y: auto;
                    cursor: pointer;
                }
                .notification-item.unseen {
                    background-color: #f0f0f0; /* Gris claro para no vistos */
                    border-left: 5px solid blue; /* Punto azul para no vistos */
                }
                .notification-item.seen {
                    background-color: white; /* Blanco para vistos */
                }
                .notification-item .status-dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    display: inline-block;
                    margin-right: 10px;
                }
                .notification-item.unseen .status-dot {
                    background-color: blue;
                }
                .notification-item.seen .status-dot {
                    background-color: transparent; /* No mostrar el punto azul para los vistos */
                }
            </style>
            <div class="modal ${modalType}" id="${modalId}">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">${title}</h5>
                            <button type="button" class="close" aria-label="Close" data-dismiss="${modalId}">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            ${content} <!-- Aquí se insertan las notificaciones o detalles -->
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="${modalId}" data-reload="${modalType === 'main'}">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

    $('body').append(modalHTML);

    // Función para cerrar el modal
    function closeModal(modalId) {
      $(`#${modalId}`).remove();
    }

    // Evento para cerrar el modal al hacer clic en el botón de cerrar
    $(document).on('click', `[data-dismiss="${modalId}"]`, function () {
      const shouldReload = $(this).data('reload');
      closeModal(modalId);
      if (shouldReload) {
        location.reload(); // Recargar la página si es el modal de notificaciones
      }
    });

    // Evento para cerrar el modal al hacer clic fuera del contenido del modal
    $(window).click(function (e) {
      if ($(e.target).attr('id') === modalId) {
        closeModal(modalId);
      }
    });
  }

  // Función para marcar una notificación como vista
  function markNotificationAsSeen(notificationId) {
    const dataToSend = {
      id_notification: notificationId,
      is_seen: 1 // Cambia el estado a visto
    };

    console.log("Datos enviados al servidor:", dataToSend);

    $.ajax({
      url: '../../../controllers/notificationsController/NotificationsController.php',
      method: 'PATCH', // Asegúrate de que el servidor maneje este método
      contentType: 'application/json',
      data: JSON.stringify(dataToSend),
      success: function (response) {
        console.log("Notificación marcada como vista:", response);
        // Cambia las clases para reflejar el estado de vista en la UI
        $(`.notification-item[data-id="${notificationId}"]`)
          .removeClass('unseen')
          .addClass('seen');
      },
      error: function (error) {
        console.error('Error al marcar la notificación como vista:', error);
      }
    });
  }

  // Función para cargar las notificaciones
  function loadNotifications() {
    const userData = JSON.parse(sessionStorage.getItem('user_data'));
    const investigatorId = userData ? userData.id_researcher : null;
    console.log('ID del investigador:', investigatorId);

    if (!investigatorId) {
      console.error('ID del investigador no encontrado en sessionStorage.');
      showModal('<p>Error: ID del investigador no disponible.</p>');
      return;
    }

    $.ajax({
      url: `../../../controllers/notificationsController/NotificationsController.php?id_researcher=${investigatorId}`,
      method: 'GET',
      beforeSend: function () {
        // Puedes mostrar un spinner de carga aquí si lo deseas
      },
      success: function (response) {
        console.log("Notificaciones recibidas:", response);

        let content = '';

        if (Array.isArray(response) && response.length > 0) {
          // Invertir el array para mostrar las notificaciones más recientes primero
          response.reverse().forEach(function (notification) {
            let messageData;
            let notificationClass = notification.is_seen === 0 ? 'unseen' : 'seen';

            try {
              // Intentamos parsear el mensaje como JSON
              messageData = JSON.parse(notification.message);
              console.log("Mensaje parseado correctamente:", messageData);
            } catch (e) {
              console.error("Error al parsear el mensaje:", e);
              // Si falla, el mensaje no es un JSON, por lo que lo tratamos como texto plano
              messageData = { message: notification.message };
            }

            // Construimos el HTML para cada notificación
            content += `
                            <div class="notification-item ${notificationClass}" data-id="${notification.id_notification}">
                                <span class="status-dot"></span>
                                <p>${messageData.message}</p>
                            </div>
                        `;
          });

        } else {
          content = '<p>No hay nuevas notificaciones.</p>';
        }

        // Mostrar las notificaciones en el modal
        showModal(content, 'Notificaciones', 'main');
      },
      error: function (error) {
        console.error('Error al cargar las notificaciones:', error);
        showModal('<p>Error al cargar las notificaciones. Por favor, inténtelo más tarde.</p>');
      }
    });
  }

  // Evento para abrir el modal de notificaciones al hacer clic en el botón
  $(document).on('click', '#openNotification', function () {
    console.log("Botón de notificaciones clickeado");
    loadNotifications();
  });

  // Evento para mostrar los detalles de una notificación al hacer clic en ella
  $(document).on('click', '.notification-item', function () {
    const notificationId = $(this).data('id');
    console.log("ID de la notificación: " + notificationId);

    // Solicitar detalles de la notificación
    $.ajax({
      url: `../../../controllers/notificationsController/NotificationsController.php?id_notifications=${notificationId}`,
      method: 'GET',
      beforeSend: function () {
        console.log("Solicitando detalles de la notificación...");
      },
      success: function (response) {
        // console.log("Detalles de la notificación recibidos:", response);
        // console.log("Estructura de la respuesta:", JSON.stringify(response, null, 2)); // Log de estructura

        let detailsContent = '';

        // Verificar si la respuesta es un array y filtrar la notificación por ID
        if (Array.isArray(response)) {
          const notificationDetails = response.find(notification => notification.id_notification === notificationId);

          if (notificationDetails) {
            try {
              let messageData = JSON.parse(notificationDetails.message);
              detailsContent = `
                                <div class="notification-item" data-id="${notificationDetails.id_notification}">
                                    <span class="status-dot"></span>
                                    <p>${messageData.message}</p>
                                    ${messageData.students_in_course ? `<p><strong>Estudiantes en curso:</strong> ${messageData.students_in_course}</p>` : ''}
                                    ${messageData.level_course ? `<p><strong>Nivel del curso:</strong> ${messageData.level_course}</p>` : ''}
                                    ${messageData.course_name ? `<p><strong>Nombre del curso:</strong> ${messageData.course_name}</p>` : ''}
                                    ${messageData.professor ? `<p><strong>Profesor:</strong> ${messageData.professor}</p>` : ''}
                                    <p><strong>Fecha de creación:</strong> ${notificationDetails.created_at.date}</p>
                                </div>
                            `;
            } catch (e) {
              console.error('Error al parsear el mensaje de la notificación:', e);
              detailsContent = '<p>Error al procesar los detalles de la notificación.</p>';
            }
          } else {
            detailsContent = '<p>No se encontraron detalles para esta notificación.</p>';
          }
        } else {
          detailsContent = '<p>No se encontraron detalles para esta notificación.</p>';
        }
        // Marcar la notificación como vista
        markNotificationAsSeen(notificationId);
        // Mostrar los detalles en un modal
        showModal(detailsContent, 'Detalles de la Notificación', 'details');

      },
      error: function (error) {
        console.error('Error al cargar los detalles de la notificación:', error);
        showModal('<p>Error al cargar los detalles. Por favor, inténtelo más tarde.</p>', 'Detalles de la Notificación', 'details');
      }
    });
  });


});
