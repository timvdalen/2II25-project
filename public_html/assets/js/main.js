function show_trailer(e){
	var trailer_link = $(e.target);
	var height = $("#graph").height();
	$("#graph").hide(200, function(){
		$("#embed").attr("src", trailer_link.data("link")).css("height", height + "px").show(200);
		trailer_link.text("Hide trailer").unbind().click(hide_trailer);
	});
}

function hide_trailer(e){
	$("#embed").hide(200, function(){
		$("#embed").attr("src", "about:blank");
		$("#graph").show(200);
		$("#movie-trailer").text("Show trailer").unbind().click(show_trailer);
	});
}

$(function(){
	$("#movie-trailer").click(show_trailer);
});
