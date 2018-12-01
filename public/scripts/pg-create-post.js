$(function () {
    //write review function
    let dialog = $("#dialog").dialog({
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
    let ownerId = $("#ownerId").val();
    let manufacture = $("#manufacture").val();
    let model = $("#model").val();
    let year = $("#year").val();
    let price = $("#price").val();
    let form = dialog.find( "form" ).on( "submit", function( event ) {
        event.preventDefault();
        addReview();
    });
    function addReview() {
        $.post(
            "/post-car",
            {
                ownerId: ownerId,
                manufacture: manufacture,
                model: model,
                year: year,
                price: price,
            }
        )
        .done(function(result) {
            // reload current url
            location.assign("/");
        })
        .fail(function(result) {
            var error = result.responseJSON.error;
            if (error) {
                console.log(error);
                return;
            }
        });
    }
});