<?php
	/*
	 * Outputs the FAQ page
	 */
	class Home extends View{
		/*
		 * Frequenty asked questions
		 * @var array $questions
		 */
		private $questions = array(
			"What is cinetre.es?" => "We don't even know."
			"How do I add movies to my cinetree?" => "We're pretty sure there's a button for it."
		);
	
		/*
		 * Constructs the FAQ page
		 *
		 * @param array $arguments
		 *  Contains the arguments for this page
		 */
		function __construct($arguments){}
		
		/*
		 * Renders the FAQ page
		 *
		 * @retval string
		 *  HTML representation of the FAQ page
		 */
		public function render(){
			$content = <<<ENDHTML
<div class="hero-unit">
	<h2>F.A.Q.</h2>
ENDHTML;
				foreach($questions as $q => $a) {
					$content .= <<<ENDHTML
	<p> 
		$q </ br>
		$a
	</p>
ENDHTML;
				}
				$content .= <<<ENDHTML
	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quis nibh at risus mollis gravida. Fusce vulputate consectetur ornare. Nam eros urna, molestie quis consectetur in, convallis eget eros. Curabitur adipiscing ipsum eu diam vulputate varius. Ut in nulla non metus dapibus consequat eu ut lorem. Nunc consequat odio et urna aliquam bibendum. Ut mi felis, consectetur id tristique quis, bibendum vel metus. Nullam sit amet lacus nisl.</p>
</div>
ENDHTML;

			return $content;
		}
	}
?>
