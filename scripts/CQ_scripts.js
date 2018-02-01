$(function() {
	//*************************************************
	var NUMBER_OF_QUESTIONS = 10;					//*
	var QUESTIONNAIRE_END_PAGE = "pages/CQend.html"	//*
	var QUESTION_FOLDER= "questions/"				//*
	var QUESTION_FILE_PREFIX = "question"			//*
	var TICK_TIME_DURATION = 140					//*	
	//*************************************************
	
	var images = new Array();
	for (i = 1; i <= NUMBER_OF_QUESTIONS; i++) {
		$("#caching-area").load(QUESTION_FOLDER+QUESTION_FILE_PREFIX+i+".html", function(){
			images[i] = new Image();
			images[i].src = $("#background-info").attr("body_background_image");
			$("#caching-area").append(images[i]);
		});
	}
	$("#deleteme").empty();
	
	function update_progress_bar(){
		var width = ( 100 * parseFloat($('.progress-bar').css('width')) / parseFloat($('.progress-bar').parent().css('width')) )
		width = width - 3;
		$('#progress-bar').css('width', width + "%");
		if (width <= 50 && width > 25) {
			$("#progress-bar").removeClass('bg-success');
			$("#progress-bar").addClass('bg-warning');
		}
		if (width <= 25) {
			$("#progress-bar").removeClass('bg-warning');
			$("#progress-bar").addClass('bg-danger');
		}
		if (width <= 0 && $("body").attr("lock")=="FALSE") {
			$("body").attr("lock","TRUE");
			var question = parseInt($("#question").attr("question"));
			question = question +1;
			if (question <= NUMBER_OF_QUESTIONS){
				//cambio inclusione domanda			
				$("#question").attr(QUESTION_FILE_PREFIX,question);
				var old_color = $("#question-box").css("background-color");
				$("#question").load(QUESTION_FOLDER+QUESTION_FILE_PREFIX+question+".html", function(){
					var handle = $("#custom-handle");
					$( "#answer" ).slider({
						slide: function( event, ui ) {
							handle.css('visibility','visible')
						},
						stop: function(event,ui) {
							$('.progress-bar').css('width','0')
						}
					});
					$("#custom-handle").css('visibility','hidden');
					$("#question-box").css('background-color',$('#background-info').attr('question_background_color'));
					$("#question-box").css('color',$('#background-info').attr('question_text_color'));
					$("body").css('background-image','url('+$('#background-info').attr('body_background_image')+')');
					$("body").css('background-color',old_color);					
					//reset della barra
					$("#progress-box").css('visibility','visible');
					$("#progress-bar").removeClass('bg-danger');
					$("#progress-bar").addClass('bg-success');
					$('#progress-bar').css('width', "100%");	
					$("body").attr("lock","FALSE");					
				});
			} else {
				window.location.replace(QUESTIONNAIRE_END_PAGE)
				//show results
			}
		}
	}
	setInterval(update_progress_bar, TICK_TIME_DURATION);
	
});