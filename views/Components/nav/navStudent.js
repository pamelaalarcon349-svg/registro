class NavBarstudent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // Obtener datos del usuario desde sessionStorage
    const userData = JSON.parse(sessionStorage.getItem('user_data'));
    const userType = userData ? parseInt(userData.id_user_type, 10) : null; // Convertir id_user_type a entero

    if (userData) {
      const userName = userData.nombre_completo || 'Cuenta';
      const accountName = userData.email || 'Nombre de Usuario';

      // Llamar a la función para renderizar el menú adecuado
      this.renderNavBar(userType);
      this.querySelector('#userName').textContent = userName;
      this.querySelector('#accountName').textContent = accountName;
    } else {
      console.error('No se encontraron datos del usuario en sessionStorage');
    }

    // Agregar evento para cerrar sesión
    document.getElementById('confirmLogout').addEventListener('click', () => {
      this.closeSession();
    });
  }

  // Función para renderizar el menú según el tipo de usuario
  renderNavBar(userType) {
    let navContent = '';  // Variable que contendrá el contenido HTML según el tipo de usuario

    switch (userType) {
      case 4: //OFICINA DE EXAMEN DE GRADO Y GRADUADOS
        navContent = `
                <ul class="nav navbar-nav navbar-right">
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                    Reportes<span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu" role="menu">
                    <li><a href="#">Ejemplo de reportes</a></li>

                    </ul>
                </li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                    Constancias<span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu" role="menu" id="">
                    <li><a href="examApplication.html" onclick="sessionStorage.setItem('fk_id_type_certificates', '2');">SOLICITUDES DE EXAMEN DE GRADO</a></li>
                    <li><a href="information_requested_records.html" onclick="sessionStorage.setItem('fk_id_type_certificates', '3');">PARTICIPACIÓN DE EXAMEN DE GRADO</a></li>
                    <!-- Las constancias se cargarán aquí dinámicamente -->
                    </ul>
                </li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                    <span id="userName">Cuenta</span><span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu" role="menu">
                    <li><a href="#" style="cursor: default;"><strong id="accountName">Nombre de Usuario</strong></a></li>
                    <li class="divider"></li>
                    <li><a href="#" data-toggle="modal" data-target="#logoutModal" style="cursor: pointer;">Cerrar sesión</a></li>
                    </ul>
                </li>
                <li>
                    <div class="notification-container">
                    <button id="openNotification" style="border: none; background: none; padding-top: 2rem;" class="glyphicon glyphicon-bell" aria-hidden="true"></button>
                    <div id="notificationBadge" class="notification-badge"></div>
                    </div>
                </li>
                </ul>
            `;
    }
    // Insertar el contenido del menú en la barra de navegación
    this.innerHTML = `
        <style>
        .notification-badge {
            position: absolute;
            top: 10px;
            right: -5px;
            width: 10px;
            height: 10px;
            background-color: blue;
            border-radius: 50%;
            display: none;
        }
        .notification-container {
            position: relative;
            display: inline-block;
        }
        </style>
        <nav class="navbar navbar-inverse sub-navbar navbar-fixed-top">
        <div class="container">
            <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#subenlaces">
                <span class="sr-only">Interruptor de Navegación</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">INAOEP</a>
            </div>
            <div class="collapse navbar-collapse" id="subenlaces">
            ${navContent}  <!-- Aquí se inserta el menú generado dinámicamente -->
            </div>
        </div>
        </nav>
        <!-- Modal de confirmación de cierre de sesión -->
        <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="logoutModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="logoutModalLabel">Confirmar cierre de sesión</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                ¿Estás seguro de que deseas cerrar sesión?
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-primary" id="confirmLogout" href="../../../" onclick="closeSession()">Cerrar sesión</button>
            </div>
            </div>
        </div>
        </div>
    `;
  }

  // Función para cerrar sesión
  closeSession() {
    sessionStorage.clear();
    window.location.href = "../../.."; // Cambia la ruta según tu necesidad
  }
}

// Registrar el componente personalizado
customElements.define('nav-student', NavBarstudent);
