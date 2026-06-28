// models/Model.js

class AdmisionModel {
    constructor() {
        this.datos = {};
    }

    // ==========================================
    // VALIDACIÓN DE EMAIL
    // ==========================================
    validarEmail(email) {
        // Verificar que tenga @
        if (!email || !email.includes('@')) {
            return { valido: false, mensaje: 'El correo debe contener @' };
        }
        
        // Verificar formato completo con regex
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return { valido: false, mensaje: 'Formato de correo electrónico inválido' };
        }
        
        return { valido: true, mensaje: 'Correo válido' };
    }

    // ==========================================
    // VALIDACIÓN DE EMAIL EN FRONTEND
    // ==========================================
    validarEmailFrontend() {
        const emailInput = document.getElementById('email');
        const email = emailInput ? emailInput.value.trim() : '';
        const resultado = this.validarEmail(email);
        
        if (emailInput) {
            if (resultado.valido) {
                emailInput.classList.remove('is-invalid');
                emailInput.classList.add('is-valid');
                emailInput.setCustomValidity('');
            } else {
                emailInput.classList.add('is-invalid');
                emailInput.classList.remove('is-valid');
                emailInput.setCustomValidity(resultado.mensaje);
            }
        }
        
        return resultado;
    }

    // ==========================================
    // OBTENER VALOR DE INPUT
    // ==========================================
    obtenerValor(id) {
        const elemento = document.getElementById(id);
        return elemento ? elemento.value.trim() : '';
    }

    // ==========================================
    // OBTENER TEXTO DE SELECT
    // ==========================================
    obtenerTextoSelect(id) {
        const select = document.getElementById(id);
        if (!select || select.selectedIndex < 0) return '';
        return select.options[select.selectedIndex].text.trim();
    }

    // ==========================================
    // OBTENER RADIO BUTTON
    // ==========================================
    obtenerRadio(formulario, nombre) {
        return formulario.querySelector(`input[name="${nombre}"]:checked`)?.value || '';
    }

    obtenerRadioExacto(nombre) {
        const radio = document.querySelector(`input[name="${nombre}"]:checked`);
        return radio ? radio.value : '';
    }

    // ==========================================
    // OBTENER PARENTESCO
    // ==========================================
    obtenerParentesco() {
        const parentesco = this.obtenerValor('parentesco');
        if (parentesco === 'OTRO') {
            return this.obtenerValor('especificarParentesco') || 'OTRO';
        }
        return parentesco;
    }

    // ==========================================
    // OBTENER TIPO DE CALLE
    // ==========================================
    obtenerTipoCalle() {
        const tipoCalle = this.obtenerValor('tipoCalle');
        if (tipoCalle === 'OTRO') {
            const especificacion = this.obtenerValor('especificarCalle');
            return especificacion || 'OTRO';
        }
        return tipoCalle;
    }

    // ==========================================
    // OBTENER NACIONALIDAD COMPLETA
    // ==========================================
    obtenerNacionalidadCompleta(formulario) {
        const nacionalidadBase = this.obtenerRadio(formulario, 'nacionalidad');
        
        if (nacionalidadBase === 'Mexicana') {
            return 'Mexicana';
        }
        
        const nacionalidadExtranjera = this.obtenerValor('nacionalidadExtranjera');
        
        if (!nacionalidadExtranjera || nacionalidadExtranjera === 'SELECCIONA') {
            return 'Extranjera';
        }
        
        return nacionalidadExtranjera;
    }

    // ==========================================
    // OBTENER DETALLE DE POSGRADO (con Especialidad)
    // ==========================================
    obtenerPosgradoDetalle(formulario) {
        const tipo = this.obtenerRadio(formulario, 'posgrado');

        if (tipo === 'Maestría') {
            const especialidad = this.obtenerTextoSelect('maestriaSelect');
            return especialidad && especialidad !== 'SELECCIONA'
                ? `Maestría en ${especialidad}`
                : 'Maestría';
        }

        if (tipo === 'Doctorado') {
            const especialidad = this.obtenerTextoSelect('doctoradoSelect');
            return especialidad && especialidad !== 'SELECCIONA'
                ? `Doctorado en ${especialidad}`
                : 'Doctorado';
        }

        if (tipo === 'Especialidad') {
            const especialidad = this.obtenerTextoSelect('especialidadSelect');
            return especialidad && especialidad !== 'SELECCIONA'
                ? `Especialidad en ${especialidad}`
                : 'Especialidad';
        }

        return 'No seleccionado';
    }

    // ==========================================
    // OBTENER TIPO DE TITULACIÓN
    // ==========================================
    obtenerTipoTitulacion(formulario) {
        const tipo = this.obtenerRadio(formulario, 'titulacion') || 'No seleccionado';
        if (tipo !== 'Otro') return tipo;
        return `${tipo} - ${this.obtenerValor('especificarTitulacion') || 'No especificado'}`;
    }

    // ==========================================
    // OBTENER EXPERIENCIA LABORAL
    // ==========================================
    obtenerExperienciaLaboral() {
        const experiencias = [];
        const filas = document.querySelectorAll('#tablaExperiencia tbody tr');
        
        filas.forEach(fila => {
            const inputs = fila.querySelectorAll('input');
            const select = fila.querySelector('select');
            
            if (inputs.length >= 3) {
                const institucion = inputs[0]?.value?.trim() || '';
                const puesto = inputs[1]?.value?.trim() || '';
                const tiempo = inputs[2]?.value?.trim() || '';
                const tipoExperiencia = select?.value || '';
                
                if (institucion) {
                    experiencias.push({
                        institucion: institucion,
                        tipoExperiencia: tipoExperiencia || 'No especificado',
                        puesto: puesto || 'No especificado',
                        tiempoLaborado: tiempo || 'No especificado'
                    });
                }
            }
        });
        
        return experiencias;
    }

    // ==========================================
    // OBTENER PUBLICACIONES
    // ==========================================
    obtenerPublicaciones() {
        const publicaciones = [];
        const contenedores = document.querySelectorAll('#formAdmision .row.g-3.mb-3');
        
        contenedores.forEach(contenedor => {
            const inputs = contenedor.querySelectorAll('input');
            if (inputs.length >= 3) {
                const titulo = inputs[0]?.value?.trim() || '';
                const tipo = inputs[1]?.value?.trim() || '';
                const doi = inputs[2]?.value?.trim() || '';
                
                if (titulo) {
                    publicaciones.push({
                        titulo: titulo,
                        tipoPublicacion: tipo || 'No especificado',
                        doi: doi || 'No especificado'
                    });
                }
            }
        });
        
        return publicaciones;
    }

    // ==========================================
    // OBTENER DOMINIO DE INGLÉS
    // ==========================================
    obtenerDominioIngles() {
        return {
            expresionEscrita: this.obtenerRadioExacto('ingles.ingles1') || 'No especificado',
            expresionOral: this.obtenerRadioExacto('ingles.ingles2') || 'No especificado',
            comprensionLectora: this.obtenerRadioExacto('ingles.ingles3') || 'No especificado',
            comprensionAuditiva: this.obtenerRadioExacto('ingles.ingles4') || 'No especificado'
        };
    }

    // ==========================================
    // MAPEAR DATOS DEL FORMULARIO
    // ==========================================
    mapearDatosFormulario(formulario) {
        const email = this.obtenerValor('email');
        
        // Validar email antes de continuar
        const validacionEmail = this.validarEmail(email);
        if (!validacionEmail.valido) {
            throw new Error(validacionEmail.mensaje);
        }
        
        this.datos = {
            nacionalidad: this.obtenerNacionalidadCompleta(formulario),
            curp: this.obtenerValor('curp'),
            nombre: this.obtenerValor('nombre'),
            primerApellido: this.obtenerValor('primerApellido'),
            segundoApellido: this.obtenerValor('segundoApellido'),
            sexo: this.obtenerValor('sexo'),
            fechaNacimiento: this.obtenerValor('fecha_nacimiento'),
            lugarNacimiento: this.obtenerValor('lugarNacimiento'),
            
            contacto: {
                lada: this.obtenerValor('lada'),
                telFijo: this.obtenerValor('telFijo'),
                ext: this.obtenerValor('ext'),
                telMovil: this.obtenerValor('telMovil'),
                email: email
            },
            
            domicilio: {
                cp: this.obtenerValor('cp'),
                estado: this.obtenerValor('estado'),
                municipio: this.obtenerValor('municipio'),
                localidad: this.obtenerValor('localidad'),
                colonia: this.obtenerValor('colonia'),
                tipoCalle: this.obtenerTipoCalle(),
                calle: this.obtenerValor('calle'),
                numExt: this.obtenerValor('numExt'),
                numInt: this.obtenerValor('numInt'),
                pais: this.obtenerValor('pais')
            },
            
            contactoEmergencia: {
                nombre: this.obtenerValor('nombreEmergencia'),
                primerApellido: this.obtenerValor('primerApellidoEmergencia'),
                segundoApellido: this.obtenerValor('segundoApellidoEmergencia'),
                lada: this.obtenerValor('ladaEmergencia'),
                telFijo: this.obtenerValor('telFijoEmergencia'),
                ext: this.obtenerValor('extEmergencia'),
                telMovil: this.obtenerValor('telMovilEmergencia'),
                parentesco: this.obtenerParentesco()
            },
            
            datosAcademicos: {
                posgrado: this.obtenerRadio(formulario, 'posgrado'),
                posgradoDetalle: this.obtenerPosgradoDetalle(formulario),
                maestria: this.obtenerValor('maestriaSelect'),
                doctorado: this.obtenerValor('doctoradoSelect'),
                especialidad: this.obtenerValor('especialidadSelect'),
                anioIngreso: this.obtenerValor('anioIngreso'),
                periodo: this.obtenerRadio(formulario, 'periodo'),
                formaEvaluacion: this.obtenerRadio(formulario, 'formaEvaluacion')
            },
            
            estudiosPrevios: {
                institucion: this.obtenerValor('institucion'),
                gradoAcademico: this.obtenerValor('gradoAcademico'),
                anioGrado: this.obtenerValor('anioGrado'),
                promedio: this.obtenerValor('promedio'),
                tipoTitulacion: this.obtenerTipoTitulacion(formulario)
            },
            
            dominioIngles: this.obtenerDominioIngles(),
            
            experienciaLaboral: this.obtenerExperienciaLaboral(),
            
            publicaciones: this.obtenerPublicaciones(),
            
            motivacion: {
                razon: this.obtenerValor('razon'),
                medio: this.obtenerRadio(formulario, 'medio')
            }
        };

        return this.datos;
    }

    // ==========================================
    // ENVIAR DATOS CON VALIDACIÓN DE EMAIL
    // ==========================================
    enviarDatos() {
        if (!this.datos || !this.datos.contacto || !this.datos.contacto.email) {
            return Promise.reject({
                codigo: 400,
                mensaje: 'Datos incompletos: El correo electrónico es obligatorio'
            });
        }

        const validacionEmail = this.validarEmail(this.datos.contacto.email);
        if (!validacionEmail.valido) {
            return Promise.reject({
                codigo: 400,
                mensaje: validacionEmail.mensaje
            });
        }

        console.log('Email validado correctamente:', this.datos.contacto.email);
        console.log('Estructura JSON generada por el Modelo:', JSON.stringify(this.datos, null, 2));
        
        return Promise.resolve({ 
            codigo: 200, 
            mensaje: 'Datos transferidos exitosamente al servidor.',
            email: this.datos.contacto.email
        });
    }
}

// ==========================================
// EXPORTAR CLASE PARA USO GLOBAL
// ==========================================
if (typeof window !== 'undefined') {
    window.AdmisionModel = AdmisionModel;
}

console.log('Clase AdmisionModel cargada correctamente con validación de email');