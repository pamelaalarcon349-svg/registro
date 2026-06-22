
$(function () {
  
   
});


const registerForm = document.getElementById("registerForm");
registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let curp = $("#curp");
    let nombres = $("#nombres");
    let paterno = $("#paterno");
    let materno = $("#materno");
    let sexo = $("#sexo");
    let fechaNacimiento = $("#fechaNacimiento");
    let lugarNacimiento = $("#lugarNacimiento");
    let lada = $("#lada");
    let telFijo = $("#telFijo");
    let extension = $("#extension");
    let telMovil = $("#telMovil");
    let email = $("#email");
    let fechaRegistro = $("#fechaRegistro");
    let nacionalidad = $("#nacionalidad");
    let ladaEmergencia = $("#ladaEmergencia");
    let telFijoEmergencia = $("#telFijoEmergencia");
    let extensionEmergencia = $("#extensionEmergencia");
    let telMovilEmergencia = $("#telMovilEmergencia");
    let parentesco = $("#parentesco");
    let anioIngreso = $("#anioIngreso");
    let periodoIngreso = $("#periodoIngreso");
    let posgrado = $("#posgrado");
    let institucionAnterior = $("#institucionAnterior");
    let gradoAnterior = $("#gradoAnterior");
    let anioGradoAnterior = $("#anioGradoAnterior");
    let promedio = $("#promedio");
    let titulacion = $("#titulacion");
    let formaEval = $("#formaEval");
    let tipoPosgrado = $("#tipoPosgrado");
    let otraTitulacion = $("#otraTitulacion");
    let cp = $("#cp");
    let estado = $("#estado");
    let municipio = $("#municipio");
    let localidad = $("#localidad");
    let colonia = $("#colonia");
    let tipoCalle = $("#tipoCalle");
    let calle = $("#calle");
    let numExterior = $("#numExterior");
    let numInterior = $("#numInterior");
    let pais = $("#pais");
    let nombreEmpresa = $("#nombreEmpresa");
    let tipoExperiencia = $("#tipoExperiencia");
    let puestoFunciones = $("#puestoFunciones");
    let tiempoLaborado = $("#tiempoLaborado");
    let escrito = $("#escrito");
    let oral = $("#oral");
    let lectura = $("#lectura");
    let auditivo = $("#auditivo");
    let razonInteres = $("#razonInteres");
    let medio = $("#medio");
    let titulo = $("#titulo");
    let descripcion = $("#descripcion");

    //! Validaciones
    if (!isRequired(fechaRegistro.val())) { showError(fechaRegistro); return; } else { showSuccess(fechaRegistro); }
    if (!isRequired(curp.val())) { showError(curp); return; } else { showSuccess(curp); }
    if (!isRequired(nombres.val())) { showError(nombres); return; } else { showSuccess(nombres); }
    if (!isRequired(paterno.val())) { showError(paterno); return; } else { showSuccess(paterno); }
    if (!isRequired(materno.val())) { showError(materno); return; } else { showSuccess(materno); }
    if (!isRequired(sexo.val())) { showError(sexo); return; } else { showSuccess(sexo); }
    if (!isRequired(fechaNacimiento.val())) { showError(fechaNacimiento); return; } else { showSuccess(fechaNacimiento); }
    if (!isRequired(lugarNacimiento.val())) { showError(lugarNacimiento); return; } else { showSuccess(lugarNacimiento); }
    if (!isRequired(nacionalidad.val())) { showError(nacionalidad); return; } else { showSuccess(nacionalidad); }
    if (!isRequired(titulo.val())) { showError(titulo); return; } else { showSuccess(titulo); }
    if (!isRequired(medio.val())) { showError(medio); return; } else { showSuccess(medio); }
    if (!isRequired(razonInteres.val())) { showError(razonInteres); return; } else { showSuccess(razonInteres); }
    if (!isRequired(descripcion.val())) { showError(descripcion); return; } else { showSuccess(descripcion); }
    if (!isEmailValid(email.val())) { showError(email); return; } else { showSuccess(email); }
    if (!isRequired(lada.val())) { showError(lada); return; } else { showSuccess(lada); }
    if (!isRequired(telFijo.val())) { showError(telFijo); return; } else { showSuccess(telFijo); }
    if (!isRequired(extension.val())) { showError(extension); return; } else { showSuccess(extension); }
    if (!isRequired(telMovil.val())) { showError(telMovil); return; } else { showSuccess(telMovil); }
    if (!isRequired(ladaEmergencia.val())) { showError(ladaEmergencia); return; } else { showSuccess(ladaEmergencia); }
    if (!isRequired(telFijoEmergencia.val())) { showError(telFijoEmergencia); return; } else { showSuccess(telFijoEmergencia); }
    if (!isRequired(extensionEmergencia.val())) { showError(extensionEmergencia); return; } else { showSuccess(extensionEmergencia); }
    if (!isRequired(telMovilEmergencia.val())) { showError(telMovilEmergencia); return; } else { showSuccess(telMovilEmergencia); }
    if (!isRequired(parentesco.val())) { showError(parentesco); return; } else { showSuccess(parentesco); }
    if (!isRequired(anioIngreso.val())) { showError(anioIngreso); return; } else { showSuccess(anioIngreso); }
    if (!isRequired(periodoIngreso.val())) { showError(periodoIngreso); return; } else { showSuccess(periodoIngreso); }
    if (!isRequired(posgrado.val())) { showError(posgrado); return; } else { showSuccess(posgrado); }
    if (!isRequired(institucionAnterior.val())) { showError(institucionAnterior); return; } else { showSuccess(institucionAnterior); }
    if (!isRequired(gradoAnterior.val())) { showError(gradoAnterior); return; } else { showSuccess(gradoAnterior); }
    if (!isRequired(anioGradoAnterior.val())) { showError(anioGradoAnterior); return; } else { showSuccess(anioGradoAnterior); }
    if (!isRequired(promedio.val())) { showError(promedio); return; } else { showSuccess(promedio); }
    if (!isRequired(titulacion.val())) { showError(titulacion); return; } else { showSuccess(titulacion); }
    if (!isRequired(formaEval.val())) { showError(formaEval); return; } else { showSuccess(formaEval); }
    if (!isRequired(tipoPosgrado.val())) { showError(tipoPosgrado); return; } else { showSuccess(tipoPosgrado); }
    if (!isRequired(otraTitulacion.val())) { showError(otraTitulacion); return; } else { showSuccess(otraTitulacion); }
    if (!isRequired(cp.val())) { showError(cp); return; } else { showSuccess(cp); }
    if (!isRequired(estado.val())) { showError(estado); return; } else { showSuccess(estado); }
    if (!isRequired(municipio.val())) { showError(municipio); return; } else { showSuccess(municipio); }
    if (!isRequired(localidad.val())) { showError(localidad); return; } else { showSuccess(localidad); }
    if (!isRequired(colonia.val())) { showError(colonia); return; } else { showSuccess(colonia); }
    if (!isRequired(pais.val())) { showError(pais); return; } else { showSuccess(pais); }
    if (!isRequired(tipoCalle.val())) { showError(tipoCalle); return; } else { showSuccess(tipoCalle); }
    if (!isRequired(calle.val())) { showError(calle); return; } else { showSuccess(calle); }
    if (!isRequired(numExterior.val())) { showError(numExterior); return; } else { showSuccess(numExterior); }
    if (!isRequired(numInterior.val())) { showError(numInterior); return; } else { showSuccess(numInterior); }
    if (!isRequired(nombreEmpresa.val())) { showError(nombreEmpresa); return; } else { showSuccess(nombreEmpresa); }
    if (!isRequired(tipoExperiencia.val())) { showError(tipoExperiencia); return; } else { showSuccess(tipoExperiencia); }
    if (!isRequired(puestoFunciones.val())) { showError(puestoFunciones); return; } else { showSuccess(puestoFunciones); }
    if (!isRequired(tiempoLaborado.val())) { showError(tiempoLaborado); return; } else { showSuccess(tiempoLaborado); }
    if (!isRequired(escrito.val())) { showError(escrito); return; } else { showSuccess(escrito); }
    if (!isRequired(oral.val())) { showError(oral); return; } else { showSuccess(oral); }
    if (!isRequired(lectura.val())) { showError(lectura); return; } else { showSuccess(lectura); }
    if (!isRequired(auditivo.val())) { showError(auditivo); return; } else { showSuccess(auditivo); }


    const data = {
        "CURP": curp.val().toUpperCase(),
        "Nombres": nombres.val(),
        "Paterno": paterno.val(),
        "Materno": materno.val(),
        "Sexo": sexo.val(),
        "FechaNacimiento": fechaNacimiento.val(),
        "LugarNacimiento": lugarNacimiento.val(),
        "Lada": lada.val(),
        "TelFijo": telFijo.val(),
        "Extension": extension.val(),
        "TelMovil": telMovil.val(),
        "Email": email.val(),
        "FechaRegistro": fechaRegistro.val(),
        "Nacionalidad": nacionalidad.val(),
        "LadaEmergencia": ladaEmergencia.val(),
        "TelFijoEmergencia": telFijoEmergencia.val(),
        "ExtensionEmergencia": extensionEmergencia.val(),
        "TelMovilEmergencia": telMovilEmergencia.val(),
        "Parentesco": parentesco.val(),
        "AnioIngreso": anioIngreso.val(),
        "PeriodoIngreso": periodoIngreso.val(),
        "Posgrado": posgrado.val(),
        "InstitucionAnterior": institucionAnterior.val(),
        "GradoAnterior": gradoAnterior.val(),
        "AnioGradoAnterior": anioGradoAnterior.val(),
        "Promedio": promedio.val(),
        "Titulacion": titulacion.val(),
        "formaEval": formaEval.val(),
        "tipoPosgrado": tipoPosgrado.val(),
        "otraTitulacion": otraTitulacion.val(),
        "CP": cp.val(),
        "Estado": estado.val(),
        "Municipio": municipio.val(),
        "Localidad": localidad.val(),
        "Colonia": colonia.val(),
        "TipoCalle": tipoCalle.val(),
        "Calle": calle.val(),
        "NumExterior": numExterior.val(),
        "NumInterior": numInterior.val(),
        "Pais": pais.val(),
        "NombreEmpresa": nombreEmpresa.val(),
        "TipoExperiencia": tipoExperiencia.val(),
        "PuestoFunciones": puestoFunciones.val(),
        "TiempoLaborado": tiempoLaborado.val(),
        "Escrito": escrito.val(),
        "Oral": oral.val(),
        "Lectura": lectura.val(),
        "Auditivo": auditivo.val(),
        "RazonInteres": razonInteres.val(),
        "Medio": medio.val(),
        "Titulo": titulo.val(),
        "Descripcion": descripcion.val()
    }

    sendRegisterRequest(data);
});

function sendRegisterRequest(data) {
    const settings = {
        url: "../controllers/RegisterController.php",
        method: "POST",
        type: 0,
        data: JSON.stringify(data)
    };

    $.ajax(settings).done(function (response) {

        let modalSuccess = createBootstrapModal('modalSuccess');
        modalSuccess.show();
        
    }).fail(function (error) {

        console.log(error);

    });
}