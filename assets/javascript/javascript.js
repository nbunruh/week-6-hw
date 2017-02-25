var celebArr = ["Denzel Washington", "Johnny Depp", "Lady Gaga", "Justin Beiber", "Oprah", "Prince"];

// Creates some sample celebrity buttons when the page loads.
createCelebButtons();


// When the button with the ID of addCeleb is clicked, a new variable is saved as the value that the user entered
// with the excess spaces trimmed off. Then this value is pushed to the end of the celebArr array and the createCelebButtons
// function is called to create the buttons. This button is a submit type so the block will return false to stop the page
// from reloading.
$('#addCeleb').on('click', function() {
    var celebEntered = $('#celebInput').val().trim();
    celebArr.push(celebEntered);
    $('#celebInput').val('');
    createCelebButtons();

    return false;
});

$(document.body).on('click', '.button-list', function() {
    
    // This variable and its value is assigned to the name of the celeb clicked.
    var celebClicked = $(this).data('celebrities');
    
    var query = 'https://api.giphy.com/v1/gifs/search?q=' + celebClicked + '&limit=12&api_key=dc6zaTOxFJmzC';

    // Empties the celebs element so new gifs are displayed on each click of a celebs button.
    $('#celebs').empty();


    // Makes an AJAX request using the query string above.
    $.ajax({
        url: query,
        method: 'GET'

    }).done(function(response) {
        
        // Creates a new variable and assigns its value to the responses JSON data object.
        var results = response.data;

        // Runs a for loop for the results we've received. 
        for (i = 0; i < results.length; i++) {
            // Creates a new variable and adds a div with a class of col-sm-4 to it.
            var newGif = $('<div class="col-sm-4">');
            // Creates a new variable and assigns a rating from the response to it.
            var rating = results[i].rating.toUpperCase();
            // Assigns a paragraph to a new variable with the HTML of the gifs' rating.
            var p = $('<p>').html('Rating: ' + rating);
            // Assigns an img to a new variable.
            var img = $('<img>');

            
            img.attr('src', results[i].images.fixed_height_small_still.url);
            
            img.attr('data-still', results[i].images.fixed_height_small_still.url);
            
            img.attr('data-animate', results[i].images.fixed_height_small.url);
            
            img.attr('data-clicked', 'still');
            
            img.addClass('gif-margin gif center-block panel');

            newGif.append(p);
            newGif.append(img);
           
            $('#celebs').append(newGif);
        }
    });
});

// When an element with the gif class is clicked, the element's img src link that was clicked is replaced with either the 
// animated gif or still img and the data-clicked value is given the corresponding value.
$(document.body).on('click', '.gif', function() {
    var click = $(this).attr('data-clicked');

    if (click === 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-clicked', 'animated');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-clicked', 'still');
    }
});

function createCelebButtons() {
    $('#celebButtons').empty();

    for (var i = 0; i < celebArr.length; i++) {
        var button = $('<button>').addClass('btn btn-primary button-list');
        button.attr('data-celebrities', celebArr[i]).html(celebArr[i]);
        $('#celebButtons').append(button);
    }
}