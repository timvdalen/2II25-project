<?php
	include("model/Movie.class.php");

	/*
	 * Outputs the main page
	 */
	class Home extends View{
		/*
		 * Selected movies
		 * @var array $selected
		 */
		public $selected;
	
		/*
		 * Constructs the Home page
		 *
		 * @param array $arguments
		 *  Contains the arguments for this page
		 */
		function __construct($arguments){
			$this->selected = array();
			$this->selected[] = new Movie("tt0", 0, 
				"The Hangover Part III (2013)", 
				"http://cdn1.screenrant.com/wp-content/uploads/The-Hangover-3-Poster-Harry-Potter-570x844.jpg", 
				"This time, there's no wedding. No bachelor party. What could go wrong, right? But when the Wolfpack hits the road, all bets are off.",
				"http://youtube.com/watch?v=wNWJrdCvAjc");
			$this->selected[] = new Movie("tt1", 0, 
				"The Hobbit: An Unexpected Journey (2012)", 
				"http://trakt.us/images/posters_movies/162108.2.jpg", 
				"Bilbo Baggins, a Hobbit, journeys to the Lonely Mountain accompanied by a group of dwarves to reclaim a treasure taken from them by the dragon Smaug.",
				"http://youtube.com/watch?v=b1SJ7yaa7cI");
			$this->selected[] = new Movie("tt2", 0, 
				"Wreck-It Ralph (2012)", 
				"http://trakt.us/images/posters_movies/198956.5.jpg", 
				"Wreck-It Ralph is the 9-foot-tall, 643-pound villain of an arcade video game named Fix-It Felix Jr., in which the game's titular hero fixes buildings that Ralph destroys. Wanting to prove he can be a good guy and not just a villain, Ralph escapes his game through the power cord and lands in Hero's Duty, a first-person shooter where he helps the game's hero, Sergeant Calhoun, battle against \"Cy-Bugs\", the game's alien invaders. He later enters Sugar Rush, a kart racing game set on tracks made of candies, cookies and other sweets. There, Ralph meets Vanellope von Schweetz, one of that game's characters, who has learned that her game is faced with a dire threat that could affect the entire arcade, and one that Ralph may have inadvertently started.",
				"http://youtube.com/watch?v=JPSQOomMWro");
			$this->selected[] = new Movie("tt3", 0, 
				"Skyfall (2012)", 
				"http://trakt.us/images/posters_movies/178140.5.jpg", 
				"Daniel Craig is back as James Bond 007 in SKYFALL, the 23rd adventure in the longest-running film franchise of all time.  In Skyfall, Bond's loyalty to M (Judi Dench) is tested as her past comes back to haunt her.  As MI6 comes under attack, 007 must track down and destroy the threat, no matter how personal the cost.",
				"http://youtube.com/watch?v=6kw1UVovByw");
		}
		
		/*
		 * Renders the Home page
		 *
		 * @retval string
		 *  HTML representation of the Home page
		 */
		public function render(){
			$selected = $this->selected[0];
		
			$content = <<<ENDHTML
<div class="row-fluid">
	<div id="main-pane" class="span9">
		<div id="movie-controls">
			<a id="btn-add-movie" class="btn btn-success pull-right"><i class="icon-plus icon-large"></i>Add</a>
			<input id="add-movie-input" type="hidden" style="width: 40%;">
		</div>
		<canvas id="graph"></canvas>
		<iframe id="embed" seamless></iframe>
		<script type="text/javascript" src="assets/js/canvas.js"></script>
		<script type="text/javascript" src="assets/js/Movie.class.js"></script>
		<script type="text/javascript" src="assets/js/Node.class.js"></script>
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
<script type="text/javascript">
ENDHTML;
			$content .= "var movies = " . json_encode($this->selected) . ";";
			$content .= <<<ENDHTML
</script>
<script src="assets/js/movie-select.js"></script>
<div id="images_preload"></div>
ENDHTML;

			return $content;
		}
	}
?>
