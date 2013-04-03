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
	<p>Feestboektijd</p>
ENDBODY;

		/*
		 * Icon for this Importer
		 * @var string $icon
		 */
		protected $icon = "icon-facebook-sign";
	}
	
?>
