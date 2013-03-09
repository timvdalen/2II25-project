<?php
	/*
	 * Outputs the FAQ page
	 */
	class About extends View{
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
<div class="page-header">
	<h1> About <small>Cinetre.es</small></h1>
</div>
<div>
	Cinetre.es is a Web Technology project by TU/e students. 
	Its goal is to analyse the user's choice in movies by searching for similarities on multiple levels.
</div>
ENDHTML;

			return $content;
		}
	}
?>
