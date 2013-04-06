<?php

$user = $_GET['user'];
if($user == "trending"){
	$data = json_decode(file_get_contents("http://api.trakt.tv/movies/trending.json/dbbf41d754a864c3dfd6608bf000063e"));
	print json_encode(array_slice($data, 0, 5));
}else{
	print file_get_contents("http://api.trakt.tv/user/library/movies/watched.json/dbbf41d754a864c3dfd6608bf000063e/$user/extended");
}

?>
