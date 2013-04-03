<?php

	/*
	 * Outputs the modal for the importer
	 */
	class ImporterModal extends View{
		/*
		 * Importer ID
		 * @var string $ID
		 */
		protected $ID;
		
		/*
		 * Importer source
		 * @var string $source
		 */
		protected $source;
	
		/*
		 * Importer body HTML
		 * @var string $body
		 */
		protected $body;
		
		/*
		 * Icon for this Importer
		 * @var string $icon
		 */
		protected $icon;
	
		/*
		 * Constructs the ImporterModal
		 *
		 * @param array $arguments
		 *  Contains the arguments for this page
		 */
		function __construct($arguments){
		}

		/*
		 * Renders the ImporterModal
		 *
		 * @retval string
		 *  HTML representation of the ImporterModal
		 */
		public function render(){
			$content = <<<ENDHTML
<div id="importerModal{$this->ID}" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="importerModal{$this->ID}Label" aria-hidden="true">
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
    <h3 id="importerModal{$this->ID}Label">Import your movies<small> From {$this->source}</small></h3>
  </div>
  <div id="modalBody-{$this->ID}" class="modal-body">
    {$this->body}
  </div>
  <div class="modal-footer">
	<button class="btn pull-left toggle"><i class="icon-check"></i> Toggle all</button>
	<div class="progress progress-striped active importer-progress">
		<div class="bar"></div>
	</div>
    <button class="btn right-btn" data-dismiss="modal" aria-hidden="true">Close</button>
    <button class="btn btn-primary right-btn import">Import</button>
  </div>
</div>
ENDHTML;
			return $content;
		}
		
		/*
		 * Renders the button to open this ImporterModal
		 *
		 * @retval string
		 * HTML representation of the ImporterModal's button
		 */
		public function renderButton(){
			$content = <<<ENDBUTTON
	<li><a id="btn-import-{$this->ID}" href="#importerModal{$this->ID}" data-toggle="modal"><i class="{$this->icon}"></i> From {$this->source}</a></li>
ENDBUTTON;
			
			return $content;
		}
		
		public function getID(){
			return $this->ID;
		}
	}

?>
