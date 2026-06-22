class AdmisionModel {
    constructor() {
        this.datos = {};
    }

    obtenerValor(id) {
        const elemento = document.getElementById(id);
        return elemento ? elemento.value.trim() : '';
    }

    obtenerTextoSelect(id) {
        const select = document.getElementById(id);
        if (!select || select.selectedIndex < 0) return '';
        return select.options[select.selectedIndex].text.trim();
    }

    obtenerParentesco() {
        const parentesco = this.obtenerValor('parentesco');
        if (parentesco === 'OTRO') {
            return this.obtenerValor('especificarParentesco') || 'OTRO';
        }
        return parentesco;
    }

    obtenerRadio(formulario, nombre) {
        return formulario.querySelector(`input[name="${nombre}"]:checked`)?.value || '';
    }

    obtenerRadioExacto(nombre) {
        const radio = document.querySelector(`input[name="${nombre}"]:checked`);
        return radio ? radio.value : '';
    }

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

        return 'No seleccionado';
    }

    obtenerTipoTitulacion(formulario) {
        const tipo = this.obtenerRadio(formulario, 'titulacion') || 'No seleccionado';
        if (tipo !== 'Otro') return tipo;
        return `${tipo} - ${this.obtenerValor('especificarTitulacion') || 'No especificado'}`;
    }

    obtenerExperienciaLaboral() {
        const experiencias = [];
        const filas = document.querySelectorAll('#formAdmision .table-responsive table tbody tr');
        
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

    obtenerDominioIngles() {
        return {
            expresionEscrita: this.obtenerRadioExacto('ingles.ingles1') || 'No especificado',
            expresionOral: this.obtenerRadioExacto('ingles.ingles2') || 'No especificado',
            comprensionLectora: this.obtenerRadioExacto('ingles.ingles3') || 'No especificado',
            comprensionAuditiva: this.obtenerRadioExacto('ingles.ingles4') || 'No especificado'
        };
    }

    mapearDatosFormulario(formulario) {
        this.datos = {
            nacionalidad: this.obtenerRadio(formulario, 'nacionalidad'),
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
                email: this.obtenerValor('email')
            },
            
            domicilio: {
                cp: this.obtenerValor('cp'),
                estado: this.obtenerValor('estado'),
                municipio: this.obtenerValor('municipio'),
                localidad: this.obtenerValor('localidad'),
                colonia: this.obtenerValor('colonia'),
                tipoCalle: this.obtenerValor('tipoCalle'),
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

    enviarDatos() {
        console.log('Estructura JSON generada por el Modelo:', JSON.stringify(this.datos, null, 2));
        return Promise.resolve({ codigo: 200, mensaje: 'Datos transferidos exitosamente al servidor.' });
    }
}