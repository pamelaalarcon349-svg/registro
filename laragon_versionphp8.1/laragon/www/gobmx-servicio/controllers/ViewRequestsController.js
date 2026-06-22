
$(function () {
    
getRequests();

});


function getRequests() {
    const settings = {
        url: "../controllers/ViewRequestsController.php",
        method: "POST",
        type: 0,
    };

    $.ajax(settings).done(function (response) {

        let counter = 0;

        $.each(response.data, function (key, val) {

            console.log(val);

            counter++;

            var newRow = document.getElementById('mainTable').insertRow();

            newRow.innerHTML = '<td scope="row">'+counter+'</td>'+
            '<td>'+val.nombres+'</td><td>'+val.paterno+'</td><td>'+val.materno+'</td>'+
            '<td>'+val.curp+'</td><td>'+val.email+'</td>'+
            '<td></td>';
        });

        console.log(response);
    

    }).fail(function (error) {

        console.log(error);

    });
}