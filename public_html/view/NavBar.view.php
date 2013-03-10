<?php
	
	/*
	 * Outputs the NavBar
	 */
	class NavBar extends View{
		/// Contains the pages
		private $items;
		
		/*
		 * Constructs the NavBar
		 *
		 * @param string $active
		 *  Name of the active page
		 */
		function __construct($items, $active){
			$this->items = $items;
			$this->active = $active;
		}
		
		/*
		 * Renders the NavBar
		 *
		 * @retval string
		 *  HTML representation of the NavBar
		 */
		public function render(){
			$content = <<<ENDHTML
<div class="navbar navbar-inverse navbar-fixed-top">
	<div class="navbar-inner">
		<div class="container">
			<a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</a>
			<a class="brand" href="/">Cinetre.es</a>
			<div class="nav-collapse collapse pull-right">
				<ul class="nav">
ENDHTML;

			//TODO: active page
			foreach($this->items as $page){
				if(!$page->inMenu){
					continue;
				}
				$activemenu = "";
				if($page == get_page($this->active, $this->items)){
					$activemenu = " active";
				}
				$content .= "<li class='menuitem{$activemenu}'><a href='{$page->location}'>{$page->name}</a></li>";
			}

			$content .= <<<ENDHTML
				</ul>
			</div><!--/.nav-collapse -->
		</div>
	</div>
</div>
ENDHTML;

			return $content;
		}
	}
?>	
