<?php
	/**
	 * Represents a possible relation between Movies
	 */
	class Relation{
		/**
		 * ID of the relation
		 * @var string $id
		 */
		public $id;
		
		/**
		 * Type of the relation
		 * @var string $type
		 */
		public $type;
		
		/**
		 * Description of the relation
		 * @var string $description
		 */
		public $description;
		
		function __construct($id, $type, $description){
			$this->id = $id;
			$this->type = $type;
			$this->description = $description;
		}
	}
?>