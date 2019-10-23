$(window).on("load", () => {
    const modal = $(".post-comm");
    const modals = $(".modal");
    const commThread = $(".view-comm");
    const commView = $(".read-comments");
    const btn = $(".comment-btn");
    const close = $(".modal-close");
    const submiter = $(".post-button");
    modal.hide();
    commThread.hide();

    btn.on('click', function () {
        modal.data("id", $(this).data("id"));
        modal.show();
    });
    commView.on('click', function () {
        let _id = $(this).data("id");
        commThread.show();
        $.ajax({
            type: "GET",
            url: "/comment/"+_id
        }).then((result) => {
                    console.table(result);
                    result.forEach(i => {
                        let commentString =
                            `<div class='comment'>
                                <p><strong>${i.username}</strong><br></p>
                                <p class='bod'>${i.body}</p>
                            </div>`;
                        $(commentString).appendTo(".comment-zone");
                    });

            });

    }); 
    $(".view-close").on('click', () => {
        commThread.hide();
        $(".comment-zone").empty();
    });
    
    close.on('click', (event) => {
    modal.hide();
    });
    submiter.on('click', (event) => {
        event.preventDefault();
        //also need post id
        let _id = modal.data("id");
        console.log(_id);
        let comment = {
            username: $("#name").val(),
            body: $("#user-comment-form").val()
        }
        console.table(comment);
        $.ajax({
            type: "POST",
            url: "/comment/"+_id,
            data: comment
        }).then(() => {
            modal.hide();
        })
    
    });

});

function scrape() {
    $.get("/scrape", () => {
        console.log('scraped for new data');
    })
}