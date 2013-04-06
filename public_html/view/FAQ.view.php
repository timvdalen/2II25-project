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
				"What is cinetre.es?" => "Even we are not sure.",
				"How do I add movies to my cinetree?" => "We're pretty sure there's a button for it.",
				"Wait, these graphs aren't trees!" => "Not a question. Next please.",
				"Ehrm, I'm pretty sure these graphs aren't acyclic, why is this site called Cinetrees?"  => "Okay, you got us there. We know the graphs we present aren't trees. But trees sounds much cooler, right? Also, there is no top level domain for grap.hs and .ph is a little over our budget. And how cool are domain names where the TLD is part of the name?",
				"Do you store all my favorite movies on your servers?" => "No. Processing occurs on our side, but all your data is stored in your browser. If you clear the browser data for this website, your data will be gone.",
				"Can I access my data from a different computer?" => "No, I'm sorry. Would you really like to? Shoot us an email and we'll see what we can do.",
				"Who are you exactly?" => "Check our <a href='/humans.txt'>humans.txt</a> file."
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
