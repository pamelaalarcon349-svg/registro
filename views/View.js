class AdmisionView {
    constructor() {
        this.form = document.getElementById('formAdmision');
        this.alertaExito = document.getElementById('alertaExito');
        this.alertaError = document.getElementById('alertaError');
        this.linkCurp = document.getElementById('linkCurp');
        this.inputCurp = document.getElementById('curp');
        this.divMaestrias = document.getElementById('maestrias');
        this.divDoctorados = document.getElementById('doctorados');
        this.selectMaestria = document.getElementById('maestriaSelect');
        this.selectDoctorado = document.getElementById('doctoradoSelect');
        this.opcionesPeriodo = document.getElementById('opcionesPeriodo');
        this.errorPeriodo = document.getElementById('errorPeriodo');
        this.evaluacionContainer = document.getElementById('evaluacionContainer');
        this.especificarTitulacionContainer = document.getElementById('especificarTitulacionContainer');
        this.especificarTitulacion = document.getElementById('especificarTitulacion');
        this.modalResumen = document.getElementById('modalResumen');
        this.contenidoResumen = document.getElementById('contenidoResumen');
        
        // Elementos de parentesco
        this.selectParentesco = document.getElementById('parentesco');
        this.especificarParentescoContainer = document.getElementById('especificarParentescoContainer');
        this.especificarParentesco = document.getElementById('especificarParentesco');
        this.btnEnviarModal = document.getElementById('btnEnviarModal');
        this.btnConfirmarEnvio = document.getElementById('confirmarEnvio');
    }

    validarParentesco() {
        if (!this.selectParentesco) return true;
        
        const valor = this.selectParentesco.value;
        
        if (valor === '' || valor === 'SELECCIONA') {
            this.mostrarErrorCampo(this.selectParentesco, 'Este campo es obligatorio');
            return false;
        }
        
        if (valor === 'OTRO') {
            const especificacion = this.especificarParentesco?.value.trim() || '';
            if (especificacion === '') {
                this.mostrarErrorCampo(this.especificarParentesco, 'Debes especificar el parentesco');
                return false;
            }
            this.limpiarErrorCampo(this.especificarParentesco);
        }
        
        this.limpiarErrorCampo(this.selectParentesco);
        return true;
    }

    inicializarCalendario() {
        const campoFecha = document.getElementById('fecha_nacimiento');
        if (!campoFecha) return;

        if (window.jQuery && window.jQuery.fn.datepicker) {
            window.jQuery('#fecha_nacimiento').datepicker({
                changeYear: true,
                yearRange: '-100:+0',
                dateFormat: 'dd/mm/yy'
            });
            return;
        }

        campoFecha.type = 'date';
        campoFecha.removeAttribute('readonly');
        campoFecha.addEventListener('click', () => {
            if (campoFecha.showPicker) campoFecha.showPicker();
        });
    }

    ocultarElementosIniciales() {
        this.mostrarElemento(this.divMaestrias, false, false);
        this.mostrarElemento(this.divDoctorados, false, false);
        this.mostrarElemento(this.evaluacionContainer, false, false);
        this.mostrarElemento(this.especificarTitulacionContainer, false, false);
        this.mostrarElemento(this.especificarParentescoContainer, false, false);
    }

    mostrarElemento(elemento, visible, animado = true) {
        if (!elemento) return;

        if (animado && window.jQuery) {
            const $elemento = window.jQuery(elemento);
            visible ? $elemento.slideDown(300) : $elemento.slideUp(300);
            return;
        }

        elemento.style.display = visible ? 'block' : 'none';
    }

    actualizarCurp(esExtranjero) {
        if (!this.inputCurp || !this.linkCurp) return;

        if (esExtranjero) {
            this.inputCurp.disabled = true;
            this.inputCurp.value = '';
            this.limpiarErrorCampo(this.inputCurp);
            this.linkCurp.classList.add('deshabilitado-total');
            return;
        }

        this.inputCurp.disabled = false;
        this.linkCurp.classList.remove('deshabilitado-total');
    }

    actualizarTitulacion(mostrarCampo) {
        this.mostrarElemento(this.especificarTitulacionContainer, mostrarCampo);
        if (!this.especificarTitulacion) return;

        this.especificarTitulacion.required = mostrarCampo;
        if (!mostrarCampo) {
            this.especificarTitulacion.value = '';
            this.limpiarErrorCampo(this.especificarTitulacion);
        }
    }

    actualizarPosgrado(tipoPosgrado) {
        const esMaestria = tipoPosgrado === 'Maestría';
        const esDoctorado = tipoPosgrado === 'Doctorado';

        this.mostrarElemento(this.divMaestrias, esMaestria);
        this.mostrarElemento(this.divDoctorados, esDoctorado);
        this.mostrarElemento(this.evaluacionContainer, esMaestria);

        if (!esMaestria && this.selectMaestria) {
            this.selectMaestria.selectedIndex = 0;
            this.limpiarErrorCampo(this.selectMaestria);
        }

        if (!esDoctorado && this.selectDoctorado) {
            this.selectDoctorado.selectedIndex = 0;
            this.limpiarErrorCampo(this.selectDoctorado);
        }

        if (!esMaestria) {
            this.form.querySelectorAll('input[name="formaEvaluacion"]').forEach(radio => {
                radio.checked = false;
            });
        }
    }

    renderizarPeriodos(tipoPosgrado) {
        if (!this.opcionesPeriodo) return;

        const periodos = tipoPosgrado === 'Doctorado'
            ? ['Agosto-Diciembre', 'Enero-Mayo']
            : ['Agosto-Diciembre'];

        this.opcionesPeriodo.innerHTML = periodos.map(periodo => `
            <div class="radio">
                <label><input type="radio" name="periodo" value="${periodo}"> ${periodo.toUpperCase()}</label>
            </div>
        `).join('');

        this.limpiarErrorPeriodo();
    }

    mostrarAlertaNumeros() {
        document.querySelectorAll('.alerta-numeros').forEach(alerta => alerta.remove());

        const alerta = document.createElement('div');
        alerta.className = 'alerta-numeros';
        alerta.textContent = 'Solo se aceptan números en este campo';
        document.body.appendChild(alerta);

        setTimeout(() => alerta.remove(), 2500);
    }

    limpiarCampoNumerico(campo) {
        const valorOriginal = campo.value;
        const valorLimpio = ValidacionModel.soloNumeros(valorOriginal);

        if (valorOriginal !== valorLimpio) {
            campo.value = valorLimpio;
            this.mostrarAlertaNumeros();
        }
    }

    limpiarErrorCampo(campo) {
        if (!campo) return;

        campo.classList.remove('input-error');
        const contenedor = campo.closest('.form-group') || campo.parentElement;
        const mensaje = contenedor?.querySelector('.error-mensaje');
        if (mensaje) mensaje.textContent = '';
    }

    mostrarErrorCampo(campo, mensaje) {
        if (!campo) return;

        campo.classList.add('input-error');
        const contenedor = campo.closest('.form-group') || campo.parentElement;
        const mensajeError = contenedor?.querySelector('.error-mensaje');
        if (mensajeError) mensajeError.textContent = mensaje;
    }

    mostrarErrorGrupoRadio(radio, mensaje) {
        const contenedor = radio.closest('.form-group') || radio.parentElement;
        contenedor?.classList.add('input-error');
        const mensajeError = contenedor?.querySelector('.error-mensaje');
        if (mensajeError) mensajeError.textContent = mensaje;
    }

    limpiarErrorGrupoRadio(radio) {
        const contenedor = radio.closest('.form-group') || radio.parentElement;
        contenedor?.classList.remove('input-error');
        const mensajeError = contenedor?.querySelector('.error-mensaje');
        if (mensajeError) mensajeError.textContent = '';
    }

    limpiarValidaciones() {
        document.querySelectorAll('.input-error').forEach(campo => campo.classList.remove('input-error'));
        document.querySelectorAll('.error-mensaje').forEach(mensaje => {
            mensaje.textContent = '';
        });
        this.ocultarBanners();
    }

    ocultarBanners() {
        if (this.alertaExito) this.alertaExito.style.display = 'none';
        if (this.alertaError) this.alertaError.style.display = 'none';
    }

    mostrarBanner(tipo) {
        this.ocultarBanners();

        if (tipo === 'exito' && this.alertaExito) {
            this.alertaExito.style.display = 'block';
        }

        if (tipo === 'error' && this.alertaError) {
            this.alertaError.style.display = 'block';
        }
    }

    mostrarErrorPeriodo(mensaje) {
        if (this.errorPeriodo) this.errorPeriodo.textContent = mensaje;
    }

    limpiarErrorPeriodo() {
        if (this.errorPeriodo) this.errorPeriodo.textContent = '';
    }

    desplazarPrimerError() {
        const primerError = document.querySelector('.input-error');
        if (!primerError) return;

        const top = primerError.getBoundingClientRect().top + window.pageYOffset - 100;
        window.scrollTo({ top, behavior: 'smooth' });
    }

    escaparHtml(valor) {
        return String(valor || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    texto(valor, respaldo = 'No especificado') {
        return this.escaparHtml(valor || respaldo);
    }

    construirResumen(datos) {
        if (!datos) {
            return '<p>No hay datos para mostrar</p>';
        }

        // === DATOS PERSONALES ===
        const nombreCompleto = `${datos.nombre || ''} ${datos.primerApellido || ''} ${datos.segundoApellido || ''}`.trim() || 'No especificado';
        
        // === DOMICILIO ===
        const domicilio = datos.domicilio || {};
        const direccion = `${domicilio.calle || ''} ${domicilio.numExt || ''}, ${domicilio.colonia || ''}, CP ${domicilio.cp || ''}, ${domicilio.municipio || ''}, ${domicilio.estado || ''}`.trim() || 'No especificada';

        // === DATOS ACADÉMICOS ===
        const datosAcademicos = datos.datosAcademicos || {};
        const posgradoDetalle = datosAcademicos.posgradoDetalle || 'No seleccionado';
        const anioIngreso = datosAcademicos.anioIngreso || 'No especificado';
        const periodo = datosAcademicos.periodo || 'No seleccionado';
        const formaEvaluacion = datosAcademicos.formaEvaluacion || '';

        // === CONTACTO ===
        const contacto = datos.contacto || {};
        const lada = contacto.lada || 'No especificado';
        const telFijo = contacto.telFijo || 'No especificado';
        const ext = contacto.ext || '';
        const telMovil = contacto.telMovil || 'No especificado';
        const email = contacto.email || 'No especificado';

        // === CONTACTO DE EMERGENCIA ===
        const contactoEmergencia = datos.contactoEmergencia || {};
        const nombreEmergencia = `${contactoEmergencia.nombre || ''} ${contactoEmergencia.primerApellido || ''} ${contactoEmergencia.segundoApellido || ''}`.trim() || 'No especificado';
        const ladaEmergencia = contactoEmergencia.lada || 'No especificado';
        const telFijoEmergencia = contactoEmergencia.telFijo || 'No especificado';
        const extEmergencia = contactoEmergencia.ext || '';
        const telMovilEmergencia = contactoEmergencia.telMovil || 'No especificado';
        const parentesco = contactoEmergencia.parentesco || 'No especificado';

        // === ESTUDIOS PREVIOS ===
        const estudiosPrevios = datos.estudiosPrevios || {};
        const institucion = estudiosPrevios.institucion || 'No especificada';
        const gradoAcademico = estudiosPrevios.gradoAcademico || 'No especificado';
        const anioGrado = estudiosPrevios.anioGrado || 'No especificado';
        const promedio = estudiosPrevios.promedio || 'No especificado';
        const tipoTitulacion = estudiosPrevios.tipoTitulacion || 'No especificado';

        // === DOMINIO INGLÉS ===
        const dominioIngles = datos.dominioIngles || {};
        const expresionEscrita = dominioIngles.expresionEscrita || 'No especificado';
        const expresionOral = dominioIngles.expresionOral || 'No especificado';
        const comprensionLectora = dominioIngles.comprensionLectora || 'No especificado';
        const comprensionAuditiva = dominioIngles.comprensionAuditiva || 'No especificado';

        // === MOTIVACIÓN ===
        const motivacion = datos.motivacion || {};
        const razon = motivacion.razon || 'No especificada';
        const medio = motivacion.medio || 'No especificado';

        // === EXPERIENCIA LABORAL ===
        const experienciaLaboral = datos.experienciaLaboral || [];

        // === PUBLICACIONES ===
        const publicaciones = datos.publicaciones || [];

        // ============================================
        // CONSTRUIR HTML DEL RESUMEN
        // ============================================
        let html = `
            <!-- ========================================== -->
            <!-- DATOS PERSONALES -->
            <!-- ========================================== -->
            <div class="section-title">📋 Datos personales</div>
            <ul>
                <li><strong>Nacionalidad:</strong> ${this.texto(datos.nacionalidad)}</li>
                <li><strong>CURP:</strong> ${this.texto(datos.curp)}</li>
                <li><strong>Nombre completo:</strong> ${this.texto(nombreCompleto)}</li>
                <li><strong>Sexo:</strong> ${this.texto(datos.sexo)}</li>
                <li><strong>Fecha de nacimiento:</strong> ${this.texto(datos.fechaNacimiento)}</li>
                <li><strong>Lugar de nacimiento:</strong> ${this.texto(datos.lugarNacimiento)}</li>
            </ul>

            <!-- ========================================== -->
            <!-- CONTACTO -->
            <!-- ========================================== -->
            <div class="section-title">📞 Contacto</div>
            <ul>
                <li><strong>Lada internacional:</strong> ${this.texto(lada)}</li>
                <li><strong>Teléfono fijo:</strong> ${this.texto(telFijo)} ${ext ? `(Ext: ${this.texto(ext)})` : ''}</li>
                <li><strong>Teléfono móvil:</strong> ${this.texto(telMovil)}</li>
                <li><strong>Correo electrónico:</strong> ${this.texto(email)}</li>
            </ul>

            <!-- ========================================== -->
            <!-- DOMICILIO -->
            <!-- ========================================== -->
            <div class="section-title">🏠 Domicilio</div>
            <ul>
                <li><strong>Código Postal:</strong> ${this.texto(domicilio.cp)}</li>
                <li><strong>Estado:</strong> ${this.texto(domicilio.estado)}</li>
                <li><strong>Municipio o Alcaldía:</strong> ${this.texto(domicilio.municipio)}</li>
                <li><strong>Localidad:</strong> ${this.texto(domicilio.localidad)}</li>
                <li><strong>Colonia:</strong> ${this.texto(domicilio.colonia)}</li>
                <li><strong>Tipo de calle:</strong> ${this.texto(domicilio.tipoCalle)}</li>
                <li><strong>Calle:</strong> ${this.texto(domicilio.calle)}</li>
                <li><strong>Número exterior:</strong> ${this.texto(domicilio.numExt)}</li>
                <li><strong>Número interior:</strong> ${this.texto(domicilio.numInt || 'N/A')}</li>
                <li><strong>País:</strong> ${this.texto(domicilio.pais)}</li>
            </ul>

            <!-- ========================================== -->
            <!-- CONTACTO DE EMERGENCIA -->
            <!-- ========================================== -->
            <div class="section-title">🚨 Contacto de emergencia</div>
            <ul>
                <li><strong>Nombre completo:</strong> ${this.texto(nombreEmergencia)}</li>
                <li><strong>Lada internacional:</strong> ${this.texto(ladaEmergencia)}</li>
                <li><strong>Teléfono fijo:</strong> ${this.texto(telFijoEmergencia)} ${extEmergencia ? `(Ext: ${this.texto(extEmergencia)})` : ''}</li>
                <li><strong>Teléfono móvil:</strong> ${this.texto(telMovilEmergencia)}</li>
                <li><strong>Parentesco:</strong> ${this.texto(parentesco)}</li>
            </ul>

            <!-- ========================================== -->
            <!-- DATOS ACADÉMICOS -->
            <!-- ========================================== -->
            <div class="section-title">🎓 Datos académicos</div>
            <ul>
                <li><strong>Posgrado seleccionado:</strong> ${this.texto(posgradoDetalle)}</li>
                <li><strong>Año de ingreso:</strong> ${this.texto(anioIngreso)}</li>
                <li><strong>Periodo:</strong> ${this.texto(periodo)}`
        ;

        if (formaEvaluacion) {
            html += `<li><strong>Forma de Evaluación:</strong> ${this.texto(formaEvaluacion)}</li>`;
        }

        html += `
            </ul>

            <!-- ========================================== -->
            <!-- ESTUDIOS PREVIOS -->
            <!-- ========================================== -->
            <div class="section-title">📚 Estudios previos</div>
            <ul>
                <li><strong>Institución educativa:</strong> ${this.texto(institucion)}</li>
                <li><strong>Grado académico:</strong> ${this.texto(gradoAcademico)}</li>
                <li><strong>Año de obtención:</strong> ${this.texto(anioGrado)}</li>
                <li><strong>Promedio:</strong> ${this.texto(promedio)}</li>
                <li><strong>Tipo de titulación:</strong> ${this.texto(tipoTitulacion)}</li>
            </ul>

            <!-- ========================================== -->
            <!-- DOMINIO DEL INGLÉS -->
            <!-- ========================================== -->
            <div class="section-title">🌐 Dominio del inglés</div>
            <ul>
                <li><strong>Expresión escrita:</strong> ${this.texto(expresionEscrita)}</li>
                <li><strong>Expresión oral:</strong> ${this.texto(expresionOral)}</li>
                <li><strong>Comprensión lectora:</strong> ${this.texto(comprensionLectora)}</li>
                <li><strong>Comprensión auditiva:</strong> ${this.texto(comprensionAuditiva)}</li>
            </ul>

            <!-- ========================================== -->
            <!-- EXPERIENCIA LABORAL -->
            <!-- ========================================== -->
            <div class="section-title">💼 Experiencia laboral</div>
            <ul>`;

        if (experienciaLaboral.length > 0) {
            const expValida = experienciaLaboral.filter(exp => 
                exp.institucion && exp.institucion !== 'No especificada'
            );
            if (expValida.length > 0) {
                expValida.forEach(exp => {
                    html += `
                        <li>
                            <strong>${this.texto(exp.institucion)}</strong> - 
                            ${this.texto(exp.tipoExperiencia)} - 
                            ${this.texto(exp.puesto)} 
                            (${this.texto(exp.tiempoLaborado)})
                        </li>
                    `;
                });
            } else {
                html += `<li>No se registró experiencia laboral</li>`;
            }
        } else {
            html += `<li>No se registró experiencia laboral</li>`;
        }

        html += `
            </ul>

            <!-- ========================================== -->
            <!-- PUBLICACIONES CIENTÍFICAS -->
            <!-- ========================================== -->
            <div class="section-title">📄 Publicaciones científicas</div>
            <ul>`;

        if (publicaciones.length > 0) {
            const pubValida = publicaciones.filter(pub => 
                pub.titulo && pub.titulo !== 'No especificado'
            );
            if (pubValida.length > 0) {
                pubValida.forEach(pub => {
                    html += `
                        <li>
                            <strong>${this.texto(pub.titulo)}</strong> - 
                            ${this.texto(pub.tipoPublicacion)}
                            ${pub.doi && pub.doi !== 'No especificado' ? `(DOI: ${this.texto(pub.doi)})` : ''}
                        </li>
                    `;
                });
            } else {
                html += `<li>No se registraron publicaciones</li>`;
            }
        } else {
            html += `<li>No se registraron publicaciones</li>`;
        }

        html += `
            </ul>

            <!-- ========================================== -->
            <!-- MOTIVACIÓN -->
            <!-- ========================================== -->
            <div class="section-title">💡 Motivacidivón</>
            <ul>
                <li><strong>Razón para estudiar en INAOE:</strong> ${this.texto(razon)}</li>
                <li><strong>Medio por el que se enteró:</strong> ${this.texto(medio)}</li>
            </ul>
        `;

        return html;
    }

    mostrarResumen(html) {
        if (this.contenidoResumen) {
            this.contenidoResumen.innerHTML = html || '<p>No hay datos para mostrar</p>';
        }

        if (window.jQuery && window.jQuery.fn.modal) {
            window.jQuery(this.modalResumen).modal({
                backdrop: 'static',
                keyboard: true
            });
            window.jQuery(this.modalResumen).modal('show');
            return;
        }

        if (this.modalResumen) {
            this.modalResumen.style.display = 'block';
            this.modalResumen.style.backgroundColor = 'rgba(0,0,0,0.5)';
        }
    }

    ocultarResumen() {
        if (window.jQuery && window.jQuery.fn.modal) {
            window.jQuery(this.modalResumen).modal('hide');
            return;
        }

        if (this.modalResumen) {
            this.modalResumen.style.display = 'none';
        }
    }
}