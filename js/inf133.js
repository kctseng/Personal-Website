
function escapeText(t) {
    return document.createTextNode(t).textContent;
}

function myBadLoadFunction(myXMLHttpRequest, myErrorMessage, myErrorThrown) {
    window.alert('status: ' + myErrorMessage + '\n' + myXMLHttpRequest.responseText);
}

function goodLoadHelper() {
    if (!($(this).find("geo_facet").is(':empty'))){
        var newHTML = "<hr></hr><div class=\"row\">";
        newHTML += "<div class=\"col-md-4 chartCell\" style=\"min-height:100px;\">";
        newHTML += escapeText($(this).find("title").text());
        newHTML += "</div>";
        newHTML += "<div class=\"col-md-4 chartCell\" style=\"min-height:100px;\">";
        newHTML += escapeText($(this).find("geo_facet").text());
        newHTML += "</div>";
        newHTML += "<div class=\"col-md-4 chartCell\" style=\"min-height:100px;\">";
        newHTML += escapeText($(this).find("published_date").text());
        newHTML += "</div></div>";
        $("#DisplayDataHere").append(newHTML);
    }
}

function myGoodLoadXML(data) {
    $(data).find("news_item").each(goodLoadHelper);
}

function myGoodLoadJsonp(data) {
    for (var i = 0; i< data.data.length; i++)
    {
        var loca = data.data[i].location;
        if (loca && loca.latitude && loca.longitude)
        {
            var newHTML = "<hr></hr><div class=\"row\">";
            newHTML += "<div class=\"col-md-4 chartCell\" style=\"min-height:100px;\"><br/><br/><br/><br/>";
            newHTML += "Latitude: " + loca.latitude + "<br/>";
            newHTML += "Longitude: " + loca.longitude + "<br/>";          
            newHTML += "</div>";
            newHTML += "<div class=\"col-md-4 chartCell\" style=\"min-height:100px;\"><br/><br/><br/><br/>";
            newHTML += data.data[i].user.username;
            newHTML += "</div>";
            newHTML += "<image class=\"col-md-4 chartCell\" style=\"min-height:100px;\" src=\"";
            newHTML += data.data[i].images.low_resolution.url + "\">";
            newHTML += "</div><br/><br/>";
            $("#InstagramDisplay").append(newHTML);
        }
    }
}

function myGoodLoadJson(data)
{
    var item = data.response.groups[0].items;
    for (var i = 0; i<item.length; i++)
    {
        var newHTML = "<hr></hr><div class=\"row\">";
        newHTML += "<div class=\"col-md-2 chartCell\" style=\"min-height:150px;\">";
        newHTML += item[i].venue.name;        
        newHTML += "</div>";
        newHTML += "<div class=\"col-md-4 chartCell\" style=\"min-height:150px;\">";
        newHTML += item[i].venue.location.formattedAddress;    
        newHTML += "</div>";
        newHTML += "<div class=\"col-md-6 chartCell\" style=\"min-height:150px;\">";
        newHTML += item[i].tips[0].text;  
        newHTML += "</div></div><br/><br/>";
        $("#FourSquareDisplay").append(newHTML);
    }
}

function myReadyFunction() {
    $.ajax({
        url: "https://students.ics.uci.edu/~kctseng/myProxy.php?http://api.nytimes.com/svc/news/v3/content/all/u.s./.xml?limit=30&offset=0&api-key=1e7ec1d8fd79bdc68eb6b5e0c27c4d4d:4:66319234",
        dataType: "xml",
        success: myGoodLoadXML,
        error: myBadLoadFunction
    });
    $.ajax({
        url: "https://api.instagram.com/v1/media/popular?client_id=333bb4cb03f94f28abb9652b66ac1fb9",
        dataType: "jsonp",
        success: myGoodLoadJsonp,
        error: myBadLoadFunction
    });
    $.ajax({
        url: "https://students.ics.uci.edu/~kctseng/myProxy.php?https://api.foursquare.com/v2/venues/explore?near=chicago&client_id=T25LWF2P1VHO0YQADLISITPQU1YN0HZ34GRK3N4SAO5LMF34&client_secret=4BYAFSFX2U1M2FWYSIXIQI3DV1E0JN41EPTZXQIAJPAPEHI0&v=20140806&m=foursquare",
        dataType: "json",
        success: myGoodLoadJson,
        error: myBadLoadFunction
    });
}

$(document).ready(function () {
    myReadyFunction();  
});