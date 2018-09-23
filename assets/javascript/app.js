

var topics = ["world of warcraft", "counter strike", "overwatch", "elder scrolls", "league of legends", "mortal combat", "runescape", "super mario", "legend of zelda", "call of duty"]

console.log(topics);

function renderBtn() {

    $(".buttons").empty();

    for (var i = 0; i < topics.length; i++) {
        $(".buttons").append($("<button>").attr("value", topics[i]).attr("data-game", topics[i]).addClass("button").text(topics[i]));
    
        
    }
}

renderBtn();

function displayGif() {
    var game = $(this).attr("data-game");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + game + "&api_key=LZy09xs9hO9OKBfwXv4kkEvTSlmeW2Xe&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            var results = response.data;
            $(".gif").on("click", function gif() {
                var state = $(this).attr("data-state");
                
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                  } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                  }
            });

            for (var i = 0; i < results.length; i++) {


                var gifDiv = $("<div class='item'>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating)
                var gameImage = $("<img>").attr("data-still", results[i].images.fixed_height_still.url).attr("data-animate", results[i].images.fixed_height.url).attr("data-state", "still").addClass("gif");
                gameImage.attr("src", results[i].images.fixed_height_still.url)
                gifDiv.prepend(p);
                gifDiv.prepend(gameImage);
                $("#images").prepend(gifDiv);
            }
            
            $(".gif").on("click", function () {
                var state = $(this).attr("data-state");
                
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                  } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                  }
            });
           
           
        });
        
}

// 
// 
// Creates new buttons  
// 
// 

$("#searchBtn").on("click", function (event) {
    event.preventDefault();
    var inputGame = $("#searchBar").val().trim().toLowerCase();

    topics.push(inputGame);
    
    renderBtn();
    $("#searchBar").val("");
    console.log(topics);
});



$(document).on("click", ".button", displayGif);







