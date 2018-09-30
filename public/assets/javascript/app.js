var data, i, uid, deleteButtonID;
// Loads results onto the page
function getArticles() {

    $("#container-body").empty();

    $.getJSON("/all", function(data) {
        console.log(data);
        // populate into the container-body such that each article appears like:
        /* <div class="row justify-content-center">
            <div class="col-sm-10">
                <div class="row">
                    <div class="col-sm-4">
                        <img class="img-fluid" src="<image link>" alt="Card image cap">
                    </div>
                    <div class="col-sm-8">
                        <div class="article-short-text">
                            <h5><article title></h5>
                            <p><Text of article></p>
                        </div>
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalLong">Read Full Article</button>
                    </div>
                </div>
            </div>
        </div> */

        for (i in data) {
            $("#container-body").append(
                $("<div>").addClass("row justify-content-center").append(
                    $("<div>").addClass("col-sm-10 article-row").append(
                        $("<div>").addClass("row").append(
                            $("<div>").addClass("col-sm-4").append(
                                $("<img>").addClass("img-fluid").attr(
                                    {
                                        "src":data[i].picUrl,
                                        "alt":"Article Image"
                                    }
                                )
                            )
                        ).append(
                            $("<div>").addClass("col-sm-8 text-justify").append(
                                $("<div>").addClass("article-short-text").append(
                                    $("<h5>").text(data[i].title)
                                ).append(
                                    $("<p>").text(data[i].articleContent[0])
                                )
                            ).append(
                                $("<button>").addClass("btn btn-light article-button float-right").text("Read Full Article").attr(
                                    {
                                        "type":"button",
                                        "data-id":data[i]["_id"],
                                        "data-toggle":"modal",
                                        "data-target":"#modalLong"
                                    }
                                )
                            )
                        )
                    )
                )
            );
        }
    });
}

// Runs the getArticles function as soon as the script is executed
getArticles();


// {
//     "userName": req.body.userName,
//     "userPIN": req.body.userPIN,
//     "userComment": req.body.userComment,

// Populates modal with full article
$(document).on('click', '.btn', function(){
    // get uid of article from id of button pressed

    uid = $(this).attr("data-id");
    console.log("uid");
    console.log(uid);
    
    if ($(this).attr("id")){
        if ($(this).attr("id")=="comment-button"){
            console.log("clicked on comment submit button");
            $.ajax({
                type: "POST",
                url: "/comment/" + uid,
                data: {
                    userName: $("#name-input").val(),
                    userPIN: $("#pin-input").val(),
                    userComment: $("#comment-input").val(),
                },
            
                complete: function(response) {
                    fillModal(uid);
                }
            });

        } else {
            console.log("clicked on a delete comment button");
            
            deleteButtonID = $(this).attr("id").replace("delete-button","");
            console.log("deleteButtonID");
            console.log(deleteButtonID);
            deleteCommentPIN = $("#delete-pin"+deleteButtonID).val();

            $.ajax({
                type: "POST",
                url: "/delete/" + uid,
                data: {
                    deleteButtonID:deleteButtonID,
                    deleteCommentPIN:deleteCommentPIN,
                    dataID:$(this).attr("data-id")
                },
                complete: function(response) {
                    fillModal(uid);
                }
            });
            $("#delete-pin"+i).val("");
        }
    } else {
        console.log("clicked on read full article button");
        $("#comment-button").attr("data-id",uid);
        $("form").attr("action",$("form").attr("action")+"/"+uid);
        fillModal(uid);
    }

    
    
});

function fillModal (uid){
    $.getJSON("/article/"+uid, function(data) {
        console.log("data");
        console.log(data);
        $("#modalLongTitle").text(data[0].title);//maybe turn this into a link to the actual site???
        $("#modalLongPic").attr("src",data[0].picUrl);
        $("#modalLongAuthor").text(data[0].author);
        $("#modalLongDate").text(data[0].publishDateForDisplay);
        $("#article-full-text").empty();
        for (i in data[0].articleContent){
            $("#article-full-text").append(
                $("<p>").text(data[0].articleContent[i])
            );
        }
        
        $("#comments").empty();
        if (data[0].comments.length==0){
            $("#comments").append(
                $("<div>").addClass("row comment-row").append(
                    $("<div>").addClass("col-sm-12").text("No comments yet...")
                )
            )
        } else {

            // <div id="comment0" class="row">
            //     <div class="col-sm-10">text</div>
            //     <div class="col-sm-2">
            //         <input type="text">
            //         <button></button>
            //     </div>
            // </div>

            for (i in data[0].comments){
                $("#comments").append(
                    $("<div>").attr("id","comment"+i).addClass("row comment-row").append(
                        $("<div>").addClass("col-sm-9").append(
                            $("<span>").text(data[0].comments[i].userName+": ")
                        ).append(
                            $("<span>").text(data[0].comments[i].userComment)
                        )
                        
                    ).append(
                        $("<div>").attr("id","delete"+i).addClass("col-sm-2").append(
                            $("<input>").attr({
                                "id":"delete-pin"+i,
                                "placeholder":"PIN"
                            }).addClass("form-control w-60")
                        )

                    ).append(
                        $("<div>").addClass("col-sm-1").append(
                            $("<button>").attr({
                                "id":"delete-button"+i,
                                "data-id":uid
                            }).addClass("btn btn-danger delete-button float-right").text("X")
                        )

                    )
                );
            }
        }
        
        $("input").val("");
    });
}

