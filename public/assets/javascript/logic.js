$(window).on("load", () => {
    const modal = $(".post-comm");
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

        $.ajax({
            type: "GET",
            url: "/comment/" + _id
        }).then((result) => {
            console.table(result.comments);
            commThread.show();

            let commentString =
                `<div class='comment shadowed'>
                                <p><strong>${result.comments.username}</strong><br></p>
                                <p class='bod'>${result.comments.body}</p>
                            </div>`;
            $(commentString).appendTo(".comment-zone");



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
        let _id = modal.data("id");
        let comment = {
            username: $("#name").val(),
            body: $("#user-comment-form").val()
        }
        $.ajax({
            type: "POST",
            url: "/comment/" + _id,
            data: comment
        }).then((result) => {
            $("#user-comment-form").val("")
            $("#name").val("");
            modal.hide();
        })

    });

});

function scrape() {
    $.get("/scrape", () => {
        console.log('scraped for new data');
    })
}