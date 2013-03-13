function movieFormatResult(movie) {
	var markup = "<table class='movie-result'><tr>";
	markup += "<td class='movie-image'><img src='" + movie.poster + "'/></td>";
	markup += "<td class='movie-info'><div class='movie-title'>" + movie.title + "</div>";
	markup += "<div class='movie-synopsis'>" + movie.overview + "</div>";
	markup += "</td></tr></table>";
	return markup;
}

function movieFormatSelection(movie) {
	return movie.title;
}

$(function(){
	$("#add-movie-input").select2({
		placeholder: "Search for a movie",
		minimumInputLength: 1,
		ajax: {
			url: "ajax/getMovies.php",
			dataType: 'json',
			data: function (term, page) {
				return{
					q: term,
				};
			},
			results: function (data, page) {
				return {results: data};
			}
		},
		initSelection: function(element, callback) {
			console.log(element);
		},
		formatResult: movieFormatResult,
		formatSelection: movieFormatSelection,
		containerCssClass: "pull-right movie-select-bar",
		escapeMarkup: function (m) { return m; }
	});
	$("#btn-add-movie").click(function(){
		var data = $("#add-movie-input").select2("data");
		var img = jQuery("<img>").attr("src", data.poster).load({
			movie: data,
		}, function(e){
			var node = new Node(e.data.movie, $(this)[0], Math.random()*$("#graph").width(), Math.random()*$("#graph").height(), 50);
			graph.nodes.push(node);
			graph.edges.push(new Edge(node, graph.nodes[0], 3));
			graph.reconstruct()
			render();
		});
		$("#images_preload").append(img);
	});
});
