/**
 * Makes any table sortable by the header columns (alphabetically)
 * Include jquery.sortableTable.css for ASC & DESC icons and cursor changes
 * 
 * HTML - <table><thead><tr><th></th></tr></thead><tbody><tr><td></td></tr></tbody></table>
 * 
 * Usage 
 *  JavaScript	:	$(.class|#id).sortableTable();
 *  CSS			:	<table class="ui-sortable-table">
 *  
 * @author Beau Durrant
 */

(function($) {
	
	/** PUBLIC FUNCTIONS */
	
	// constructor
	$.fn.sortableTable = function () {
		// add the standard ui class for styling the table
		// table
		$(this).addClass('ui-sortable-table');
		$(this).addClass('ui-sortable-table-initialized');
		// head
		$thead = $(this).find('thead');
		$thead.addClass('ui-sortable-thead');
		// body
		$tbody = $(this).find('tbody');
		$tbody.addClass('ui-sortable-tbody');
		// default to ascending order
		$tbody.removeClass('asc');
		$tbody.addClass('desc');
		// find the headers <th> and add the click event listener to each one and classes for styling
		theadTh = $(this).find('thead th');
		for (var i=0; i<theadTh.length; i++) {
			$(theadTh[i]).addClass('ui-sortable-th');
			$(theadTh[i]).addClass('ui-sortable-th-'+i);
			$(theadTh[i]).click(sortColumn);
		}
	}
	
	/** PRIVATE FUNCTIONS */
	
	// click event to sort columns
	function sortColumn () {
		// don't sort columns with no text in the heading
		if ($(this).text() == '') return;
		// get the table
		$table = $(this).parent().parent().parent();
		// get the tbody
		$tbody = $table.find('tbody');
		// sort order of the column
		var sortOrder;
		if( $tbody.hasClass('asc') ){
			sortOrder = 'asc';
			$tbody.removeClass('asc');
			$table.find('th').removeClass('asc');
			$tbody.addClass('desc');
			$(this).addClass('desc');
		}
		else{
			sortOrder = 'desc';
			$tbody.removeClass('desc');
			$table.find('th').removeClass('desc');
			$tbody.addClass('asc');
			$(this).addClass('asc');
		}
		// index of the column we are clicking on
		var columIndex = $(this).index();
		// sort the columns
                $tbody.find('tr').sort(function(a, b) {
                	var temp;
                	if (sortOrder == 'desc') {
                		temp = a;
                		a = b;
                		b = temp;
                	}
                	return $('td:eq('+columIndex+')', a).text().localeCompare($('td:eq('+columIndex+')', b).text());
                }).appendTo($tbody);
	}
	
	/** INITIALIZE ANY TABLES WITH THE CLASS NAME NOT ALREADY INITIALIZED IN JS */
	
	$(document).ready(function() {	
		var sortableTables = $('.ui-sortable-table:not(.ui-sortable-table-initialized)');
		for (var i=0; i < sortableTables.length; i++) {
			$(sortableTables[i]).sortableTable();
		}
	});
	
})(jQuery);
