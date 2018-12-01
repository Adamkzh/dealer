$(function() {

    $(document).on("click", "#homeLoginBtn", function(e){
        e.preventDefault();
        let userId = $("#userId").val();
        let userPwd = $("#password").val();
        let accountType = $("#accountType").val();
        if(!userId || !userPwd || userId === "" || userPwd === "") {
            showDialog("User name and/or password cannot be empty");
            return;
        }
        $.ajax({
            method: "POST",
            url: "/login",
            data: { "id": userId, "password": userPwd, "accountType": accountType }
        })
        .done(function(result) {
            // reload current url
            location.reload();
        })
        .fail(function(result) {
            var error = result.responseJSON.error;
            if(error) {
                showDialog(error);
                return;
            }
        });
    });


    // dialog
    $("#dialog").dialog({
        autoOpen: false,
        show: {
            effect: "blind",
            duration: 200
        },
        hide: {
            effect: "explode",
            duration: 200
        },
        height: 400,
        width: 400
    });

    function showDialog(msg){
        $("#dialogMsg").text(msg);
        $("#dialog").dialog("open");
    }

});