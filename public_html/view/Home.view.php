<?php
	include("model/Movie.class.php");

	/*
	 * Outputs the main page
	 */
	class Home extends View{
		/*
		 * Selected movie
		 * @var Movie $selected
		 */
		public $selected;
	
		/*
		 * Constructs the Home page
		 *
		 * @param array $arguments
		 *  Contains the arguments for this page
		 */
		function __construct($arguments){
			$this->selected = new Movie(0, 0, 
				"The Hangover Part III (2013)", 
				"http://cdn1.screenrant.com/wp-content/uploads/The-Hangover-3-Poster-Harry-Potter-570x844.jpg", 
				"This time, there's no wedding. No bachelor party. What could go wrong, right? But when the Wolfpack hits the road, all bets are off.",
				"http://youtube.com/watch?v=IL_g4yY0qnc");
		}
		
		/*
		 * Renders the Home page
		 *
		 * @retval string
		 *  HTML representation of the Home page
		 */
		public function render(){
			$content = <<<ENDHTML
<div class="row-fluid">
	<div id="main-pane" class="span9">
		<canvas id="graph"></canvas>
		<iframe id="embed" seamless></iframe>
		<script type="text/javascript" src="assets/js/canvas.js"></script>
	</div>
	<div id="movie-info" class="span3 well">
		<h4 id="movie-title">
			{$this->selected->title}
		</h4>
		<div id="movie-image" class="row-fluid">
			<div class="span8 offset2">
				<img src="{$this->selected->poster}"></img>
			</div>
		</div>
		<p id="movie-overview">
			{$this->selected->overview}
		</p>
ENDHTML;
			if($this->selected->trailer_link != ""){
				$content .= "<a id='movie-trailer' data-link='{$this->selected->trailer_link}'>Watch trailer</a>";
			}
			$content .= <<<ENDHTML
	</div>
</div>
ENDHTML;

			return $content;
		}
	}
?>	