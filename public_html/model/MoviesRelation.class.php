<?php
	/**
	 * Represents a relation between two Movies
	 */
	class MoviesRelation{
		const relations = array(
				new Relation("actor", 0.8, "dbpedia-owl:starring", "Same actor"),
				new Relation("director", 0.7, "dbpedia-owl:director", "Same director"),
				new Relation("editor", 0.5, "dbpedia-owl:editing", "Same editor"),
				new Relation("setdesigner", 0.4, "dbpedia-owl:setDesigner", "Same set designer"),
				new Relation("makeup", 0.3, "dbpedia-owl:makeupArtist", "Same makeup artist"),
				new Relation("effects", 0.4, "dbpedia-owl:specialEffects", "Same special effects guy")
			);
		
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
	}
?>