$(function(){
	$("#movie-trailer").click(function(){
		var trailer = $(this);
		$("#graph").hide(200, function(){
			$("#embed").attr("src", trailer.data("trailer")).show(200);
		});
	});
});
