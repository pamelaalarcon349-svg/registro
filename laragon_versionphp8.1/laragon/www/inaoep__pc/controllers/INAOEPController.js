
/*
$(function () {
    
getINAOEPRequest();
//getINAOEPRequestFromFile();

});
*/

$(function () {
    var param = $('script[src$="/controllers/INAOEPController.js"]').data('param');
    
    if (param === 1) {
        getINAOEPRequest();
    } else if (param === 2) {
        getINAOEPRequestFromFile();
    } 
});


//petición desde servicio web

function getINAOEPRequest() {
    const settings = {
        url: "../models/INAOEPRequestModel.php",
        method: "POST",
        type: 0,
    };

    $.ajax(settings).done(function (response) {

        processINAOEPRequests(response, 1);

    }).fail(function (error) {

        console.log(error);

    });
}

//petición desde archivo json

function getINAOEPRequestFromFile() {

    const settings = {
        url: "../models/INAOEPFileModel.php",
        method: "POST",
        type: 0,
    };
    
    $.ajax(settings).done(function (response) {

        processINAOEPRequests(response, 2);

    }).fail(function (error) {

        console.log(error);

    });
}


function processINAOEPRequests(json_data, option) {

    // Decodifica el JSON
    
    if(option == 1){ 
        var data =   json_data; 
    } else { 
        var data  =  JSON.parse(json_data); 
    }
        
    
    var counter             =   0;
    var tempEmail           =   "";
    var curp                =   "";
    var secondLastName      =   "";

    // Itera sobre cada solicitud
    data.Solicitudes.forEach(function(solicitud) {
        
        // Accede a los datos de la solicitud
        var solicitud = solicitud.Solicitud;

        var newRow = document.getElementById('mainTable').insertRow();

        //bloque de validación de datos
        curp = solicitud.CURP;        
        secondLastName = solicitud.Materno;
        
        if(curp == "" || curp == null)
        {
            curp = "null";
        }
        if(secondLastName === "" || secondLastName == null )
        {
            secondLastName ="null";
        }
        

        var data = {
            names : solicitud.Nombres,
            last_name : solicitud.Paterno,
            second_last_name : secondLastName,
            email : solicitud.Email,
            curp : curp,
            id_general: solicitud.IDgenerales,
            gender: solicitud.Sexo,
            birth_date: solicitud.FechaNacimiento,
            birth_place: solicitud.LugarNacimiento,
            mobile_number: solicitud.TelMovil,
            register_date: solicitud.FechaRegistro,
            nationality: solicitud.Nacionalidad,
            admission_period: solicitud.PeriodoIngreso,
            academic_area: solicitud.tipoPosgrado,
            degree: solicitud.Posgrado,
            country: solicitud.Pais
        };

       if(solicitud.IDgenerales != counter)
      //  if(solicitud.Email !== tempEmail)
       {
        
        newRow.innerHTML = '<td scope="row">'+solicitud.IDgenerales+'</td>'+
        '<td>'+solicitud.Nombres+'</td><td>'+solicitud.Paterno+'</td><td>'+solicitud.Materno+'</td>'+
        '<td>'+solicitud.CURP+'</td><td>'+solicitud.Email+'</td>'+
        '<td><div class="btn-group btn-group-sm" role="group" aria-label="Small button group">'+
        "<button type='button' class='btn btn-outline-success' onclick='saveData("+JSON.stringify(data)+")'><i class='fa-solid fa-floppy-disk'></i></button>"+
        "<button type='button' class='btn btn-outline-primary' onclick='showAllData("+JSON.stringify(data)+")'><i class='fa-solid fa-eye'></i></button>"+       
        "<button type='button' class='btn btn-outline-primary' onclick='verifyData("+JSON.stringify(data)+")'><i class='fa-solid fa-check'></i></button>"+       
        '</div></td>';

         tempEmail = solicitud.Email;
         counter = solicitud.IDgenerales;
       }

    });

}   


function saveData(data) {

    const settings = {
        url: "../controllers/RequestController.php",
        method: "POST",
        type: 0,
        data: JSON.stringify(data)
    };

    $.ajax(settings).done(function (response) {

        msgSaveData(response);
        console.log(response);
     

    }).fail(function (error) {

        console.log("error",error);
        msgSaveData(error);

    });    
}


function verifyData(data) {

    const settings = {
        url: "../controllers/VerifyController.php",
        method: "POST",
        type: 0,
        data: JSON.stringify(data)
    };

    $.ajax(settings).done(function (response) {

        msgVerifyData(response);
       
        console.log(response);
     

    }).fail(function (error) {

        console.log("error",error);
        msgSaveData(error);

    });    
}



function showAllData(data) {

    var modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = ""; 

    for (var key in data) {
        modalBody.innerHTML += "<p><strong>" + key + ":</strong> " + data[key] + "</p>";
    }

    $('#myModal').modal('show'); 
}


function msgSaveData(data) {

    var modalBody = document.getElementById("modalBody");


    modalBody.innerHTML = ""; 

    for (var key in data) {
        modalBody.innerHTML += "<p><strong>" + key + ":</strong> " + data[key] + "</p>";
    }

    $('#myModal').modal('show'); 
}


function msgVerifyData(data) {


    var modalBody = document.getElementById("modalBody");


    modalBody.innerHTML = " Validación de correo electrónico: "; 
    
    
    for (var key in data) {
        modalBody.innerHTML += "<p><strong> Número de veces en BD" + ":</strong> " + data[key] + "</p>";
    }

  
    /*
    if (data.hasOwnProperty(data) && data[data] > 1) {
        modalBody.innerHTML += "<p><strong>" + data + ":</strong> " + data[data] + "</p>";
    }
    else{
        modalBody.innerHTML += "<p><strong>" + data + ":</strong> " + data[data] + "</p>";
    }
    */



    $('#myModal').modal('show'); 
}