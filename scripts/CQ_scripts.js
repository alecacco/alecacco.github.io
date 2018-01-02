$(function() {
	//*************************************************
	var NUMBER_OF_QUESTIONS = 10;					//*
	var QUESTIONNAIRE_END_PAGE = "pages/CQend.html"	//*
	var QUESTION_FOLDER= "questions/"				//*
	var QUESTION_FILE_PREFIX = "question"			//*
	var TICK_TIME_DURATION = 120					//*	
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
					$("#question-box").css('background-color',() => {
						var letters = '0123456789ABCDEF';
						var color = '#';
						for (var i = 0; i < 6; i++) {
							color += letters[Math.floor(Math.random() * 16)];
						}
						console.log(color);
						return color;
					});
					
					var hexToInvert = function rgb2hex(rgb) {
						var hexDigits = new Array
							("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"); 
						function hex(x) {
							return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
						}
						rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
						console.log('RETURN NORM:'+ hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]));
						return hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
					}($("#question-box").css("background-color"));

					$("#question-box").css('color','#'+ function(hexnum){
						if(hexnum.length != 6) {
							alert("Hex color must be six hex numbers in length.");
							return false;
						}
						
						hexnum = hexnum.toUpperCase();
						var splitnum = hexnum.split("");
						var resultnum = "";
						var simplenum = "FEDCBA9876".split("");
						var complexnum = new Array();
						complexnum.A = "5";
						complexnum.B = "4";
						complexnum.C = "3";
						complexnum.D = "2";
						complexnum.E = "1";
						complexnum.F = "0";
							
						for(i=0; i<6; i++){
							if(!isNaN(splitnum[i])) {
							  resultnum += simplenum[splitnum[i]]; 
							} else if(complexnum[splitnum[i]]){
							  resultnum += complexnum[splitnum[i]]; 
							} else {
							  alert("Hex colors must only include hex numbers 0-9, and A-F");
							  return false;
							}
						}
						console.log('RETURN INV:'+ resultnum);
						return resultnum;
					}(hexToInvert));
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