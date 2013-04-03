<?php
	/*
	 * Outputs the modal for the Trakt importer
	 */
	class TraktImporter extends ImporterModal{
		/*
		 * Importer ID
		 * @var string $ID
		 */
		protected $ID = "trakt";
		
		/*
		 * Importer source
		 * @var string $source
		 */
		protected $source = "Trakt";
	
		/*
		 * Importer body HTML
		 * @var string $body
		 */
		protected $body = <<<ENDBODY
		<form class="form-inline" action="">
			<div id="trakt-controls" class="input-append control-group">
				<input id="trakt-username" type="text" placeholder="Username (must be public)" class="input-block-level">
				<button id="trakt-getmovies" class="btn btn-primary" type="submit">Get movies</button>
			</div>
		</form>
		<div id="trakt-movies">
			<i id="trakt-loader" class="icon-spinner icon-spin icon-2x"></i>
			<ul id="trakt-movies-list" class="media-list">
				
			</ul>
		</div>
		<style text="text/css">
			#modalBody-trakt #trakt-username{
				width: 415px;
			}
			
			#modalBody-trakt #trakt-getmovies{
				width: 110px;
			}
			
			#modalBody-trakt #trakt-loader{
				display: none;
				width: 1em;
				margin-left: auto;
				margin-right: auto;
				font-size: 40px;
			}
		</style>
		<script type="text/javascript">
			$(function(){
				$("#trakt-username").bind("keydown", function(event){
					var keycode = (event.keyCode ? event.keyCode : (event.which ? event.which : event.charCode));
					if(keycode == 13){
						$("#trakt-getmovies").trigger("click");
						return false;
					}else{
						$("#trakt-controls").removeClass("warning");
						return true;
					}
				});
				$("#trakt-username").bind("focus", function(event){
					$("#trakt-controls").removeClass("warning");
				});
				$("#trakt-getmovies").click(function(){
					var username = $("#trakt-username").val();
					if(username == ""){
						$("#trakt-controls").addClass("warning");
					}else{
						$("#trakt-loader").css("display", "block");
						$("#trakt-movies").animate({
							height: 300
						}, function(){
							$(this).css('overflow-y', 'scroll');
						});
						$.getJSON("/ajax/importers/trakt.php?user=" + username, function(data){
							for(var i=0; i<data.length; i++){
								var m, item, checkbox, imageholder, image, mediabody, title, description;
								
								m = data[i];
								
								item = jQuery("<li>");
								item.addClass("media");
								
								checkbox = jQuery("<input>").attr("type", "checkbox").prop("checked", true);
								checkbox.addClass("pull-left");
								
								imageholder = jQuery("<div>");
								imageholder.addClass("pull-left");
								
								image = jQuery("<img>");
								image.addClass("media-object");
								image.css("width", 100);
								
								mediabody = jQuery("<div>");
								mediabody.addClass("media-body");
								
								title = jQuery("<h4>");
								title.addClass("media-heading");
								
								description = jQuery("<p>");
								
								title.text(m.title);
								image.attr("src", m.images.poster);
								description.text(m.overview);
								
								mediabody.append(title).append(description);
								imageholder.append(image);
								item.append(checkbox).append(imageholder).append(mediabody);
								
								item.css("cursor", "pointer");
								item.click(function(){
									var checkbox = $(this).find("input");
									checkbox.prop("checked", !checkbox.prop("checked"));
								});
								
								$("#trakt-movies-list").append(item);
								
								checkbox.css("margin-top", item.height()/2 - 20);
							}
							$("#trakt-loader").css("display", "none");
						});
					}
					return false;
				});
				$("#importerModaltrakt .toggle").click(function(){
					$("#trakt-movies-list input").prop("checked", !$("#trakt-movies-list input:first").prop("checked"));
				});
				$("#importerModaltrakt .import").click(function(){
					$("#importerModaltrakt .importer-progress").css("visibility", "visible");
					var selected = $("#trakt-movies-list input:checked").parent().find("h4");
					$("#importerModaltrakt .importer-progress .bar").data("total", selected.length - 1).data("done", 0).css("width", "0%");
					for(var i=0; i<selected.length; i++){
						addMovieAndRelated($(selected[i]).text(), function(){
							$("#importerModaltrakt .importer-progress .bar").data("done", $("#importerModaltrakt .importer-progress .bar").data("done") + 1).css("width", ($("#importerModaltrakt .importer-progress .bar").data("done")/$("#importerModaltrakt .importer-progress .bar").data("total"))*100 + "%");
							//Automatically dismiss when we're almost done
							if(($("#importerModaltrakt .importer-progress .bar").data("total") - $("#importerModaltrakt .importer-progress .bar").data("done") < 5)){
								$("#importerModaltrakt").modal('hide');
							}
						});
					}
				});
			});
		</script>
ENDBODY;

		/*
		 * Icon for this Importer
		 * @var string $icon
		 */
		protected $icon = "icon-film";
	}
	
?>
