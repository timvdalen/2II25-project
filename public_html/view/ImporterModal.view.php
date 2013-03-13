<?php

	/*
	 * Outputs the modal for the importer
	 */
	class ImporterModal extends View{
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
<div id="importerModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="importerModalLabel" aria-hidden="true">
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
    <h3 id="myModalLabel">Import your movies<small>From Facebook</small></h3>
  </div>
  <div class="modal-body">
    <p>Enter credentials</p>
  </div>
  <div class="modal-footer">
    <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
    <button class="btn btn-primary">Import</button>
  </div>
</div>
ENDHTML;
			return $content;
		}
	}

?>
