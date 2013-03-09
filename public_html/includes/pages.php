<?php

/**
 * Contains all the user-facing pages
 * @var array $pages
 */
$pages = array(
	new Page("home", "Home", "Home", "/", false),
	new Page("about", "About", "About", "/about", true),
	new Page("faq", "F.A.Q.", "FAQ","/faq", true)
	
);

/**
 * Defines whether or not a page exists
 *
 * @param string $id
 *  Page id
 * @retval bool
 *  whether or not the page exists
 */
function page_exists($id, $pages){
	foreach($pages as $page){
		if($page->id == $id){
			return true;
		}
	}
	return false;
}

/**
 * Gets a page based on its id
 *
 * @param string $id
 *  Page id
 * @retval Page
 *  the page with this id (or false if it doesn't exist)
 */
function get_page($id, $pages){
	foreach($pages as $page){
		if($page->id == $id){
			return $page;
		}
	}
	return false;
}

?>