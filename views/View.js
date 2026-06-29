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
        
        // Elementos de parentesco
        this.selectParentesco = document.getElementById('parentesco');
        this.especificarParentescoContainer = document.getElementById('especificarParentescoContainer');
        this.especificarParentesco = document.getElementById('especificarParentesco');
        
        // Elementos de tipo de calle
        this.selectTipoCalle = document.getElementById('tipoCalle');
        this.especificarCalleContainer = document.getElementById('especificarCalleContainer');
        this.especificarCalle = document.getElementById('especificarCalle');
        
        // Elemento de país
        this.selectPais = document.getElementById('pais');
        
        this.btnEnviarModal = document.getElementById('btnEnviarModal');
        this.btnConfirmarEnvio = document.getElementById('confirmarEnvio');

        // Elementos de nacionalidad extranjera
        this.nacionalidadExtranjeraContainer = document.getElementById('nacionalidadExtranjeraContainer');
        this.selectNacionalidadExtranjera = document.getElementById('nacionalidadExtranjera');

        // Elementos de email
        this.emailInput = document.getElementById('email');

        // Radio buttons de posgrado
        this.radiosPosgrado = document.querySelectorAll('input[name="posgrado"]');

        // Inicializar eventos
        this.inicializarEventos();
    }

    // ==========================================
    // REGLAS DE POSGRADO (con Especialidad)
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

        // Evento para cambio en select de Especialidad
        if (this.selectEspecialidad) {
            this.selectEspecialidad.addEventListener('change', () => {
                const tipoPosgrado = this.obtenerTipoPosgradoSeleccionado();
                if (tipoPosgrado === 'Especialidad') {
                    this.renderizarPeriodosYEvaluaciones('Especialidad');
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

        // Evento para tipo de calle
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

        // Eventos para validación de email
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

        this.cargarNacionalidadesExtranjeras();
        this.cargarPaises();
        this.ocultarElementosIniciales();
        this.inicializarCalendario();
        this.actualizarCurp(false);
        this.inicializarValidacionNumeros();
    }

    // ==========================================
    // VALIDACIÓN DE EMAIL EN TIEMPO REAL
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

    // ==========================================
    // VALIDACIÓN DE EMAIL PARA ENVÍO
    // ==========================================
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
    // CARGAR NACIONALIDADES EXTRANJERAS CON SELECT2
    // ==========================================
    cargarNacionalidadesExtranjeras() {
        const select = document.getElementById('nacionalidadExtranjera');
        if (!select) return;
        
        const nacionalidades = [
            'AFGANISTÁN (AFGANO)', 'ALBANIA (ALBANÉS)', 'ALEMANIA (ALEMÁN)', 
            'ANDORRA (ANDORRANO)', 'ANGOLA (ANGOLEÑO)', 'ANTIGUA Y BARBUDA (ANTIGUANO)',
            'ARABIA SAUDITA (SAUDÍ)', 'ARGELIA (ARGELINO)', 'ARGENTINA (ARGENTINO)',
            'ARMENIA (ARMENIO)', 'AUSTRALIA (AUSTRALIANO)', 'AUSTRIA (AUSTRIACO)',
            'AZERBAIYÁN (AZERBAIYANO)', 'BAHAMAS (BAHAMEÑO)', 'BANGLADÉS (BANGLADESÍ)',
            'BARBADOS (BARBADENSE)', 'BARÉIN (BAREINÍ)', 'BÉLGICA (BELGA)',
            'BELICE (BELICEÑO)', 'BENÍN (BENINÉS)', 'BIELORRUSIA (BIELORRUSO)',
            'BIRMANIA (BIRMANO)', 'BOLIVIA (BOLIVIANO)', 'BOSNIA Y HERZEGOVINA (BOSNIOHERZEGOVINO)',
            'BOTSUANA (BOTSUANO)', 'BRASIL (BRASILEÑO)', 'BRUNÉI (BRUNEANO)',
            'BULGARIA (BÚLGARO)', 'BURKINA FASO (BURKINÉS)', 'BURUNDI (BURUNDÉS)',
            'BUTÁN (BUTANÉS)', 'CABO VERDE (CABOVERDIANO)', 'CAMBOYA (CAMBOYANO)',
            'CAMERÚN (CAMERUNÉS)', 'CANADÁ (CANADIENSE)', 'CHAD (CHADIANO)',
            'CATAR (CATARÍ)', 'CHILE (CHILENO)', 'CHINA (CHINO)',
            'CHIPRE (CHIPRIOTA)', 'COLOMBIA (COLOMBIANO)', 'COMORAS (COMORENSE)',
            'CONGO (CONGOLEÑO)', 'COREA DEL NORTE (NORCOREANO)', 'COREA DEL SUR (SURCOREANO)',
            'COSTA DE MARFIL (COSTAMARFILEÑO)', 'COSTA RICA (COSTARRICENSE)', 
            'CROACIA (CROATA)', 'CUBA (CUBANO)', 'DINAMARCA (DANÉS)',
            'DOMINICA (DOMINIQUÉS)', 'ECUADOR (ECUATORIANO)', 'EGIPTO (EGIPCIO)',
            'EL SALVADOR (SALVADOREÑO)', 'EMIRATOS ÁRABES UNIDOS (EMIRATÍ)', 
            'ERITREA (ERITREO)', 'ESLOVAQUIA (ESLOVACO)', 'ESLOVENIA (ESLOVENO)',
            'ESPAÑA (ESPAÑOL)', 'ESTADOS UNIDOS (ESTADOUNIDENSE)', 'ESTONIA (ESTONIO)',
            'ESUATINI (ESUATINÍ)', 'ETIOPÍA (ETÍOPE)', 'FILIPINAS (FILIPINO)',
            'FINLANDIA (FINLANDÉS)', 'FIYI (FIYIANO)', 'FRANCIA (FRANCÉS)',
            'GABÓN (GABONÉS)', 'GAMBIA (GAMBIANO)', 'GEORGIA (GEORGIANO)',
            'GHANA (GHANÉS)', 'GRANADA (GRANADINO)', 'GRECIA (GRIEGO)',
            'GUATEMALA (GUATEMALTECO)', 'GUINEA (GUINEANO)', 'GUINEA-BISÁU (GUINEANO)',
            'GUINEA ECUATORIAL (ECUATOGUINEANO)', 'GUYANA (GUYANÉS)', 'HAITÍ (HAITIANO)',
            'HONDURAS (HONDUREÑO)', 'HUNGRÍA (HÚNGARO)', 'INDIA (INDIO)',
            'INDONESIA (INDONESIO)', 'IRAK (IRAQUÍ)', 'IRÁN (IRANÍ)',
            'IRLANDA (IRLANDÉS)', 'ISLANDIA (ISLANDÉS)', 'ISLAS MARSHALL (MARSHALÉS)',
            'ISLAS SALOMÓN (SALOMONENSE)', 'ISRAEL (ISRAELÍ)', 'ITALIA (ITALIANO)',
            'JAMAICA (JAMAICANO)', 'JAPÓN (JAPONÉS)', 'JORDANIA (JORDANO)',
            'KAZAJISTÁN (KAZAJO)', 'KENIA (KENIANO)', 'KIRGUISTÁN (KIRGUÍS)',
            'KIRIBATI (KIRIBATIANO)', 'KOSOVO (KOSOVAR)', 'KUWAIT (KUWAITÍ)',
            'LAOS (LAOSIANO)', 'LESOTO (LESOTENSE)', 'LETONIA (LETÓN)',
            'LÍBANO (LIBANÉS)', 'LIBERIA (LIBERIANO)', 'LIBIA (LIBIO)',
            'LIECHTENSTEIN (LIECHTENSTEINIANO)', 'LITUANIA (LITUANO)', 
            'LUXEMBURGO (LUXEMBURGUÉS)', 'MACEDONIA DEL NORTE (MACEDONIO)',
            'MADAGASCAR (MALGACHE)', 'MALASIA (MALASIO)', 'MALAUI (MALAUÍ)',
            'MALDIVAS (MALDIVO)', 'MALI (MALÍ)', 'MALTA (MALTÉS)',
            'MARRUECOS (MARROQUÍ)', 'MAURICIO (MAURICIANO)', 'MAURITANIA (MAURITANO)',
            'MICRONESIA (MICRONESIO)', 'MOLDAVIA (MOLDAVO)', 'MÓNACO (MONEGASCO)',
            'MONGOLIA (MONGOL)', 'MONTENEGRO (MONTENEGRINO)', 'MOZAMBIQUE (MOZAMBIQUEÑO)',
            'NAMIBIA (NAMIBIO)', 'NAURU (NAURUANO)', 'NEPAL (NEPALÉS)',
            'NICARAGUA (NICARAGÜENSE)', 'NÍGER (NIGERINO)', 'NIGERIA (NIGERIANO)',
            'NORUEGA (NORUEGO)', 'NUEVA ZELANDA (NEOZELANDÉS)', 'OMÁN (OMANÍ)',
            'PAÍSES BAJOS (NEERLANDÉS)', 'PAKISTÁN (PAKISTANÍ)', 'PALAOS (PALAUANO)',
            'PALESTINA (PALESTINO)', 'PANAMÁ (PANAMEÑO)', 'PAPÚA NUEVA GUINEA (PAPÚ)',
            'PARAGUAY (PARAGUAYO)', 'PERÚ (PERUANO)', 'POLONIA (POLACO)',
            'PORTUGAL (PORTUGUÉS)','PUERTO RICO (PUERTORRIQUEÑO)', 'REINO UNIDO (BRITÁNICO)', 
            'REPÚBLICA CENTROAFRICANA (CENTROAFRICANO)', 'REPÚBLICA CHECA (CHECO)',
            'REPÚBLICA DEMOCRÁTICA DEL CONGO (CONGOLEÑO)', 
            'REPÚBLICA DOMINICANA (DOMINICANO)', 'RUANDA (RUANDÉS)', 
            'RUMANÍA (RUMANO)', 'RUSIA (RUSO)', 'SAMOA (SAMOANO)',
            'SAN CRISTÓBAL Y NIEVES (SANCRISTOBALEÑO)', 'SAN MARINO (SANMARINENSE)',
            'SAN VICENTE Y LAS GRANADINAS (SANVICENTINO)', 'SANTA LUCÍA (SANTALUCENSE)',
            'SANTO TOMÉ Y PRÍNCIPE (SANTOMENSE)', 'SENEGAL (SENEGALÉS)',
            'SERBIA (SERBIO)', 'SEYCHELLES (SEYCHELLENSE)', 'SIERRA LEONA (SIERRALEONÉS)',
            'SINGAPUR (SINGAPURENSE)', 'SIRIA (SIRIO)', 'SOMALIA (SOMALÍ)',
            'SRI LANKA (ESRILANQUÉS)', 'SUDÁFRICA (SUDAFRICANO)', 'SUDÁN (SUDANÉS)',
            'SUDÁN DEL SUR (SURSUDANÉS)', 'SUECIA (SUECO)', 'SUIZA (SUIZO)',
            'SURINAM (SURINAMÉS)', 'TAILANDIA (TAILANDÉS)', 'TAIWÁN (TAIWANÉS)',
            'TAYIKISTÁN (TAYIKO)', 'TANZANIA (TANZANO)', 'TIMOR ORIENTAL (TIMORENSE)',
            'TOGO (TOGOLÉS)', 'TONGA (TONGANO)', 'TRINIDAD Y TOBAGO (TRINITENSE)',
            'TÚNEZ (TUNECINO)', 'TURKMENISTÁN (TURCOMANO)', 'TURQUÍA (TURCO)',
            'TUVALU (TUVALUANO)', 'UCRANIA (UCRANIANO)', 'UGANDA (UGANDÉS)',
            'URUGUAY (URUGUAYO)', 'UZBEKISTÁN (UZBEKO)', 'VANUATU (VANUATUENSE)',
            'VATICANO (VATICANO)', 'VENEZUELA (VENEZOLANO)', 'VIETNAM (VIETNAMITA)',
            'YEMEN (YEMENÍ)', 'YIBUTI (YIBUTIANO)', 'ZAMBIA (ZAMBIANO)',
            'ZIMBABUE (ZIMBABUENSE)'
        ];
        
        nacionalidades.sort((a, b) => a.localeCompare(b));
        
        nacionalidades.forEach(nacionalidad => {
            const option = document.createElement('option');
            option.value = nacionalidad;
            option.textContent = nacionalidad;
            select.appendChild(option);
        });
        
        if (typeof $ !== 'undefined' && $.fn.select2) {
            $(select).select2({
                placeholder: 'BUSCA TU NACIONALIDAD',
                allowClear: false,
                width: '100%',
                language: {
                    searching: function() { return 'Buscando...'; },
                    noResults: function() { return 'No se encontraron resultados'; },
                    inputTooShort: function() {
                        return 'Escribe para comenzar a buscar';
                    }
                },
                minimumInputLength: 1,
                matcher: function(params, data) {
                    if (!params.term) return data;
                    const term = params.term.toUpperCase();
                    const text = data.text.toUpperCase();
                    if (text.indexOf(term) > -1) {
                        return data;
                    }
                    return null;
                }
            });
            
            $(select).on('select2:open', function() {
                const searchField = document.querySelector('.select2-search__field');
                if (searchField) {
                    searchField.style.textTransform = 'uppercase';
                    searchField.addEventListener('input', function() {
                        const start = this.selectionStart;
                        const end = this.selectionEnd;
                        const value = this.value;
                        const upperValue = value.toUpperCase();
                        if (value !== upperValue) {
                            this.value = upperValue;
                            this.setSelectionRange(start, end);
                        }
                    });
                }
            });
        }
        
        console.log('Nacionalidades cargadas correctamente con Select2');
    }

    // ==========================================
    // CARGAR PAÍSES CON SELECT2
    // ==========================================
    cargarPaises() {
        const select = document.getElementById('pais');
        if (!select) return;
        
        const paises = [
            'AFGANISTÁN', 'ALBANIA', 'ALEMANIA', 'ANDORRA', 'ANGOLA',
            'ANTIGUA Y BARBUDA', 'ARABIA SAUDITA', 'ARGELIA', 'ARGENTINA', 'ARMENIA',
            'AUSTRALIA', 'AUSTRIA', 'AZERBAIYÁN', 'BAHAMAS', 'BANGLADÉS',
            'BARBADOS', 'BARÉIN', 'BÉLGICA', 'BELICE', 'BENÍN',
            'BIELORRUSIA', 'BIRMANIA', 'BOLIVIA', 'BOSNIA Y HERZEGOVINA', 'BOTSUANA',
            'BRASIL', 'BRUNÉI', 'BULGARIA', 'BURKINA FASO', 'BURUNDI',
            'BUTÁN', 'CABO VERDE', 'CAMBOYA', 'CAMERÚN', 'CANADÁ',
            'CHAD', 'CATAR', 'CHILE', 'CHINA', 'CHIPRE',
            'COLOMBIA', 'COMORAS', 'CONGO', 'COREA DEL NORTE', 'COREA DEL SUR',
            'COSTA DE MARFIL', 'COSTA RICA', 'CROACIA', 'CUBA', 'DINAMARCA',
            'DOMINICA', 'ECUADOR', 'EGIPTO', 'EL SALVADOR', 'EMIRATOS ÁRABES UNIDOS',
            'ERITREA', 'ESLOVAQUIA', 'ESLOVENIA', 'ESPAÑA', 'ESTADOS UNIDOS',
            'ESTONIA', 'ESUATINI', 'ETIOPÍA', 'FILIPINAS', 'FINLANDIA',
            'FIYI', 'FRANCIA', 'GABÓN', 'GAMBIA', 'GEORGIA',
            'GHANA', 'GRANADA', 'GRECIA', 'GUATEMALA', 'GUINEA',
            'GUINEA-BISÁU', 'GUINEA ECUATORIAL', 'GUYANA', 'HAITÍ', 'HONDURAS',
            'HUNGRÍA', 'INDIA', 'INDONESIA', 'IRAK', 'IRÁN',
            'IRLANDA', 'ISLANDIA', 'ISLAS MARSHALL', 'ISLAS SALOMÓN', 'ISRAEL',
            'ITALIA', 'JAMAICA', 'JAPÓN', 'JORDANIA', 'KAZAJISTÁN',
            'KENIA', 'KIRGUISTÁN', 'KIRIBATI', 'KOSOVO', 'KUWAIT',
            'LAOS', 'LESOTO', 'LETONIA', 'LÍBANO', 'LIBERIA',
            'LIBIA', 'LIECHTENSTEIN', 'LITUANIA', 'LUXEMBURGO', 'MACEDONIA DEL NORTE',
            'MADAGASCAR', 'MALASIA', 'MALAUI', 'MALDIVAS', 'MALI',
            'MALTA', 'MARRUECOS', 'MAURICIO', 'MAURITANIA', 'MÉXICO',
            'MICRONESIA', 'MOLDAVIA', 'MÓNACO', 'MONGOLIA', 'MONTENEGRO',
            'MOZAMBIQUE', 'NAMIBIA', 'NAURU', 'NEPAL', 'NICARAGUA',
            'NÍGER', 'NIGERIA', 'NORUEGA', 'NUEVA ZELANDA', 'OMÁN',
            'PAÍSES BAJOS', 'PAKISTÁN', 'PALAOS', 'PALESTINA', 'PANAMÁ',
            'PAPÚA NUEVA GUINEA', 'PARAGUAY', 'PERÚ', 'POLONIA', 'PORTUGAL',
            'PUERTO RICO', 'REINO UNIDO', 'REPÚBLICA CENTROAFRICANA', 'REPÚBLICA CHECA',
            'REPÚBLICA DEMOCRÁTICA DEL CONGO', 'REPÚBLICA DOMINICANA', 'RUANDA', 'RUMANÍA',
            'RUSIA', 'SAMOA', 'SAN CRISTÓBAL Y NIEVES', 'SAN MARINO',
            'SAN VICENTE Y LAS GRANADINAS', 'SANTA LUCÍA', 'SANTO TOMÉ Y PRÍNCIPE',
            'SENEGAL', 'SERBIA', 'SEYCHELLES', 'SIERRA LEONA', 'SINGAPUR',
            'SIRIA', 'SOMALIA', 'SRI LANKA', 'SUDÁFRICA', 'SUDÁN',
            'SUDÁN DEL SUR', 'SUECIA', 'SUIZA', 'SURINAM', 'TAILANDIA',
            'TAIWÁN', 'TAYIKISTÁN', 'TANZANIA', 'TIMOR ORIENTAL', 'TOGO',
            'TONGA', 'TRINIDAD Y TOBAGO', 'TÚNEZ', 'TURKMENISTÁN', 'TURQUÍA',
            'TUVALU', 'UCRANIA', 'UGANDA', 'URUGUAY', 'UZBEKISTÁN',
            'VANUATU', 'VATICANO', 'VENEZUELA', 'VIETNAM', 'YEMEN',
            'YIBUTI', 'ZAMBIA', 'ZIMBABUE'
        ];
        
        paises.sort((a, b) => a.localeCompare(b));
        
        paises.forEach(pais => {
            const option = document.createElement('option');
            option.value = pais;
            option.textContent = pais;
            select.appendChild(option);
        });
        
        if (typeof $ !== 'undefined' && $.fn.select2) {
            $(select).select2({
                placeholder: 'BUSCA TU PAÍS',
                allowClear: false,
                width: '100%',
                language: {
                    searching: function() { return 'Buscando...'; },
                    noResults: function() { return 'No se encontraron resultados'; },
                    inputTooShort: function() {
                        return 'Escribe para comenzar a buscar';
                    }
                },
                minimumInputLength: 1,
                matcher: function(params, data) {
                    if (!params.term) return data;
                    const term = params.term.toUpperCase();
                    const text = data.text.toUpperCase();
                    if (text.indexOf(term) > -1) {
                        return data;
                    }
                    return null;
                }
            });
            
            $(select).on('select2:open', function() {
                const searchField = document.querySelector('.select2-search__field');
                if (searchField) {
                    searchField.style.textTransform = 'uppercase';
                    searchField.addEventListener('input', function() {
                        const start = this.selectionStart;
                        const end = this.selectionEnd;
                        const value = this.value;
                        const upperValue = value.toUpperCase();
                        if (value !== upperValue) {
                            this.value = upperValue;
                            this.setSelectionRange(start, end);
                        }
                    });
                }
            });
        }
        
        console.log('Países cargados correctamente con Select2');
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
    // ACTUALIZAR POSGRADO (con Especialidad)
    // ==========================================
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

    // ==========================================
    // RENDERIZAR PERIODOS Y EVALUACIONES (con Especialidad)
    // ==========================================
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

    // ==========================================
    // RENDERIZAR PERIODOS
    // ==========================================
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

    // ==========================================
    // RENDERIZAR FORMAS DE EVALUACIÓN
    // ==========================================
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

    // ==========================================
    // MÉTODOS DE UTILIDAD
    // ==========================================
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

    // ==========================================
    // VALIDAR PARENTESCO
    // ==========================================
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

    // ==========================================
    // VALIDAR TIPO DE CALLE
    // ==========================================
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

    // ==========================================
    // VALIDAR PAÍS
    // ==========================================
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

    // ==========================================
    // VALIDAR NACIONALIDAD EXTRANJERA
    // ==========================================
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

    // ==========================================
    // ** FUNCIÓN FALTANTE - AGREGADA AQUÍ **
    // ==========================================
    /**
     * Verifica si la nacionalidad seleccionada es extranjera
     */
    esNacionalidadExtranjera() {
        // Método 1: Verificar el contenedor visible
        if (this.nacionalidadExtranjeraContainer) {
            const display = window.getComputedStyle(this.nacionalidadExtranjeraContainer).display;
            if (display !== 'none') {
                return true;
            }
        }
        
        // Método 2: Verificar el radio button directamente
        const radioExtranjero = document.querySelector('input[name="nacionalidad"][value="Otra (Extranjera)"]');
        if (radioExtranjero) {
            return radioExtranjero.checked;
        }
        
        // Método 3: Verificar el valor del radio seleccionado
        const radioSeleccionado = document.querySelector('input[name="nacionalidad"]:checked');
        if (radioSeleccionado) {
            return radioSeleccionado.value === 'Otra (Extranjera)';
        }
        
        return false;
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

    // ==========================================
    // MANEJAR ENVÍO
    // ==========================================
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

console.log('Clase AdmisionView cargada correctamente con validación de email');