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
        this.divEspecialidades = document.getElementById('especialidades');
        this.selectMaestria = document.getElementById('maestriaSelect');
        this.selectDoctorado = document.getElementById('doctoradoSelect');
        this.selectEspecialidad = document.getElementById('especialidadSelect');
        this.opcionesPeriodo = document.getElementById('opcionesPeriodo');
        this.errorPeriodo = document.getElementById('errorPeriodo');
        this.evaluacionContainer = document.getElementById('evaluacionContainer');
        this.evaluacionOpciones = document.getElementById('evaluacionOpciones');
        this.especificarTitulacionContainer = document.getElementById('especificarTitulacionContainer');
        this.especificarTitulacion = document.getElementById('especificarTitulacion');
        this.modalResumen = document.getElementById('modalResumen');
        this.contenidoResumen = document.getElementById('contenidoResumen');
        
        this.selectParentesco = document.getElementById('parentesco');
        this.especificarParentescoContainer = document.getElementById('especificarParentescoContainer');
        this.especificarParentesco = document.getElementById('especificarParentesco');
        
        this.selectTipoCalle = document.getElementById('tipoCalle');
        this.especificarCalleContainer = document.getElementById('especificarCalleContainer');
        this.especificarCalle = document.getElementById('especificarCalle');
        
        this.selectPais = document.getElementById('pais');
        
        this.btnEnviarModal = document.getElementById('btnEnviarModal');
        this.btnConfirmarEnvio = document.getElementById('confirmarEnvio');

        this.nacionalidadExtranjeraContainer = document.getElementById('nacionalidadExtranjeraContainer');
        this.selectNacionalidadExtranjera = document.getElementById('nacionalidadExtranjera');

        this.emailInput = document.getElementById('email');

        this.radiosPosgrado = document.querySelectorAll('input[name="posgrado"]');

        this.inicializarEventos();
    }

    // ==========================================
    // REGLAS DE POSGRADO
    // ==========================================
    obtenerReglasPosgrado(tipoPosgrado, programa) {
        if (tipoPosgrado === 'Especialidad') {
            return {
                periodos: ['Agosto - Diciembre'],
                formasEvaluacion: ['Examen de admisión Junio']
            };
        }

        if (tipoPosgrado === 'Doctorado') {
            if (programa === 'Ciencias en el Área de Ciencias Computacionales') {
                return {
                    periodos: ['Agosto - Diciembre', 'Enero - Mayo'],
                    formasEvaluacion: []
                };
            }
            return {
                periodos: ['Agosto - Diciembre', 'Enero - Mayo'],
                formasEvaluacion: ['Entrevista']
            };
        }

        if (tipoPosgrado === 'Maestría') {
            const reglas = {
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
        // Eventos de posgrado
        this.radiosPosgrado.forEach(radio => {
            radio.addEventListener('change', (e) => {
                const tipo = e.target.value;
                this.actualizarPosgrado(tipo);
                this.renderizarPeriodosYEvaluaciones(tipo);
            });
        });

        if (this.selectMaestria) {
            this.selectMaestria.addEventListener('change', () => {
                const tipoPosgrado = this.obtenerTipoPosgradoSeleccionado();
                if (tipoPosgrado === 'Maestría') {
                    this.renderizarPeriodosYEvaluaciones('Maestría');
                }
            });
        }

        if (this.selectDoctorado) {
            this.selectDoctorado.addEventListener('change', () => {
                const tipoPosgrado = this.obtenerTipoPosgradoSeleccionado();
                if (tipoPosgrado === 'Doctorado') {
                    this.renderizarPeriodosYEvaluaciones('Doctorado');
                }
            });
        }

        if (this.selectEspecialidad) {
            this.selectEspecialidad.addEventListener('change', () => {
                const tipoPosgrado = this.obtenerTipoPosgradoSeleccionado();
                if (tipoPosgrado === 'Especialidad') {
                    this.renderizarPeriodosYEvaluaciones('Especialidad');
                }
            });
        }

        // Parentesco
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

        // Tipo de calle
        if (this.selectTipoCalle) {
            this.selectTipoCalle.addEventListener('change', () => {
                const valor = this.selectTipoCalle.value;
                if (valor === 'OTRO') {
                    this.mostrarElemento(this.especificarCalleContainer, true);
                    if (this.especificarCalle) {
                        this.especificarCalle.required = true;
                    }
                } else {
                    this.mostrarElemento(this.especificarCalleContainer, false);
                    if (this.especificarCalle) {
                        this.especificarCalle.required = false;
                        this.especificarCalle.value = '';
                        this.limpiarErrorCampo(this.especificarCalle);
                    }
                }
            });
        }

        // Nacionalidad
        document.querySelectorAll('input[name="nacionalidad"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                const esExtranjero = e.target.value === 'Otra (Extranjera)';
                this.actualizarCurp(esExtranjero);
            });
        });

        // Titulación
        document.querySelectorAll('input[name="titulacion"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.actualizarTitulacion(e.target.value === 'Otro');
            });
        });

        // Email
        if (this.emailInput) {
            this.emailInput.addEventListener('input', () => {
                this.validarEmailTiempoReal();
            });
            this.emailInput.addEventListener('blur', () => {
                this.validarEmailTiempoReal();
            });
            this.emailInput.addEventListener('paste', () => {
                setTimeout(() => {
                    this.validarEmailTiempoReal();
                }, 100);
            });
        }

        // Botones
        if (this.btnEnviarModal) {
            this.btnEnviarModal.addEventListener('click', () => {
                this.manejarEnvio();
            });
        }

        if (this.btnConfirmarEnvio) {
            this.btnConfirmarEnvio.addEventListener('click', () => {
                this.confirmarEnvio();
            });
        }

        // Cargar datos
        this.cargarNacionalidadesExtranjeras();
        this.cargarPaises();
        this.ocultarElementosIniciales();
        this.inicializarCalendario();
        this.actualizarCurp(false);
        this.inicializarValidacionNumeros();
    }

  // views/View.js - SOLO LA PARTE DE NACIONALIDADES

// views/View.js - SOLO ESTE MÉTODO

cargarNacionalidadesExtranjeras() {
    const select = document.getElementById('nacionalidadExtranjera');
    if (!select) {
        console.error('❌ No se encontró el select de nacionalidad extranjera');
        return;
    }

    console.log('🔍 Cargando nacionalidades extranjeras...');

    
    const nacionalidades = [
        { id: 2, nombre: 'AFGANO', pais: 'AFGANISTÁN' },
        { id: 3, nombre: 'ALBANÉS', pais: 'ALBANIA' },
        { id: 4, nombre: 'ALEMÁN', pais: 'ALEMANIA' },
        { id: 5, nombre: 'ANDORRANO', pais: 'ANDORRA' },
        { id: 6, nombre: 'ANGOLEÑO', pais: 'ANGOLA' },
        { id: 7, nombre: 'ANTIGUANO', pais: 'ANTIGUA Y BARBUDA' },
        { id: 8, nombre: 'SAUDÍ', pais: 'ARABIA SAUDITA' },
        { id: 9, nombre: 'ARGELINO', pais: 'ARGELIA' },
        { id: 10, nombre: 'ARGENTINO', pais: 'ARGENTINA' },
        { id: 11, nombre: 'ARMENIO', pais: 'ARMENIA' },
        { id: 12, nombre: 'AUSTRALIANO', pais: 'AUSTRALIA' },
        { id: 13, nombre: 'AUSTRIACO', pais: 'AUSTRIA' },
        { id: 14, nombre: 'AZERBAIYANO', pais: 'AZERBAIYÁN' },
        { id: 15, nombre: 'BAHAMEÑO', pais: 'BAHAMAS' },
        { id: 16, nombre: 'BANGLADESÍ', pais: 'BANGLADÉS' },
        { id: 17, nombre: 'BARBADENSE', pais: 'BARBADOS' },
        { id: 18, nombre: 'BAREINÍ', pais: 'BARÉIN' },
        { id: 19, nombre: 'BELGA', pais: 'BÉLGICA' },
        { id: 20, nombre: 'BELICEÑO', pais: 'BELICE' },
        { id: 21, nombre: 'BENINÉS', pais: 'BENÍN' },
        { id: 22, nombre: 'BIELORRUSO', pais: 'BIELORRUSIA' },
        { id: 23, nombre: 'BIRMANO', pais: 'BIRMANIA' },
        { id: 24, nombre: 'BOLIVIANO', pais: 'BOLIVIA' },
        { id: 25, nombre: 'BOSNIOHERZEGOVINO', pais: 'BOSNIA Y HERZEGOVINA' },
        { id: 26, nombre: 'BOTSUANO', pais: 'BOTSUANA' },
        { id: 27, nombre: 'BRASILEÑO', pais: 'BRASIL' },
        { id: 28, nombre: 'BRUNEANO', pais: 'BRUNÉI' },
        { id: 29, nombre: 'BÚLGARO', pais: 'BULGARIA' },
        { id: 30, nombre: 'BURKINÉS', pais: 'BURKINA FASO' },
        { id: 31, nombre: 'BURUNDÉS', pais: 'BURUNDI' },
        { id: 32, nombre: 'BUTANÉS', pais: 'BUTÁN' },
        { id: 33, nombre: 'CABOVERDIANO', pais: 'CABO VERDE' },
        { id: 34, nombre: 'CAMBOYANO', pais: 'CAMBOYA' },
        { id: 35, nombre: 'CAMERUNÉS', pais: 'CAMERÚN' },
        { id: 36, nombre: 'CANADIENSE', pais: 'CANADÁ' },
        { id: 37, nombre: 'CHADIANO', pais: 'CHAD' },
        { id: 38, nombre: 'CATARÍ', pais: 'CATAR' },
        { id: 39, nombre: 'CHILENO', pais: 'CHILE' },
        { id: 40, nombre: 'CHINO', pais: 'CHINA' },
        { id: 41, nombre: 'CHIPRIOTA', pais: 'CHIPRE' },
        { id: 42, nombre: 'COLOMBIANO', pais: 'COLOMBIA' },
        { id: 43, nombre: 'COMORENSE', pais: 'COMORAS' },
        { id: 44, nombre: 'CONGOLEÑO', pais: 'CONGO' },
        { id: 45, nombre: 'NORCOREANO', pais: 'COREA DEL NORTE' },
        { id: 46, nombre: 'SURCOREANO', pais: 'COREA DEL SUR' },
        { id: 47, nombre: 'COSTAMARFILEÑO', pais: 'COSTA DE MARFIL' },
        { id: 48, nombre: 'COSTARRICENSE', pais: 'COSTA RICA' },
        { id: 49, nombre: 'CROATA', pais: 'CROACIA' },
        { id: 50, nombre: 'CUBANO', pais: 'CUBA' },
        { id: 51, nombre: 'DANÉS', pais: 'DINAMARCA' },
        { id: 52, nombre: 'DOMINIQUÉS', pais: 'DOMINICA' },
        { id: 53, nombre: 'ECUATORIANO', pais: 'ECUADOR' },
        { id: 54, nombre: 'EGIPCIO', pais: 'EGIPTO' },
        { id: 55, nombre: 'SALVADOREÑO', pais: 'EL SALVADOR' },
        { id: 56, nombre: 'EMIRATÍ', pais: 'EMIRATOS ÁRABES UNIDOS' },
        { id: 57, nombre: 'ERITREO', pais: 'ERITREA' },
        { id: 58, nombre: 'ESLOVACO', pais: 'ESLOVAQUIA' },
        { id: 59, nombre: 'ESLOVENO', pais: 'ESLOVENIA' },
        { id: 60, nombre: 'ESPAÑOL', pais: 'ESPAÑA' },
        { id: 61, nombre: 'ESTADOUNIDENSE', pais: 'ESTADOS UNIDOS' },
        { id: 62, nombre: 'ESTONIO', pais: 'ESTONIA' },
        { id: 63, nombre: 'ESUATINÍ', pais: 'ESUATINI' },
        { id: 64, nombre: 'ETÍOPE', pais: 'ETIOPÍA' },
        { id: 65, nombre: 'FILIPINO', pais: 'FILIPINAS' },
        { id: 66, nombre: 'FINLANDÉS', pais: 'FINLANDIA' },
        { id: 67, nombre: 'FIYIANO', pais: 'FIYI' },
        { id: 68, nombre: 'FRANCÉS', pais: 'FRANCIA' },
        { id: 69, nombre: 'GABONÉS', pais: 'GABÓN' },
        { id: 70, nombre: 'GAMBIANO', pais: 'GAMBIA' },
        { id: 71, nombre: 'GEORGIANO', pais: 'GEORGIA' },
        { id: 72, nombre: 'GHANÉS', pais: 'GHANA' },
        { id: 73, nombre: 'GRANADINO', pais: 'GRANADA' },
        { id: 74, nombre: 'GRIEGO', pais: 'GRECIA' },
        { id: 75, nombre: 'GUATEMALTECO', pais: 'GUATEMALA' },
        { id: 76, nombre: 'GUINEANO', pais: 'GUINEA' },
        { id: 77, nombre: 'ECUATOGUINEANO', pais: 'GUINEA ECUATORIAL' },
        { id: 78, nombre: 'GUYANÉS', pais: 'GUYANA' },
        { id: 79, nombre: 'HAITIANO', pais: 'HAITÍ' },
        { id: 80, nombre: 'HONDUREÑO', pais: 'HONDURAS' },
        { id: 81, nombre: 'HÚNGARO', pais: 'HUNGRÍA' },
        { id: 82, nombre: 'INDIO', pais: 'INDIA' },
        { id: 83, nombre: 'INDONESIO', pais: 'INDONESIA' },
        { id: 84, nombre: 'IRAQUÍ', pais: 'IRAK' },
        { id: 85, nombre: 'IRANÍ', pais: 'IRÁN' },
        { id: 86, nombre: 'IRLANDÉS', pais: 'IRLANDA' },
        { id: 87, nombre: 'ISLANDÉS', pais: 'ISLANDIA' },
        { id: 88, nombre: 'MARSHALÉS', pais: 'ISLAS MARSHALL' },
        { id: 89, nombre: 'SALOMONENSE', pais: 'ISLAS SALOMÓN' },
        { id: 90, nombre: 'ISRAELÍ', pais: 'ISRAEL' },
        { id: 91, nombre: 'ITALIANO', pais: 'ITALIA' },
        { id: 92, nombre: 'JAMAICANO', pais: 'JAMAICA' },
        { id: 93, nombre: 'JAPONÉS', pais: 'JAPÓN' },
        { id: 94, nombre: 'JORDANO', pais: 'JORDANIA' },
        { id: 95, nombre: 'KAZAJO', pais: 'KAZAJISTÁN' },
        { id: 96, nombre: 'KENIANO', pais: 'KENIA' },
        { id: 97, nombre: 'KIRGUÍS', pais: 'KIRGUISTÁN' },
        { id: 98, nombre: 'KIRIBATIANO', pais: 'KIRIBATI' },
        { id: 99, nombre: 'KOSOVAR', pais: 'KOSOVO' },
        { id: 100, nombre: 'KUWAITÍ', pais: 'KUWAIT' },
        { id: 101, nombre: 'LAOSIANO', pais: 'LAOS' },
        { id: 102, nombre: 'LESOTENSE', pais: 'LESOTO' },
        { id: 103, nombre: 'LETÓN', pais: 'LETONIA' },
        { id: 104, nombre: 'LIBANÉS', pais: 'LÍBANO' },
        { id: 105, nombre: 'LIBERIANO', pais: 'LIBERIA' },
        { id: 106, nombre: 'LIBIO', pais: 'LIBIA' },
        { id: 107, nombre: 'LIECHTENSTEINIANO', pais: 'LIECHTENSTEIN' },
        { id: 108, nombre: 'LITUANO', pais: 'LITUANIA' },
        { id: 109, nombre: 'LUXEMBURGUÉS', pais: 'LUXEMBURGO' },
        { id: 110, nombre: 'MACEDONIO', pais: 'MACEDONIA DEL NORTE' },
        { id: 111, nombre: 'MALGACHE', pais: 'MADAGASCAR' },
        { id: 112, nombre: 'MALASIO', pais: 'MALASIA' },
        { id: 113, nombre: 'MALAUÍ', pais: 'MALAUI' },
        { id: 114, nombre: 'MALDIVO', pais: 'MALDIVAS' },
        { id: 115, nombre: 'MALÍ', pais: 'MALI' },
        { id: 116, nombre: 'MALTÉS', pais: 'MALTA' },
        { id: 117, nombre: 'MARROQUÍ', pais: 'MARRUECOS' },
        { id: 118, nombre: 'MAURICIANO', pais: 'MAURICIO' },
        { id: 119, nombre: 'MAURITANO', pais: 'MAURITANIA' },
        // ⚠️ ID 120 es MÉXICO - NO INCLUIR AQUÍ
        { id: 121, nombre: 'MICRONESIO', pais: 'MICRONESIA' },
        { id: 122, nombre: 'MOLDAVO', pais: 'MOLDAVIA' },
        { id: 123, nombre: 'MONEGASCO', pais: 'MÓNACO' },
        { id: 124, nombre: 'MONGOL', pais: 'MONGOLIA' },
        { id: 125, nombre: 'MONTENEGRINO', pais: 'MONTENEGRO' },
        { id: 126, nombre: 'MOZAMBIQUEÑO', pais: 'MOZAMBIQUE' },
        { id: 127, nombre: 'NAMIBIO', pais: 'NAMIBIA' },
        { id: 128, nombre: 'NAURUANO', pais: 'NAURU' },
        { id: 129, nombre: 'NEPALÉS', pais: 'NEPAL' },
        { id: 130, nombre: 'NICARAGÜENSE', pais: 'NICARAGUA' },
        { id: 131, nombre: 'NIGERINO', pais: 'NÍGER' },
        { id: 132, nombre: 'NIGERIANO', pais: 'NIGERIA' },
        { id: 133, nombre: 'NORUEGO', pais: 'NORUEGA' },
        { id: 134, nombre: 'NEOZELANDÉS', pais: 'NUEVA ZELANDA' },
        { id: 135, nombre: 'OMANÍ', pais: 'OMÁN' },
        { id: 136, nombre: 'NEERLANDÉS', pais: 'PAÍSES BAJOS' },
        { id: 137, nombre: 'PAKISTANÍ', pais: 'PAKISTÁN' },
        { id: 138, nombre: 'PALAUANO', pais: 'PALAOS' },
        { id: 139, nombre: 'PALESTINO', pais: 'PALESTINA' },
        { id: 140, nombre: 'PANAMEÑO', pais: 'PANAMÁ' },
        { id: 141, nombre: 'PAPÚ', pais: 'PAPÚA NUEVA GUINEA' },
        { id: 142, nombre: 'PARAGUAYO', pais: 'PARAGUAY' },
        { id: 143, nombre: 'PERUANO', pais: 'PERÚ' },
        { id: 144, nombre: 'POLACO', pais: 'POLONIA' },
        { id: 145, nombre: 'PORTUGUÉS', pais: 'PORTUGAL' },
        { id: 146, nombre: 'PUERTORRIQUEÑO', pais: 'PUERTO RICO' },
        { id: 147, nombre: 'BRITÁNICO', pais: 'REINO UNIDO' },
        { id: 148, nombre: 'CENTROAFRICANO', pais: 'REPÚBLICA CENTROAFRICANA' },
        { id: 149, nombre: 'CHECO', pais: 'REPÚBLICA CHECA' },
        { id: 150, nombre: 'CONGOLEÑO', pais: 'REPÚBLICA DEMOCRÁTICA DEL CONGO' },
        { id: 151, nombre: 'DOMINICANO', pais: 'REPÚBLICA DOMINICANA' },
        { id: 152, nombre: 'RUANDÉS', pais: 'RUANDA' },
        { id: 153, nombre: 'RUMANO', pais: 'RUMANÍA' },
        { id: 154, nombre: 'RUSO', pais: 'RUSIA' },
        { id: 155, nombre: 'SAMOANO', pais: 'SAMOA' },
        { id: 156, nombre: 'SANCRISTOBALEÑO', pais: 'SAN CRISTÓBAL Y NIEVES' },
        { id: 157, nombre: 'SANMARINENSE', pais: 'SAN MARINO' },
        { id: 158, nombre: 'SANVICENTINO', pais: 'SAN VICENTE Y LAS GRANADINAS' },
        { id: 159, nombre: 'SANTALUCENSE', pais: 'SANTA LUCÍA' },
        { id: 160, nombre: 'SANTOMENSE', pais: 'SANTO TOMÉ Y PRÍNCIPE' },
        { id: 161, nombre: 'SENEGALÉS', pais: 'SENEGAL' },
        { id: 162, nombre: 'SERBIO', pais: 'SERBIA' },
        { id: 163, nombre: 'SEYCHELLENSE', pais: 'SEYCHELLES' },
        { id: 164, nombre: 'SIERRALEONÉS', pais: 'SIERRA LEONA' },
        { id: 165, nombre: 'SINGAPURENSE', pais: 'SINGAPUR' },
        { id: 166, nombre: 'SIRIO', pais: 'SIRIA' },
        { id: 167, nombre: 'SOMALÍ', pais: 'SOMALIA' },
        { id: 168, nombre: 'ESRILANQUÉS', pais: 'SRI LANKA' },
        { id: 169, nombre: 'SUDAFRICANO', pais: 'SUDÁFRICA' },
        { id: 170, nombre: 'SUDANÉS', pais: 'SUDÁN' },
        { id: 171, nombre: 'SURSUDANÉS', pais: 'SUDÁN DEL SUR' },
        { id: 172, nombre: 'SUECO', pais: 'SUECIA' },
        { id: 173, nombre: 'SUIZO', pais: 'SUIZA' },
        { id: 174, nombre: 'SURINAMÉS', pais: 'SURINAM' },
        { id: 175, nombre: 'TAILANDÉS', pais: 'TAILANDIA' },
        { id: 176, nombre: 'TAIWANÉS', pais: 'TAIWÁN' },
        { id: 177, nombre: 'TAYIKO', pais: 'TAYIKISTÁN' },
        { id: 178, nombre: 'TANZANO', pais: 'TANZANIA' },
        { id: 179, nombre: 'TIMORENSE', pais: 'TIMOR ORIENTAL' },
        { id: 180, nombre: 'TOGOLÉS', pais: 'TOGO' },
        { id: 181, nombre: 'TONGANO', pais: 'TONGA' },
        { id: 182, nombre: 'TRINITENSE', pais: 'TRINIDAD Y TOBAGO' },
        { id: 183, nombre: 'TUNECINO', pais: 'TÚNEZ' },
        { id: 184, nombre: 'TURCOMANO', pais: 'TURKMENISTÁN' },
        { id: 185, nombre: 'TURCO', pais: 'TURQUÍA' },
        { id: 186, nombre: 'TUVALUANO', pais: 'TUVALU' },
        { id: 187, nombre: 'UCRANIANO', pais: 'UCRANIA' },
        { id: 188, nombre: 'UGANDÉS', pais: 'UGANDA' },
        { id: 189, nombre: 'URUGUAYO', pais: 'URUGUAY' },
        { id: 190, nombre: 'UZBEKO', pais: 'UZBEKISTÁN' },
        { id: 191, nombre: 'VANUATUENSE', pais: 'VANUATU' },
        { id: 192, nombre: 'VATICANO', pais: 'VATICANO' },
        { id: 193, nombre: 'VENEZOLANO', pais: 'VENEZUELA' },
        { id: 194, nombre: 'VIETNAMITA', pais: 'VIETNAM' },
        { id: 195, nombre: 'YEMENÍ', pais: 'YEMEN' },
        { id: 196, nombre: 'YIBUTIANO', pais: 'YIBUTI' },
        { id: 197, nombre: 'ZAMBIANO', pais: 'ZAMBIA' },
        { id: 198, nombre: 'ZIMBABUENSE', pais: 'ZIMBABUE' }
    ];
    
    // Filtrar para excluir México (ID 1 o 120)
    const filtradas = nacionalidades.filter(item => item.id !== 1 && item.id !== 120);
    
    // 🔥 LIMPIAR EL SELECT
    select.innerHTML = '';
    
    // 🔥 AGREGAR LA OPCIÓN POR DEFECTO
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'SELECCIONA';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    select.appendChild(defaultOption);
    
    // 🔥 AGREGAR LAS OPCIONES CON EL PAÍS
    filtradas.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;  // ← EL ID REAL
        option.textContent = `${item.nombre} (${item.pais})`;  // ← "ALEMÁN (ALEMANIA)"
        select.appendChild(option);
    });

    // 🔥 DEPURACIÓN
    console.log('✅ Nacionalidades extranjeras cargadas:');
    console.log('  Total de opciones:', select.options.length);

    // 🔥 INICIALIZAR SELECT2
    this.inicializarSelect2Nacionalidad(select);
}
    // ==========================================
    // CARGAR PAÍSES
    // ==========================================
    cargarPaises() {
        const select = document.getElementById('pais');
        if (!select) return;

        // Lista de países con sus IDs (México = 1)
        const paises = [
            { id: 1, nombre: 'MÉXICO', gentilicio: 'MEXICANO' },
            { id: 2, nombre: 'AFGANISTÁN', gentilicio: 'AFGANO' },
            { id: 3, nombre: 'ALBANIA', gentilicio: 'ALBANÉS' },
            { id: 4, nombre: 'ALEMANIA', gentilicio: 'ALEMÁN' },
            { id: 5, nombre: 'ANDORRA', gentilicio: 'ANDORRANO' },
            { id: 6, nombre: 'ANGOLA', gentilicio: 'ANGOLEÑO' },
            { id: 7, nombre: 'ANTIGUA Y BARBUDA', gentilicio: 'ANTIGUANO' },
            { id: 8, nombre: 'ARABIA SAUDITA', gentilicio: 'SAUDÍ' },
            { id: 9, nombre: 'ARGELIA', gentilicio: 'ARGELINO' },
            { id: 10, nombre: 'ARGENTINA', gentilicio: 'ARGENTINO' },
            { id: 11, nombre: 'ARMENIA', gentilicio: 'ARMENIO' },
            { id: 12, nombre: 'AUSTRALIA', gentilicio: 'AUSTRALIANO' },
            { id: 13, nombre: 'AUSTRIA', gentilicio: 'AUSTRIACO' },
            { id: 14, nombre: 'AZERBAIYÁN', gentilicio: 'AZERBAIYANO' },
            { id: 15, nombre: 'BAHAMAS', gentilicio: 'BAHAMEÑO' },
            { id: 16, nombre: 'BANGLADÉS', gentilicio: 'BANGLADESÍ' },
            { id: 17, nombre: 'BARBADOS', gentilicio: 'BARBADENSE' },
            { id: 18, nombre: 'BARÉIN', gentilicio: 'BAREINÍ' },
            { id: 19, nombre: 'BÉLGICA', gentilicio: 'BELGA' },
            { id: 20, nombre: 'BELICE', gentilicio: 'BELICEÑO' },
            { id: 21, nombre: 'BENÍN', gentilicio: 'BENINÉS' },
            { id: 22, nombre: 'BIELORRUSIA', gentilicio: 'BIELORRUSO' },
            { id: 23, nombre: 'BIRMANIA', gentilicio: 'BIRMANO' },
            { id: 24, nombre: 'BOLIVIA', gentilicio: 'BOLIVIANO' },
            { id: 25, nombre: 'BOSNIA Y HERZEGOVINA', gentilicio: 'BOSNIOHERZEGOVINO' },
            { id: 26, nombre: 'BOTSUANA', gentilicio: 'BOTSUANO' },
            { id: 27, nombre: 'BRASIL', gentilicio: 'BRASILEÑO' },
            { id: 28, nombre: 'BRUNÉI', gentilicio: 'BRUNEANO' },
            { id: 29, nombre: 'BULGARIA', gentilicio: 'BÚLGARO' },
            { id: 30, nombre: 'BURKINA FASO', gentilicio: 'BURKINÉS' },
            { id: 31, nombre: 'BURUNDI', gentilicio: 'BURUNDÉS' },
            { id: 32, nombre: 'BUTÁN', gentilicio: 'BUTANÉS' },
            { id: 33, nombre: 'CABO VERDE', gentilicio: 'CABOVERDIANO' },
            { id: 34, nombre: 'CAMBOYA', gentilicio: 'CAMBOYANO' },
            { id: 35, nombre: 'CAMERÚN', gentilicio: 'CAMERUNÉS' },
            { id: 36, nombre: 'CANADÁ', gentilicio: 'CANADIENSE' },
            { id: 37, nombre: 'CHAD', gentilicio: 'CHADIANO' },
            { id: 38, nombre: 'CATAR', gentilicio: 'CATARÍ' },
            { id: 39, nombre: 'CHILE', gentilicio: 'CHILENO' },
            { id: 40, nombre: 'CHINA', gentilicio: 'CHINO' },
            { id: 41, nombre: 'CHIPRE', gentilicio: 'CHIPRIOTA' },
            { id: 42, nombre: 'COLOMBIA', gentilicio: 'COLOMBIANO' },
            { id: 43, nombre: 'COMORAS', gentilicio: 'COMORENSE' },
            { id: 44, nombre: 'CONGO', gentilicio: 'CONGOLEÑO' },
            { id: 45, nombre: 'COREA DEL NORTE', gentilicio: 'NORCOREANO' },
            { id: 46, nombre: 'COREA DEL SUR', gentilicio: 'SURCOREANO' },
            { id: 47, nombre: 'COSTA DE MARFIL', gentilicio: 'COSTAMARFILEÑO' },
            { id: 48, nombre: 'COSTA RICA', gentilicio: 'COSTARRICENSE' },
            { id: 49, nombre: 'CROACIA', gentilicio: 'CROATA' },
            { id: 50, nombre: 'CUBA', gentilicio: 'CUBANO' },
            { id: 51, nombre: 'DINAMARCA', gentilicio: 'DANÉS' },
            { id: 52, nombre: 'DOMINICA', gentilicio: 'DOMINIQUÉS' },
            { id: 53, nombre: 'ECUADOR', gentilicio: 'ECUATORIANO' },
            { id: 54, nombre: 'EGIPTO', gentilicio: 'EGIPCIO' },
            { id: 55, nombre: 'EL SALVADOR', gentilicio: 'SALVADOREÑO' },
            { id: 56, nombre: 'EMIRATOS ÁRABES UNIDOS', gentilicio: 'EMIRATÍ' },
            { id: 57, nombre: 'ERITREA', gentilicio: 'ERITREO' },
            { id: 58, nombre: 'ESLOVAQUIA', gentilicio: 'ESLOVACO' },
            { id: 59, nombre: 'ESLOVENIA', gentilicio: 'ESLOVENO' },
            { id: 60, nombre: 'ESPAÑA', gentilicio: 'ESPAÑOL' },
            { id: 61, nombre: 'ESTADOS UNIDOS', gentilicio: 'ESTADOUNIDENSE' },
            { id: 62, nombre: 'ESTONIA', gentilicio: 'ESTONIO' },
            { id: 63, nombre: 'ESUATINI', gentilicio: 'ESUATINÍ' },
            { id: 64, nombre: 'ETIOPÍA', gentilicio: 'ETÍOPE' },
            { id: 65, nombre: 'FILIPINAS', gentilicio: 'FILIPINO' },
            { id: 66, nombre: 'FINLANDIA', gentilicio: 'FINLANDÉS' },
            { id: 67, nombre: 'FIYI', gentilicio: 'FIYIANO' },
            { id: 68, nombre: 'FRANCIA', gentilicio: 'FRANCÉS' },
            { id: 69, nombre: 'GABÓN', gentilicio: 'GABONÉS' },
            { id: 70, nombre: 'GAMBIA', gentilicio: 'GAMBIANO' },
            { id: 71, nombre: 'GEORGIA', gentilicio: 'GEORGIANO' },
            { id: 72, nombre: 'GHANA', gentilicio: 'GHANÉS' },
            { id: 73, nombre: 'GRANADA', gentilicio: 'GRANADINO' },
            { id: 74, nombre: 'GRECIA', gentilicio: 'GRIEGO' },
            { id: 75, nombre: 'GUATEMALA', gentilicio: 'GUATEMALTECO' },
            { id: 76, nombre: 'GUINEA', gentilicio: 'GUINEANO' },
            { id: 77, nombre: 'GUINEA ECUATORIAL', gentilicio: 'ECUATOGUINEANO' },
            { id: 78, nombre: 'GUYANA', gentilicio: 'GUYANÉS' },
            { id: 79, nombre: 'HAITÍ', gentilicio: 'HAITIANO' },
            { id: 80, nombre: 'HONDURAS', gentilicio: 'HONDUREÑO' },
            { id: 81, nombre: 'HUNGRÍA', gentilicio: 'HÚNGARO' },
            { id: 82, nombre: 'INDIA', gentilicio: 'INDIO' },
            { id: 83, nombre: 'INDONESIA', gentilicio: 'INDONESIO' },
            { id: 84, nombre: 'IRAK', gentilicio: 'IRAQUÍ' },
            { id: 85, nombre: 'IRÁN', gentilicio: 'IRANÍ' },
            { id: 86, nombre: 'IRLANDA', gentilicio: 'IRLANDÉS' },
            { id: 87, nombre: 'ISLANDIA', gentilicio: 'ISLANDÉS' },
            { id: 88, nombre: 'ISLAS MARSHALL', gentilicio: 'MARSHALÉS' },
            { id: 89, nombre: 'ISLAS SALOMÓN', gentilicio: 'SALOMONENSE' },
            { id: 90, nombre: 'ISRAEL', gentilicio: 'ISRAELÍ' },
            { id: 91, nombre: 'ITALIA', gentilicio: 'ITALIANO' },
            { id: 92, nombre: 'JAMAICA', gentilicio: 'JAMAICANO' },
            { id: 93, nombre: 'JAPÓN', gentilicio: 'JAPONÉS' },
            { id: 94, nombre: 'JORDANIA', gentilicio: 'JORDANO' },
            { id: 95, nombre: 'KAZAJISTÁN', gentilicio: 'KAZAJO' },
            { id: 96, nombre: 'KENIA', gentilicio: 'KENIANO' },
            { id: 97, nombre: 'KIRGUISTÁN', gentilicio: 'KIRGUÍS' },
            { id: 98, nombre: 'KIRIBATI', gentilicio: 'KIRIBATIANO' },
            { id: 99, nombre: 'KOSOVO', gentilicio: 'KOSOVAR' },
            { id: 100, nombre: 'KUWAIT', gentilicio: 'KUWAITÍ' },
            { id: 101, nombre: 'LAOS', gentilicio: 'LAOSIANO' },
            { id: 102, nombre: 'LESOTO', gentilicio: 'LESOTENSE' },
            { id: 103, nombre: 'LETONIA', gentilicio: 'LETÓN' },
            { id: 104, nombre: 'LÍBANO', gentilicio: 'LIBANÉS' },
            { id: 105, nombre: 'LIBERIA', gentilicio: 'LIBERIANO' },
            { id: 106, nombre: 'LIBIA', gentilicio: 'LIBIO' },
            { id: 107, nombre: 'LIECHTENSTEIN', gentilicio: 'LIECHTENSTEINIANO' },
            { id: 108, nombre: 'LITUANIA', gentilicio: 'LITUANO' },
            { id: 109, nombre: 'LUXEMBURGO', gentilicio: 'LUXEMBURGUÉS' },
            { id: 110, nombre: 'MACEDONIA DEL NORTE', gentilicio: 'MACEDONIO' },
            { id: 111, nombre: 'MADAGASCAR', gentilicio: 'MALGACHE' },
            { id: 112, nombre: 'MALASIA', gentilicio: 'MALASIO' },
            { id: 113, nombre: 'MALAUI', gentilicio: 'MALAUÍ' },
            { id: 114, nombre: 'MALDIVAS', gentilicio: 'MALDIVO' },
            { id: 115, nombre: 'MALI', gentilicio: 'MALÍ' },
            { id: 116, nombre: 'MALTA', gentilicio: 'MALTÉS' },
            { id: 117, nombre: 'MARRUECOS', gentilicio: 'MARROQUÍ' },
            { id: 118, nombre: 'MAURICIO', gentilicio: 'MAURICIANO' },
            { id: 119, nombre: 'MAURITANIA', gentilicio: 'MAURITANO' },
            // ⚠️ ID 120 es MÉXICO en la tabla original, pero nosotros usamos 1
            { id: 121, nombre: 'MICRONESIA', gentilicio: 'MICRONESIO' },
            { id: 122, nombre: 'MOLDAVIA', gentilicio: 'MOLDAVO' },
            { id: 123, nombre: 'MÓNACO', gentilicio: 'MONEGASCO' },
            { id: 124, nombre: 'MONGOLIA', gentilicio: 'MONGOL' },
            { id: 125, nombre: 'MONTENEGRO', gentilicio: 'MONTENEGRINO' },
            { id: 126, nombre: 'MOZAMBIQUE', gentilicio: 'MOZAMBIQUEÑO' },
            { id: 127, nombre: 'NAMIBIA', gentilicio: 'NAMIBIO' },
            { id: 128, nombre: 'NAURU', gentilicio: 'NAURUANO' },
            { id: 129, nombre: 'NEPAL', gentilicio: 'NEPALÉS' },
            { id: 130, nombre: 'NICARAGUA', gentilicio: 'NICARAGÜENSE' },
            { id: 131, nombre: 'NÍGER', gentilicio: 'NIGERINO' },
            { id: 132, nombre: 'NIGERIA', gentilicio: 'NIGERIANO' },
            { id: 133, nombre: 'NORUEGA', gentilicio: 'NORUEGO' },
            { id: 134, nombre: 'NUEVA ZELANDA', gentilicio: 'NEOZELANDÉS' },
            { id: 135, nombre: 'OMÁN', gentilicio: 'OMANÍ' },
            { id: 136, nombre: 'PAÍSES BAJOS', gentilicio: 'NEERLANDÉS' },
            { id: 137, nombre: 'PAKISTÁN', gentilicio: 'PAKISTANÍ' },
            { id: 138, nombre: 'PALAOS', gentilicio: 'PALAUANO' },
            { id: 139, nombre: 'PALESTINA', gentilicio: 'PALESTINO' },
            { id: 140, nombre: 'PANAMÁ', gentilicio: 'PANAMEÑO' },
            { id: 141, nombre: 'PAPÚA NUEVA GUINEA', gentilicio: 'PAPÚ' },
            { id: 142, nombre: 'PARAGUAY', gentilicio: 'PARAGUAYO' },
            { id: 143, nombre: 'PERÚ', gentilicio: 'PERUANO' },
            { id: 144, nombre: 'POLONIA', gentilicio: 'POLACO' },
            { id: 145, nombre: 'PORTUGAL', gentilicio: 'PORTUGUÉS' },
            { id: 146, nombre: 'PUERTO RICO', gentilicio: 'PUERTORRIQUEÑO' },
            { id: 147, nombre: 'REINO UNIDO', gentilicio: 'BRITÁNICO' },
            { id: 148, nombre: 'REPÚBLICA CENTROAFRICANA', gentilicio: 'CENTROAFRICANO' },
            { id: 149, nombre: 'REPÚBLICA CHECA', gentilicio: 'CHECO' },
            { id: 150, nombre: 'REPÚBLICA DEMOCRÁTICA DEL CONGO', gentilicio: 'CONGOLEÑO' },
            { id: 151, nombre: 'REPÚBLICA DOMINICANA', gentilicio: 'DOMINICANO' },
            { id: 152, nombre: 'RUANDA', gentilicio: 'RUANDÉS' },
            { id: 153, nombre: 'RUMANÍA', gentilicio: 'RUMANO' },
            { id: 154, nombre: 'RUSIA', gentilicio: 'RUSO' },
            { id: 155, nombre: 'SAMOA', gentilicio: 'SAMOANO' },
            { id: 156, nombre: 'SAN CRISTÓBAL Y NIEVES', gentilicio: 'SANCRISTOBALEÑO' },
            { id: 157, nombre: 'SAN MARINO', gentilicio: 'SANMARINENSE' },
            { id: 158, nombre: 'SAN VICENTE Y LAS GRANADINAS', gentilicio: 'SANVICENTINO' },
            { id: 159, nombre: 'SANTA LUCÍA', gentilicio: 'SANTALUCENSE' },
            { id: 160, nombre: 'SANTO TOMÉ Y PRÍNCIPE', gentilicio: 'SANTOMENSE' },
            { id: 161, nombre: 'SENEGAL', gentilicio: 'SENEGALÉS' },
            { id: 162, nombre: 'SERBIA', gentilicio: 'SERBIO' },
            { id: 163, nombre: 'SEYCHELLES', gentilicio: 'SEYCHELLENSE' },
            { id: 164, nombre: 'SIERRA LEONA', gentilicio: 'SIERRALEONÉS' },
            { id: 165, nombre: 'SINGAPUR', gentilicio: 'SINGAPURENSE' },
            { id: 166, nombre: 'SIRIA', gentilicio: 'SIRIO' },
            { id: 167, nombre: 'SOMALIA', gentilicio: 'SOMALÍ' },
            { id: 168, nombre: 'SRI LANKA', gentilicio: 'ESRILANQUÉS' },
            { id: 169, nombre: 'SUDÁFRICA', gentilicio: 'SUDAFRICANO' },
            { id: 170, nombre: 'SUDÁN', gentilicio: 'SUDANÉS' },
            { id: 171, nombre: 'SUDÁN DEL SUR', gentilicio: 'SURSUDANÉS' },
            { id: 172, nombre: 'SUECIA', gentilicio: 'SUECO' },
            { id: 173, nombre: 'SUIZA', gentilicio: 'SUIZO' },
            { id: 174, nombre: 'SURINAM', gentilicio: 'SURINAMÉS' },
            { id: 175, nombre: 'TAILANDIA', gentilicio: 'TAILANDÉS' },
            { id: 176, nombre: 'TAIWÁN', gentilicio: 'TAIWANÉS' },
            { id: 177, nombre: 'TAYIKISTÁN', gentilicio: 'TAYIKO' },
            { id: 178, nombre: 'TANZANIA', gentilicio: 'TANZANO' },
            { id: 179, nombre: 'TIMOR ORIENTAL', gentilicio: 'TIMORENSE' },
            { id: 180, nombre: 'TOGO', gentilicio: 'TOGOLÉS' },
            { id: 181, nombre: 'TONGA', gentilicio: 'TONGANO' },
            { id: 182, nombre: 'TRINIDAD Y TOBAGO', gentilicio: 'TRINITENSE' },
            { id: 183, nombre: 'TÚNEZ', gentilicio: 'TUNECINO' },
            { id: 184, nombre: 'TURKMENISTÁN', gentilicio: 'TURCOMANO' },
            { id: 185, nombre: 'TURQUÍA', gentilicio: 'TURCO' },
            { id: 186, nombre: 'TUVALU', gentilicio: 'TUVALUANO' },
            { id: 187, nombre: 'UCRANIA', gentilicio: 'UCRANIANO' },
            { id: 188, nombre: 'UGANDA', gentilicio: 'UGANDÉS' },
            { id: 189, nombre: 'URUGUAY', gentilicio: 'URUGUAYO' },
            { id: 190, nombre: 'UZBEKISTÁN', gentilicio: 'UZBEKO' },
            { id: 191, nombre: 'VANUATU', gentilicio: 'VANUATUENSE' },
            { id: 192, nombre: 'VATICANO', gentilicio: 'VATICANO' },
            { id: 193, nombre: 'VENEZUELA', gentilicio: 'VENEZOLANO' },
            { id: 194, nombre: 'VIETNAM', gentilicio: 'VIETNAMITA' },
            { id: 195, nombre: 'YEMEN', gentilicio: 'YEMENÍ' },
            { id: 196, nombre: 'YIBUTI', gentilicio: 'YIBUTIANO' },
            { id: 197, nombre: 'ZAMBIA', gentilicio: 'ZAMBIANO' },
            { id: 198, nombre: 'ZIMBABUE', gentilicio: 'ZIMBABUENSE' }
        ];
        
        // Limpiar el select
        select.innerHTML = '<option value="" selected disabled>SELECCIONA</option>';
        
        // Agregar opciones
        paises.forEach(item => {
            const option = document.createElement('option');
            option.value = item.id;
            option.textContent = `${item.nombre} (${item.gentilicio})`;
            select.appendChild(option);
        });

        console.log('✅ Países cargados:');
        for (let i = 0; i < select.options.length; i++) {
            console.log(`  Opción ${i}: value="${select.options[i].value}", text="${select.options[i].text}"`);
        }

        this.inicializarSelect2Pais(select);
    }

    // ==========================================
    // INICIALIZAR SELECT2
    // ==========================================
    inicializarSelect2Nacionalidad(select) {
        if (typeof $ !== 'undefined' && $.fn.select2) {
            $(select).select2({
                placeholder: 'BUSCA TU NACIONALIDAD',
                allowClear: false,
                width: '100%',
                minimumInputLength: 1
            });
            
            // Evento para cuando se selecciona una opción
            $(select).on('change', function() {
                const selectedValue = $(this).val();
                const selectedText = $(this).find('option:selected').text();
                console.log('🔍 SELECT2 CAMBIÓ: value=' + selectedValue + ', text=' + selectedText);
            });
        }
    }

    inicializarSelect2Pais(select) {
        if (typeof $ !== 'undefined' && $.fn.select2) {
            $(select).select2({
                placeholder: 'BUSCA TU PAÍS',
                allowClear: false,
                width: '100%',
                minimumInputLength: 1
            });
        }
    }

    // ==========================================
    // VALIDACIÓN DE EMAIL
    // ==========================================
    validarEmailTiempoReal() {
        if (!this.emailInput) return;
        const email = this.emailInput.value.trim();

        if (email === '') {
            this.emailInput.classList.remove('is-valid', 'is-invalid');
            this.emailInput.setCustomValidity('');
            this.limpiarErrorCampo(this.emailInput);
            return;
        }

        if (!email.includes('@')) {
            this.emailInput.classList.add('is-invalid');
            this.emailInput.classList.remove('is-valid');
            this.emailInput.setCustomValidity('El correo debe contener @');
            this.mostrarErrorCampo(this.emailInput, 'El correo electrónico debe contener "@"');
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            this.emailInput.classList.add('is-invalid');
            this.emailInput.classList.remove('is-valid');
            this.emailInput.setCustomValidity('Formato de correo inválido');
            this.mostrarErrorCampo(this.emailInput, 'Formato de correo electrónico inválido');
            return;
        }

        this.emailInput.classList.remove('is-invalid');
        this.emailInput.classList.add('is-valid');
        this.emailInput.setCustomValidity('');
        this.limpiarErrorCampo(this.emailInput);
    }

    validarEmailParaEnvio() {
        if (!this.emailInput) return true;
        const email = this.emailInput.value.trim();

        if (!email) {
            this.mostrarErrorCampo(this.emailInput, 'El correo electrónico es obligatorio');
            this.emailInput.classList.add('is-invalid');
            return false;
        }

        if (!email.includes('@')) {
            this.mostrarErrorCampo(this.emailInput, 'El correo electrónico debe contener "@"');
            this.emailInput.classList.add('is-invalid');
            return false;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            this.mostrarErrorCampo(this.emailInput, 'Formato de correo electrónico inválido');
            this.emailInput.classList.add('is-invalid');
            return false;
        }

        this.limpiarErrorCampo(this.emailInput);
        this.emailInput.classList.remove('is-invalid');
        this.emailInput.classList.add('is-valid');
        return true;
    }

    // ==========================================
    // UTILIDADES
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

    obtenerTipoPosgradoSeleccionado() {
        const radioSeleccionado = document.querySelector('input[name="posgrado"]:checked');
        return radioSeleccionado ? radioSeleccionado.value : null;
    }

    actualizarPosgrado(tipoPosgrado) {
        const esMaestria = tipoPosgrado === 'Maestría';
        const esDoctorado = tipoPosgrado === 'Doctorado';
        const esEspecialidad = tipoPosgrado === 'Especialidad';

        this.mostrarElemento(this.divMaestrias, esMaestria);
        this.mostrarElemento(this.divDoctorados, esDoctorado);
        this.mostrarElemento(this.divEspecialidades, esEspecialidad);

        if (!esMaestria && this.selectMaestria) {
            this.selectMaestria.selectedIndex = 0;
            this.limpiarErrorCampo(this.selectMaestria);
        }

        if (!esDoctorado && this.selectDoctorado) {
            this.selectDoctorado.selectedIndex = 0;
            this.limpiarErrorCampo(this.selectDoctorado);
        }

        if (!esEspecialidad && this.selectEspecialidad) {
            this.selectEspecialidad.selectedIndex = 0;
            this.limpiarErrorCampo(this.selectEspecialidad);
        }
    }

    renderizarPeriodosYEvaluaciones(tipoPosgrado) {
        let programa = '';

        if (tipoPosgrado === 'Maestría' && this.selectMaestria) {
            programa = this.selectMaestria.value;
        } else if (tipoPosgrado === 'Doctorado' && this.selectDoctorado) {
            programa = this.selectDoctorado.value;
        } else if (tipoPosgrado === 'Especialidad' && this.selectEspecialidad) {
            programa = this.selectEspecialidad.value;
        }

        if (!programa || programa === 'SELECCIONA') {
            this.renderizarPeriodos([]);
            this.renderizarFormasEvaluacion([]);
            this.evaluacionContainer.style.display = 'none';
            return;
        }

        const reglas = this.obtenerReglasPosgrado(tipoPosgrado, programa);
        this.renderizarPeriodos(reglas.periodos);
        
        if (reglas.formasEvaluacion && reglas.formasEvaluacion.length > 0) {
            this.evaluacionContainer.style.display = 'block';
            this.renderizarFormasEvaluacion(reglas.formasEvaluacion);
        } else {
            this.evaluacionContainer.style.display = 'none';
        }
    }

    renderizarPeriodos(periodos) {
        if (!this.opcionesPeriodo) return;

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

    renderizarFormasEvaluacion(formasEvaluacion) {
        if (!this.evaluacionOpciones) return;

        document.querySelectorAll('input[name="formaEvaluacion"]').forEach(r => r.checked = false);

        if (!formasEvaluacion || formasEvaluacion.length === 0) {
            this.evaluacionOpciones.innerHTML = '<p class="periodo-mensaje">No hay formas de evaluación disponibles.</p>';
            return;
        }

        this.evaluacionOpciones.innerHTML = formasEvaluacion.map((forma, index) => {
            const checked = (index === 0) ? 'checked' : '';
            return `
                <div class="radio">
                    <label><input type="radio" name="formaEvaluacion" value="${forma}" ${checked}> ${forma}</label>
                </div>
            `;
        }).join('');
    }

    ocultarElementosIniciales() {
        this.mostrarElemento(this.divMaestrias, false, false);
        this.mostrarElemento(this.divDoctorados, false, false);
        this.mostrarElemento(this.divEspecialidades, false, false);
        this.mostrarElemento(this.evaluacionContainer, false, false);
        this.mostrarElemento(this.especificarTitulacionContainer, false, false);
        this.mostrarElemento(this.especificarParentescoContainer, false, false);
        this.mostrarElemento(this.especificarCalleContainer, false, false);
        this.mostrarElemento(this.nacionalidadExtranjeraContainer, false, false);
        
        if (this.opcionesPeriodo) {
            this.opcionesPeriodo.innerHTML = '<p class="periodo-mensaje">Selecciona un posgrado para ver los periodos disponibles.</p>';
        }
        
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
            
            this.mostrarElemento(this.nacionalidadExtranjeraContainer, true);
            if (this.selectNacionalidadExtranjera) {
                this.selectNacionalidadExtranjera.required = true;
                if (typeof $ !== 'undefined' && $.fn.select2) {
                    $(this.selectNacionalidadExtranjera).val(null).trigger('change');
                }
            }
            return;
        }

        this.inputCurp.disabled = false;
        this.linkCurp.classList.remove('deshabilitado-total');
        
        this.mostrarElemento(this.nacionalidadExtranjeraContainer, false);
        if (this.selectNacionalidadExtranjera) {
            this.selectNacionalidadExtranjera.required = false;
            if (typeof $ !== 'undefined' && $.fn.select2) {
                $(this.selectNacionalidadExtranjera).val(null).trigger('change');
            }
            this.limpiarErrorCampo(this.selectNacionalidadExtranjera);
        }
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
        
        if (typeof $ !== 'undefined' && $.fn.select2) {
            const container = $(campo).next('.select2-container');
            if (container.length) {
                container.removeClass('select2-container--error');
            }
        }
        
        const contenedor = campo.closest('.form-group') || campo.parentElement;
        const mensaje = contenedor?.querySelector('.error-mensaje');
        if (mensaje) mensaje.textContent = '';
    }

    mostrarErrorCampo(campo, mensaje) {
        if (!campo) return;

        campo.classList.add('input-error');
        
        if (typeof $ !== 'undefined' && $.fn.select2) {
            const container = $(campo).next('.select2-container');
            if (container.length) {
                container.addClass('select2-container--error');
            }
        }
        
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

    validarTipoCalle() {
        if (!this.selectTipoCalle) return true;
        
        const valor = this.selectTipoCalle.value;
        
        if (valor === '' || valor === 'SELECCIONA') {
            this.mostrarErrorCampo(this.selectTipoCalle, 'Selecciona el tipo de calle');
            return false;
        }
        
        if (valor === 'OTRO') {
            const especificacion = this.especificarCalle?.value.trim() || '';
            if (especificacion === '') {
                this.mostrarErrorCampo(this.especificarCalle, 'Debes especificar el tipo de calle');
                return false;
            }
            this.limpiarErrorCampo(this.especificarCalle);
        }
        
        this.limpiarErrorCampo(this.selectTipoCalle);
        return true;
    }

    validarPais() {
        if (!this.selectPais) return true;
        
        const valor = this.selectPais.value;
        
        if (valor === '' || valor === 'SELECCIONA' || !valor) {
            this.mostrarErrorCampo(this.selectPais, 'Selecciona tu país');
            return false;
        }
        
        this.limpiarErrorCampo(this.selectPais);
        return true;
    }

    validarNacionalidadExtranjera() {
        if (this.nacionalidadExtranjeraContainer.style.display === 'none') {
            return true;
        }
        
        const select = document.getElementById('nacionalidadExtranjera');
        if (!select) return true;
        
        const valor = select.value;
        
        if (valor === '' || valor === 'SELECCIONA' || !valor) {
            this.mostrarErrorCampo(select, 'Selecciona tu nacionalidad');
            return false;
        }
        
        this.limpiarErrorCampo(select);
        return true;
    }

    limpiarValidaciones() {
        document.querySelectorAll('.input-error').forEach(campo => campo.classList.remove('input-error'));
        
        document.querySelectorAll('.select2-container--error').forEach(container => {
            container.classList.remove('select2-container--error');
        });
        
        document.querySelectorAll('.error-mensaje').forEach(mensaje => {
            mensaje.textContent = '';
        });
        this.ocultarBanners();
        this.limpiarErrorPeriodo();
        
        if (this.emailInput) {
            this.emailInput.classList.remove('is-valid', 'is-invalid');
        }
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

    manejarEnvio() {
        this.limpiarValidaciones();
        
        const emailValido = this.validarEmailParaEnvio();
        if (!emailValido) {
            if (this.emailInput) {
                this.emailInput.focus();
                this.emailInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            this.mostrarBanner('error');
            return;
        }
        
        const evento = new CustomEvent('validarEnvio');
        document.dispatchEvent(evento);
    }

    // ==========================================
    // CONSTRUIR RESUMEN
    // ==========================================
    construirResumen(datos) {
        if (!datos) {
            return '<p>No hay datos para mostrar</p>';
        }

        const formatearLista = (lista, campos, vacio = 'Ninguno') => {
            if (!lista || lista.length === 0) return `<li>${this.texto(vacio)}</li>`;
            return lista.map(item => {
                const partes = campos.map(campo => {
                    const valor = item[campo.key] || 'No especificado';
                    return `<strong>${campo.label}:</strong> ${this.texto(valor)}`;
                });
                return `<li>${partes.join(' | ')}</li>`;
            }).join('');
        };

        const nombreCompleto = `${datos.nombre || ''} ${datos.primerApellido || ''} ${datos.segundoApellido || ''}`.trim() || 'No especificado';
        const domicilio = datos.domicilio || {};
        const direccion = `${domicilio.calle || ''} ${domicilio.numExt || ''}${domicilio.numInt ? ' Int. '+domicilio.numInt : ''}, ${domicilio.colonia || ''}, CP ${domicilio.cp || ''}, ${domicilio.municipio || ''}, ${domicilio.estado || ''}`.trim() || 'No especificada';

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

        const dominioIngles = datos.dominioIngles || {};
        const experiencia = datos.experienciaLaboral || [];
        const publicaciones = datos.publicaciones || [];

        const emailDisplay = email !== 'No especificado' 
            ? `<span style="color: #198754; font-weight: bold;">✓ ${this.texto(email)}</span>`
            : this.texto(email);

        let html = `
            <div class="section-title">DATOS GENERALES DEL ASPIRANTE</div>
            <ul>
                <li><strong>Nacionalidad:</strong> ${this.texto(datos.nacionalidad)}</li>
                <li><strong>CURP:</strong> ${this.texto(datos.curp)}</li>
                <li><strong>Nombre completo:</strong> ${this.texto(nombreCompleto)}</li>
                <li><strong>Sexo:</strong> ${this.texto(datos.sexo)}</li>
                <li><strong>Fecha de nacimiento:</strong> ${this.texto(datos.fechaNacimiento)}</li>
                <li><strong>Lugar de nacimiento:</strong> ${this.texto(datos.lugarNacimiento)}</li>
            </ul>

            <ul>
                <li><strong>Lada internacional:</strong> ${this.texto(contacto.lada)}</li>
                <li><strong>Teléfono fijo:</strong> ${this.texto(contacto.telFijo)}</li>
                <li><strong>Extensión:</strong> ${this.texto(contacto.ext)}</li>
                <li><strong>Teléfono móvil:</strong> ${this.texto(contacto.telMovil)}</li>
                <li><strong>Correo electrónico:</strong> ${emailDisplay}</li>
            </ul>

            <div class="section-title">DOMICILIO</div>
            <ul>
                <li><strong>Código Postal:</strong> ${this.texto(domicilio.cp)}</li>
                <li><strong>Estado:</strong> ${this.texto(domicilio.estado)}</li>
                <li><strong>Municipio o Alcaldía:</strong> ${this.texto(domicilio.municipio)}</li>
                <li><strong>Localidad:</strong> ${this.texto(domicilio.localidad)}</li>
                <li><strong>Colonia:</strong> ${this.texto(domicilio.colonia)}</li>
                <li><strong>Tipo de calle:</strong> ${this.texto(domicilio.tipoCalle)}</li>
                <li><strong>Calle:</strong> ${this.texto(domicilio.calle)}</li>
                <li><strong>Número exterior:</strong> ${this.texto(domicilio.numExt)}</li>
                <li><strong>Número interior:</strong> ${this.texto(domicilio.numInt)}</li>
                <li><strong>País:</strong> ${this.texto(domicilio.pais)}</li>
            </ul>

            <div class="section-title">CONTACTO DE EMERGENCIA</div>
            <ul>
                <li><strong>Nombre:</strong> ${this.texto(nombreEmergencia)}</li>
                <li><strong>Lada internacional:</strong> ${this.texto(contactoEmergencia.lada)}</li>
                <li><strong>Teléfono fijo:</strong> ${this.texto(contactoEmergencia.telFijo)}</li>
                <li><strong>Extensión:</strong> ${this.texto(contactoEmergencia.ext)}</li>
                <li><strong>Teléfono móvil:</strong> ${this.texto(contactoEmergencia.telMovil)}</li>
                <li><strong>Parentesco:</strong> ${this.texto(contactoEmergencia.parentesco)}</li>
            </ul>

            <div class="section-title">DATOS ACADEMICOS DEL ASPIRANTE</div>
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

            <div class="section-title">DATOS DE ESTUDIO PREVIOS</div>
            <ul>
                <li><strong>Institución:</strong> ${this.texto(estudiosPrevios.institucion)}</li>
                <li><strong>Grado académico:</strong> ${this.texto(estudiosPrevios.gradoAcademico)}</li>
                <li><strong>Año de obtención:</strong> ${this.texto(estudiosPrevios.anioGrado)}</li>
                <li><strong>Promedio:</strong> ${this.texto(estudiosPrevios.promedio)}</li>
                <li><strong>Tipo de titulación:</strong> ${this.texto(estudiosPrevios.tipoTitulacion)}</li>
            </ul>

            <div class="section-title">DOMINIO DEL IDIOMA INGLES</div>
            <ul>
                <li><strong>Expresión escrita:</strong> ${this.texto(dominioIngles.expresionEscrita)}</li>
                <li><strong>Expresión oral:</strong> ${this.texto(dominioIngles.expresionOral)}</li>
                <li><strong>Comprensión lectora:</strong> ${this.texto(dominioIngles.comprensionLectora)}</li>
                <li><strong>Comprensión auditiva:</strong> ${this.texto(dominioIngles.comprensionAuditiva)}</li>
            </ul>

            <div class="section-title">EXPERIENCIA LABORAL</div>
            <ul>
                ${formatearLista(experiencia, 
                    [
                        {label: 'Institución', key: 'institucion'},
                        {label: 'Tipo', key: 'tipoExperiencia'},
                        {label: 'Puesto', key: 'puesto'},
                        {label: 'Tiempo', key: 'tiempoLaborado'}
                    ], 
                    'No registra experiencia laboral'
                )}
            </ul>

            <div class="section-title">PUBLICACIONES CIENTÍFICAS</div>
            <ul>
                ${formatearLista(publicaciones, 
                    [
                        {label: 'Título', key: 'titulo'},
                        {label: 'Tipo', key: 'tipoPublicacion'},
                        {label: 'DOI/Enlace', key: 'doi'}
                    ], 
                    'No registra publicaciones'
                )}
            </ul>

            <div class="section-title">RAZÓN POR LA CUAL DESEAS ESTUDIAR UN POSGRADO EN EL INAOE</div>
            <ul>
                <li><strong>Razón para estudiar en el INAOE:</strong> ${this.texto(motivacion.razon)}</li>
                <li><strong>Medio por el que se enteró:</strong> ${this.texto(motivacion.medio)}</li>
            </ul>
        `;

        return html;
    }

    texto(valor, respaldo = 'No especificado') {
        const texto = valor || respaldo;
        return this.escaparHtml(String(texto).toUpperCase());
    }

    escaparHtml(valor) {
        return String(valor || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
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

    async confirmarEnvio() {
        try {
            if (!this.validarEmailParaEnvio()) {
                if (this.emailInput) {
                    this.emailInput.focus();
                }
                this.mostrarBanner('error');
                return;
            }

            this.ocultarResumen();
            
            const btn = this.btnConfirmarEnvio;
            const textoOriginal = btn.textContent;
            btn.textContent = 'Enviando...';
            btn.disabled = true;

            const evento = new CustomEvent('confirmarEnvio', {
                detail: { btn, textoOriginal }
            });
            document.dispatchEvent(evento);
            
        } catch (error) {
            console.error('Error:', error);
            if (this.btnConfirmarEnvio) {
                this.btnConfirmarEnvio.disabled = false;
                this.btnConfirmarEnvio.textContent = 'Confirmar envío';
            }
            alert('Ocurrió un error al enviar la solicitud');
        }
    }
}

if (typeof window !== 'undefined') {
    window.AdmisionView = AdmisionView;
}

console.log('✅ AdmisionView cargado correctamente');
console.log('📌 MÉXICO = ID 1, MEXICANA = ID 1');