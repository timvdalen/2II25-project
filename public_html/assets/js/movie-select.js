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

function MultipleCallback(_data, _callback, _num){
	this.data = _data;
	this.callback = _callback;
	this.count = 0;
	this.num = _num;
	
	this.call = function(){
		this.count++;
		
		if(this.count >= this.num){
			this.callback(this.data);
		}
	}
}

function addMovieAndRelated(title, callback){
	$.ajax({
		dataType: "json",
		url: "/ajax/getRelatedMovies.php?m=" + title,
		context: { cb: callback },
		success: function(data){
			//The hard part is over, do the callback now, for simplicity
			this.cb();
			for(var i = 0; i < data.length; i++){
				var callback, img1, img2;
				//Prepare the images
				img1 = jQuery("<img>").attr("src", data[i].firstMovie.poster);
				img2 = jQuery("<img>").attr("src", data[i].secondMovie.poster);
				
				//Set up callback
				callback = new MultipleCallback({
					data: data[i],
					imgs: [img1, img2]
				}, function(data){
					var node1, node2, edge;
				
					node1 = new Node(data.data.firstMovie, data.imgs[0][0], Math.random()*$("#graph").width(), Math.random()*$("#graph").height(), 50);
					node2 = new Node(data.data.secondMovie, data.imgs[1][0], Math.random()*$("#graph").width(), Math.random()*$("#graph").height(), 50);
					
					edge = new Edge(node1, node2, data.data.relation.weight);
					
					graph.addEdge(edge);
					graph.fix(node1);
					render();
				}, 2);
				
				img1.load({c: callback}, function(e){
					e.data.c.call();
				});
				img2.load({c: callback}, function(e){
					e.data.c.call();
				});
			}
		}
	});
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
		$("#btn-add-movie-icon").removeClass("icon-add").addClass("icon-spin icon-spinner");
		addMovieAndRelated(data.title, function(){
			$("#btn-add-movie-icon").removeClass("icon-spin icon-spinner").addClass("icon-add");
		});
		var img = jQuery("<img>").attr("src", data.poster).load({
			movie: data,
		}, function(e){
			var node = new Node(e.data.movie, $(this)[0], Math.random()*$("#graph").width(), Math.random()*$("#graph").height(), 50);
			graph.addWithoutEdge(node);
			render();
		});
	});
});
