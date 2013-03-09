<?php
	/**
	 * Represents a Page
	 */
	class Page{
		/**
		 * ID for this page
		 * @var string $id
		 */
		public $id;
		
		/**
		 * Name for this page that is shown in menus
		 * @var string $viewName
		 */
		public $viewName;
		
		/**
		 * Location on the webserver for this page
		 * @var string $location
		 */
		public $location;
		
		/**
		 * Whether or not this page should show up in the menu
		 * @var bool $inMenu
		 */
		public $inMenu;
		
		
		function __construct($id, $viewName, $location, $inMenu){
			$this->id = $id;
			$this->viewName = $viewName;
			$this->location = $location;
			$this->inMenu = $inMenu;
		}
	}
?>