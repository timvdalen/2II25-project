<?php

include("../model/Movie.class.php");
include("../model/Relation.class.php");
include("../model/MoviesRelation.class.php");

function sparqlQuery($query, $baseURL, $format="application/json"){
	$params=array(
		"default-graph" =>  "",
		"should-sponge" =>  "soft",
		"query" =>  $query,
		"debug" =>  "on",
		"timeout" =>  "",
		"format" =>  $format,
		"save" =>  "display",
		"fname" =>  ""
	);

	$querypart="?";	
	foreach($params as $name => $value){
		$querypart .= $name . '=' . urlencode($value) . "&";
	}
	
	$sparqlURL = $baseURL . $querypart;
	
	return json_decode(file_get_contents($sparqlURL));
}

$empty_movie = new Movie("", "", $_GET['m'], "", "");
$dbpedia_title = $empty_movie->getDBpedia();

$movie = Movie::getTrakt($dbpedia_title);

$query = <<<ENDSPARQL
SELECT * WHERE {
	<http://dbpedia.org/resource/$dbpedia_title> ?rel ?actor.
	?b ?rel ?actor.
	FILTER(
		((?rel = dbpedia-owl:starring) || (?rel = dbpedia-owl:director))&&(?b != <http://dbpedia.org/resource/$dbpedia_title>)
	)
} LIMIT 40
ENDSPARQL;

$result = sparqlQuery($query, "http://dbpedia.org/sparql");

$relations = array();
foreach($result->results->bindings as $row){
	if(count($relations) >= 3){
		break;
	}
	$r = MoviesRelation::getRelation($row->rel->value);
	
	$matches = array();
	preg_match("#http://dbpedia.org/resource/(.*)#", $row->b->value, $matches);
	$db_name = $matches[1];
	preg_match("#http://dbpedia.org/resource/(.*)#", $row->actor->value, $matches);
	$r->object = urldecode(str_replace("_", " ", $matches[1]));
	
	$b = Movie::getTrakt($db_name);
	
	if($b != null){
		$relations[] = new MoviesRelation($movie, $b, $r);
	}
}

print json_encode($relations);

?>
