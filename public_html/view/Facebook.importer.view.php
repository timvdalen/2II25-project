<?php
	/*
	 * Outputs the modal for the Facebook importer
	 */
	class FacebookImporter extends ImporterModal{
		/*
		 * Importer ID
		 * @var string $ID
		 */
		protected $ID = "facebook";
		
		/*
		 * Importer source
		 * @var string $source
		 */
		protected $source = "Facebook";
	
		/*
		 * Importer body HTML
		 * @var string $body
		 */
		protected $body = <<<ENDBODY
	<p>Due to the nature of this assignment and the restrictions of the Facebook platform, we have decided not to include the Facebook importer.</p>
	
	<p>To show that we did work on it, here is the structure of the importer:</p>
	<ol>
		<li>Use the Facebook JS SDK to create a pop-up asking for access to the <code>user_likes</code> OAuth scope</li>
		<li>If granted, send the generated code to our server using AJAX</li>
		<li>Here, use our application secret to obtain an <code>access_token</code> from the Graph API</li>
		<li>Download a list of movies from the Graph API <code>/me/movies</code> (using the <code>access_token</code> as authentication)</li>
		<li>Return this list from the AJAX call</li>
		<li>Show the list in the importer window</li>
	</ol>
	
	<p>From that point, this importer works in the same way as the Trakt.tv importer does.</p>
ENDBODY;

		/*
		 * Icon for this Importer
		 * @var string $icon
		 */
		protected $icon = "icon-facebook-sign";
	}
	
?>
