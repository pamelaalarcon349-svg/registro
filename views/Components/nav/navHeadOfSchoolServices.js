class NavBarheadofschoolservices extends HTMLElement {
  constructor() {
    super();
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
                        <ul class="nav navbar-nav navbar-right">
                <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                    Constancias<span class="caret"></span>
                </a>
                    <ul class="dropdown-menu" role="menu" id="">
                    <li><a href="headOfServicesCertificates.html" onclick="sessionStorage.setItem('fk_id_type_certificates', '1');">CURSOS IMPARTIDOS</a></li>
                    <li><a href="degreeExamCertificateManagement.html" onclick="sessionStorage.setItem('fk_id_type_certificates', '3');">PARTICIPACIÓN DE EXAMEN DE GRADO</a></li>
                    <!-- Las constancias se cargarán aquí dinámicamente -->
                    </ul>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                        <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
                        <span id="userName"> Jefe de Servicios Escolares</span>
                        <span class="caret"></span>
                    </a>
                        <ul class="dropdown-menu" role="menu">
                          <li><a href="#" style="cursor: default;"><strong id="accountName">Nombre de Usuario</strong></a></li>
                            <li class="divider"></li>
                          <li><a href="#" data-toggle="modal" data-target="#logoutModal" style="cursor: pointer;">Cerrar sesión</a></li>
                        </ul>
                </li>
                <li>
                    <div class="notification-container" style="display: none;">
                    <button id="openNotification" style="border: none; background: none; padding-top: 2rem;" class="glyphicon glyphicon-bell" aria-hidden="true"></button>
                    <div id="notificationBadge" class="notification-badge"></div>
                    </div>
                </li>
                </ul>
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

    // Establecer dinámicamente el nombre de usuario desde sessionStorage
    const userData = sessionStorage.getItem('user_data');
    if (userData) {
      try {
        const userObject = JSON.parse(userData);
        const fullName = userObject.full_name || 'Nombre de Usuario';
        this.querySelector('#accountName').textContent = fullName;
      } catch (error) {
        console.error('Error al parsear user_data:', error);
      }
    } else {
      console.warn('No se encontró la clave "user_data" en sessionStorage.');
    }


  }
}
// Función para cerrar sesión
function closeSession() {
  sessionStorage.clear();
  window.location.href = "../../.."; // Cambia la ruta según tu necesidad
}
// Registrar el componente personalizado
customElements.define('nav-head-of-school-services', NavBarheadofschoolservices);
