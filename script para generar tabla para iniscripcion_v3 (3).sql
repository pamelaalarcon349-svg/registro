CREATE  DATABASE pRegistro
---version 2 tablas asiladas
use pRegistro
go 

/*sección  1  generar las tablas de catalogos */
/****** Object:  Table [dbo].[sga_cat_nacionalidad]    Script Date: 22/06/2026 04:13:34 p. m. ******/
--1
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sga_cat_nacionalidad](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[clave] [int] NOT NULL,
	[nacionalidad] [varchar](255) NOT NULL,
	[estado] [int] NOT NULL,
 CONSTRAINT [PK_sga_cat_nacionalidad] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

--2
/****** Object:  Table [dbo].[sga_cat_estado_proceso]    Script Date: 22/06/2026 06:45:57 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sga_cat_estado_proceso](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[clave] [int] NOT NULL,
	[nombre] [varchar](255) NULL,
	[nivel] [int] NOT NULL,
	[icono] [varchar](50) NULL,
	[estado] [int] NOT NULL,
	[proceso_m2o_id] [int] NOT NULL,
	[estado_proceso_padre_m2o_id] [int] NULL,
 CONSTRAINT [PK_sga_cat_estado_proceso] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]


--3
/****** Object:  Table [dbo].[sga_cat_tipo_grado]    Script Date: 22/06/2026 04:13:34 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sga_cat_tipo_grado](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[clave] [int] NOT NULL,
	[tipo_grado] [varchar](255) NOT NULL,
	[abreviatura] [varchar](5) NULL,
	[estado] [int] NOT NULL,
 CONSTRAINT [PK_sga_cat_tipo_grado] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

--4
/****** Object:  Table [dbo].[sga_programa]    Script Date: 22/06/2026 04:13:34 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sga_programa](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre_programa] [varchar](max) NOT NULL,
	[modalidad] [int] NOT NULL,
	[justificacion] [varchar](max) NULL,
	[objetivo_general] [varchar](max) NULL,
	[objetivos_especificos] [varchar](max) NULL,
	[perfil_ingreso] [varchar](max) NULL,
	[perfil_egreso] [varchar](max) NULL,
	[fecha_creacion] [datetime] NULL,
	[iniciales] [varchar](255) NULL,
	[titulo_otorgado] [varchar](255) NULL,
	[estado] [int] NOT NULL,
	[tipo_grado_m2o_id] [int] NOT NULL,
	[area_programa_m2o_id] [int] NOT NULL,
	[empleado_representante_m2o_id] [int] NULL,
	[empleado_responsable_m2o_id] [int] NULL,
	[pnpc] [int] NULL,
	[numero_registro_conacyt] [varchar](max) NULL,
	[fecha_vigencia_conacyt] [datetime] NULL,
	[numero_registro_dgp] [varchar](250) NULL,
	[numero_registro_hjg] [varchar](250) NULL,
	[numero_registro_sep] [varchar](250) NULL,
	[numero_registro_sep_estadistica] [varchar](250) NULL,
	[fecha_aprobacion_hjg] [datetime] NULL,
	[tipo_producto_m2o_id] [int] NULL,
 CONSTRAINT [PK_sga_programa] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

--5
/****** Object:  Table [dbo].[sga_proceso_admision]    Script Date: 22/06/2026 04:13:34 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sga_proceso_admision](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[anio] [int] NOT NULL,
	[periodo] [varchar](255) NULL,
	[fecha_fin] [datetime] NULL,
	[fecha_inicio] [datetime] NULL,
	[fecha_cierre_convocatoria] [datetime] NULL,
	[fecha_resultados] [datetime] NULL,
	[estado] [int] NOT NULL,
	[programa_m2o_id] [int] NOT NULL,
	[clasificador] [int] NULL,
 CONSTRAINT [PK_sga_proceso_admision] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

--6
/****** Object:  Table [dbo].[sga_cat_rol]    Script Date: 22/06/2026 04:13:34 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sga_cat_rol](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[clave] [int] NOT NULL,
	[nombre] [varchar](255) NOT NULL,
	[descripcion] [varchar](max) NULL,
	[estado] [int] NOT NULL,
 CONSTRAINT [PK_sga_cat_rol] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

--7
/****** Object:  Table [dbo].[sga_permiso]    Script Date: 22/06/2026 07:02:09 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sga_permiso](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[llave] [varchar](255) NOT NULL,
	[nombre] [varchar](255) NOT NULL,
	[descripcion] [varchar](255) NULL,
	[estado] [int] NOT NULL,
 CONSTRAINT [PK_sga_permiso] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

--8
/****** Object:  Table [dbo].[sga_grupo_permiso]    Script Date: 22/06/2026 04:13:34 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sga_grupo_permiso](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[llave] [varchar](255) NOT NULL,
	[nombre] [varchar](255) NOT NULL,
	[descripcion] [varchar](255) NULL,
	[estado] [int] NOT NULL,
 CONSTRAINT [PK_sga_grupo_permiso] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]


/*sección 2 crear registro en tablas de estudaintes*/
--1
/****** Object:  Table [dbo].[sga_persona]    Script Date: 22/06/2026 04:13:34 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sga_persona](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](255) NOT NULL,
	[primer_apellido] [varchar](255) NOT NULL,
	[segundo_apellido] [varchar](255) NULL,
	[nombre_completo] [varchar](255) NULL,
	[genero] [int] NULL,
	[numero_cvu] [varchar](25) NULL,
	[correo_electronico] [varchar](255) NULL,
	[tipo_persona] [int] NOT NULL,
	[estado] [int] NOT NULL,
	[correo_institucional] [varchar](255) NULL,
 CONSTRAINT [PK_sga_persona] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

--2
/****** Object:  Table [dbo].[sga_persona_sga_estudiante]    Script Date: 22/06/2026 04:13:34 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sga_persona_sga_estudiante](
	[folio_aspirante] [varchar](255) NULL,
	[matricula_alumno] [varchar](255) NULL,
	[numero_registro] [varchar](10) NULL,
	[fecha_registro_aspirante] [datetime] NULL,
	[curp] [varchar](18) NULL,
	[dni] [varchar](13) NULL,
	[rfc] [varchar](14) NULL,
	[fecha_nacimiento] [datetime] NULL,
	[registro_datos_biometricos] [int] NULL,
	[estado_estudiante] [int] NOT NULL,
	[estudiante_m2o_id] [int] NULL,
	[estado_civil_m2o_id] [int] NULL,
	[estado_r1_m2o_id] [int] NULL,
	[programa_m2o_id] [int] NULL,
	[id] [int] NOT NULL,
 CONSTRAINT [PK_sga_persona_sga_estudiante] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]


--3
/****** Object:  Table [dbo].[sga_nacionalidad_m2m_estudiante]    Script Date: 22/06/2026 04:13:34 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sga_nacionalidad_m2m_estudiante](
	[sga_estudiante_id] [int] NOT NULL,
	[sga_cat_nacionalidad_id] [int] NOT NULL,
 CONSTRAINT [PK_sga_nacionalidad_m2m_estudiante] PRIMARY KEY CLUSTERED 
(
	[sga_estudiante_id] ASC,
	[sga_cat_nacionalidad_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]


--4
/****** Object:  Table [dbo].[sga_estudiante_admision]    Script Date: 22/06/2026 04:13:34 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sga_estudiante_admision](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[criterio_aprobacion_total] [int] NULL,
	[motivo_ingreso] [varchar](max) NULL,
	[fecha_registro] [datetime] NOT NULL,
	[observaciones] [varchar](max) NULL,
	[modalidad_ingreso] [int] NULL,
	[beca_propedeutico] [int] NULL,
	[beca_comedor] [int] NULL,
	[estado] [int] NOT NULL,
	[estudiante_m2o_id] [int] NOT NULL,
	[proceso_admision_m2o_id] [int] NULL,
	[estado_proceso_m2o_id] [int] NULL,
	[etapa_proceso_m2o_id] [int] NULL,
	[idgenerales] [int] NULL,
	[especifique] [varchar](255) NULL,
 CONSTRAINT [PK_sga_estudiante_admision] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

--5
/****** Object:  Table [dbo].[sga_bitacora_estudiante_admision]    Script Date: 22/06/2026 04:13:34 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sga_bitacora_estudiante_admision](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[accion] [varchar](255) NOT NULL,
	[fecha_accion] [datetime] NOT NULL,
	[descripcion] [varchar](max) NULL,
	[estado] [int] NOT NULL,
	[estudiante_admision_m2o_id] [int] NOT NULL,
	[empleado_m2o_id] [int] NULL,
	[estado_proceso_m2o_id] [int] NULL,
 CONSTRAINT [PK_sga_bitacora_estudiante_admision] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

--6
/****** Object:  Table [dbo].[sga_usuario_sistema]    Script Date: 22/06/2026 04:13:34 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sga_usuario_sistema](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre_usuario] [varchar](30) NOT NULL,
	[contrasena] [varchar](255) NOT NULL,
	[fecha_registro] [datetime] NOT NULL,
	[estado] [int] NOT NULL,
	[persona_m2o_id] [int] NOT NULL,
 CONSTRAINT [PK_sga_usuario_sistema] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

--7
/****** Object:  Table [dbo].[sga_usuario_m2m_rol]    Script Date: 22/06/2026 04:13:34 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sga_usuario_m2m_rol](
	[sga_cat_rol_id] [int] NOT NULL,
	[sga_usuario_sistema_id] [int] NOT NULL,
 CONSTRAINT [PK_sga_usuario_m2m_rol] PRIMARY KEY CLUSTERED 
(
	[sga_cat_rol_id] ASC,
	[sga_usuario_sistema_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

--8
/****** Object:  Table [dbo].[sga_usuario_m2m_grupo_permiso]    Script Date: 22/06/2026 04:13:34 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sga_usuario_m2m_grupo_permiso](
	[sga_grupo_permiso_id] [int] NOT NULL,
	[sga_usuario_sistema_id] [int] NOT NULL,
 CONSTRAINT [PK_sga_usuario_m2m_grupo_permiso] PRIMARY KEY CLUSTERED 
(
	[sga_grupo_permiso_id] ASC,
	[sga_usuario_sistema_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

--9
/****** Object:  Table [dbo].[sga_usuario_m2m_permiso]    Script Date: 22/06/2026 04:13:34 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sga_usuario_m2m_permiso](
	[sga_permiso_id] [int] NOT NULL,
	[sga_usuario_sistema_id] [int] NOT NULL,
 CONSTRAINT [PK_sga_usuario_m2m_permiso] PRIMARY KEY CLUSTERED 
(
	[sga_permiso_id] ASC,
	[sga_usuario_sistema_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]


--10
/****** Object:  Table [dbo].[sga_configvar]    Script Date: 22/06/2026 04:13:34 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sga_configvar](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[clave] [int] NOT NULL,
	[etiqueta] [varchar](255) NOT NULL,
	[descripcion] [varchar](max) NULL,
	[estado] [int] NOT NULL,
 CONSTRAINT [PK_sga_configvar] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]


--11
/****** Object:  Table [dbo].[sga_configvar_valor]    Script Date: 22/06/2026 04:13:34 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sga_configvar_valor](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[clave] [int] NOT NULL,
	[valor] [varchar](max) NOT NULL,
	[valor_defecto] [varchar](max) NULL,
	[descripcion] [varchar](max) NULL,
	[estado] [int] NOT NULL,
	[configvar_m2o_id] [int] NOT NULL,
 CONSTRAINT [PK_sga_configvar_valor] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

---12
/****** Object:  Table [dbo].[users]    Script Date: 22/06/2026 04:13:34 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[users](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[username] [varchar](100) NOT NULL,
	[password] [varchar](100) NOT NULL
) ON [PRIMARY]



SET IDENTITY_INSERT [dbo].[users] ON 

INSERT [dbo].[users] ([username], [password]) VALUES (N'dfa.admision', N'dfa.admision')
INSERT [dbo].[users] ([username], [password]) VALUES (N'info_sistema', N'123456')
INSERT [dbo].[users] ([username], [password]) VALUES (N'yennic', N'123456')
INSERT [dbo].[users] ([username], [password]) VALUES (N'paco', N'123456')
INSERT [dbo].[users] ([username], [password]) VALUES (N'control.escolar.dfa', N'123456')
INSERT [dbo].[users] ([username], [password]) VALUES (N'esther', N'123456')
INSERT [dbo].[users] ([username], [password]) VALUES (N'matello', N'123456')
SET IDENTITY_INSERT [dbo].[users] OFF
GO

/*SECCION 3 TABLAS LOG*/

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
   
    --aniadieron nuevas restricciones 
    CONSTRAINT check_genero_asp CHECK (genero_asp IN ('1', '2', '3')),
	CONSTRAINT check_tipo_parentesco_emg CHECK (tipo_parentesco_emg IN ('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11' ,'12', '13')),
    CONSTRAINT check_posgrado_ingresar_asp CHECK (posgrado_ingresar_asp IN ('1', '2')),
    CONSTRAINT check_periodo_ingreso_posgrados_asp CHECK (periodo_ingreso_posgrados_asp IN ('1')),
    CONSTRAINT check_estatus_solicitud_asp CHECK (estatus_solicitud_asp IN ('1', '2', '3')),
    CONSTRAINT check_ingles_oral_asp CHECK (ingles_oral_asp IN ('1', '2', '3')),
    CONSTRAINT check_ingles_escrito_asp CHECK (ingles_escrito_asp IN ('1', '2', '3')),
    CONSTRAINT check_ingles_auditivo_asp CHECK (ingles_auditivo_asp IN ('1', '2','3')),
    CONSTRAINT check_ingles_lecotra_asp CHECK (ingles_lectora_asp IN ('1', '2','3')),
	CONSTRAINT check_tipo_titulacion_asp CHECK (tipo_titulacion_asp IN ('1', '2', '3')),
	CONSTRAINT check_tipo_experiencia_asp CHECK (tipo_experiencia_asp IN ('1', '2', '3', '4')),
	CONSTRAINT check_medio_enterado_asp CHECK ( medio_enterado_asp IN ('1', '2', '3', '4')),

);

--2
CREATE TABLE Registro_Aspirante (
    id_Registro INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
    id_Aspirante INT NOT NULL,
    estatus INT NOT NULL,
    fecha_movimiento DATETIME NOT NULL,
    descripcion VARCHAR(255) NULL,
    correo_electronico_asp VARCHAR(255) NOT NULL,


    
    CONSTRAINT uk_id_Aspirante UNIQUE (id_Aspirante),
    CONSTRAINT uk_correo_electronico_asp UNIQUE (correo_electronico_asp),
    CONSTRAINT chk_estatus_registro CHECK (estatus IN ('1', '2', '3', '4')),
    CONSTRAINT fk_Registro_Aspirante_Aspirante FOREIGN KEY (id_Aspirante)
        REFERENCES Aspirante(id_Aspirante)
        ON DELETE NO ACTION  
        ON UPDATE CASCADE
);
--3 CATALOGO
CREATE TABLE sga_cat_nivel_ingles (
    id INT IDENTITY(1,1) PRIMARY KEY,
    clave INT NOT NULL UNIQUE,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(255) NULL,
    estado INT NOT NULL DEFAULT 1 
);





use pRegistro
go 

ALTER TABLE [dbo].[sga_bitacora_estudiante_admision]  WITH CHECK ADD  CONSTRAINT [FK_bitacora_estudiante_admision_m2o_cat_estado_proceso] FOREIGN KEY([estado_proceso_m2o_id])
REFERENCES [dbo].[pRegistro][sga_cat_estado_proceso] ([id])
GO
ALTER TABLE [dbo].[sga_bitacora_estudiante_admision] CHECK CONSTRAINT [FK_bitacora_estudiante_admision_m2o_cat_estado_proceso]
GO
ALTER TABLE [dbo].[sga_bitacora_estudiante_admision] CHECK CONSTRAINT [FK_bitacora_estudiante_admision_m2o_empleado]
GO
ALTER TABLE [dbo].[sga_bitacora_estudiante_admision]  WITH CHECK ADD  CONSTRAINT [FK_bitacora_estudiante_admision_m2o_estudiante_admision] FOREIGN KEY([estudiante_admision_m2o_id])
REFERENCES [dbo].[sga_estudiante_admision] ([id])
GO
ALTER TABLE [dbo].[sga_bitacora_estudiante_admision] CHECK CONSTRAINT [FK_bitacora_estudiante_admision_m2o_estudiante_admision]
GO
ALTER TABLE [dbo].[sga_cat_estado_proceso]  WITH NOCHECK ADD  CONSTRAINT [FK_estado_proceso_m2o_estado_proceso] FOREIGN KEY([estado_proceso_padre_m2o_id])
REFERENCES [dbo].[sga_cat_estado_proceso] ([id])
GO
ALTER TABLE [dbo].[sga_cat_estado_proceso] CHECK CONSTRAINT [FK_estado_proceso_m2o_estado_proceso]
GO
ALTER TABLE [dbo].[sga_cat_estado_proceso]  WITH NOCHECK ADD  CONSTRAINT [FK_estado_proceso_m2o_proceso] FOREIGN KEY([proceso_m2o_id])
REFERENCES [dbo].[sga_cat_proceso] ([id])
GO
ALTER TABLE [dbo].[sga_cat_estado_proceso] CHECK CONSTRAINT [FK_estado_proceso_m2o_proceso]
GO
ALTER TABLE [dbo].[sga_configvar_valor]  WITH NOCHECK ADD  CONSTRAINT [FK_configvar_valor_m2o_configvar] FOREIGN KEY([configvar_m2o_id])
REFERENCES [dbo].[sga_configvar] ([id])
GO
ALTER TABLE [dbo].[sga_configvar_valor] CHECK CONSTRAINT [FK_configvar_valor_m2o_configvar]
GO
ALTER TABLE [dbo].[sga_estudiante_admision]  WITH CHECK ADD  CONSTRAINT [FK_estudiante_admision_m2o_estado_proceso] FOREIGN KEY([estado_proceso_m2o_id])
REFERENCES [dbo].[sga_cat_estado_proceso] ([id])
GO
ALTER TABLE [dbo].[sga_estudiante_admision] CHECK CONSTRAINT [FK_estudiante_admision_m2o_estado_proceso]
GO
ALTER TABLE [dbo].[sga_estudiante_admision]  WITH CHECK ADD  CONSTRAINT [FK_estudiante_admision_m2o_estado_proceso_etapa] FOREIGN KEY([etapa_proceso_m2o_id])
REFERENCES [dbo].[sga_cat_estado_proceso] ([id])
GO
ALTER TABLE [dbo].[sga_estudiante_admision] CHECK CONSTRAINT [FK_estudiante_admision_m2o_estado_proceso_etapa]
GO
ALTER TABLE [dbo].[sga_estudiante_admision]  WITH CHECK ADD  CONSTRAINT [FK_estudiante_tipo_evaluacion_m2o_estudiante] FOREIGN KEY([estudiante_m2o_id])
REFERENCES [dbo].[sga_persona_sga_estudiante] ([id])
GO
ALTER TABLE [dbo].[sga_estudiante_admision] CHECK CONSTRAINT [FK_estudiante_tipo_evaluacion_m2o_estudiante]
GO
ALTER TABLE [dbo].[sga_estudiante_admision]  WITH CHECK ADD  CONSTRAINT [FK_FKsga_estudi992903] FOREIGN KEY([proceso_admision_m2o_id])
REFERENCES [dbo].[sga_proceso_admision] ([id])
GO
ALTER TABLE [dbo].[sga_estudiante_admision] CHECK CONSTRAINT [FK_FKsga_estudi992903]
GO
ALTER TABLE [dbo].[sga_nacionalidad_m2m_estudiante]  WITH CHECK ADD  CONSTRAINT [FK_sga_nacionalidad_m2m_estudiante_sga_cat_nacionalidad] FOREIGN KEY([sga_cat_nacionalidad_id])
REFERENCES [dbo].[sga_cat_nacionalidad] ([id])
GO
ALTER TABLE [dbo].[sga_nacionalidad_m2m_estudiante] CHECK CONSTRAINT [FK_sga_nacionalidad_m2m_estudiante_sga_cat_nacionalidad]
GO
ALTER TABLE [dbo].[sga_nacionalidad_m2m_estudiante]  WITH CHECK ADD  CONSTRAINT [FK_sga_nacionalidad_m2m_estudiante_sga_estudiante] FOREIGN KEY([sga_estudiante_id])
REFERENCES [dbo].[sga_persona_sga_estudiante] ([id])
GO
ALTER TABLE [dbo].[sga_nacionalidad_m2m_estudiante] CHECK CONSTRAINT [FK_sga_nacionalidad_m2m_estudiante_sga_estudiante]
GO
ALTER TABLE [dbo].[sga_persona_sga_estudiante]  WITH CHECK ADD  CONSTRAINT [FK_estudiante_m2o_estado_civil] FOREIGN KEY([estado_civil_m2o_id])
REFERENCES [dbo].[sga_cat_estado_civil] ([id])
GO
ALTER TABLE [dbo].[sga_persona_sga_estudiante] CHECK CONSTRAINT [FK_estudiante_m2o_estado_civil]
GO
ALTER TABLE [dbo].[sga_persona_sga_estudiante]  WITH CHECK ADD  CONSTRAINT [FK_estudiante_m2o_estado_r1] FOREIGN KEY([estado_r1_m2o_id])
REFERENCES [dbo].[sga_cat_estado_r1] ([id])
GO
ALTER TABLE [dbo].[sga_persona_sga_estudiante] CHECK CONSTRAINT [FK_estudiante_m2o_estado_r1]
GO
ALTER TABLE [dbo].[sga_persona_sga_estudiante]  WITH CHECK ADD  CONSTRAINT [FK_estudiante_m2o_estudiante] FOREIGN KEY([estudiante_m2o_id])
REFERENCES [dbo].[sga_persona_sga_estudiante] ([id])
GO
ALTER TABLE [dbo].[sga_persona_sga_estudiante] CHECK CONSTRAINT [FK_estudiante_m2o_estudiante]
GO
ALTER TABLE [dbo].[sga_persona_sga_estudiante]  WITH CHECK ADD  CONSTRAINT [FK_estudiante_m2o_programa] FOREIGN KEY([programa_m2o_id])
REFERENCES [dbo].[sga_programa] ([id])
GO
ALTER TABLE [dbo].[sga_persona_sga_estudiante] CHECK CONSTRAINT [FK_estudiante_m2o_programa]
GO
ALTER TABLE [dbo].[sga_persona_sga_estudiante]  WITH CHECK ADD  CONSTRAINT [FK_sga_estudiante_inherits_sga_persona] FOREIGN KEY([id])
REFERENCES [dbo].[sga_persona] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[sga_persona_sga_estudiante] CHECK CONSTRAINT [FK_sga_estudiante_inherits_sga_persona]
GO
ALTER TABLE [dbo].[sga_proceso_admision]  WITH CHECK ADD  CONSTRAINT [FK_proceso_admision_m2o_programa] FOREIGN KEY([programa_m2o_id])
REFERENCES [dbo].[sga_programa] ([id])
GO
ALTER TABLE [dbo].[sga_proceso_admision] CHECK CONSTRAINT [FK_proceso_admision_m2o_programa]
GO
ALTER TABLE [dbo].[sga_programa]  WITH CHECK ADD  CONSTRAINT [FK_programa_m2o_area_programa] FOREIGN KEY([area_programa_m2o_id])
REFERENCES [dbo].[sga_cat_area_programa] ([id])
GO
ALTER TABLE [dbo].[sga_programa] CHECK CONSTRAINT [FK_programa_m2o_area_programa]
GO
ALTER TABLE [dbo].[sga_programa]  WITH CHECK ADD  CONSTRAINT [FK_programa_m2o_empleado] FOREIGN KEY([empleado_representante_m2o_id])
REFERENCES [dbo].[sga_persona_sga_empleado] ([id])
GO
ALTER TABLE [dbo].[sga_programa] CHECK CONSTRAINT [FK_programa_m2o_empleado]
GO
ALTER TABLE [dbo].[sga_programa]  WITH CHECK ADD  CONSTRAINT [FK_programa_m2o_empleado_responsable] FOREIGN KEY([empleado_responsable_m2o_id])
REFERENCES [dbo].[sga_persona_sga_empleado] ([id])
GO
ALTER TABLE [dbo].[sga_programa] CHECK CONSTRAINT [FK_programa_m2o_empleado_responsable]
GO
ALTER TABLE [dbo].[sga_programa]  WITH CHECK ADD  CONSTRAINT [FK_programa_m2o_tipo_grado] FOREIGN KEY([tipo_grado_m2o_id])
REFERENCES [dbo].[sga_cat_tipo_grado] ([id])
GO
ALTER TABLE [dbo].[sga_programa] CHECK CONSTRAINT [FK_programa_m2o_tipo_grado]
GO
ALTER TABLE [dbo].[sga_programa]  WITH CHECK ADD  CONSTRAINT [FK_programa_m2o_tipo_producto] FOREIGN KEY([tipo_producto_m2o_id])
REFERENCES [dbo].[sga_cat_tipo_producto] ([id])
GO
ALTER TABLE [dbo].[sga_programa] CHECK CONSTRAINT [FK_programa_m2o_tipo_producto]
GO
ALTER TABLE [dbo].[sga_usuario_m2m_grupo_permiso]  WITH CHECK ADD  CONSTRAINT [FK_sga_usuario_m2m_grupo_permiso_sga_grupo_permiso] FOREIGN KEY([sga_grupo_permiso_id])
REFERENCES [dbo].[sga_grupo_permiso] ([id])
GO
ALTER TABLE [dbo].[sga_usuario_m2m_grupo_permiso] CHECK CONSTRAINT [FK_sga_usuario_m2m_grupo_permiso_sga_grupo_permiso]
GO
ALTER TABLE [dbo].[sga_usuario_m2m_grupo_permiso]  WITH CHECK ADD  CONSTRAINT [FK_sga_usuario_m2m_grupo_permiso_sga_usuario_sistema] FOREIGN KEY([sga_usuario_sistema_id])
REFERENCES [dbo].[sga_usuario_sistema] ([id])
GO
ALTER TABLE [dbo].[sga_usuario_m2m_grupo_permiso] CHECK CONSTRAINT [FK_sga_usuario_m2m_grupo_permiso_sga_usuario_sistema]
GO
ALTER TABLE [dbo].[sga_usuario_m2m_permiso]  WITH CHECK ADD  CONSTRAINT [FK_sga_usuario_m2m_permiso_sga_permiso] FOREIGN KEY([sga_permiso_id])
REFERENCES [dbo].[sga_permiso] ([id])
GO
ALTER TABLE [dbo].[sga_usuario_m2m_permiso] CHECK CONSTRAINT [FK_sga_usuario_m2m_permiso_sga_permiso]
GO
ALTER TABLE [dbo].[sga_usuario_m2m_permiso]  WITH CHECK ADD  CONSTRAINT [FK_sga_usuario_m2m_permiso_sga_usuario_sistema] FOREIGN KEY([sga_usuario_sistema_id])
REFERENCES [dbo].[sga_usuario_sistema] ([id])
GO
ALTER TABLE [dbo].[sga_usuario_m2m_permiso] CHECK CONSTRAINT [FK_sga_usuario_m2m_permiso_sga_usuario_sistema]
GO
ALTER TABLE [dbo].[sga_usuario_m2m_rol]  WITH CHECK ADD  CONSTRAINT [FK_sga_usuario_m2m_rol_sga_cat_rol] FOREIGN KEY([sga_cat_rol_id])
REFERENCES [dbo].[sga_cat_rol] ([id])
GO
ALTER TABLE [dbo].[sga_usuario_m2m_rol] CHECK CONSTRAINT [FK_sga_usuario_m2m_rol_sga_cat_rol]
GO
ALTER TABLE [dbo].[sga_usuario_m2m_rol]  WITH CHECK ADD  CONSTRAINT [FK_sga_usuario_m2m_rol_sga_usuario_sistema] FOREIGN KEY([sga_usuario_sistema_id])
REFERENCES [dbo].[sga_usuario_sistema] ([id])
GO
ALTER TABLE [dbo].[sga_usuario_m2m_rol] CHECK CONSTRAINT [FK_sga_usuario_m2m_rol_sga_usuario_sistema]
GO
ALTER TABLE [dbo].[sga_usuario_sistema]  WITH CHECK ADD  CONSTRAINT [FK_usuario_sistema_m2o_persona] FOREIGN KEY([persona_m2o_id])
REFERENCES [dbo].[sga_persona] ([id])
GO
ALTER TABLE [dbo].[sga_usuario_sistema] CHECK CONSTRAINT [FK_usuario_sistema_m2o_persona]
GO
