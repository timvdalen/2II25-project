<?php
	/*
	 * Outputs the FAQ page
	 */
	class FAQ extends View{
		/*
		 * Frequenty asked questions
		 * @var array $questions
		 */
		private $questions;
	
		/*
		 * Constructs the FAQ page
		 *
		 * @param array $arguments
		 *  Contains the arguments for this page
		 */
		function __construct($arguments){
			$this->questions = array(
				"What is cinetre.es?" => "We don't even know.",
				"How do I add movies to my cinetree?" => "We're pretty sure there's a button for it."
			);
		}
		
		/*
		 * Renders the FAQ page
		 *
		 * @retval string
		 *  HTML representation of the FAQ page
		 */
		public function render(){
			$content = <<<ENDHTML
<div class="page-header">
	<h1> F.A.Q. <small>Frequently Asked Questions</small></h1>
</div>
<div>
	<ul>
ENDHTML;
				foreach($this->questions as $q => $a) {
					$content .= <<<ENDHTML
		<li>
			<a href = "#$q">$q</a>
		</li>
ENDHTML;
				}
					$content .= <<<ENDHTML
	</ul>
</div>		
<div>
	<dl>
ENDHTML;
				foreach($this->questions as $q => $a) {
					$content .= <<<ENDHTML
			<a name = "$q"></a>
			<p>
				<dt>
					$q
				</dt>
				<dd>
					$a
				</dd>
			</p>
ENDHTML;
				}
				$content .= <<<ENDHTML
	</dl>
</div>
ENDHTML;

			return $content;
		}
	}
?>
