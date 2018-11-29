$(function(){
    $( "#registerTabs" ).tabs();
    $("#dealerRegisterForm").submit(function(e){
        var inputPwd = $("#dealerPwd").val();
        var inputPwdConfirm= $("#dealerPwdConfirm").val();
        if(inputPwd !== inputPwdConfirm) {
            showDialog("Password does not match password confirmation");
            e.preventDefault();
            return;
        }
        // $("#signupForm").submit();
    });
    $("#individualRegisterForm").submit(function(e){
        var inputPwd = $("#individualPwd").val();
        var inputPwdConfirm= $("#individualPwdConfirm").val();
        if(inputPwd !== inputPwdConfirm) {
            showDialog("Password does not match password confirmation");
            e.preventDefault();
            return;
        }
        // $("#signupForm").submit();
    });
})