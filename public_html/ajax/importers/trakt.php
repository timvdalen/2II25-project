<?php

$user = $_GET['user'];
print file_get_contents("http://api.trakt.tv/user/library/movies/watched.json/dbbf41d754a864c3dfd6608bf000063e/$user/extended");

?>
