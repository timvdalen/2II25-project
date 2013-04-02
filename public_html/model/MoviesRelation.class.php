<?php
	/**
	 * Represents a relation between two Movies
	 */
	class MoviesRelation{
		/**
		 * First movie
		 * @var Movie $firstMovie
		 */
		public $firstMovie;
		
		/**
		 * Second movie
		 * @var Movie $secondMovie
		 */
		public $secondMovie;
		
		/**
		 * The relation between the movies
		 * @var Relation $relation
		 */
		public $relation;
		
		function __construct($firstMovie, $secondMovie, $relation){
			$this->firstMovie = $firstMovie;
			$this->secondMovie = $secondMovie;
			$this->relation = $relation;
		}
		
		public static function relations(){
			return array(
				new Relation("actor", 0.8, "http://dbpedia.org/ontology/starring", "Same actor"),
				new Relation("director", 0.7, "http://dbpedia.org/ontology/director", "Same director"),
				new Relation("editor", 0.5, "http://dbpedia.org/ontology/editing", "Same editor"),
				new Relation("setdesigner", 0.4, "http://dbpedia.org/ontology/setDesigner", "Same set designer"),
				new Relation("makeup", 0.3, "http://dbpedia.org/ontology/makeupArtist", "Same makeup artist"),
				new Relation("effects", 0.4, "http://dbpedia.org/ontology/specialEffects", "Same special effects guy")
			);
		}
		
		public static function getRelation($type){
			foreach(MoviesRelation::relations() as $relation){
				if($relation->type == $type){
					return $relation;
				}
			}
			return null;
		}
	}
?>