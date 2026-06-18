use pRegistro
go 


--select * from sga_cat_nacionalidad
--insert into sga_cat_nacionalidad values ('mex'),('vene'),('colomb'),('puerico')--,(''),(''),(''),(''),(''),(''),('')

--insert into sga_cat_estado_proceso values ('re'),('vad'),('docum'),('finalizad'),('m1'),('m2'),('m3'),('m4'),('m5'),('m6')
--,('dre'),('dvad'),('ddocum'),('dfinalizado'),('d1'),('d2'),('d3'),('d4'),('d5'),('d6'),('d7')

--insert into sga_cat_rol values ('mAspi'),('mEst'),('dAsp'),('mEst')

--insert into sga_grupo_permiso values ('1'),('2'),('3'),('4'),('5'),('5'),('7'),('8'),('9'),('10'),('11'),('12'),('13'),('14')

--insert into sga_permiso values ('e'),('l'),('m'),('p1'),('a2'),('t4'),('p4'),('pe1'),('conf'),('dato'),('mate')
--,('inscr'),('periodo'),('Chpass')

INSERT into sga_grupo_permiso VALUES 
('sga_administrar_usuario_sistema', 'Administrar modulo de usuario sistema', 'Contiene los permisos para crear, editar, eliminar y visualizar los registros de usuarios', 1)
,(N'sga_administrar_rol', N'Administrar roles', N'Contiene los permisos para crear, editar, eliminar y visualizar los registros de roles', 1)
,(N'sga_administrar_grupo_permiso', N'Administrar grupos de permisos', N'Contiene los permisos para crear, editar, eliminar y visualizar los registros de grupos de permisos', 1)
,(N'sga_administrar_permiso', N'Administrar permisos', N'Contiene los permisos para crear, editar, eliminar y visualizar los registros de permisos', 1)
,( N'sga_administrar_empleado', N'Administrar empleados', N'Contiene los permisos para crear, editar, eliminar y visualizar los registros de empleados', 1)
,( N'sga_administrar_estudiante', N'Administrar estudiantes', N'Contiene los permisos para crear, editar, eliminar y visualizar los registros de estudiantes', 1)
,( N'sga_administrar_proceso_admision', N'Administrar activacion de procesos de admision', N'Contiene los permisos para crear, editar, eliminar y visualizar los registros de proceso admision', 1)
,(N'sga_proceso_entrevista', N'Avanzar o retroceder el proceso de una entrevista', N'Permite enviar a revisión, regresar a borrador, publicar un entrevista o asignar una entrevista', 1)
,(N'sga_administrar_entrevista', N'Administrar entrevistas', N'Permite crear, editar, eliminar, visualizar el detalle de una entrevista y vizualizar el listado de entrevistas', 1)
,( N'sga_proceso_examen', N'Avanzar o retroceder el proceso de un examen', N'Permite enviar a revisión, regresar a borrador o publicar un examen', 1)
,( N'sga_administrar_examen', N'Administrar exámenes', N'Permite crear, editar, eliminar, visualizar el detalle de un examen y vizualizar el listado de exámenes', 1)
,( N'sga_generar_solicitud_admision_maestria', N'Generar la solicitud  de admisión de maestría', N'Contiene los permisos de acceso, creación, edición y eliminación de la solicitud de admisión de maestría', 1)
,( N'sga_administrar_solicitud_admision_maestria', N'Administrar solicitudes de admisión de maestría', N'Contiene los permisos de acceso, creación, edición y eliminación de la solicitud de admisión de maestría', 1)
,( N'sga_acceder_solicitud_admision_maestria', N'Acceder a las solicitudes de admisión de maestría', N'Contiene los permisos de acceso y visualización de la solicitud de admisión de maestría', 1)
,( N'sga_generar_solicitud_admision_doctorado', N'Generar la solicitud de doctorado', N'Contiene los permisos de acceso, creación, edición y eliminación de una solicitud de admisión de doctorado', 1)
,(N'sga_acceder_solicitud_admision_doctorado', N'Acceder a las solicitudes de admisión de doctorado', N'Contiene los permisos de acceso y visualización de la solicitud de admisión de doctorado', 1)
,(N'sga_administrar_curso_propedeutico', N'Administra el módulo de curso propedéutico, asignaturas y horarios', N'Contiene los permisos para acceder, crear, editar, eliminar y visualizar cursos propedéuticos, asignaturas, horarios y el avance de estados', 1)
,( N'sga_acceder_detalle_asignatura_grupo_propedeutico', N'Accede y visualiza los horarios de las asignaturas de los propedéuticos', N'Contiene los permisos para acceder y visualizar los horarios de las asignaturas de los cursos propedéuticos', 1)
,( N'sga_administrar_calificacion_admision', N'Accede, visualiza y edita el registro de calificaciones de las asignaturas de los cursos propedéuticos y exámenes', N'Contiene los permisos para acceder, visualizar y editar el registro de calificaciones de las asignaturas de los cursos propedéuticos y exámenes', 1)
,( N'sga_acceder_calificacion_admision', N'Accede y visualiza el registro de calificaciones de las asignaturas de los cursos propedéuticos y exámenes', N'Contiene los permisos para acceder y visualizar el registro de calificaciones de las asignaturas de los cursos propedéuticos y exámenes', 1)
,( N'sga_administrar_dictamen_admision', N'Accede, visualiza y edita el registro del dictamen de los cursos propedéuticos, entrevista y dictamen final', N'Contiene los permisos para acceder, visualizar y editar el registro del dictamen de los cursos propedéuticos, entrevista y dictamen final', 1)
,( N'sga_acceder_dictamen_admision', N'Accede y visualiza el registro del dictamen de los cursos propedéuticos y entrevista.', N'Contiene los permisos para acceder y visualizar el registro del dictamen de los cursos propedéuticos y examen.', 1)
,( N'sga_acceder_proceso_admision', N'Acceder al modulo de activación de proceso de admision', N'Contiene los permisos para acceder y visualizar', 1)
,(N'sga_super_administrador', N'Administra todos los módulos del sistema', N'Contiene los permisos de todos los roles para acceder, visualizar, crear, editar y eliminar en todos los módulos del sistema', 1)
,( N'sga_administrar_comite', N'Administrar comités', N'Permite administrar los comités', 1)
,( N'sga_visualizar_comite', N'Visualizar comités', N'Permite visualizar los comités', 1)
,(N'sga_administrar_horario_asignatura_periodo', N'Administra el módulo de asignaturas para periodos escolares.', N'Contiene los permisos para crear, editar, eliminar, visualizar y acceder a los registros de asignaturas de los programas de periodos escolares.', 1)
,( N'sga_administrar_detalle_horario_asignatura_periodo', N'Administra el módulo de horarios para periodos escolares.', N'Contiene los permisos para crear, editar, eliminar, visualizar y acceder a los registros de horarios de asignaturas de los programas de periodos escolares.', 1)
,( N'sga_administrar_registro_estudiantes', N'Administrar el registro de estudiantes con pase directo', N'Permite acceder, crear, editar y visualizar los estudiantes que cuentan con pase directo', 1)
,( N'sga_visualizar_registro_estudiantes', N'Visualizar los registros de estudiantes con pase directo', N'Permite visualizar el registro de estudiantes con pase directo', 1)
,( N'sga_administrar_estudiante_inscripcion', N'Administrar registros de inscripción', N'Permite acceder, crear, editar y visualizar los registros de inscripción', 1)
,(N'sga_visualizar_estudiante_inscripcion', N'Visualizar los registros de inscripción', N'Permite acceder y visualizar los registros de inscripción', 1)
,( N'sga_administrar_bajas', N'Administrar bajas y permisos de ausencia', N'Permite administrar las bajas y permisos de ausencia', 1)
,( N'sga_visualizar_bajas', N'Visualizar bajas y permisos de ausencia', N'Permite visualizar las bajas y permisos de ausencia', 1)
,(N'sga_proceso_bajas', N'Realizar el proceso de la solicitud de baja', N'Permite realizar el proceso de solicitud de la solicitud de baja', 1)


--INSERT into sga_permiso  VALUES 
-- ( N'sga_asignatura_propedeutico_crear', N'Crear registros de asignaturas a cursos propedéuticos', N'Permite agregar/crear asignaturas a cualquier curso propedéutico en el sistema', 1)
--,( N'sga_asignatura_propedeutico_editar', N'Editar registros de asignaturas a cursos propedéuticos', N'Permite editar las asignaturas agregadas a cualquier curso propedéutico en el sistema.', 1)
--,( N'sga_asignatura_propedeutico_eliminar', N'Eliminar registros de asignaturas a cursos propedéuticos', N'Permite eliminar asignaturas agregadas a cualquier curso propedéutico en el sistema.', 1)
--,( N'sga_asignatura_propedeutico_visualizar', N'Visualizar registros de asignaturas a cursos propedéuticos', N'Permite visualizar las asignaturas de cualquier curso propedéutico en el sistema', 1)
--,(N'sga_bitacora_curso_propedeutico_visualizar', N'Visualizar registros de bitácora de curso propedéutico', N'Permite visualizar la bitácora de curso propedéutico en el sistema', 1)
--,('sga_curso_propedeutico_aprobar', N'Cambiar el estado del curso propedéutico a Aprobado', N'Permite avanzar el estado del curso propedéutico a Aprobado.', 1)
--,('sga_curso_propedeutico_crear', N'Crear registros de cursos propedéuticos', N'Permite crear un nuevo curso propedéutico en el sistema y agregar sus respectivas asignaturas', 1)
--,('sga_curso_propedeutico_editar', N'Editar registros de cursos propedéuticos', N'Permite editar la información de cualquier curso propedéutico en el sistema y sus asignaturas', 1)
--,('sga_curso_propedeutico_eliminar', N'Eliminar registros de cursos propedéuticos', N'Permite eliminar cualquier curso propedéutico en el sistema', 1)
--,( N'sga_curso_propedeutico_revisar', N'Cambiar el estado del curso propedéutico a Revisión', N'Permite avanzar el estado del curso propedéutico a Revisión.', 1)
--,( N'sga_curso_propedeutico_visualizar', N'Visualizar registros de cursos propedéuticos', N'Permite visualizar el detalle de un curso propedéutico en el sistema', 1)
--,( N'sga_detalle_asignatura_grupo_acceder', N'Acceder al módulo de horarios de curso propedéutico', N'Permite acceder al módulo de horarios de cursos propedéuticos del sistema', 1)
--,(N'sga_detalle_asignatura_grupo_crear', N'Crear registros de horarios de cursos propedéuticos', N'Permite crear registro de horarios para las asignaturas agregadas en los cursos propedéuticos del sistema.', 1)
--,( N'sga_detalle_asignatura_grupo_editar', N'Editar datos de registros de horario por asignatura', N'Permite editar los registros de horarios para las asignaturas agregadas en los cursos propedéuticos del sistema.', 1)
--,( N'sga_detalle_asignatura_grupo_eliminar', N'Eliminar registros de horarios cursos propedéuticos', N'Permite eliminar los registros de horarios para las asignaturas agregadas en los cursos propedéuticos del sistema.', 1)
--,(N'sga_detalle_asignatura_grupo_visualizar', N'Visualizar los horarios por asignatura', N'Permite visualizar los registros de horarios para las asignaturas agregadas en los cursos propedéuticos del sistema.', 1)
--,( N'sga_detalle_curso_propedeutico_acceder', N'Acceder al dictamen de los estudiantes de admisión en los cursos propedéuticos', N'Permite acceder a los registros del dictamen de los estudiantes de admisión de los cursos propedéuticos del sistema', 1)
--,( N'sga_detalle_curso_propedeutico_editar', N'Editar el dictamen de los estudiantes de admisión de los cursos propedéuticos', N'Permite editar los registros del dictamen de los estudiantes de admisión de los cursos propedéuticos del sistema', 1)
--,( N'sga_detalle_curso_propedeutico_visualizar', N'Visualizar el dictamen de los estudiantes de admisión de los cursos propedéuticos', N'Permite visualizar los registros del dictamen de los estudiantes de admisión de los cursos propedéuticos del sistema', 1)
--,( N'sga_detalle_entrevista_estudiante_acceder', N'Acceder al dictamen de la entrevista', N'Permite acceder a los registros del dictamen de la entrevista', 1)
--,( N'sga_detalle_entrevista_estudiante_editar', N'Editar dictamen de la entrevista', N'Permite editar el dictamen de la entrevista del estudiante', 1)
--,( N'sga_detalle_entrevista_estudiante_visualizar', N'Visualizar los dictamenes de la entrevista', N'Permite visualizar los registros del dictamen de la entrevista', 1)
--,( N'sga_detalle_examen_estudiante_acceder', N'Acceder a la calificación de exámenes', N'Permite acceder a los registros de los exámenes', 1)
--,( N'sga_detalle_examen_estudiante_editar', N'Editar calificación de examen', N'Permite editar la calificación del examen del estudiante', 1)
--,( N'sga_detalle_examen_estudiante_visualizar', N'Visualizar la calificación de los exámenes', N'Permite visualizar los registros de las calificaciones de los exámenes', 1)
--,( N'sga_detalle_grupo_estudiante_admision_acceder', N'Acceder a la calificación de asignaturas de los estudiantes de admisión en los cursos propedéuticos', N'Permite acceder a los registros de las calificaciones de asignaturas de los estudiantes de admisión de los cursos propedéuticos del sistema', 1)
--,( N'sga_detalle_grupo_estudiante_admision_editar', N'Editar la calificación de asignaturas de los estudiantes de admisión de los cursos propedéuticos', N'Permite editar los registros de las calificaciones de asignaturas de los estudiantes de admisión de los cursos propedéuticos del sistema', 1)
--,( N'sga_detalle_grupo_estudiante_admision_visualizar', N'Visualizar la calificación de asignaturas de los estudiantes de admisión de los cursos propedéuticos', N'Permite visualizar los registros de las calificaciones de asignaturas de los estudiantes de admisión de los cursos propedéuticos del sistema', 1)
--,( N'sga_dictamen_final_aspirante_admision_acceder', N'Acceder al dictamen final de los estudiantes de admisión', N'Permite acceder a los registros del dictamen final de los estudiantes de admisión del sistema', 1)
--,( N'sga_dictamen_final_aspirante_admision_editar', N'Editar el dictamen final de los estudiantes de admisión', N'Permite editar los registros del dictamen final de los estudiantes de admisión del sistema', 1)
--,( N'sga_dictamen_final_aspirante_admision_visualizar', N'Visualizar el dictamen final de los estudiantes de admisión', N'Permite visualizar los registros del dictamen final de los estudiantes de admisión del sistema', 1)
--,( N'sga_empleado_acceder', N'Acceder a los registros de empleados', N'Permite acceder a los registros de empleados', 1)
--,(N'sga_empleado_crear', N'Crear registros de empleados', N'Permite crear registros de empleados', 1)



INSERT [dbo].[sga_permiso] VALUES ( N'sga_asignatura_propedeutico_crear', N'Crear registros de asignaturas a cursos propedéuticos', N'Permite agregar/crear asignaturas a cualquier curso propedéutico en el sistema', 1)
INSERT [dbo].[sga_permiso]  VALUES (N'sga_asignatura_propedeutico_editar', N'Editar registros de asignaturas a cursos propedéuticos', N'Permite editar las asignaturas agregadas a cualquier curso propedéutico en el sistema.', 1)
INSERT [dbo].[sga_permiso]  VALUES (N'sga_asignatura_propedeutico_eliminar', N'Eliminar registros de asignaturas a cursos propedéuticos', N'Permite eliminar asignaturas agregadas a cualquier curso propedéutico en el sistema.', 1)
INSERT [dbo].[sga_permiso]  VALUES (N'sga_asignatura_propedeutico_visualizar', N'Visualizar registros de asignaturas a cursos propedéuticos', N'Permite visualizar las asignaturas de cualquier curso propedéutico en el sistema', 1)
INSERT [dbo].[sga_permiso]  VALUES (N'sga_bitacora_curso_propedeutico_visualizar', N'Visualizar registros de bitácora de curso propedéutico', N'Permite visualizar la bitácora de curso propedéutico en el sistema', 1)
INSERT [dbo].[sga_permiso] VALUES ( N'sga_curso_propedeutico_acceder', N'Acceder al módulo de configuración de curso propedéutico', N'Permite acceder a la configuración del curso propedéutico en el sistema', 1)
INSERT [dbo].[sga_permiso] VALUES ( N'sga_curso_propedeutico_aprobar', N'Cambiar el estado del curso propedéutico a Aprobado', N'Permite avanzar el estado del curso propedéutico a Aprobado.', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_curso_propedeutico_crear', N'Crear registros de cursos propedéuticos', N'Permite crear un nuevo curso propedéutico en el sistema y agregar sus respectivas asignaturas', 1)
INSERT [dbo].[sga_permiso]  VALUES (N'sga_curso_propedeutico_editar', N'Editar registros de cursos propedéuticos', N'Permite editar la información de cualquier curso propedéutico en el sistema y sus asignaturas', 1)
INSERT [dbo].[sga_permiso]  VALUES (N'sga_curso_propedeutico_eliminar', N'Eliminar registros de cursos propedéuticos', N'Permite eliminar cualquier curso propedéutico en el sistema', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_curso_propedeutico_publicar', N'Cambiar el estado del curso propedéutico a Publicado', N'Permite avanzar el estado del curso propedéutico a Publicado.', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_curso_propedeutico_revisar', N'Cambiar el estado del curso propedéutico a Revisión', N'Permite avanzar el estado del curso propedéutico a Revisión.', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_curso_propedeutico_visualizar', N'Visualizar registros de cursos propedéuticos', N'Permite visualizar el detalle de un curso propedéutico en el sistema', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_detalle_asignatura_grupo_acceder', N'Acceder al módulo de horarios de curso propedéutico', N'Permite acceder al módulo de horarios de cursos propedéuticos del sistema', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_detalle_asignatura_grupo_crear', N'Crear registros de horarios de cursos propedéuticos', N'Permite crear registro de horarios para las asignaturas agregadas en los cursos propedéuticos del sistema.', 1)
INSERT [dbo].[sga_permiso] VALUES ( N'sga_detalle_asignatura_grupo_editar', N'Editar datos de registros de horario por asignatura', N'Permite editar los registros de horarios para las asignaturas agregadas en los cursos propedéuticos del sistema.', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_detalle_asignatura_grupo_eliminar', N'Eliminar registros de horarios cursos propedéuticos', N'Permite eliminar los registros de horarios para las asignaturas agregadas en los cursos propedéuticos del sistema.', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_detalle_asignatura_grupo_visualizar', N'Visualizar los horarios por asignatura', N'Permite visualizar los registros de horarios para las asignaturas agregadas en los cursos propedéuticos del sistema.', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_detalle_curso_propedeutico_acceder', N'Acceder al dictamen de los estudiantes de admisión en los cursos propedéuticos', N'Permite acceder a los registros del dictamen de los estudiantes de admisión de los cursos propedéuticos del sistema', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_detalle_curso_propedeutico_editar', N'Editar el dictamen de los estudiantes de admisión de los cursos propedéuticos', N'Permite editar los registros del dictamen de los estudiantes de admisión de los cursos propedéuticos del sistema', 1)
INSERT [dbo].[sga_permiso] VALUES ( N'sga_detalle_curso_propedeutico_visualizar', N'Visualizar el dictamen de los estudiantes de admisión de los cursos propedéuticos', N'Permite visualizar los registros del dictamen de los estudiantes de admisión de los cursos propedéuticos del sistema', 1)
INSERT [dbo].[sga_permiso] VALUES ( N'sga_detalle_entrevista_estudiante_acceder', N'Acceder al dictamen de la entrevista', N'Permite acceder a los registros del dictamen de la entrevista', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_detalle_entrevista_estudiante_editar', N'Editar dictamen de la entrevista', N'Permite editar el dictamen de la entrevista del estudiante', 1)
INSERT [dbo].[sga_permiso] VALUES ( N'sga_detalle_entrevista_estudiante_visualizar', N'Visualizar los dictamenes de la entrevista', N'Permite visualizar los registros del dictamen de la entrevista', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_detalle_examen_estudiante_acceder', N'Acceder a la calificación de exámenes', N'Permite acceder a los registros de los exámenes', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_detalle_examen_estudiante_editar', N'Editar calificación de examen', N'Permite editar la calificación del examen del estudiante', 1)
INSERT [dbo].[sga_permiso] VALUES ( N'sga_detalle_examen_estudiante_visualizar', N'Visualizar la calificación de los exámenes', N'Permite visualizar los registros de las calificaciones de los exámenes', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_detalle_grupo_estudiante_admision_acceder', N'Acceder a la calificación de asignaturas de los estudiantes de admisión en los cursos propedéuticos', N'Permite acceder a los registros de las calificaciones de asignaturas de los estudiantes de admisión de los cursos propedéuticos del sistema', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_detalle_grupo_estudiante_admision_editar', N'Editar la calificación de asignaturas de los estudiantes de admisión de los cursos propedéuticos', N'Permite editar los registros de las calificaciones de asignaturas de los estudiantes de admisión de los cursos propedéuticos del sistema', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_detalle_grupo_estudiante_admision_visualizar', N'Visualizar la calificación de asignaturas de los estudiantes de admisión de los cursos propedéuticos', N'Permite visualizar los registros de las calificaciones de asignaturas de los estudiantes de admisión de los cursos propedéuticos del sistema', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_dictamen_final_aspirante_admision_acceder', N'Acceder al dictamen final de los estudiantes de admisión', N'Permite acceder a los registros del dictamen final de los estudiantes de admisión del sistema', 1)
INSERT [dbo].[sga_permiso] VALUES ( N'sga_dictamen_final_aspirante_admision_editar', N'Editar el dictamen final de los estudiantes de admisión', N'Permite editar los registros del dictamen final de los estudiantes de admisión del sistema', 1)
INSERT [dbo].[sga_permiso] VALUES ( N'sga_dictamen_final_aspirante_admision_visualizar', N'Visualizar el dictamen final de los estudiantes de admisión', N'Permite visualizar los registros del dictamen final de los estudiantes de admisión del sistema', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_empleado_acceder', N'Acceder a los registros de empleados', N'Permite acceder a los registros de empleados', 1)
INSERT [dbo].[sga_permiso] VALUES ( N'sga_empleado_crear', N'Crear registros de empleados', N'Permite crear registros de empleados', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_empleado_editar', N'Editar registros de empleados', N'Permite editar registros de empleados', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_empleado_eliminar', N'Eliminar registros de empleados', N'Permite eliminar registros de empleados', 1)
INSERT [dbo].[sga_permiso] VALUES ( N'sga_empleado_visualizar', N'Visualizar registros de empleados', N'Permite visualizar registros de empleados', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_entrevista_asignar', N'Asignar entrevista', N'Permite asignar una entrevista a un aspirante', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_entrevista_crear', N'Crear entrevista', N'Permite crear un nuevo registro de entrevista', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_entrevista_detalle', N'Consultar detalle de entrevista', N'Permite acceder a la vista del detalle de una entrevista', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_entrevista_editar', N'Editar entrevista', N'Permite editar un registro existente de entrevista', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_entrevista_enviar_revision', N'Enviar entrevista a revisión', N'Permite enviar una entrevista a revisión', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_entrevista_inactivar', N'Inactivar entrevista', N'Permite inactivar una entrevista', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_entrevista_listado', N'Consultar listado general de entrevistas', N'Permite acceder a la vista del listado general de entrevistas', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_entrevista_publicar', N'Publicar entrevista', N'Permite publicar una entrevista en revisión', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_entrevista_regresar', N'Regresar entrevista a borrador', N'Permite regresar una entrevista en revisión a borrador', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_estudiante_acceder', N'Acceder a los registros de estudiantes', N'Permite acceder a los registros de estudiantes', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_estudiante_crear', N'Crear registros de estudiantes', N'Permite crear registros de estudiantes', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_estudiante_editar', N'Editar registros de estudiantes', N'Permite editar registros de estudiantes', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_estudiante_eliminar', N'Eliminar registros de estudiante', N'Permite eliminar registros de estudiantes', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_estudiante_visualizar', N'Visualizar registros de estudiantes', N'Permite visualizar registros de estudiantes', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_examen_crear', N'Crear examen', N'Permite crear un nuevo registro de examen', 1)
INSERT [dbo].[sga_permiso] VALUES ( N'sga_examen_detalle', N'Consultar detalle de examen', N'Permite acceder a la vista del detalle de un examen', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_examen_editar', N'Editar examen', N'Permite editar un registro existente de examen', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_examen_enviar_revision', N'Enviar examen a revisión', N'Permite enviar un examen a revisión', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_examen_inactivar', N'Inactivar examen', N'Permite inactivar un examen', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_examen_listado', N'Consultar listado general de exámenes', N'Permite acceder a la vista del listado general de exámenes ', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_examen_publicar', N'Publicar examen', N'Permite publicar un examen en revisión', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_examen_regresar', N'Regresar examen a borrador', N'Permite regresar un examen en revisión a borrador', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_grupo_permiso_acceder', N'Acceder a los registros de grupos de permisos', N'Permite acceder a los registros de grupos de permisos', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_grupo_permiso_crear', N'Crear registros de grupos de permisos', N'Permite crear registros de grupos de permisos', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_grupo_permiso_editar', N'Editar registros de grupos de permisos', N'Permite editar registros de grupos de permisos', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_grupo_permiso_eliminar', N'Eliminar registros de grupos de permisos', N'Permite eliminar registros de grupos de permisos', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_grupo_permiso_visualizar', N'Visualizar registros de grupos de permisos', N'Permite visualizar registros de grupos de permisos', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_permiso_acceder', N'Acceder a los registros de permisos', N'Permite acceder a los registros de permisos', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_permiso_crear', N'Crear registros de permisos', N'Permite crear registros de permisos', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_permiso_editar', N'Editar registros de permisos', N'Permite editar registros de permisos', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_permiso_eliminar', N'Eliminar registros de permisos', N'Permite eliminar registros de permisos', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_permiso_visualizar', N'Visualizar registros de permisos', N'Permite visualizar registros de permisos', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_proceso_admision_acceder', N'Acceder a los registros de proceso admision', N'Permite visualizar el acceso a proceso admision en el menu de la aplicacion', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_proceso_admision_crear', N'Crear registros de proceso admision', N'Permite crear un nuevo proceso de admision', 1)
INSERT [dbo].[sga_permiso] VALUES ( N'sga_proceso_admision_editar', N'Editar registros de proceso admision', N'Permite editar la información de cualquier proceso de admision', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_proceso_admision_eliminar', N'Eliminar registros de proceso admision', N'Permite eliminar a cualquie proceso de admision', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_proceso_admision_visualizar', N'Visualizar registros de proceso admision', N'Permite visualizar el detalle cualquier proceso de admision', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_rol_acceder', N'Acceder a los registros de rol', N'Permite acceder a los registros de roles', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_rol_crear', N'Crear registros de rol', N'Permite crear registros de roles', 1)
INSERT [dbo].[sga_permiso] VALUES ( N'sga_rol_editar', N'Editar registros de rol', N'Permite editar registros de roles', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_rol_eliminar', N'Eliminar registros de rol', N'Permite eliminar registros de roles', 1)
INSERT [dbo].[sga_permiso] VALUES ( N'sga_rol_visualizar', N'Visualizar registros de rol', N'Permite visualizar registros de roles', 1)
INSERT [dbo].[sga_permiso] VALUES ( N'sga_solicitud_admision_doctorado_acceder', N'Acceder a registros de solicitud de admisión de doctorado', N'Permite acceder a las solicitudes de admisión de doctorado', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_solicitud_admision_doctorado_crear', N'Crear registros de solicitud de admisión de doctorado', N'Permite crear una solicitud de admisión de doctorado', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_solicitud_admision_doctorado_editar', N'Editar registros de solicitud de admisión de doctorado', N'Permite editar una solicitud de admisión de doctorado', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_solicitud_admision_doctorado_eliminar', N'Eliminar registros de solicitud de admisión de doctorado', N'Permite eliminar una solicitud de admisión de doctorado únicamente en periodo de registro de datos.', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_solicitud_admision_doctorado_publicar_dictamen', N'Avanza la solicitud de doctorado a estado Dictamen', N'Permite avanzar la solicitud de admisión de doctorado a estado Dictamen para que el aspirante se entere de sus resultados', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_solicitud_admision_doctorado_validar_registro', N'Validar la información la solicitud de admisión de doctorado del aspirante', N'Permite validar la información cargada en las solicitud de admisión de doctorado', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_solicitud_admision_doctorado_visualizar', N'Visualizar registros de solicitud de admisión de doctorado', N'Permite visualizar una solicitud de admisión de doctorado', 1)
INSERT [dbo].[sga_permiso] VALUES ( N'sga_solicitud_admision_doctorado_visualizar_bitacora', N'Visualizar bitácora de la solicitud de admisión de doctorado', N'Permite visualizar la bitácora de la solicitud de admisión de doctorado', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_solicitud_admision_maestria_acceder', N'Acceder a registros de solicitud de admisión de maestría', N'Permite acceder a las solicitudes de admisión de maestría', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_solicitud_admision_maestria_crear', N'Crear registros de solicitud de admisión de maestría', N'Permite crear una solicitud de admisión de maestría', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_solicitud_admision_maestria_editar', N'Editar registros de solicitud de admisión de maestría', N'Permite editar una solicitud de admisión de maestría', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_solicitud_admision_maestria_eliminar', N'Eliminar registros de solicitud de admisión de maestría', N'Permite eliminar una solicitud de admisión de maestría', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_solicitud_admision_maestria_publicar_dictamen', N'Avanza la solicitud de maestría a estado Dictamen', N'Permite avanzar la solicitud de admisión de maestría a estado Dictamen para que el aspirante se entere de sus resultados', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_solicitud_admision_maestria_validar_registro', N'Validar la información la solicitud de admisión de maestría del aspirante', N'Permite validar la información cargada en las solicitud de admisión de maestría', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_solicitud_admision_maestria_visualizar', N'Visualizar registros de solicitud de admisión de maestría', N'Permite visualizar una solicitud de admisión de maestría', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_solicitud_admision_maestria_visualizar_bitacora', N'Visualizar bitácora de la solicitud de admisión de maestría', N'Permite visualizar la bitácora de la solicitud de admisión de maestría', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_usuario_sistema_acceder', N'Acceder a los registros de usuario sistema', N'Permite acceder a los registros de usuarios', 1)
INSERT [dbo].[sga_permiso]  VALUES ( N'sga_usuario_sistema_crear', N'Crear registros de usuario sistema', N'Permite crear registros de usuarios', 1)
INSERT [dbo].[sga_permiso] VALUES ( N'sga_usuario_sistema_editar', N'Editar registros de usuario sistema', N'Permite editar registros de usuarios', 1)



INSERT into sga_cat_rol values (1, N'Super Administrador', NULL, 1),( 2, N'Director General', NULL, 1),( 3, N'Director de Formación Académica', NULL, 1),(4, N'Jefe de Servicios Escolares', NULL, 1),(5, N'Responsable de Control Escolar', NULL, 1),
(6, N'Responsable de Admisiones', NULL, 1),(7, N'Responsable de Planeación y Seguimiento a Posgrados', NULL, 1),(8, N'Responsable de Becas', NULL, 1),( 9, N'Responsable de Titulación', NULL, 1),( 10, N'Responsable de Difusión y Vinculación', NULL, 1),
(11, N'Responsable de Servicios Generales', NULL, 1),( 12, N'Responsable de Información y Estadísticas', NULL, 1),(13, N'Responsable de Archivo', NULL, 1),(14, N'Aspirante', NULL, 1),(15, N'Estudiante', NULL, 1),(16, N'Docente', NULL, 1),
( 17, N'Coordinador de Área', NULL, 1),(18, N'Representante Docente', NULL, 1),(19, N'Auxiliar Administrativo', NULL, 1)

INSERT into sga_cat_estado_proceso  VALUES (2, N'Validación', 1, NULL, 1, 1, NULL),(3, N'Evaluación', 1, NULL, 1, 1, NULL),( 4, N'Dictamen', 1, NULL, 1, 1, NULL),( 5, N'Datos generales', 2, N'glyphicon glyphicon-user', 1, 1, 1),
( 6, N'Datos académicos', 2, N'glyphicon glyphicon-book', 1, 1, 1),( 7, N'Curriculum vitae', 2, N'glyphicon glyphicon-folder-open', 1, 1, 1),( 8, N'Exposición de motivos', 2, N'glyphicon glyphicon-comment', 1, 1, 1),
(9, N'Carga de documentos', 2, N'glyphicon glyphicon-paperclip', 1, 1, 1),( 10, N'Mecanismo de evaluación', 2, N'glyphicon glyphicon-check', 1, 1, 3),(11, N'Contacto de emergencia', 2, NULL, 1, 6, 3),( 12, N'Domicilio actual', 2, NULL, 1, 6, 3),
(13, N'Historial médico', 2, NULL, 1, 6, 3),(14, N'Resultado evaluación', 2, N'glyphicon glyphicon-envelope', 1, 1, 3),( 15, N'Cotejo de documentación original', 2, NULL, 1, 6, NULL),(16, N'Registro', 1, NULL, 1, 2, NULL),
(17, N'Validación', 1, NULL, 1, 2, NULL),(18, N'Evaluación', 1, NULL, 1, 2, NULL),(19, N'Dictamen', 1, NULL, 1, 2, NULL),(20, N'Datos generales', 2, N'glyphicon glyphicon-user', 1, 2, 16),(21, N'Datos académicos', 2, N'glyphicon glyphicon-book', 1, 2, 16),
(22, N'Curriculum vitae', 2, N'glyphicon glyphicon-folder-open', 1, 2, 16),( 23, N'Exposición de motivos', 2, N'glyphicon glyphicon-comment', 1, 2, 16),( 24, N'Propuesta de tesis doctoral', 2, N'glyphicon glyphicon-file', 1, 2, 16),
(25, N'Carga de documentos', 2, N'glyphicon glyphicon-paperclip', 1, 2, 16),( 26, N'Mecanismos de evaluación', 2, N'glyphicon glyphicon-check', 1, 2, 18),(27, N'Resultado evaluación', 2, N'glyphicon glyphicon-envelope', 1, 2, 18),
( 28, N'Carga de documentos', 2, NULL, 0, 2, 19),( 29, N'Contacto de emergencia', 2, NULL, 1, 7, 19),( 30, N'Domicilio actual', 2, NULL, 1, 7, 19),( 31, N'Historial médico', 2, NULL, 1, 7, 19),(32, N'Registro', 1, NULL, 1, 3, NULL),
(33, N'Revisión', 1, NULL, 1, 3, NULL),( 34, N'Aprobado', 1, NULL, 1, 3, NULL),( 35, N'Publicado', 1, NULL, 1, 3, NULL),( 36, N'Borrador', 1, NULL, 1, 4, NULL)


INSERT into sga_cat_nacionalidad  VALUES (1, 'Afgano', 1), ( 2, 'Albanesa', 1),( 3, 'Alemana', 1),( 4, 'Andorrana', 1),
(5, 'Angoleño', 1),(6, 'Árabe', 1),(7, 'Argelino', 1),(8, 'Argentino', 1),(9, 'Armenia', 1),(10, 'Arubana', 1),(11, 'Australiana', 1),(12, 'Bahameña', 1),(13,'Barbadense', 1),
(14, 'Belga', 1),(15, 'Beliceño', 1),(16,'Bielorrusa', 1),(17,'Boliviano', 1),(18,'Bosnia', 1),(19,'Brasileño', 1),(20,'Británica', 1),(21,'Búlgara', 1),(22,'Camboyano', 1),
(23,'Camerunesa', 1),(24,'Canadiense', 1),( 25,'Checa', 1),( 26,'Chileno', 1),(27,'Chino', 1),(28, 'Colombiano', 1),(29, 'Coreano', 1),(30, 'Costarricense', 1),(31, 'Croata', 1),
(32, 'Cubano', 1),(33, 'Danesa', 1),(34, 'Dominicano', 1),(35, 'Dominiquesa', 1),( 36, 'Ecuatoriano', 1), (37, 'Egipcio', 1),(38, 'Escocesa', 1),(39, 'Eslovaca', 1), (40, 'Eslovena', 1),
(41, 'Española', 1), (42, 'Estadounidense', 1), (43, 'Estonia', 1),(44, 'Etíope', 1),(45, 'Filipino', 1),(46, 'Finlandesa', 1),(47, 'Francesa', 1),(48, 'Gales', 1),(49, 'Griega', 1),
(50, 'Guatemalteco ', 1),(51, 'Guyanesa', 1),(52, 'Haitiano', 1),(53, 'Holandesa', 1),(54, 'Hondureño', 1),(55, 'Húngara', 1),(56, 'Indonesia', 1),(57, 'Inglesa', 1),(58, 'Iraní', 1),
(59, 'Iraquí', 1),(60, 'Irlandesa', 1),(61, 'Israelí', 1),(62, 'Italiana', 1),(63, 'Jamaiquina', 1),(64, 'Japonés', 1),(65, 'Jordano', 1),(66, 'Laosiano', 1),(67, 'Letona', 1),
(68, 'Letones', 1),(69, 'Liberiana', 1),(70, 'Libia', 1),( 71, 'Lituana', 1),( 72, 'Luxemburguesa', 1),( 73, 'Malayo', 1),( 74, 'Maltesa', 1),(75, 'Marroquí', 1),(76, 'Mexicano', 1)
,(77, 'Moldava', 1),(78, 'Monegasca', 1),(79, 'Montenegrina', 1),( 80, 'Namibia', 1),(81, 'Neozelandesa', 1),(82, 'Nicaragüense', 1),(83, 'Nigeriana', 1),(84, 'Noruega', 1),
(85, 'Panameño', 1),(86, 'Paraguayo', 1),(87, 'Peruano', 1),(88, 'Polaca', 1),(89, 'Portuguesa', 1),(90, 'Puertorriqueño', 1),(91, 'Rumana', 1),(92, 'Rusa', 1),(93, 'Saharaui', 1),
(94, 'Salvadoreño', 1),(95, 'Sancristobaleña', 1),(96, 'Santa Luciana', 1),(97, 'Sanvicentina', 1),(98, 'Senegalesa', 1),(99, 'Serbia', 1),(100, 'Sudafricana', 1),(101, 'Sueca', 1),
(102, 'Suiza', 1),(103, 'Surinamesa', 1),(104, 'Tailandés', 1),(105, 'Taiwanés', 1),(106, 'Togolesa', 1),(107, 'Turca', 1),(108, 'Ucraniana', 1),(109, 'Uruguayo', 1),
(110, 'Venezolano', 1),(111, 'Vietnamita', 1),(113, 'Tanzanian', 1),(114, 'Congoleña', 1)

INSERT into sga_configvar VALUES
(1, 'sga_sufijos_propedeutico', N'Contiene los sufijos para identificar los programas de los cursos propedéuticos', 1),
(2, 'Instrucciones generación de solicitud de admisión', N'Contiene las instrucciones para generar una solicitud de admisión', 1),
(3, 'Acuerdo de privacidad integral - INAOE', N'Contiene los términos y condiciones para generar una solicitud de admisión', 1),
(4, 'Tipo de permiso', N'Tipo de permiso que se establece para las bajas de estudiantes', 1),
(5, 'Control de solicitudes de admisión para servicio web', N'Contiene los rangos de Idgenerales(identificador de datos del consumo de servicio web de página pública Gob para solicitudes de admisión de posgrados) registrados en SISGEA', 1),
(6, 'Intentos máximo por solicitud de admisión', N'Define el número de intentos máximo que tiene un aspirante para solicitar su admisión en el posgrado', 1),
(7, 'Calendario escolar', N'Almacena las direcciones url para acceder al calendario escolar de acuerdo al periodo', 1),
(8, 'sga_tesis_defensa_estudiante_activo', N'Contiene la relacion de tesis_defensa con estado activa y el estudiante.', 1)
