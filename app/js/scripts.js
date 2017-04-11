// nav link highlight active
$(".nav a").on("click", function(){
	$(".nav").find(".active").removeClass("active");
	$(this).parent().addClass("active");
});

// date picker
$(function() {
	$("#datepicker").datepicker();
});