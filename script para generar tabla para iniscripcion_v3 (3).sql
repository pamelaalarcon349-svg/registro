
--1
CREATE TABLE Aspirante (
    id_Aspirante INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
    nacionalidad_asp INT NULL,
    curp_asp VARCHAR(18) NULL,
    nombre_asp VARCHAR(255) NOT NULL,
    primer_apellido_asp VARCHAR(255) NOT NULL,
    segundo_apellido_asp VARCHAR(255) NULL,
    genero_asp TINYINT NOT NULL,
    fecha_nacimiento_asp DATE NOT NULL,
    lugar_nacimiento_asp VARCHAR(100) NOT NULL,
    lada_telefonica_asp VARCHAR(5) NOT NULL,
    telefono_fijo_asp VARCHAR(15) NULL,
    extension_telefonica_asp VARCHAR(10) NULL,
    telefono_movil_asp VARCHAR(15) NOT NULL,
    correo_electronico_asp VARCHAR(255) NOT NULL,
    codigo_postal_asp VARCHAR(10) NOT NULL,
    estado_pais_asp VARCHAR(50) NOT NULL,
    municipio_asp VARCHAR(100) NOT NULL,
    localidad_asp VARCHAR(100) NOT NULL,
    colonia_asp VARCHAR(100) NOT NULL,
    tipo_calle_asp VARCHAR(50) NOT NULL,
    calle_asp VARCHAR(150) NOT NULL,
    numero_exterior_asp VARCHAR(20) NOT NULL,
    numero_interior_asp VARCHAR(20) NULL,
    pais_asp VARCHAR(50) NOT NULL,
    nombre_contacto_emg VARCHAR(100) NOT NULL, --NUEVO CAMPO 
	primer_apellido_emg VARCHAR(255) NOT NULL, --NUEVO CAMPO
	segundo_apellido_emg VARCHAR(255) NULL,
	lada_emg VARCHAR(5) NOT NULL,
    telefono_fijo_emg VARCHAR(15) NOT NULL,
    extencion_emg VARCHAR(10) NULL,
    telefono_movil_emg VARCHAR(15) NOT NULL,
    tipo_parentesco_emg INT NOT NULL, --CAMBIO A INT 
    posgrado_ingresar_asp INT NOT NULL,
    anio_ingreso_posgrado_asp VARCHAR(20) NOT NULL,
    periodo_ingreso_posgrados_asp int NOT NULL,
	institucion_educativa_asp VARCHAR(200)  NOT NULL,
    grado_academico_obtenido_asp VARCHAR(150) NOT NULL,
    anio_obtencion_grado_asp VARCHAR(20) NOT NULL,
    promedio_obtenido_asp DECIMAL(4,2) NOT NULL,
    tipo_titulacion_asp INT NOT NULL,
    ingles_oral_asp INT NULL,
    ingles_escrito_asp INT NULL,
    ingles_auditivo_asp INT NULL,
    ingles_lectora_asp INT NULL,
	institucion_empresa_asp VARCHAR (200) NULL, --NUEVO CAMPO 
	tipo_experiencia_asp int NULL, --NUEVO CAMPO 
    puesto_funciones_asp VARCHAR(200) NULL, -- NUEVO CAMPO 
	tiempo_laborado_asp VARCHAR (20) NULL,  -- NUEVO CAMPO 
	titulo_publicacion_asp VARCHAR(200) NULL, --NUEVO CAMPO 
	tipo_publicacion_asp VARCHAR(200) NULL,    --NUEVO CAMPO 
    doi_articulo_asp VARCHAR(50) NULL,
    razon_estudio_inaoe_asp VARCHAR(255) NOT NULL,
    medio_enterado_asp int NOT NULL,
    estatus_solicitud_asp INT NOT NULL,
    fecha_creacion DATETIME NOT NULL,
	id_general INT NULL,
    id_programa_periodo INT NULL,
   
);