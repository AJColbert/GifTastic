var topics = ["Felix the cat", "Bugs Bunny", "Elmer Fudd", "Popeye", "Huckleberry Hound", 
"Marvin the Martian", "Tom and Jerry", "Foghorn Leghorn", "Daffy Duck",
"Casper", "Tasmanian Devil", "Chilly Willy", "Wile E. Coyote", "Goofy", "Tweety Bird", "Porky Pig"]


var renderButtons = function (array)
{
    console.log("renderbuttons");
    $(".button-container").empty();
    for (var i = 0; i < array.length; i++)
    {
        console.log(array[i])
        var btn = $("<button>");
        btn.attr("class", "btn btn-info button-topic");
        btn.attr("data-name", array[i])
        btn.text(array[i]);
        $(".button-container").append(btn);

    }
}

//Ajax call to topic API 
var GetTopic = function ()
{
    var topic = $(this).attr("data-name");
    var APIKEY = "7BIoyA61fIrGPJU1gIMkkFh0QcbRqQCu";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        topic + "&api_key=" + APIKEY + "&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response)
    {
        //Confirm asking add to list if true don't empty if false empty
        $(".img-content").empty();

        var results = response.data;

        for (var i = 0; i < results.length; i++)
        {
            var still = results[i].images.fixed_height_still.url
            var animated = results[i].images.fixed_height.url

            var gifDiv = $("<div class='item'>");
            var rating = results[i].rating;
            var title = results[i].title;

            var p = $("<p>").text("Rating: " + rating);
            if(title === "")
            {
                title = "Unknown"
            }
            var t = $("<p>").text("Title: " + title);

            var topicImage = $("<img>");
            topicImage.attr("src", still);
            topicImage.attr("data-still", still);
            topicImage.attr("data-animate", animated);
            topicImage.attr("data-state", "still");
            topicImage.attr("class", "gif");

            var downloadImage = $("<img>");
            downloadImage.attr("src", "assets/images/download.png");
            downloadImage.attr("class", "download-img");

            gifDiv.append(t);
            gifDiv.append(p);
            gifDiv.append(downloadImage);
            gifDiv.prepend(topicImage);



            $(".img-content").prepend(gifDiv);
        }
    });

}

$(".img-content").on("click", ".gif", function ()
{
    var state = $(this).attr("data-state");
    console.log(state);
    if (state === "still")
    {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate")
    }
    else if (state === "animate")
    {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still")
    }
});

$("#add-topic").on("click", function (event)
{
    event.preventDefault();

    // This line grabs the input from the textbox
    var topic = $("#newtopic").val().trim();

    // The topic from the textbox is then added to our array
    topics.push(topic);

    // Calling renderButtons which handles the processing of our Topics array
    renderButtons(topics);

});

$(document).on("click", ".button-topic", GetTopic);


//Inital Button Render
renderButtons(topics);

