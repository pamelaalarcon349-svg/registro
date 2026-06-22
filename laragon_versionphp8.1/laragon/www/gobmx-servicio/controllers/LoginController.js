
const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let username = $("#username");
    let password = $("#password");

    if (!isRequired(username.val())) { showError(username); return; } else { showSuccess(username); }
    if (!isRequired(password.val())) { showError(password); return; } else { showSuccess(password); }


    let data = {
        username: username.val(),
        password: password.val()
    }

    login(data);
});

function login(data) {
    const settings = {
        url: "../controllers/LoginController.php",
        method: "POST",
        type: 0,
        data: JSON.stringify(data)
    };

    $.ajax(settings).done(function (response) {


        data = response.data;
        if (data.id !== null) {
            window.location.href = 'request.html';
        }
        
    }).fail(function (error) {

        console.log(error);
        // console.log("error",JSON.parse(error.responseText));

    });
}