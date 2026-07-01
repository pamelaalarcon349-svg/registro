// models/Model.js

class AdmisionModel {
    constructor() {
        this.datos = {};
    }

    // ==========================================
    // VALIDACIÓN DE EMAIL
    // ==========================================
    validarEmail(email) {
        if (!email || email.trim() === '') {
            return { valido: false, mensaje: 'El correo electrónico es obligatorio' };
        }
        
        if (!email.includes('@')) {
            return { valido: false, mensaje: 'El correo electrónico debe contener "@"' };
        }
        
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return { valido: false, mensaje: 'Formato de correo electrónico inválido' };
        }
        
        return { valido: true, mensaje: 'Correo válido' };
    }

    // ==========================================
    // VALIDACIÓN DE CURP
    // ==========================================
    validarCURP(curp) {
        if (!curp || curp.trim() === '') {
            return { valido: false, mensaje: 'La CURP es obligatoria' };
        }
        
        const curpLimpio = curp.trim().toUpperCase();
        if (curpLimpio.length !== 18) {
            return { valido: false, mensaje: 'La CURP debe tener exactamente 18 caracteres' };
        }
        
        const curpRegex = /^[A-Z]{4}[0-9]{6}[A-Z]{6}[0-9]{2}$/;
        if (!curpRegex.test(curpLimpio)) {
            return { valido: false, mensaje: 'Formato de CURP inválido' };
        }
        
        return { valido: true, mensaje: 'CURP válida' };
    }

    // ==========================================
    // VALIDACIÓN DE TELÉFONO
    // ==========================================
    validarTelefono(telefono) {
        if (!telefono || telefono.trim() === '') {
            return { valido: false, mensaje: 'El teléfono es obligatorio' };
        }
        
        const telefonoLimpio = telefono.replace(/\D/g, '');
        if (telefonoLimpio.length < 7 || telefonoLimpio.length > 15) {
            return { valido: false, mensaje: 'El teléfono debe tener entre 7 y 15 dígitos' };
        }
        
        return { valido: true, mensaje: 'Teléfono válido' };
    }

    // ==========================================
    // VALIDACIÓN DE CÓDIGO POSTAL
    // ==========================================
    validarCP(cp) {
        if (!cp || cp.trim() === '') {
            return { valido: false, mensaje: 'El código postal es obligatorio' };
        }
        
        const cpLimpio = cp.replace(/\D/g, '');
        if (cpLimpio.length < 5 || cpLimpio.length > 10) {
            return { valido: false, mensaje: 'El código postal debe tener entre 5 y 10 dígitos' };
        }
        
        return { valido: true, mensaje: 'Código postal válido' };
    }

    // ==========================================
    // VALIDACIÓN DE PROMEDIO
    // ==========================================
    validarPromedio(promedio) {
        if (!promedio || promedio.trim() === '') {
            return { valido: false, mensaje: 'El promedio es obligatorio' };
        }
        
        const num = parseFloat(promedio);
        if (isNaN(num)) {
            return { valido: false, mensaje: 'Debe ser un número válido' };
        }
        
        if (num < 0 || num > 10) {
            return { valido: false, mensaje: 'El promedio debe estar entre 0 y 10' };
        }
        
        return { valido: true, mensaje: 'Promedio válido' };
    }

    // ==========================================
    // VALIDACIÓN DE FECHA
    // ==========================================
    validarFecha(fecha) {
        if (!fecha || fecha.trim() === '') {
            return { valido: false, mensaje: 'La fecha de nacimiento es obligatoria' };
        }
        
        // Intentar parsear la fecha (dd/mm/yyyy o yyyy-mm-dd)
        let partes;
        let dia, mes, anio;
        
        if (fecha.includes('/')) {
            partes = fecha.split('/');
            if (partes.length === 3) {
                dia = parseInt(partes[0]);
                mes = parseInt(partes[1]) - 1;
                anio = parseInt(partes[2]);
            }
        } else if (fecha.includes('-')) {
            partes = fecha.split('-');
            if (partes.length === 3) {
                anio = parseInt(partes[0]);
                mes = parseInt(partes[1]) - 1;
                dia = parseInt(partes[2]);
            }
        }
        
        if (!dia || !mes || !anio) {
            return { valido: false, mensaje: 'Formato de fecha inválido' };
        }
        
        const fechaObj = new Date(anio, mes, dia);
        if (fechaObj.getFullYear() !== anio || fechaObj.getMonth() !== mes || fechaObj.getDate() !== dia) {
            return { valido: false, mensaje: 'Fecha inválida' };
        }
        
        // Verificar que no sea futura
        const hoy = new Date();
        if (fechaObj > hoy) {
            return { valido: false, mensaje: 'La fecha no puede ser futura' };
        }
        
        return { valido: true, mensaje: 'Fecha válida' };
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
    // OBTENER DETALLE DE POSGRADO
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
        console.log('🔍 === INICIO MAPEO DE DATOS ===');
        
        // Obtener nacionalidad
        const nacionalidad = this.obtenerRadio(formulario, 'nacionalidad') || 'Mexicana';
        let nacionalidadExtranjeraId = '';
        let nacionalidadExtranjera = '';
        
        console.log('📌 nacionalidad (radio):', nacionalidad);
        
        // Obtener el país seleccionado
        const selectPais = document.getElementById('pais');
        let paisId = '';
        if (selectPais) {
            paisId = selectPais.value;
            console.log('📌 País seleccionado:', paisId);
        }
        
        // Si es extranjero, obtener la nacionalidad seleccionada
        if (nacionalidad === 'Otra (Extranjera)') {
            const selectExtranjera = document.getElementById('nacionalidadExtranjera');
            if (selectExtranjera) {
                nacionalidadExtranjeraId = selectExtranjera.value;
                nacionalidadExtranjera = selectExtranjera.options[selectExtranjera.selectedIndex]?.text || '';
                console.log('📌 Nacionalidad Extranjera ID:', nacionalidadExtranjeraId);
                console.log('📌 Nacionalidad Extranjera Texto:', nacionalidadExtranjera);
            }
        }

        // ==========================================
        // CONSTRUIR EL OBJETO COMPLETO
        // ==========================================
        this.datos = {
            // === DATOS DE NACIONALIDAD ===
            nacionalidad: nacionalidad,
            nacionalidadExtranjeraId: nacionalidadExtranjeraId,
            nacionalidadExtranjera: nacionalidadExtranjera,
            
            // === DATOS PERSONALES ===
            curp: this.obtenerValor('curp'),
            nombre: this.obtenerValor('nombre'),
            primerApellido: this.obtenerValor('primerApellido'),
            segundoApellido: this.obtenerValor('segundoApellido'),
            sexo: this.obtenerValor('sexo'),
            fechaNacimiento: this.obtenerValor('fecha_nacimiento'),
            lugarNacimiento: this.obtenerValor('lugarNacimiento'),
            
            // === CONTACTO ===
            contacto: {
                lada: this.obtenerValor('lada'),
                telFijo: this.obtenerValor('telFijo'),
                ext: this.obtenerValor('ext'),
                telMovil: this.obtenerValor('telMovil'),
                email: this.obtenerValor('email')
            },
            
            // === DOMICILIO ===
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
                pais: paisId
            },
            
            // === CONTACTO DE EMERGENCIA ===
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
            
            // === DATOS ACADÉMICOS ===
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
            
            // === ESTUDIOS PREVIOS ===
            estudiosPrevios: {
                institucion: this.obtenerValor('institucion'),
                gradoAcademico: this.obtenerValor('gradoAcademico'),
                anioGrado: this.obtenerValor('anioGrado'),
                promedio: this.obtenerValor('promedio'),
                tipoTitulacion: this.obtenerTipoTitulacion(formulario)
            },
            
            // === DOMINIO DE INGLÉS ===
            dominioIngles: this.obtenerDominioIngles(),
            
            // === EXPERIENCIA LABORAL ===
            experienciaLaboral: this.obtenerExperienciaLaboral(),
            
            // === PUBLICACIONES ===
            publicaciones: this.obtenerPublicaciones(),
            
            // === MOTIVACIÓN ===
            motivacion: {
                razon: this.obtenerValor('razon'),
                medio: this.obtenerRadio(formulario, 'medio')
            }
        };

        console.log('📤 DATOS FINALES A ENVIAR:', JSON.stringify(this.datos, null, 2));
        console.log('🔍 === FIN MAPEO ===');

        return this.datos;
    }
}

if (typeof window !== 'undefined') {
    window.AdmisionModel = AdmisionModel;
}

console.log('✅ AdmisionModel cargado correctamente');