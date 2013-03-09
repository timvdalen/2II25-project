<?php
	/**
	 * Represents a movie
	 */
	class Movie{
		/**
		 * IMDB ID for this movie
		 * @var string $imdb_id
		 */
		public $imdb_id;
		
		/**
		 * DBpedia id for this movie
		 * @var string $dbpedia_id
		 */
		public $dbpedia_id;
		
		/**
		 * Title for this movie
		 * @var string $title
		 */
		public $title;
		
		/**
		 * Poster for this movie
		 * @var string $poster
		 */
		public $poster;
		
		/**
		 * Overview text for this movie
		 * @var string $overview
		 */
		public $overview;
		
		/**
		 * Trailer link for this moview
		 * @var string $trailer_link
		 */
		public $trailer_link;
		
		function __construct($imdb_id, $dbpedia_id, $title, $poster, $overview, $trailer_link = ""){
			$this->imdb_id = $imdb_id;
			$this->dbpedia_id = $dbpedia_id;
			$this->title = $title;
			$this->poster = $poster;
			$this->overview = $overview;
			$this->trailer_link = $trailer_link;
		}
	}
?>