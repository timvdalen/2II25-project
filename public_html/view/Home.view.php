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
			$content = <<<ENDHTML
<div class = "row-fluid">
	<div class = "span8"></div>
	<div class = "span4"></div>
</div>
ENDHTML;

			return $content;
		}
	}
?>	