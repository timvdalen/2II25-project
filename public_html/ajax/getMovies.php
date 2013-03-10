<?php
	include("../model/Movie.class.php");
	$query = urlencode($_GET["q"]);
	$url = "http://api.trakt.tv/search/movies.json/dd868458ec3ebcd4febd914e40dde1e3/$query";
	$data = json_decode(file_get_contents($url));
	
	$movies = array();
	foreach($data as $result){	
		$movie = new Movie($result->imdb_id, "", $result->title . " (" . $result->year . ")", $result->images->poster, $result->overview, $result->trailer);
		//Add id for Select2
		$movie->id = $movie->imdb_id;
		$movies[] = $movie;
	}
	
	echo json_encode($movies);
	
?>