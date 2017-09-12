$(() => {
    var next = $("#next");
    var prev = $("#prev");

    next.click(() => {
        nextPage();
    });

    prev.click(() => {
        prevPage();
    });
});

function nextPage(){
    $.ajax({
        type: "POST",
        url: "/next",
        data: {data: "next page"},
        success: "yey"
      });
}

function prevPage(){
    $.ajax({
        type: "POST",
        url: "/prev",
        data: {data: "[rev] page"},
        success: "yey"
      });
}