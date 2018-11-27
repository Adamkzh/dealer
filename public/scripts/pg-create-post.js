$(function () {
    //write review function
    var dialog = $("#dialog").dialog({
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
        width: 400,
        modal: true,
        // buttons: {
        //     "Add a review": addReview,
        //     Cancel: function() {
        //         dialog.dialog( "close" );
        //     }
        // },
        close: function() {
            form[0].reset();
        }
    });
    $(document).on("click", "#writeReviewBtn", function(e){
        e.preventDefault();
        dialog.dialog( "open" );
    });
});