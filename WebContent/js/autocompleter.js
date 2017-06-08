$(document).ready(function() {
      
    $('#search').removeClass('loading');
    $('#searchText').removeClass('searchloading');

	$(function() {
		$("#search").autocomplete({
      		source : function(request, response) {
                   $('#search').addClass('loading');
				$.ajax({
                                    
					url : "SearchController",
					type : "POST",
					data : {
						term : request.term
					},
					dataType : "json",
					success : function(data) {
						response(data);
                                                $('#search').removeClass('loading');
					}
				});
			}
		});
	});
});
