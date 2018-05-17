var topics = ["Felix the cat", "Bugs Bunny", "Elmer Fudd", "Popeye", "Huckleberry Hound",
    "Marvin the Martian", "Tom and Jerry", "Foghorn Leghorn", "Daffy Duck",
    "Casper", "Tasmanian Devil", "Chilly Willy", "Wile E. Coyote", "Goofy", "Tweety Bird", "Porky Pig"]

//Render all buttons from Array Topics
var renderButtons = function (array)
{
    $(".button-container").empty();
    for (var i = 0; i < array.length; i++)
    {
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
        //Save Response Data Object reference into new variable
        var results = response.data;
        //Render Card with all content
        for (var i = 0; i < results.length; i++)
        {
            var still = results[i].images.fixed_height_still.url
            var animated = results[i].images.fixed_height.url
            //Card Div
            var gifDiv = $("<div class='item card card-default'>");
            var rating = results[i].rating;
            var title = results[i].title;

            //Gif Card Body Div
            var gifBodyDiv = $("<div class='card-body'>");

            //Add Rating
            var p = $("<p>").text("Rating: " + rating);
            if (title === "")
            {
                title = "Unknown"
            }
            var t = $("<p>").text("Title: " + title);


            //Creating gif and
            var topicImage = $("<img>");
            topicImage.attr("src", still);
            topicImage.attr("data-still", still);
            topicImage.attr("data-animate", animated);
            topicImage.attr("data-state", "still");
            topicImage.attr("class", "gif");

            //download image
            var downloadImage = $("<img>");
            downloadImage.attr("src", "assets/images/download.png");
            downloadImage.attr("class", "download-img");

            //Add Favourite image
            var favImage = $("<img>");
            favImage.attr("src", "assets/images/add-button.png");
            favImage.attr("class", "fav-img");

            //Add to Card Body 
            gifBodyDiv.append(t);
            gifBodyDiv.append(p);
            gifBodyDiv.append(downloadImage);
            gifBodyDiv.append(favImage);
            //add Card Body to main card
            gifDiv.append(gifBodyDiv);

            //append New Div to Html section
            gifDiv.prepend(topicImage);

            $(".img-content").prepend(gifDiv);
        }
    });
}

// Pause or UnPause Gif by checking data-state attribute and changing source
$(".img-content").on("click", ".gif", function ()
{
    var state = $(this).attr("data-state");

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
//Onclick for Tpic Button
$(document).on("click", ".button-topic", GetTopic);

//Clone Card and contents and add it to favourites section
$(".img-content").on("click", ".fav-img", function ()
{
    var card = $(this).closest(".card");
    var x = card.clone();

    x.find(".fav-img").attr("src", "assets/images/minus-button.png");
    x.find(".fav-img").attr("class", "delete-img");
    x.appendTo($(".fav-content"));
});

//Download Image On Click
$(document).on("click", ".download-img", function ()
{
    var xhr = new XMLHttpRequest();
    var gif = $(this).parent().siblings();//Identifies gif to look at
    xhr.open("GET", gif.attr("data-animate"), true);
    xhr.responseType = "blob";
    xhr.onload = function ()
    {
        var urlCreator = window.URL;
        var imageUrl = urlCreator.createObjectURL(this.response);
        var tag = document.createElement('a');
        tag.download = "giphy.gif";
        tag.href = imageUrl;
        document.body.appendChild(tag);
        tag.click();
        document.body.removeChild(tag);
    }
    xhr.send();
});

$(".fav-content").on("click", ".delete-img", function ()
{
    var card = $(this).closest(".card")
    card.remove();
});


//Inital Button Render
renderButtons(topics);

