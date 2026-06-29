// controllers/Controller.js

class AdmisionController {
    constructor(modelo, vista) {
        this.model = modelo;
        this.view = vista;
        console.log('🔧 Controller inicializado');
        this.inicializar();
    }

    inicializar() {
        console.log('🔧 Inicializando controlador...');
        this.view.inicializarCalendario();
        this.view.ocultarElementosIniciales();
        this.vincularEventos();
        this.actualizarCurp();
        this.actualizarTitulacion();
        this.inicializarLada();
        this.inicializarAnioIngreso();
        this.inicializarValidacionEmail();
        
        if (this.view.selectParentesco) {
            this.view.selectParentesco.dispatchEvent(new Event('change'));
        }

        if (this.view.selectTipoCalle) {
            this.view.selectTipoCalle.dispatchEvent(new Event('change'));
        }
        
        console.log('✅ Controller inicializado correctamente');
    }
    
    vincularEventos() {
        console.log('🔗 Vinculando eventos...');
        
        // Evento para nacionalidad
        document.querySelectorAll('input[name="nacionalidad"]').forEach(radio => {
            radio.addEventListener('change', () => this.actualizarCurp());
        });

        // Evento para titulación
        document.querySelectorAll('input[name="titulacion"]').forEach(radio => {
            radio.addEventListener('change', () => this.actualizarTitulacion());
        });

        // Evento para campos numéricos y domicilios
        document.addEventListener('input', evento => {
            if (evento.target.classList.contains('solo-numeros')) {
                this.view.limpiarCampoNumerico(evento.target);
            }
            if (evento.target.classList.contains('numero-domicilio')) {
                evento.target.value = evento.target.value
                    .toUpperCase()
                    .replace(/[^A-Z0-9\-\/ ]/g, '');
            }
        });

        // Evento para el botón enviar - Usar evento directo
        const btnEnviarModal = document.getElementById('btnEnviarModal');
        if (btnEnviarModal) {
            console.log('✅ Botón "Enviar solicitud" vinculado desde Controller');
            btnEnviarModal.addEventListener('click', (evento) => {
                evento.preventDefault();
                console.log('🖱️ Click en "Enviar solicitud" desde Controller');
                this.validarYMostrarResumen();
            });
        } else {
            console.warn('⚠️ Botón "btnEnviarModal" no encontrado en Controller');
        }

        // Evento para confirmar envío - Usar evento directo
        const btnConfirmar = document.getElementById('confirmarEnvio');
        if (btnConfirmar) {
            console.log('✅ Botón "Confirmar envío" vinculado desde Controller');
            btnConfirmar.addEventListener('click', () => {
                console.log('🖱️ Click en "Confirmar envío" desde Controller');
                this.view.ocultarResumen();
                this.enviarDatos();
            });
        } else {
            console.warn('⚠️ Botón "confirmarEnvio" no encontrado en Controller');
        }

        // Escuchar eventos personalizados (respaldo)
        document.addEventListener('validarEnvio', () => {
            console.log('📡 Evento "validarEnvio" recibido');
            this.validarYMostrarResumen();
        });

        document.addEventListener('confirmarEnvio', (e) => {
            console.log('📡 Evento "confirmarEnvio" recibido');
            this.view.ocultarResumen();
            this.enviarDatos();
        });
        
        console.log('✅ Eventos vinculados correctamente');
    }

    // ==========================================
    // INICIALIZAR LADA CON "+"
    // ==========================================
    inicializarLada() {
        ['lada', 'ladaEmergencia'].forEach(id => {
            const input = document.getElementById(id);
            if (!input) return;
            input.value = '+';
            input.addEventListener('focus', () => {
                if (input.value === '') {
                    input.value = '+';
                }
            });
            input.addEventListener('input', () => {
                let numeros = input.value.replace(/\D/g, '');
                numeros = numeros.substring(0, 4);
                input.value = '+' + numeros;
            });
            input.addEventListener('keydown', (e) => {
                if (
                    (e.key === 'Backspace' || e.key === 'Delete') &&
                    input.selectionStart <= 1
                ) {
                    e.preventDefault();
                }
                if (e.key === 'Home') {
                    e.preventDefault();
                    input.setSelectionRange(1, 1);
                }
            });
            input.addEventListener('click', () => {
                if (input.selectionStart === 0) {
                    input.setSelectionRange(1, 1);
                }
            });
            input.addEventListener('paste', (e) => {
                e.preventDefault();
                const texto = (e.clipboardData || window.clipboardData)
                    .getData('text')
                    .replace(/\D/g, '')
                    .substring(0, 4);
                input.value = '+' + texto;
            });
        });
    }

    // ==========================================
    // INICIALIZAR AÑO DE INGRESO FIJO EN 2026
    // ==========================================
    inicializarAnioIngreso() {
        const input = document.getElementById('anioIngreso');
        if (!input) return;
        input.value = '2026';
        input.addEventListener('focus', () => {
            if (input.value === '') {
                input.value = '2026';
            }
        });
        input.addEventListener('input', () => {
            let numeros = input.value.replace(/\D/g, '');
            if (!numeros.startsWith('2026')) {
                numeros = '2026';
            }
            input.value = numeros.substring(0, 4);
        });
        input.addEventListener('keydown', (e) => {
            if (
                (e.key === 'Backspace' || e.key === 'Delete') &&
                input.selectionStart <= 4
            ) {
                e.preventDefault();
            }
            if (e.key === 'Home') {
                e.preventDefault();
                input.setSelectionRange(4, 4);
            }
        });
        input.addEventListener('click', () => {
            if (input.selectionStart < 4) {
                input.setSelectionRange(4, 4);
            }
        });
        input.addEventListener('paste', (e) => {
            e.preventDefault();
            input.value = '2026';
        });
    }

    // ==========================================
    // INICIALIZAR VALIDACIÓN DE EMAIL
    // ==========================================
    inicializarValidacionEmail() {
        const emailInput = document.getElementById('email');
        if (!emailInput) return;

        emailInput.addEventListener('input', () => {
            this.validarEmailEnTiempoReal();
        });
        emailInput.addEventListener('blur', () => {
            this.validarEmailEnTiempoReal();
        });
        emailInput.addEventListener('paste', () => {
            setTimeout(() => {
                this.validarEmailEnTiempoReal();
            }, 100);
        });

        console.log('✅ Validación de email inicializada');
    }

    validarEmailEnTiempoReal() {
        const emailInput = document.getElementById('email');
        if (!emailInput) return;

        const email = emailInput.value.trim();
        const resultado = this.model.validarEmail(email);

        if (email === '') {
            emailInput.classList.remove('is-valid', 'is-invalid');
            emailInput.setCustomValidity('');
            this.view.limpiarErrorCampo(emailInput);
        } else if (resultado.valido) {
            emailInput.classList.remove('is-invalid');
            emailInput.classList.add('is-valid');
            emailInput.setCustomValidity('');
            this.view.limpiarErrorCampo(emailInput);
        } else {
            emailInput.classList.add('is-invalid');
            emailInput.classList.remove('is-valid');
            emailInput.setCustomValidity(resultado.mensaje);
            this.view.mostrarErrorCampo(emailInput, resultado.mensaje);
        }
    }

    validarEmailParaEnvio() {
        const emailInput = document.getElementById('email');
        const email = emailInput ? emailInput.value.trim() : '';
        
        if (!email) {
            this.view.mostrarErrorCampo(emailInput, 'El correo electrónico es obligatorio');
            return false;
        }

        if (!email.includes('@')) {
            this.view.mostrarErrorCampo(emailInput, 'El correo electrónico debe contener "@"');
            return false;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            this.view.mostrarErrorCampo(emailInput, 'Formato de correo electrónico inválido');
            return false;
        }

        this.view.limpiarErrorCampo(emailInput);
        return true;
    }

    actualizarCurp() {
        const nacionalidad = this.view.form.querySelector('input[name="nacionalidad"]:checked')?.value;
        this.view.actualizarCurp(nacionalidad === 'Otra (Extranjera)');
    }

    actualizarTitulacion() {
        const titulacion = this.view.form.querySelector('input[name="titulacion"]:checked')?.value;
        this.view.actualizarTitulacion(titulacion === 'Otro');
    }

    // ==========================================
    // VALIDACIONES CORREGIDAS
    // ==========================================
    validarCamposRequeridos() {
        let esValido = true;
        const radiosRevisados = new Set();

        const camposRequeridos = this.view.form.querySelectorAll('[required]');
        console.log('🔍 Validando', camposRequeridos.length, 'campos requeridos');
        
        camposRequeridos.forEach(campo => {
            if (campo.disabled) {
                return;
            }

            // Saltar CURP si es extranjero
            if (campo.id === 'curp' && this.view.esNacionalidadExtranjera()) {
                console.log('⏭️ CURP omitido (extranjero)');
                return;
            }

            if (campo.type === 'radio') {
                if (radiosRevisados.has(campo.name)) return;
                radiosRevisados.add(campo.name);

                const seleccionado = this.view.form.querySelector(`input[name="${campo.name}"]:checked`);
                if (!seleccionado) {
                    esValido = false;
                    this.view.mostrarErrorGrupoRadio(campo, 'Este campo es obligatorio');
                }
                return;
            }

            if (!this.validarCampoObligatorio(campo)) {
                esValido = false;
            }
        });

        return esValido;
    }

    validarCampoObligatorio(campo) {
        if (campo.disabled) return true;

        const valor = campo.value ? campo.value.trim() : '';
        if (valor === '' || valor === 'SELECCIONA') {
            this.view.mostrarErrorCampo(campo, 'Este campo es obligatorio');
            return false;
        }

        this.view.limpiarErrorCampo(campo);
        return true;
    }

    validarSelectPosgrado() {
        const posgrado = this.view.form.querySelector('input[name="posgrado"]:checked')?.value;

        if (posgrado === 'Maestría' && this.view.selectMaestria) {
            const valor = this.view.selectMaestria.value;
            if (!valor || valor === 'SELECCIONA') {
                this.view.mostrarErrorCampo(this.view.selectMaestria, 'Selecciona una maestría');
                return false;
            }
        }

        if (posgrado === 'Doctorado' && this.view.selectDoctorado) {
            const valor = this.view.selectDoctorado.value;
            if (!valor || valor === 'SELECCIONA') {
                this.view.mostrarErrorCampo(this.view.selectDoctorado, 'Selecciona un doctorado');
                return false;
            }
        }

        if (posgrado === 'Especialidad' && this.view.selectEspecialidad) {
            const valor = this.view.selectEspecialidad.value;
            if (!valor || valor === 'SELECCIONA') {
                this.view.mostrarErrorCampo(this.view.selectEspecialidad, 'Selecciona una especialidad');
                return false;
            }
        }

        return true;
    }

    validarPeriodo() {
        const periodoSeleccionado = document.querySelector('input[name="periodo"]:checked');
        const tieneOpciones = this.view.opcionesPeriodo?.querySelectorAll('input[name="periodo"]').length > 0;
        
        if (!periodoSeleccionado && tieneOpciones) {
            this.view.mostrarErrorPeriodo('Selecciona un periodo de ingreso');
            return false;
        }

        this.view.limpiarErrorPeriodo();
        return true;
    }

    validarParentesco() {
        return this.view.validarParentesco();
    }

    validarTipoCalle() {
        return this.view.validarTipoCalle();
    }

    validarPais() {
        return this.view.validarPais();
    }

    // ==========================================
    // VALIDAR Y MOSTRAR RESUMEN
    // ==========================================
    validarYMostrarResumen() {
        console.log('📋 Iniciando validación...');
        this.view.limpiarValidaciones();

        const emailValido = this.validarEmailParaEnvio();
        const requeridosValidos = this.validarCamposRequeridos();
        const posgradoValido = this.validarSelectPosgrado();
        const periodoValido = this.validarPeriodo();
        const parentescoValido = this.validarParentesco();
        const tipoCalleValido = this.validarTipoCalle();
        const paisValido = this.validarPais();
        const nacionalidadExtranjeraValida = this.view.validarNacionalidadExtranjera();

        const esValido = emailValido &&
                         requeridosValidos && 
                         posgradoValido && 
                         periodoValido && 
                         parentescoValido && 
                         tipoCalleValido && 
                         paisValido &&
                         nacionalidadExtranjeraValida;

        console.log('📊 Validación completa:', esValido ? '✅ Válida' : '❌ Inválida');

        if (!esValido) {
            this.view.mostrarBanner('error');
            this.view.desplazarPrimerError();
            
            if (!emailValido) {
                const emailInput = document.getElementById('email');
                if (emailInput) {
                    emailInput.focus();
                }
            }
            return;
        }

        try {
            const datos = this.model.mapearDatosFormulario(this.view.form);
            const html = this.view.construirResumen(datos);
            this.view.mostrarResumen(html);
        } catch (error) {
            console.error('❌ Error al mapear datos:', error);
            this.view.mostrarBanner('error');
            alert(error.message);
        }
    }

    // ==========================================
    // ENVIAR DATOS CON VALIDACIÓN DE EMAIL
    // ==========================================
    async enviarDatos() {
        try {
            if (!this.validarEmailParaEnvio()) {
                const emailInput = document.getElementById('email');
                if (emailInput) {
                    emailInput.focus();
                    emailInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                this.view.mostrarBanner('error');
                return;
            }

            const btn = document.getElementById('confirmarEnvio');
            if (btn) {
                const textoOriginal = btn.textContent;
                btn.textContent = 'Enviando...';
                btn.disabled = true;

                const datos = this.model.mapearDatosFormulario(this.view.form);
                
                console.log('📤 Enviando datos:', datos);
                
                // Aquí iría la llamada al backend
                // const resultado = await enviarDatosAlServidor(datos);
                
                // Simulación de envío exitoso
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                btn.textContent = textoOriginal;
                btn.disabled = false;
                
                this.view.mostrarBanner('exito');
                alert('✅ Solicitud enviada con éxito. Pronto recibirás respuesta del INAOE.');
            }
            
        } catch (error) {
            console.error('❌ Error al enviar:', error);
            alert('Error al enviar la solicitud. Por favor intenta de nuevo.');
            
            const btn = document.getElementById('confirmarEnvio');
            if (btn) {
                btn.disabled = false;
                btn.textContent = 'Confirmar envío';
            }
        }
    }
}

// ==========================================
// INICIALIZACIÓN
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Inicializando aplicación...');
    
    if (typeof AdmisionModel === 'undefined') {
        console.error('❌ AdmisionModel no está definida');
        return;
    }
    if (typeof AdmisionView === 'undefined') {
        console.error('❌ AdmisionView no está definida');
        return;
    }
    
    try {
        const model = new AdmisionModel();
        const view = new AdmisionView();
        const controller = new AdmisionController(model, view);
        
        window.controller = controller;
        window.view = view;
        
        console.log('✅ Aplicación inicializada correctamente');
    } catch (error) {
        console.error('❌ Error al inicializar:', error);
    }
});