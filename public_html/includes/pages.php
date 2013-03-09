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

/**
 * Gets a page title
 *
 * @param Page $id
 *  Page
 * @retval string
 *  page title for this page
 */
function get_page_title($page, $pages){
	$site_name = "Cinetrees";
	if($page == $pages[0]){
		return $site_name;
	}else{
		return $page->name . " &bull; " . $site_name;
	}
}

?>
