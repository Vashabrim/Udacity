
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!
    var street = $('#street').val();
    var cityStr = $('#city').val();
    var address = street + ', ' + cityStr;

    $greeting.text('So, you want to live at ' + address + '?');

    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
    $body.append('<img class = "bgimg" src="' + streetviewUrl + '">');

    //NY Times stuffts
    var nytimesUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityStr + '&sort=newest&api-key=9f6851444491fe0eecf86e1d8bfd723d:0:73785537'
    $.getJSON(nytimesUrl, function(data){
        $nytHeaderElem.text('New York Times articles about ' + cityStr);

        articles = data.response.docs;
        for (var i = 0; i <articles.length; i++) {
            var article = articles[i];
            $nytElem.append('<li class="article">'+'<a href="'+article.web_url+'">'+article.headline.main+'</a>'+'<p>' + article.snippet + '</p>'+'</li>');
        };
    })

    return false;
};

$('#form-container').submit(loadData);
