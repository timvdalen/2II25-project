<?php
	/*
	 * Outputs the main page
	 */
	class Home extends View{
		/*
		 * Constructs the Home page
		 *
		 * @param array $arguments
		 *  Contains the arguments for this page
		 */
		function __construct($arguments){}
		
		/*
		 * Renders the Home page
		 *
		 * @retval string
		 *  HTML representation of the Home page
		 */
		public function render(){
			$selected = $this->selected[0];
			
			$modals = array();
			$modals[] = new FacebookImporter(array());
			$modals[] = new TraktImporter(array());
		
			$content = <<<ENDHTML
<div class="row-fluid">
	<div id="main-pane" class="span9">
		<div id="movie-controls">
			<div class="btn-group pull-right">
                <button id="btn-add-movie" class="btn btn-success"><i id="btn-add-movie-icon" class="icon-plus icon-large"></i>Add</button>
                <button class="btn btn-success dropdown-toggle" data-toggle="dropdown"><span class="caret"></span></button>
                <ul class="dropdown-menu">
ENDHTML;

			foreach($modals as $modal){
				$content .= $modal->renderButton();
			}

			$content .= <<<ENDHTML
                </ul>
              </div>
			<input id="add-movie-input" type="hidden" style="width: 40%;">
		</div>
		<canvas id="graph"></canvas>
		<iframe id="embed" seamless></iframe>
		<script type="text/javascript" src="assets/js/canvas.js"></script>
		<script type="text/javascript" src="assets/js/Movie.class.js"></script>
		<script type="text/javascript" src="assets/js/Node.class.js"></script>
		<script type="text/javascript" src="assets/js/Edge.class.js"></script>
		<script type="text/javascript" src="assets/js/Tree.class.js"></script>
		<script type="text/javascript" src="assets/js/Visualisation.class.js"></script>
		<script type="text/javascript" src="assets/js/Graph.class.js"></script>
	</div>
	<div id="movie-info" class="span3 well">
		<h4 id="movie-title"></h4>
		<div class="row-fluid">
			<div class="span8 offset2">
				<img id="movie-image"></img>
			</div>
		</div>
		<p id="movie-overview"></p>
		<a id="movie-trailer"></a>
	</div>
</div>
<script src="assets/js/movie-select.js"></script>
<div id="images_preload"></div>
ENDHTML;
			
			foreach($modals as $modal){
				$content .= $modal->render();
			}

			return $content;
		}
	}
?>
