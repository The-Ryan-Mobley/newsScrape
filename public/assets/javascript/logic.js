$(window).on("load", () => {
    const modal = $(".modal");
    const btn = $(".comment-btn");
    const close = $(".modal-close")
    modal.hide();

    btn.on('click', (event) => {
        modal.show();


    });
    close.on('click', (event) => {
        modal.hide();

    });
    // Get the modal
    //$(".para").eq(2).css("color","red");
    

    // Get the button that opens the modal
    

    // Get the <span> element that closes the modal
    var span = $(".close").eq(0);

    // When the user clicks on the button, open the modal
    btn.on("click", (event)=>{
        modal.style.display = "block";
    });

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }



});