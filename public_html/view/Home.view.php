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
				"This time, there's no wedding. No bachelor party. What could go wrong, right? But when the Wolfpack hits the road, all bets are off.");
		}
		
		/*
		 * Renders the Home page
		 *
		 * @retval string
		 *  HTML representation of the Home page
		 */
		public function render(){
			$content = <<<ENDHTML
<div class = "row-fluid">
	<div class = "span9">

	</div>
	<div id = "movie-info" class = "span3 well">
		<h4>
ENDHTML;
			$content .= $this->selected->title;
			$content .= <<<ENDHTML
		</h4>
		<div class = "row-fluid">
			<div class = "span8 offset2">
				<img src = {$this->selected->poster}></img>
			</div>
		</div>
		<div>
ENDHTML;
			$content .= $this->selected->overview;
			$content .= <<<ENDHTML
		</div>
	</div>
</div>
ENDHTML;

			return $content;
		}
	}
?>	