var topics = ["Gum", "Bubbles"]


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
        $(".img-content").empty();
        var results = response.data;

        for (var i = 0; i < results.length; i++)
        {
            var still = results[i].images.fixed_height_still.url
            var animated = results[i].images.fixed_height.url

            var gifDiv = $("<div class='item'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var topicImage = $("<img>");
            topicImage.attr("src", still);
            topicImage.attr("data-still", still);
            topicImage.attr("data-animate", animated);
            topicImage.attr("data-state", "still");
            topicImage.attr("class", "gif");

            gifDiv.append(p);
            gifDiv.prepend(topicImage);

            $(".img-content").prepend(gifDiv);
        }
    });

}

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

