use pRegistro
go

/****1.- Inserta  un registro nuevo en sga_persona y en sga_estudiante*****/
--/registro de nueva persona
insert into sga_persona
values (
         'ETHAN SAUL'
        ,'CARRIZALES'
        ,'ALVAREZ'
        ,'ETHAN SAUL CARRIZALES ALVAREZ'
        ,'1' --genero
        ,null
        ,'ethan.carrizales@gmail.com' 
        ,'1' --estudiante o administrativo
        ,'1' --estado inactivo o activo
		,null
        )

		
---asocian estudiante a una nacionalidad el sistema lo pide para poder avansar en el regitro


-- 2.- se asocia con programa de posgrado, con persona y datos personales
insert into sga_persona_sga_estudiante 
values (		
       ''--folio aspirante
       ,null --matricula_alumno
	   ,null--numero de registro es para los usuario del sistema predesesor del sisgea
	   ,convert(datetime,'2023-03-21 14:37:43',20) -- fecha registro
	   ,null--curp
	   ,null--dni
	   ,null--frc
	   ,convert(datetime,'1996-11-11 00:00:00.00',20)--fecha nacimiento
	   ,null--registro biomedicos
	   ,'1' -- esta activo o inactivo
	   ,NULL --estudiante_m2o
	   ,NULL --estado civil
	   ,'30'--estado donde radica 
	   ,'9' --id del la tabla programa 
	   ,@@IDENTITY--asocia el id del ultimo registro de la tabla perosna 
     )




--3.-vinucla nacionalidad con estudiante  

 insert into sga_nacionalidad_m2m_estudiante (sga_estudiante_id,sga_cat_nacionalidad_id) values 
 ((select id from sga_persona_sga_estudiante e where e.fecha_registro_aspirante = (SELECT MAX(e2.fecha_registro_aspirante) from sga_persona_sga_estudiante e2))
 ,(select id from sga_cat_nacionalidad where nacionalidad like 'Mexicano'))
	
select * from sga_cat_nacionalidad where id in (87,200)

---1.4 se registra como aspirtante y se asocia con el proceso de admision del posgrado que selecciono 
 insert into sga_estudiante_admision 
values (
		0--criterio de aprobacion
		,''--motivo de inscripcion
		,convert(datetime,'2023-03-21 14:37:43',20)--fecha registro
		,null--observaciones
		,'3'--modalidad de ingreso
		,null--beca prope
		,null--beca comedor
		,'1'--estado solicitud
		,'1'--id tabla sga_persona_sga_estudiante
		,'112'--id tabla proceso_admision
		,'1'--estado de proceso de solicitud de admision
		,'5'--estapa de proceso de solicitud de admision
		,NULL--idegenerales de gob.mx
		,null---especificacion 
)


---se uitliza el id del registro de la tabla admsion para generar si folio y se actualiza en la tabla persona
update sga_persona_sga_estudiante
set folio_aspirante = '2023MZXX0001' --se obtiene de agrupar año del proceso de admision + posgrado +XX+id de la  tabla que tien asociado 
where id =1


SELECT * FROM sga_bitacora_estudiante_admision where estudiante_admision_m2o_id = 9584

---se registra para poder tener conocimiento de los avances en la solicitud de admision y se asocia con tabla admision 
INSERT INTO sga_bitacora_estudiante_admision 
VALUES(
	'creación'--nombre de la accion 
	,convert(datetime,'2023-03-21 14:37:43',20)--fecha de la accion
	,''---motivo de la accion 
	,'1'--activo o inactivo del registro 
	,'1' --id de tabla sga_estudiante_admision
	,null---id de empleado si el caso de que realizo una modificacion
	,'1'--estado del proceso en el que esta la solicitud de admision
)






select * from sga_persona
select * from sga_persona_sga_estudiante
select * from sga_nacionalidad_m2m_estudiante
select * from sga_usuario_sistema 
select * from sga_estudiante_admision 
select * from sga_bitacora_estudiante_admision
select * from sga_nacionalidad_m2m_estudiante 
select * from sga_usuario_m2m_rol
select * from sga_usuario_m2m_grupo_permiso
select * from sga_usuario_m2m_permiso


--se genera el Usuario y contraseña para poder acceder al SISGEA
INSERT INTO sga_usuario_sistema 
VALUES 
(
 'gama2411'--nombre usuario
 ,'e10adc3949ba59abbe56e057f20f883e'
 ,convert(datetime,'2023-03-21 14:37:43',20)
 ,1--estado del registro inactivo o activo 
 ,1---id de la tabla persona
)




--esto permite al usuario visualiazar las interfaces a las que tiene acceso
---rol
-- se asocian el rol con el registro de usuario 
insert into sga_usuario_m2m_rol
  values (
  1 --id del la tabla rol
  ,1-- id del usuario del estudiante 
  )

 ---grupo_permiso
 -- se asocian los grupos de permisos con el usuario
  insert into sga_usuario_m2m_grupo_permiso
  values(
		1 --id de la tabla grupo permiso
		,1--id del usuario del estudiante
		)

  insert into sga_usuario_m2m_grupo_permiso
  values(2,1)

  --permiso
--se asocian los permisos con le usuarios
insert into sga_usuario_m2m_permiso values
(1--id del grupo de permiso
,1--id del usuario del estudiante
), (2,1), (3,1), (4,1), (5,1),(6,1),(7,1),(8,1),(9,1),(10,1),(11,1),(12,1)