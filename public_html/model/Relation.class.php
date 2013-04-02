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
		 * Weight of the relation
		 * @var float $weight
		 */
		public $weight;
		
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
		
		/**
		 * Object of the relation
		 * @var string $object
		 */
		public $object;
		
		function __construct($id, $weight, $type, $description){
			$this->id = $id;
			$this->weight = $weight;
			$this->type = $type;
			$this->description = $description;
		}
	}
?>