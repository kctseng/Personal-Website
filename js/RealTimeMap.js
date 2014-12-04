var geocoder = new google.maps.Geocoder();
var map;
var count = 0;
var curPoint;
var points = [];
var currentWindow = null;

function addMap() {
    var latlng = new google.maps.LatLng(38.8833, -98);
    var myOptions = {
        zoom: 4,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        panControl: false,
        zoomControl: false,
        streetViewControl: false
    };
    map = new google.maps.Map($("#map")[0], myOptions);    
}

function escapeText(t) {
    return document.createTextNode(t).textContent;
}

function myBadLoadFunction(myXMLHttpRequest, myErrorMessage, myErrorThrown) {
    window.alert('status: ' + myErrorMessage + '\n' + myXMLHttpRequest.responseText);
}



function centerTo(num) {
    geocoder.geocode({address: points[num]}, function (results, status){
       if(status == google.maps.GeocoderStatus.OK) {
           map.setCenter(results[0].geometry.location);
           map.setZoom(7);

       }
        else {
        alert("Geocode was not successful for the following reason: " + status);
        }
    });
}

function goodLoadHelper () {
    if (!($(this).find("geo_facet").is(':empty')) && count < 10){
        var newHTML = "<hr></hr><div class=\"row\">";
        newHTML += "<div class=\"col-md-4 chartCell\" style=\"min-height:50px;\">";
        var titleText = escapeText($(this).find("title").text());
        var abstractText = escapeText($(this).find("abstract").text());
        var urltext = escapeText($(this).find("url:nth-child(5)").text());
        newHTML += "<b>"+titleText+"</b>";
        newHTML += "</div>";
        newHTML += "<div class=\"col-md-4 chartCell\" style=\"min-height:50px;\">";
        var place = escapeText($(this).find("geo_facet").text());
        newHTML += place;
        newHTML += "</div>";
        points[count] = place;
        curPoint = geocoder.geocode({address: place}, function(results, status){
            var marker;
            if(status == google.maps.GeocoderStatus.OK) 
            {
                marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
                });
                var contentString = "<div id=\"content\">";
                contentString += "<h1 id=\"title\">" + titleText + "</h1><br/>";
                contentString += "<a style=\"font-size:25px;\" href=\"" + urltext + "\" target=\"_blank\">" + urltext + "</a>";
                contentString += "<h3 id=\"newsAbstract\">" + abstractText + "</h3></div>";
                var infoWindow = new google.maps.InfoWindow({
                content: contentString 
            });
            google.maps.event.addListener(marker, 'click', function() {
                    if(currentWindow != null)
                    {
                        currentWindow.close();
                    }
                    infoWindow.open(map,marker);
                    currentWindow = infoWindow;
                });
            } 
            else 
            {
                alert("Geocode was not successful for the following reason: " + status);
            }
        });
        newHTML += "<button onClick=\"centerTo("+count+")\" class=\"col-md-4 btn btn-primary\">Center</button></div>"
        $("#entry").append(newHTML);
        count++;
    }
}

function myGoodLoadXML (data) {
    $(data).find("news_item").each(goodLoadHelper);
}
function myReadyFunction() {
    $.ajax({
        url: "https://students.ics.uci.edu/~kctseng/myProxy.php?http://api.nytimes.com/svc/news/v3/content/all/u.s./.xml?limit=30&offset=0&api-key=1e7ec1d8fd79bdc68eb6b5e0c27c4d4d:4:66319234",
        dataType: "xml",
        success: myGoodLoadXML,
        error: myBadLoadFunction
    });
}



$(document).ready (function () {
    addMap();
    myReadyFunction();  

    
});