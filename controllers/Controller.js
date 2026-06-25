// controllers/Controller.js - CORREGIDO

class AdmisionController {
    constructor(modelo, vista) {
        this.model = modelo;
        this.view = vista;
        this.inicializar();
    }

    inicializar() {
        this.view.inicializarCalendario();
        this.view.ocultarElementosIniciales();
        this.vincularEventos();
        this.actualizarCurp();
        this.actualizarTitulacion();
        
        if (this.view.selectParentesco) {
            this.view.selectParentesco.dispatchEvent(new Event('change'));
        }
    }
    
    vincularEventos() {
        // ==========================================
        // IMPORTANTE: Los eventos de posgrado ya están
        // en la View, NO los dupliques aquí
        // ==========================================

        // Evento para nacionalidad
        document.querySelectorAll('input[name="nacionalidad"]').forEach(radio => {
            radio.addEventListener('change', () => this.actualizarCurp());
        });

        // Evento para titulación
        document.querySelectorAll('input[name="titulacion"]').forEach(radio => {
            radio.addEventListener('change', () => this.actualizarTitulacion());
        });

        // Evento para inputs numéricos
        document.addEventListener('input', evento => {
            if (evento.target.classList.contains('solo-numeros')) {
                this.view.limpiarCampoNumerico(evento.target);
            }
        });

        // Evento para el botón enviar
        document.getElementById('btnEnviarModal')?.addEventListener('click', (evento) => {
            evento.preventDefault();
            this.validarYMostrarResumen();
        });

        // Evento para confirmar envío
        document.getElementById('confirmarEnvio')?.addEventListener('click', () => {
            this.view.ocultarResumen();
            this.enviarDatos();
        });
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
    // ENVIAR DATOS
    // ==========================================
    async enviarDatos() {
        try {
            const btn = document.getElementById('confirmarEnvio');
            const textoOriginal = btn.textContent;
            btn.textContent = '⏳ Enviando...';
            btn.disabled = true;

            const datos = this.model.mapearDatosFormulario(this.view.form);
            
            // Simular envío - reemplazar con tu fetch real
            console.log('Datos a enviar:', datos);
            
            // Si tienes un endpoint real, descomenta esto:
            /*
            const response = await fetch('tu-endpoint', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos)
            });
            const resultado = await response.json();
            */
            
            // Simular delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            btn.textContent = textoOriginal;
            btn.disabled = false;
            
            this.view.mostrarBanner('exito');
            alert('✅ Solicitud enviada con éxito. Pronto recibirás respuesta del INAOE.');
            
        } catch (error) {
            console.error('❌ Error al enviar:', error);
            const btn = document.getElementById('confirmarEnvio');
            if (btn) {
                btn.disabled = false;
                btn.textContent = 'Confirmar envío';
            }
            alert('❌ Error al enviar la solicitud. Por favor intenta de nuevo.');
        }
    }

    // ==========================================
    // VALIDACIONES
    // ==========================================
    validarCamposRequeridos() {
        let esValido = true;
        const radiosRevisados = new Set();

        this.view.form.querySelectorAll('[required]').forEach(campo => {
            if (campo.disabled) return;

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

    // ==========================================
    // 👇 NUEVO: VALIDAR Y MOSTRAR RESUMEN
    // ==========================================
    validarYMostrarResumen() {
        this.view.limpiarValidaciones();

        const requeridosValidos = this.validarCamposRequeridos();
        const posgradoValido = this.validarSelectPosgrado();
        const periodoValido = this.validarPeriodo();
        const parentescoValido = this.validarParentesco();
        
        // 👇 NUEVO: Validar nacionalidad extranjera
        const nacionalidadExtranjeraValida = this.view.validarNacionalidadExtranjera();

        const esValido = requeridosValidos && 
                         posgradoValido && 
                         periodoValido && 
                         parentescoValido && 
                         nacionalidadExtranjeraValida;

        if (!esValido) {
            this.view.mostrarBanner('error');
            this.view.desplazarPrimerError();
            return;
        }

        // Obtener datos y mostrar resumen
        const datos = this.model.mapearDatosFormulario(this.view.form);
        const html = this.view.construirResumen(datos);
        this.view.mostrarResumen(html);
    }
}

// ==========================================
// INICIALIZACIÓN
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Inicializando aplicación...');
    
    // Verificar que las clases existen
    if (typeof AdmisionModel === 'undefined') {
        console.error('❌ AdmisionModel no está definida');
        return;
    }
    if (typeof AdmisionView === 'undefined') {
        console.error('❌ AdmisionView no está definida');
        return;
    }
    
    try {
        // Crear instancias
        const model = new AdmisionModel();
        const view = new AdmisionView();
        const controller = new AdmisionController(model, view);
        
        // Exponer para debugging
        window.controller = controller;
        window.view = view;
        
        console.log('✅ Aplicación inicializada correctamente');
        console.log('📋 Para depurar, usa window.controller y window.view');
        
    } catch (error) {
        console.error('❌ Error al inicializar:', error);
    }
});