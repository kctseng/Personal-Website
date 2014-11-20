$(document).ready(function () {
    $("#BlogBox").hide();
    $("#ClassBox").hide();
    $("#ProjectBox").hide();
    $("#ThoughtsBox").hide();
    $(".AboutMeBox").load("about.html");
    
    $("#Classes").click(function () {
        $(".box").fadeOut();
        $("#ClassBox").delay(400).fadeIn();
    });
    $("#AboutBtn").click(function () {
        $(".box").fadeOut();
        $("#AboutBox").delay(400).fadeIn();  
        $(".AboutMeBox").load("about.html");
    });
    $("#BlogBtn").click(function () {
        $(".box").fadeOut();
        $("#BlogBox").delay(400).fadeIn();
        $(".BlogPostBox").load("blog.html #BlogSection");
    });
    $("#RandomNoteBtn").click(function () {
        $(".BlogPostBox").load("blog.html #randomNoteSection");
    });
    
    $("#BlogPostBtn").click(function () {
        $(".BlogPostBox").load("blog.html #BlogSection");
    });
    
    $("#ProjectBtn").click(function () {
        $(".box").fadeOut();
        $("#ProjectBox").delay(400).fadeIn();
    });
});