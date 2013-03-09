$(function(){
	$("#movie-trailer").click(function(){
		var trailer = $(this);
		var height = $("#graph").height();
		$("#graph").hide(200, function(){
			$("#embed").attr("src", trailer.data("link")).css("height", height + "px").show(200);
		});
	});
});
