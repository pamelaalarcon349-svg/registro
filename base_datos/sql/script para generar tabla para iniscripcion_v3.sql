CREATE  DATABASE pRegistro
---version 2 tablas asiladas
use pRegistro
go 

--1
CREATE TABLE sga_persona (
	id int IDENTITY(1,1)  not null,
	nombre nvarchar(255) not null,
	primer_apellido nvarchar(255) not null,
	segundo_apellido nvarchar(255) null,
	nombre_completo nvarchar(255) null,
	genero int null,
	numero_cvu varchar(255) null,
	correo_electronico varchar(255) null,
	tipo_persona int not null,
	estado int not null,
	correo_institucional varchar(255) null, 
	CONSTRAINT PK_sga_persona PRIMARY KEY NONCLUSTERED (id)
)

--2
CREATE TABLE sga_persona_sga_estudiante(
	folio_aspirante varchar(255) null,
	matricula_alumno varchar(255) null,
	numero_registro varchar(10) null,
	fecha_registro_aspirante datetime null,
	curp varchar(18) null,
	dni varchar(13) null,
	rfc varchar(14) null,
	fecha_nacimiento datetime null,
	registro_datos_biometricos int null,
	estado_estudiante int not null,
	estudiante_m2o_id int  null,
	estado_civil_m2o_id int null,
	estado_r1_m2o_id int null,
	programa_m2o_id int null,
	id int not null,
	CONSTRAINT PK_sga_persona_sga_estudiante PRIMARY KEY NONCLUSTERED (id),
)

--3
CREATE TABLE sga_cat_nacionalidad(
	id int IDENTITY(1,1) not null,
	clave int not null,
	nacionalidad varchar(255) not null,
	estado int not null
	CONSTRAINT PK_sga_cat_nacionalidad PRIMARY KEY NONCLUSTERED(id)
)

--3
CREATE TABLE sga_nacionalidad_m2m_estudiante(
	sga_estudiante_id int not null,
	sga_cat_nacionalidad_id int  null,	
	constraint FK_sga_cat_nacionalidad FOREIGN KEY (sga_cat_nacionalidad_id) references sga_cat_nacionalidad(id)
)

CREATE TABLE sga_cat_estado_proceso(
	id int identity(1,1) not null,
	clave int not null,
	nombre varchar(255) null, 
	nivel int not null,
	icono varchar(50) null,
	estado int not null, 
	proceso_m2o_id int not null,
	estado_id int null,
	CONSTRAINT PK_sga_cat_estado_procesos PRIMARY KEY NONCLUSTERED(id)
)


--4
CREATE TABLE sga_estudiante_admision (
	id int IDENTITY(1,1)  not null,
	criterio_aprobacion_total INT NULL,
	motivo_ingreso nvarchar(MAX) NULL,
	fecha_registro datetime not null,
	observaciones varchar(MAX) NULL,
	modalidad_ingreso int null,
	beca_propedeutico int null,
	beca_comedor int null,
	estado int not null,
	estudiante_m2o_id int not null,
	proceso_admision_m2o_id int  null,
	estado_proceso_m2o_id int null,
	etapa_proceso_m2o_id int null,
	idgenerales int null,
	especifique varchar(255) null,
	CONSTRAINT PK_sga_estudiante_admision_id PRIMARY KEY NONCLUSTERED (id),
	CONSTRAINT FK_sga_persona_sga_estudiante_id FOREIGN KEY (estudiante_m2o_id) references sga_persona_sga_estudiante(id),
	constraint FK_sga_cat_estado_proceso_id fOREIGN KEY (estado_proceso_m2o_id) REFERENCES sga_cat_estado_proceso(id)
	)

--5
CREATE TABLE sga_bitacora_estudiante_admision(
	id INT IDENTITY(1,1) not null,
	accion varchar(255) not null,
	fecha_accion datetime not null,
	descripcion nvarchar(max) null,
	estado int not null,
	estudiante_admision_m2o_id int not null,
	empleado_m2o_id int null,
	estado_proceso_m2o_id int null
	CONSTRAINT PK_sga_bitacora_estudiante_admision PRIMARY KEY NONCLUSTERED (id),
	CONSTRAINT FK_sga_estudinate_admision FOREIGN KEY (estudiante_admision_m2o_id) REFERENCES sga_estudiante_admision(id),
	--persona empleado no se llena hasta que un usuarios con credenciales realiza un movimiento al aspirante
)

--6
CREATE TABLE sga_usuario_sistema (
	id int IDENTITY(1,1)  NOT NULL,
	nombre_usuario varchar(30) not null,
	contrasena varchar(255) not null,
	fecha_registro datetime not null,
	estado int not null,
	persona_m2o_id int not null,
	CONSTRAINT PK_sga_usuario_sistema PRIMARY KEY NONCLUSTERED(id),
	CONSTRAINT FK_sga_persona_id FOREIGN KEY (persona_m2o_id) REFERENCES sga_persona(id)
)

CREATE TABLE sga_cat_rol(
	id int identity(1,1) not null,
	clave int not null,
	nombre varchar(1000) null,
	descripcion varchar(MAX) NULL,
	estado INT NOT NULL,
	CONSTRAINT PK_sga_cat_rol PRIMARY KEY NONCLUSTERED(id)
)
--7
CREATE TABLE sga_usuario_m2m_rol(
	sga_cat_rol_id int null, --se inserta los datos 
	sga_usuario_sistema_id int not null,	
	CONSTRAINT FK_sga_usuario_sistema FOREIGN KEY (sga_usuario_sistema_id) REFERENCES sga_usuario_sistema(id),
	CONSTRAINT FK_sga_cat_rol FOREIGN KEY (sga_cat_rol_id) references sga_cat_rol(id)
)

CREATE TABLE sga_grupo_permiso(
	id int identity(1,1) not null,
	llave varchar(1000) not null,
	nombre varchar(1000) not null,
	descripcion varchar(1000) null,
	estado int not null,
	CONSTRAINT PK_sga_grupo_permiso PRIMARY KEY NONCLUSTERED(id)
)

--8
CREATE TABLE sga_usuario_m2m_grupo_permiso (
	sga_grupo_permiso_id int null,
	sga_usuario_sistema_id int not null,
	CONSTRAINT FK_sga_usuario_sistema_1x FOREIGN KEy (sga_usuario_sistema_id) references sga_usuario_sistema(id),
	CONSTRAINT FK_sga_grupo_permiso FOREIGN KEY (sga_grupo_permiso_id) REFERENCES sga_grupo_permiso(id)
)

CREATE TABLE sga_permiso (
	id int identity(1,1) not null,
	llave varchar(1000) not null,
	nombre varchar(100) not null,
	descripcion varchar(1000) null,
	estado int null,
	CONSTRAINT PK_sga_permiso PRIMARY KEY NONCLUSTERED(id)
)

--9
CREATE TABLE sga_usuario_m2m_permiso(
	sga_permiso_id int null,
	sga_usuario_sistema_id int not null,
	CONSTRAINT FK_sga_permiso FOREIGN KEY (sga_permiso_id) REFERENCES sga_permiso(id),
	CONSTRAINT FK_sga_usuario_sistema_2x FOREIGN KEy (sga_usuario_sistema_id) references sga_usuario_sistema(id)
)

CREATE TABLE sga_configvar(
	id int IDENTITY(1,1) NOT NULL,
	clave int NOT NULL,
	etiqueta varchar(1000) NOT NULL,
	descripcion varchar(max) NULL,
	estado int NOT NULL,
	CONSTRAINT PK_sga_configvar PRIMARY KEY CLUSTERED (id)
 )

CREATE TABLE sga_configvar_valor(
	id int IDENTITY(1,1) NOT NULL,
	clave int NOT NULL,
	valor varchar(max) NOT NULL,
	valor_defecto varchar(max) NULL,
	descripcion varchar(max) NULL,
	estado int NOT NULL,
	configvar_m2o_id int NOT NULL,
 CONSTRAINT PK_sga_configvar_valor PRIMARY KEY CLUSTERED (id)
 )



CREATE TABLE [dbo].[users](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[username] [varchar](100) NOT NULL,
	[password] [varchar](100) NOT NULL
) ON [PRIMARY]


CREATE TABLE [dbo].[id_generales_control](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_generales] [varchar](50) NULL,
	[estado] [varchar](50) NULL,
	[user_id] [int] NULL
) ON [PRIMARY]


CREATE TABLE [dbo].[sga_informacion_contacto_estudiante](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[estado] [int] NOT NULL,
	[direccion] [varchar](max) NULL,
	[localidad_r3_m2o_id] [int] NULL,
	[codigo_postal_m2o_id] [int] NULL,
	[estudiante_admision_m2o_id] [int] NOT NULL,
 CONSTRAINT [PK_sga_informacion_contacto_estudiante] PRIMARY KEY CLUSTERED 
 (
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

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


