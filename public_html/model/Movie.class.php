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
			$this->trailer_link = Movie::parseTrailerLink($trailer_link);
		}

		public static function parseTrailerLink($link){
			$pattern = "#^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$#";
			$matches = array();
			if(preg_match($pattern, $link, $matches)){
				return "http://youtube.com/embed/" . $matches[1] . "?autoplay=1";
			}else{
				return "";
			}
		}
		
		/**
		 * converts movie from trakt format to dbpedia format
		 * @retval string title of the movie in dbpedia format
		 */
		public function getDbpedia(){
		    $safetitle = urlencode($this->title);
			$url = "http://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch={$safetitle}%20movie";
			$options = array(
				'http'=>array(
					'method'=>"GET",
					'header'=>"Accept-language: en\r\n" .
						"User-Agent:Cinetrees Movie bot\r\n"
				)
			);

			$context = stream_context_create($options);
			$return = json_decode(file_get_contents($url, false, $context));
			
			$result = $return->query->search[0]->title;
			$result = str_replace(" ","_",$result);
			return $result;
		}
		
		/**
		 * converts movie from dbpedia format to trakt format
		 * @var string $dbpedia_title title of the movie in dbpedia format
		 * @retval Movie the movie in trakt format
		 */
		public static function getTrakt($dbpedia_title){
			//$dbpedia_title = str_replace("_","-",$dbpedia_title);
			$pos = strpos($dbpedia_title,"(");
			if( !($pos === false) ){
				$dbpedia_title = substr($dbpedia_title,0,$pos);
			}
			$url = "http://api.trakt.tv/search/movies.json/dd868458ec3ebcd4febd914e40dde1e3/$dbpedia_title";
			$data = json_decode(file_get_contents($url));
			$result = $data[0];
			return new Movie($result->imdb_id, "", $result->title . " (" . $result->year . ")", $result->images->poster, $result->overview, $result->trailer);				
		}
	}
?>
