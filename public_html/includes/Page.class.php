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
		 * @var string $name
		 */
		public $name;

		/**
		 * Class name of the View for this Page
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
		
				
		/**
		 * Whether or not this page should be shown fullscreen
		 * @var bool $fullScreen
		 */
		public $fullScreen
		
		function __construct($id, $name, $viewName, $location, $inMenu){
			$this->id = $id;
			$this->name = $name;
			$this->viewName = $viewName;
			$this->location = $location;
			$this->inMenu = $inMenu;
			$this->fullScreen = $fullScreen;
		}
	}
?>