/*********************************************************************************
Copyright © 2016, Alliance for Sustainable Energy, LLC
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, 
are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list 
of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list 
of conditions and the following disclaimer in the documentation and/or other materials 
provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors may be 
used to endorse or promote products derived from this software without specific prior 
written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES 
OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT 
SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, 
INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED 
TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR 
BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN 
CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN 
ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF 
SUCH DAMAGE.
*******************************************************************************/

/********************
* These are helper functions that don't need to clutter the main task.js. Make sure
* this file is loaded before task.js in the exp.html file.
********************/

prompt_resubmit = function() {
	var error_message = "<h1>Oops!</h1><p>Something went wrong submitting your HIT. " +
	                    "This might happen if you lose your internet connection. Press " +
	                    "the button to resubmit.</p><button id='resubmit'>Resubmit</button>";
	replaceBody(error_message);
	$("#resubmit").click(resubmit);
};

resubmit = function() {
	replaceBody("<h1>Trying to resubmit...</h1>");
	reprompt = setTimeout(prompt_resubmit, 10000);

	psiTurk.saveData({
		success: function() {
		    clearInterval(reprompt); 
		}, 
		error: prompt_resubmit
	});
};

/**
 * Splash something onto the screen. This needs to be called using the setTimeout function:
 * e.g.: SplashScreen("some test"); setTimeout(function() {currentview = new Experiment(); }, 1000);
 * @param splashText
 * @returns
 */
var splashScreen = function(splashText) {
	var $div = $("<div class='splash'/>");
	$("body").prepend( $div );
	$div.html(splashText);
};

/**
 * Records the data in psiTurk (unstructured data) for the given form.
 * 
 * Uses the id of the text input, radio button, or drop down (or the name if an
 * id can't be found) and then grabs the value. Cycles through every input 
 * element in the form, and ignores unchecked radio buttons.
 * 
 * TODO: Update to include radio groups where nothing is selected (right now it skips them)
 * 
 * @param formName Name of form to record data for
 * @returns
 */
var recordResponses = function(formName) {
  $("#" + formName +" *").filter(":input").each( function(index) {
    $this = $(this);
    var name = $this.prop("id") || $this.prop("name");
    var value = "";
    if ($this.prop("type") === "radio" && $this.is(":checked") === false) {
      // If this is an unchecked radio button then do nothing
    } else if ($this.prop("type") === "checkbox") {
      value = $this.prop("checked");
      console.log(name + ": " + value);
      psiTurk.recordUnstructuredData( name, value );                          
    } else {
      value = $this.val();
      console.log(name + ": " + value);
      psiTurk.recordUnstructuredData( name, value );              
    }
  });
};

/**
 * Check that required form inputs have been filled
 * <p>
 * Loop through all inputs that don't have class="optional" and see if some answer is given.
 * If some are empty that shouldn't be, highlight the question and ask if the user wants to
 * continue. An element can be made optional by giving it class optional, or giving its container
 * that class. An inputs container is specified by the first parent element that matches the
 * supplied containerSelector jQuery string selector.
 * 
 * @param formName The name of the form to check inputs for 
 * @param containerSelector The jQuery string selector that determines what a element 'holds' the 
 * question. This container will be given the warning class to indicate to the user what questions need
 * to be finished
 * @returns True if all questions are answered or the user confirms they want to skip the ones they did.
 * False otherwise.
 */
var confirmEntry = function(formName, containerSelector) {

	if (containerSelector === undefined) containerSelector = "div.row";

	var radio_groups = {};
    var errors = 0;
    $("#" + formName +" *").filter(":input").map(function(){
    	//console.log(this);
    	
    	if ($(this).hasClass("optional") ||
    		$(this).parents(containerSelector).first().hasClass("optional")) {
    		//Skip inputs flagged optional (either themselves or their parents)
    	} else if ( $(this).prop("type") === "radio" ) {
    		//Radios are dealt with later
    		radio_groups[this.name] = true;
    	} else if ( !$.trim($(this).val()) ) {
        $(this).parents(containerSelector).first().addClass('warning');
        errors++;
      } else if ($(this).val()) {
      	$(this).parents(containerSelector).first().removeClass('warning');
      }   
    });
    
    for(group in radio_groups){
    	if ( $("input[name="+group+"]:checked","#"+formName).val()) {
    		$("input[name="+group+"]","#"+formName).parents(containerSelector).first().removeClass("warning");
    	} else {
    		$("input[name="+group+"]","#"+formName).parents(containerSelector).first().addClass("warning");
    		errors++;
    	}
    }

    if (errors > 0) {
    	var ans = confirm("There are unanswered questions! It is ok to leave items blank, but we want " +
    			"to make sure it isn't an accident. Click OK to go back and finish answering, click Cancel " +
    			"to continue.");
    	return !ans;
    }
    
	return true;
};

/**
 * Enable a 3 letter shortcut (must be 3 letters, so char_seq could be 'abc' or 'wer')
 */
enable_shortcut = function(char_seq, callback) {
  var tally = {};
  $(document).keydown(function(e) {
    tally[e.key] = true;
    }).keyup(function(e) {
    if (tally[char_seq.charAt(0)] && tally[char_seq.charAt(1)] && tally[char_seq.charAt(2)]) {
      callback();
    }
    delete tally[e.key];
  });
}

/**
 * Provides a randomize function to jQuery that will take all the matched components 
 * and return then in random order.
 */
$.fn.randomize = function(selector){
    (selector ? this.find(selector) : this).parent().each(function(){
        $(this).children(selector).sort(function(){
            return Math.random() - 0.5;
        }).detach().appendTo(this);
    });

    return this;
};


var round_numbers = function(values, zeros){
  for(i = 0; i < values.length; i++){
    values[i] = Math.round(values[i]/Math.pow(10,zeros))*Math.pow(10,zeros);
  }
  return values;
};
