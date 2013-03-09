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
<div class="hero-unit">
				<h1>Cinetre.es</h1>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quis nibh at risus mollis gravida. Fusce vulputate consectetur ornare. Nam eros urna, molestie quis consectetur in, convallis eget eros. Curabitur adipiscing ipsum eu diam vulputate varius. Ut in nulla non metus dapibus consequat eu ut lorem. Nunc consequat odio et urna aliquam bibendum. Ut mi felis, consectetur id tristique quis, bibendum vel metus. Nullam sit amet lacus nisl.</p>
</div>
ENDHTML;

			return $content;
		}
	}
?>	