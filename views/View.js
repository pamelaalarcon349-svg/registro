// views/View.js

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
        this.evaluacionOpciones = document.getElementById('evaluacionOpciones');
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

        // Radio buttons de posgrado
        this.radiosPosgrado = document.querySelectorAll('input[name="posgrado"]');

        // Inicializar eventos
        this.inicializarEventos();
    }

    // ==========================================
    // REGLAS DE POSGRADO (CORREGIDAS)
    // ==========================================
    obtenerReglasPosgrado(tipoPosgrado, programa) {
        if (tipoPosgrado === 'Doctorado') {
            return {
                periodos: ['Agosto - Diciembre', 'Enero - Mayo'],
                formasEvaluacion: []
            };
        }

        if (tipoPosgrado === 'Maestría') {
            const reglas = {
                // CORREGIDO: "Enseñanza de Ciencias Exactas" (sin "las")
                'Enseñanza de Ciencias Exactas': {
                    periodos: ['Agosto - Diciembre', 'Enero - Mayo', 'Mayo - Julio'],
                    formasEvaluacion: ['Examen de Admisión', 'Entrevista']
                },
                'Ciencias y Tecnologías de Seguridad': {
                    periodos: ['Agosto - Diciembre'],
                    formasEvaluacion: [
                        'Examen de Admisión en Mayo',
                        'Examen de Admisión en Julio',
                        'Cursos Propedéuticos de Mayo a Julio'
                    ]
                },
                'Ciencias y Tecnologías Biomédicas': {
                    periodos: ['Agosto - Diciembre'],
                    formasEvaluacion: [
                        'Examen de Admisión en Mayo',
                        'Examen de Admisión en Julio',
                        'Cursos Propedéuticos de Mayo a Julio'
                    ]
                },
                'Ciencias en el Área de Ciencia y Tecnología del Espacio': {
                    periodos: ['Agosto - Diciembre'],
                    formasEvaluacion: [
                        'Examen de Admisión en Mayo',
                        'Examen de Admisión en Julio',
                        'Cursos Propedéuticos de Mayo a Julio'
                    ]
                },
                'Ciencias en el Área de Ciencias Computacionales': {
                    periodos: ['Agosto - Diciembre'],
                    formasEvaluacion: [
                        'Examen de Admisión en Mayo',
                        'Examen de Admisión en Julio',
                        'Cursos Propedéuticos de Mayo a Julio',
                        'Ingreso por Desempeño Académico'
                    ]
                },
                'Ciencias en la Especialidad de Electrónica': {
                    periodos: ['Agosto - Diciembre'],
                    formasEvaluacion: [
                        'Examen de Admisión en Mayo',
                        'Examen de Admisión en Julio',
                        'Cursos Propedéuticos de Mayo a Julio'
                    ]
                },
                'Ciencias en la Especialidad de Óptica': {
                    periodos: ['Agosto - Diciembre'],
                    formasEvaluacion: [
                        'Examen de Admisión en Mayo',
                        'Examen de Admisión en Julio',
                        'Cursos Propedéuticos de Mayo a Julio'
                    ]
                },
                'Ciencias en la Especialidad de Astrofísica': {
                    periodos: ['Agosto - Diciembre'],
                    formasEvaluacion: [
                        'Examen de Admisión en Mayo',
                        'Examen de Admisión en Julio',
                        'Cursos Propedéuticos de Mayo a Julio'
                    ]
                }
            };

            return reglas[programa] || { periodos: [], formasEvaluacion: [] };
        }

        return { periodos: [], formasEvaluacion: [] };
    }

    // ==========================================
    // INICIALIZAR EVENTOS
    // ==========================================
    inicializarEventos() {
        // Evento para radios de posgrado
        this.radiosPosgrado.forEach(radio => {
            radio.addEventListener('change', (e) => {
                const tipo = e.target.value;
                this.actualizarPosgrado(tipo);
                this.renderizarPeriodosYEvaluaciones(tipo);
            });
        });

        // Evento para cambio en select de Maestría
        if (this.selectMaestria) {
            this.selectMaestria.addEventListener('change', () => {
                const tipoPosgrado = this.obtenerTipoPosgradoSeleccionado();
                if (tipoPosgrado === 'Maestría') {
                    this.renderizarPeriodosYEvaluaciones('Maestría');
                }
            });
        }

        // Evento para cambio en select de Doctorado
        if (this.selectDoctorado) {
            this.selectDoctorado.addEventListener('change', () => {
                const tipoPosgrado = this.obtenerTipoPosgradoSeleccionado();
                if (tipoPosgrado === 'Doctorado') {
                    this.renderizarPeriodosYEvaluaciones('Doctorado');
                }
            });
        }

        // Evento para parentesco
        if (this.selectParentesco) {
            this.selectParentesco.addEventListener('change', () => {
                const valor = this.selectParentesco.value;
                if (valor === 'OTRO') {
                    this.mostrarElemento(this.especificarParentescoContainer, true);
                    if (this.especificarParentesco) {
                        this.especificarParentesco.required = true;
                    }
                } else {
                    this.mostrarElemento(this.especificarParentescoContainer, false);
                    if (this.especificarParentesco) {
                        this.especificarParentesco.required = false;
                        this.especificarParentesco.value = '';
                        this.limpiarErrorCampo(this.especificarParentesco);
                    }
                }
            });
        }

        // Evento para nacionalidad
        document.querySelectorAll('input[name="nacionalidad"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                const esExtranjero = e.target.value === 'Otra (Extranjera)';
                this.actualizarCurp(esExtranjero);
            });
        });

        // Evento para titulación
        document.querySelectorAll('input[name="titulacion"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.actualizarTitulacion(e.target.value === 'Otro');
            });
        });

        // Evento para botón enviar
        if (this.btnEnviarModal) {
            this.btnEnviarModal.addEventListener('click', () => {
                this.manejarEnvio();
            });
        }

        // Evento para confirmar envío
        if (this.btnConfirmarEnvio) {
            this.btnConfirmarEnvio.addEventListener('click', () => {
                this.confirmarEnvio();
            });
        }

        // Inicializar elementos ocultos
        this.ocultarElementosIniciales();

        // Inicializar calendario
        this.inicializarCalendario();

        // Inicializar estado de CURP
        this.actualizarCurp(false);

        // Inicializar validación de números
        this.inicializarValidacionNumeros();
    }

    // ==========================================
    // INICIALIZAR VALIDACIÓN DE NÚMEROS
    // ==========================================
    inicializarValidacionNumeros() {
        document.querySelectorAll('.solo-numeros').forEach(campo => {
            campo.addEventListener('input', () => {
                this.limpiarCampoNumerico(campo);
            });
            campo.addEventListener('paste', () => {
                setTimeout(() => this.limpiarCampoNumerico(campo), 10);
            });
        });
    }

    // ==========================================
    // OBTENER TIPO DE POSGRADO SELECCIONADO
    // ==========================================
    obtenerTipoPosgradoSeleccionado() {
        const radioSeleccionado = document.querySelector('input[name="posgrado"]:checked');
        return radioSeleccionado ? radioSeleccionado.value : null;
    }

    // ==========================================
    // ACTUALIZAR POSGRADO
    // ==========================================
    actualizarPosgrado(tipoPosgrado) {
        const esMaestria = tipoPosgrado === 'Maestría';
        const esDoctorado = tipoPosgrado === 'Doctorado';

        this.mostrarElemento(this.divMaestrias, esMaestria);
        this.mostrarElemento(this.divDoctorados, esDoctorado);

        if (!esMaestria && this.selectMaestria) {
            this.selectMaestria.selectedIndex = 0;
            this.limpiarErrorCampo(this.selectMaestria);
        }

        if (!esDoctorado && this.selectDoctorado) {
            this.selectDoctorado.selectedIndex = 0;
            this.limpiarErrorCampo(this.selectDoctorado);
        }

        if (!esMaestria) {
            this.evaluacionContainer.style.display = 'none';
        }
    }

    // ==========================================
    // RENDERIZAR PERIODOS Y EVALUACIONES
    // ==========================================
    renderizarPeriodosYEvaluaciones(tipoPosgrado) {
        let programa = '';

        if (tipoPosgrado === 'Maestría' && this.selectMaestria) {
            programa = this.selectMaestria.value;
        } else if (tipoPosgrado === 'Doctorado' && this.selectDoctorado) {
            programa = this.selectDoctorado.value;
        }

        // Si no hay programa seleccionado o es "SELECCIONA", mostrar mensaje por defecto
        if (!programa || programa === 'SELECCIONA') {
            this.renderizarPeriodos([]);
            if (tipoPosgrado === 'Maestría') {
                this.renderizarFormasEvaluacion([]);
                this.evaluacionContainer.style.display = 'block';
            } else {
                this.evaluacionContainer.style.display = 'none';
            }
            return;
        }

        // Obtener reglas según el tipo de posgrado y programa
        const reglas = this.obtenerReglasPosgrado(tipoPosgrado, programa);
        
        // Renderizar periodos
        this.renderizarPeriodos(reglas.periodos);
        
        // Renderizar formas de evaluación (solo para maestría)
        if (tipoPosgrado === 'Maestría') {
            this.evaluacionContainer.style.display = 'block';
            this.renderizarFormasEvaluacion(reglas.formasEvaluacion);
        } else {
            this.evaluacionContainer.style.display = 'none';
        }
    }

    // ==========================================
    // RENDERIZAR PERIODOS
    // ==========================================
    renderizarPeriodos(periodos) {
        if (!this.opcionesPeriodo) return;

        // Limpiar radios seleccionados
        document.querySelectorAll('input[name="periodo"]').forEach(r => r.checked = false);

        if (!periodos || periodos.length === 0) {
            this.opcionesPeriodo.innerHTML = '<p class="periodo-mensaje">No hay periodos disponibles para esta selección.</p>';
            this.limpiarErrorPeriodo();
            return;
        }

        this.opcionesPeriodo.innerHTML = periodos.map(periodo => `
            <div class="radio">
                <label><input type="radio" name="periodo" value="${periodo}"> ${periodo}</label>
            </div>
        `).join('');

        this.limpiarErrorPeriodo();
    }

    // ==========================================
    // RENDERIZAR FORMAS DE EVALUACIÓN
    // ==========================================
    renderizarFormasEvaluacion(formasEvaluacion) {
        if (!this.evaluacionOpciones) return;

        // Limpiar radios seleccionados
        document.querySelectorAll('input[name="formaEvaluacion"]').forEach(r => r.checked = false);

        if (!formasEvaluacion || formasEvaluacion.length === 0) {
            this.evaluacionOpciones.innerHTML = '<p class="periodo-mensaje">No hay formas de evaluación disponibles.</p>';
            return;
        }

        this.evaluacionOpciones.innerHTML = formasEvaluacion.map(forma => `
            <div class="radio">
                <label><input type="radio" name="formaEvaluacion" value="${forma}"> ${forma}</label>
            </div>
        `).join('');
    }

    // ==========================================
    // MÉTODOS DE UTILIDAD
    // ==========================================
    ocultarElementosIniciales() {
        this.mostrarElemento(this.divMaestrias, false, false);
        this.mostrarElemento(this.divDoctorados, false, false);
        this.mostrarElemento(this.evaluacionContainer, false, false);
        this.mostrarElemento(this.especificarTitulacionContainer, false, false);
        this.mostrarElemento(this.especificarParentescoContainer, false, false);
        
        // Mostrar mensaje inicial en periodos
        if (this.opcionesPeriodo) {
            this.opcionesPeriodo.innerHTML = '<p class="periodo-mensaje">Selecciona un posgrado para ver los periodos disponibles.</p>';
        }
        
        // Mostrar mensaje inicial en evaluaciones
        if (this.evaluacionOpciones) {
            this.evaluacionOpciones.innerHTML = '<p class="periodo-mensaje">Selecciona una maestría para ver las evaluaciones disponibles.</p>';
        }
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

    inicializarCalendario() {
        const campoFecha = document.getElementById('fecha_nacimiento');
        if (!campoFecha) return;

        if (window.jQuery && window.jQuery.fn.datepicker) {
            window.jQuery('#fecha_nacimiento').datepicker({
                changeYear: true,
                yearRange: '-100:+0',
                dateFormat: 'dd/mm/yy',
                onSelect: function(dateText) {
                    this.value = dateText;
                    this.setCustomValidity('');
                    this.classList.remove('is-invalid');
                    this.classList.remove('error');
                    const error = this.closest('.datepicker-group')?.querySelector('.error-mensaje');
                    if (error) {
                        error.textContent = '';
                    }
                    this.dispatchEvent(new Event('input', { bubbles: true }));
                    this.dispatchEvent(new Event('change', { bubbles: true }));
                }
            });
            return;
        }

        campoFecha.type = 'date';
        campoFecha.removeAttribute('readonly');
        campoFecha.addEventListener('click', () => {
            if (campoFecha.showPicker) campoFecha.showPicker();
        });
    }

    limpiarCampoNumerico(campo) {
        const valorOriginal = campo.value;
        const valorLimpio = valorOriginal.replace(/\D/g, '');

        if (valorOriginal !== valorLimpio) {
            campo.value = valorLimpio;
            this.mostrarAlertaNumeros();
        }
    }

    mostrarAlertaNumeros() {
        document.querySelectorAll('.alerta-numeros').forEach(alerta => alerta.remove());

        const alerta = document.createElement('div');
        alerta.className = 'alerta-numeros';
        alerta.textContent = 'Solo se aceptan números en este campo';
        document.body.appendChild(alerta);

        setTimeout(() => alerta.remove(), 2500);
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

    limpiarErrorPeriodo() {
        if (this.errorPeriodo) this.errorPeriodo.textContent = '';
    }

    mostrarErrorPeriodo(mensaje) {
        if (this.errorPeriodo) this.errorPeriodo.textContent = mensaje;
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

    limpiarValidaciones() {
        document.querySelectorAll('.input-error').forEach(campo => campo.classList.remove('input-error'));
        document.querySelectorAll('.error-mensaje').forEach(mensaje => {
            mensaje.textContent = '';
        });
        this.ocultarBanners();
        this.limpiarErrorPeriodo();
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

    desplazarPrimerError() {
        const primerError = document.querySelector('.input-error');
        if (!primerError) return;

        const top = primerError.getBoundingClientRect().top + window.pageYOffset - 100;
        window.scrollTo({ top, behavior: 'smooth' });
    }

    // ==========================================
    // MANEJAR ENVÍO
    // ==========================================
    manejarEnvio() {
        this.limpiarValidaciones();
        
        // Disparar evento personalizado para que el Controller maneje la validación
        const evento = new CustomEvent('validarEnvio');
        document.dispatchEvent(evento);
    }

    // ==========================================
    // CONSTRUIR RESUMEN
    // ==========================================
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

        const nombreCompleto = `${datos.nombre || ''} ${datos.primerApellido || ''} ${datos.segundoApellido || ''}`.trim() || 'No especificado';
        const domicilio = datos.domicilio || {};
        const direccion = `${domicilio.calle || ''} ${domicilio.numExt || ''}, ${domicilio.colonia || ''}, CP ${domicilio.cp || ''}, ${domicilio.municipio || ''}, ${domicilio.estado || ''}`.trim() || 'No especificada';

        const datosAcademicos = datos.datosAcademicos || {};
        const posgradoDetalle = datosAcademicos.posgradoDetalle || 'No seleccionado';
        const anioIngreso = datosAcademicos.anioIngreso || 'No especificado';
        const periodo = datosAcademicos.periodo || 'No seleccionado';
        const formaEvaluacion = datosAcademicos.formaEvaluacion || '';

        const contacto = datos.contacto || {};
        const email = contacto.email || 'No especificado';

        const contactoEmergencia = datos.contactoEmergencia || {};
        const nombreEmergencia = `${contactoEmergencia.nombre || ''} ${contactoEmergencia.primerApellido || ''} ${contactoEmergencia.segundoApellido || ''}`.trim() || 'No especificado';

        const estudiosPrevios = datos.estudiosPrevios || {};
        const motivacion = datos.motivacion || {};

        let html = `
            <div class="section-title">📋 Datos personales</div>
            <ul>
                <li><strong>Nacionalidad:</strong> ${this.texto(datos.nacionalidad)}</li>
                <li><strong>CURP:</strong> ${this.texto(datos.curp)}</li>
                <li><strong>Nombre completo:</strong> ${this.texto(nombreCompleto)}</li>
                <li><strong>Sexo:</strong> ${this.texto(datos.sexo)}</li>
                <li><strong>Fecha de nacimiento:</strong> ${this.texto(datos.fechaNacimiento)}</li>
                <li><strong>Lugar de nacimiento:</strong> ${this.texto(datos.lugarNacimiento)}</li>
            </ul>

            <div class="section-title">📞 Contacto</div>
            <ul>
                <li><strong>Teléfono móvil:</strong> ${this.texto(contacto.telMovil)}</li>
                <li><strong>Correo electrónico:</strong> ${this.texto(email)}</li>
            </ul>

            <div class="section-title">🏠 Domicilio</div>
            <ul>
                <li><strong>Dirección:</strong> ${this.texto(direccion)}</li>
                <li><strong>País:</strong> ${this.texto(domicilio.pais)}</li>
            </ul>

            <div class="section-title">🚨 Contacto de emergencia</div>
            <ul>
                <li><strong>Nombre:</strong> ${this.texto(nombreEmergencia)}</li>
                <li><strong>Parentesco:</strong> ${this.texto(contactoEmergencia.parentesco)}</li>
            </ul>

            <div class="section-title">🎓 Datos académicos</div>
            <ul>
                <li><strong>Posgrado:</strong> ${this.texto(posgradoDetalle)}</li>
                <li><strong>Año de ingreso:</strong> ${this.texto(anioIngreso)}</li>
                <li><strong>Periodo:</strong> ${this.texto(periodo)}</li>
        `;

        if (formaEvaluacion) {
            html += `<li><strong>Forma de Evaluación:</strong> ${this.texto(formaEvaluacion)}</li>`;
        }

        html += `
            </ul>

            <div class="section-title">📚 Estudios previos</div>
            <ul>
                <li><strong>Institución:</strong> ${this.texto(estudiosPrevios.institucion)}</li>
                <li><strong>Grado:</strong> ${this.texto(estudiosPrevios.gradoAcademico)}</li>
                <li><strong>Promedio:</strong> ${this.texto(estudiosPrevios.promedio)}</li>
            </ul>

            <div class="section-title">💡 Motivación</div>
            <ul>
                <li><strong>Razón:</strong> ${this.texto(motivacion.razon)}</li>
            </ul>
        `;

        return html;
    }

    // ==========================================
    // MOSTRAR/OCULTAR RESUMEN
    // ==========================================
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

    // ==========================================
    // CONFIRMAR ENVÍO
    // ==========================================
    async confirmarEnvio() {
        try {
            this.ocultarResumen();
            
            const btn = this.btnConfirmarEnvio;
            const textoOriginal = btn.textContent;
            btn.textContent = '⏳ Enviando...';
            btn.disabled = true;

            // Disparar evento para que el Controller maneje el envío
            const evento = new CustomEvent('confirmarEnvio', {
                detail: { btn, textoOriginal }
            });
            document.dispatchEvent(evento);
            
        } catch (error) {
            console.error('❌ Error:', error);
            if (this.btnConfirmarEnvio) {
                this.btnConfirmarEnvio.disabled = false;
                this.btnConfirmarEnvio.textContent = 'Confirmar envío';
            }
            alert('❌ Ocurrió un error al enviar la solicitud');
        }
    }
}

// ==========================================
// EXPORTAR CLASE PARA USO GLOBAL
// ==========================================
if (typeof window !== 'undefined') {
    window.AdmisionView = AdmisionView;
}

console.log('📦 Clase AdmisionView cargada correctamente');