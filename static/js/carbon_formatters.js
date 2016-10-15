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

function decimalAdjust(type, value, exp) {
  // If the exp is undefined or zero...
  if (typeof exp === 'undefined' || +exp === 0) {
    return Math[type](value);
  }
  value = +value;
  exp = +exp;
  // If the value is not a number or the exp is not an integer...
  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
    return NaN;
  }
  // Shift
  value = value.toString().split('e');
  value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
  // Shift back
  value = value.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
}

// Decimal round
if (!Math.round10) {
  Math.round10 = function(value, exp) {
    return decimalAdjust('round', value, exp);
  };
}

/**
* Rounds numbers to 'nice' looking decimal points.
*/
var myRound = function(val) {
	if ( val < 0.1 ) {
		return val.toFixed(2); // leave two decimals
	} else if ( val < 10 ) {
		return val.toFixed(1); // Leave one decimal 
	} else if ( val < 100 ) {
		return val.toFixed(0);
	} else if ( val < 1000 ) {
		return Math.round10(val, 1); // Round to tens place
	} else {
		return val.toFixed(0); // default
	}
}


var number_with_commas = function(num){
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
};

var nullFormatter = function() {
	return({
		text: function(g_co2) { return ""; },
		help: "",
		name: "null_f"
	});
};

var gFormatter = function() {
	return({ 
		text: function(g_co2) { return number_with_commas(g_co2) + " g"; },
		help: "This is the amount of carbon that was released into the air. ",
	  name: "abs_g"
	});
};



/**
 * class_name: The class given to the top level svg element
 * co2min: The value for the leftmost side of the scale
 * co2max: The value for the rightmost side of the scale 
 * color: 'c' or 'g' depending on color or grayscale gradient presentation
 */
var gradientFormatter = function(class_name, co2min, co2max, color) {
	
	var interpolate = function(x,x1,y1,x2,y2) {
	    return y1 + (y2-y1)*(x-x1)/(x2-x1);
	};
	console.log(class_name, co2min, co2max);
	if(color == 'c'){
	    var c0 = '(0,255,0)';
	    var c1 = '(255,0,0)';
	}
	else if(color == 'g') {
	    var c0 = '(181,181,181)';
	    var c1 = '(0,0,0)';
	}
	return({
		text: function(g_co2) {
			var width = 125;
			var offset = 30;
			var tri_x = interpolate(g_co2, co2min, offset, co2max, offset+width);
			//console.log(co2min, co2max, g_co2);
			//console.log(tri_x);
			var svg_string = 
			'<svg class=' + class_name + ' height="60"> \n' + 
			  '<defs> \n' +
			    '<linearGradient id="grad'+color+'" x1="0%" y1="0%" x2="100%" y2="0%"> \n' +
		    	  '<stop offset="0%" style="stop-color:rgb'+c0+';stop-opacity:1" />  \n' +
		    	  '<stop offset="100%" style="stop-color:rgb'+c1+';stop-opacity:1" />  \n' +
		        '</linearGradient>  \n' +
			  '</defs>  \n' +
			  '<rect x="30" y="10" width=' + width + ' height="20" fill="url(#grad'+color+')" />  \n' +
			  '<polygon points="'+ (tri_x-10) + ',0 ' + (tri_x+10) + ',0 ' + tri_x + ',15" style="fill:black;stroke-width:1" />  \n' +
			  '<text x="30"  y="45" style="font-size:12pt;text-anchor:middle">'+number_with_commas(co2min)+'g</text>  \n' +
			  '<text x="155" y="45" style="font-size:12pt;text-anchor:middle">'+number_with_commas(co2max)+'g</text>  \n' +
			'</svg>  \n';
			return svg_string;
		},
		help: "The triangle shows where this particular product falls among all products. " +
			  "The left end of the rectangle corresponds to the product with the least " +
			  "carbon emissions, the right end to the product with the most.",
		name: color+"gradient"
	});
};

var drivingFormatter = function() {
	return({
		text: function(g_co2) {
			// There are 411 grams of CO2 per mile driven for a standard passenger vehicle
			// See http://www.epa.gov/otaq/climate/documents/420f14040.pdf
			var conv = 411;
			var miles = g_co2/411;
			
			if ( miles.toFixed(1) == 1 ) { // Notice ==, don't use === here
				return "1 mile driven";
			} else {
				// SCI: WRONG! This messes stuff up by rounding 2 DCE values to the 
				// same displayed value
	      //miles = Math.round(miles/10)*10; 
	      // 
	      miles = myRound(miles);
	      return miles + " miles driven";
			}
			
		},
		help: "This product results in the same amount of carbon entering the atmosphere " +
			  "as driving the given number of miles in a typical U.S. car.",
		name: "driving"
	});
};

/**
 * class_name: The class given to the top level svg element
 * co2min: The value for the leftmost side of the scale
 * co2max: The value for the rightmost side of the scale 
 * pic: An integer specifying which image to use. Currently 0 is factories and 1 is leaves
 */
var fillFormatter = function(class_name, co2min, co2max, pic) {
	var names = ["factory","leaf"];
	var miles = [ Math.floor((co2min+0.8*(co2max-co2min))/411), 
	              Math.floor((co2min+0.2*(co2max-co2min))/411)];
	for(i = 0; i < miles.length; i++){
	  miles[i] = (miles[i]/10)*10;
	}
	var helps = ["This represents the amount of carbon that a product creates. The units are in miles of driving."+
		         " For example, if there are 4 red factories then the product produces an amount of carbon roughly equivalent to driving "+miles[0]+" miles " +
		         "in a typical U.S. car.",
		         "This represents the amount of carbon that a product produces. The units are in miles of driving."+
		         " For example, if there are 4 green leaves then the product produces an amount of carbon roughly equivalent to driving "+miles[1]+" miles " +
		         "in a typical U.S. car."]
	return({
		text: function(g_co2) {
		    //Stores potential images. Filled image is first, grey is second.
	    var pics = [["factoryr.png","factoryg.png"],["leaf.png","gleaf.png"]];
	    //var txt = [[ Math.round(co2min/411/10)*10+"mi",Math.round(co2max/411/10)*10+"mi"],[Math.round(co2max/411/10)*10+"mi",Math.round(co2min/411/10)*10+"mi"]];
	    //var txt = [[ (co2min/411).toFixed(0) + "mi", (co2max/411).toFixed(0) + "mi"],
	    //           [ (co2max/411).toFixed(0) + "mi", (co2min/411).toFixed(0) + "mi"]];
			var txt = [[ myRound(co2min/411) + "mi", myRound(co2max/411) + "mi"],
	               [ myRound(co2max/411) + "mi", myRound(co2min/411) + "mi"]];
	               
	    var numImgs;
	    if (g_co2 === co2min)
	        numImgs = 5;
	    else if (g_co2 === co2max)
	        numImgs = 1;
	    else
	        numImgs = 3;
	    
	    // Factories are the inverse of leaves, so if we are using factories then invert 
	    // the number of images
	    if (pic === 0)
	        numImgs = 6-numImgs;

	    var bools = [0,0,0,0,0]
	    for(var i = 0; i < numImgs; i++)
	        bools[i] = 1;

	    var picstring = "";
	    for(var i = 0; i < bools.length; i++){
        if(bools[i])
          picstring+= '<image x="'+25*(i+1)+'" y = "0" height="30px" width="30px" xlink:href="/static/images/'+pics[pic][0]+'" />';
        else        
          picstring+= '<image x="'+25*(i+1)+'" y = "0"  height="30px" width="30px" xlink:href="/static/images/'+pics[pic][1]+'" />';
	    }

			var div_string = 
				'<svg class=' + class_name + ' width="200" height="50"> \n' + picstring +
				  '<text x="30"  y="40" style="font-size:10pt;text-anchor:middle">'+txt[pic][0]+'</text>  \n' +
				  '<text x="155" y="40" style="font-size:10pt;text-anchor:middle">'+txt[pic][1]+'</text>  \n' +
				'</svg>  \n';
			return div_string;
		},
		help: helps[pic],
		name: names[pic]
	});
};


/**
 * class_name: The class given to the top level svg element
 * choice: 0 for low, 1 for high
 */
var highLowFormatter = function(class_name, choice, threshold) {

	if (choice) {
    var imgSrc = "/static/images/hc.png";
    var blurb = "High Carbon Emitter";
    return({
	    text: function(g_co2) {
		    if(g_co2 > threshold){
		      return '<img src="'+imgSrc+'"><div>\n'+blurb+'</div>';
		    } else {
		      return '';
		    }
	    },
	    help: "This icon is used to indicate products with high carbon emissions relative to similar products. "+
	    "The carbon footprint of products without the label is unknown.",
	    name: "highc"
    });
	} else {
    var imgSrc = "/static/images/lc.png";
    var blurb = "Low Carbon Emitter";
    return({
	    text: function(g_co2) {
		    if(g_co2 < threshold){
		      return '<img src="'+imgSrc+'"><div>\n'+blurb+'</div>';
		    } else {
		      return '';
		    }
	    },
	    help: "This icon is used to indicate products with low carbon emissions relative to similar products. "+
	    "The carbon footprint of products without the label is unknown.",
	    name: "lowc"
    });
  }
	
};






//=============================================================================
//Old Formatters
//=============================================================================






/**
 * Returns the given grams of carbon as kilograms. You can specify the significant digits, if left
 * undefined it will use the same as the input.
 */
var kgFormatter = function(digits) {
	return({
		text: function(g_co2) { 
			var kg = g_co2/1000;
			if (digits === undefined) 
				digits = g_co2.toString().split(".").join("").length;
			return sigFigs(kg, digits ) + " kg"; 
		},
		help: "This is the amount of carbon that was released into the air " +
              "due to the manufacturing and transportation of the product. It is expressed in " +
              "kilograms of carbon dioxide (1 kilogram is equal to 1000 grams).",
        name: "abs_kg"
	});
};

/**
 * avg is the average carbon (in grams CO2) for the product class under investigation
 * For bottled water I'm using 684
 */
var avgFormatter = function(avg) {
	return({
		text: function(g_co2) {
			var pavg = (g_co2/avg-1)*100;
			
			if (pavg.toFixed(0) == 0) {
				return "Same as average";
			} else if (pavg > 0) {
				return pavg.toFixed(0) + "% more than average";
			} else {
				return -pavg.toFixed(0) + "% less than average";
			}
		},
		help: "This value compares the carbon produced from a product to the average amount produced " +
			  "by all similar products. So if the average carbon produced by all similar products was " +
			  "500 grams, and this product produced only 250 grams, this would read '50% less than average'",
		name: "avg"
	});
};

/**
 * 
 */
var treesFormatter = function() {
	return({
		text: function(g_co2) {
			// Value taken from http://www.epa.gov/cleanenergy/energy-resources/calculator.html#results
			var trees = g_co2/1000 * 0.026;
			
			if ( trees.toFixed(1) == 1 ) { // Notice ==, don't use === here
				return "1 tree";
			} else {
				return sigFigs(trees, 2) + " trees";
			}
			
		},
		help: "The number of trees that would need to be grown from seedlings for 10 years to " +
			  "capture the carbon associated with this product",
		name: "trees"
	});
};

var coalFormatter = function() {
	return({
		text: function(g_co2) {
			// See http://epa.gov/cleanenergy/energy-resources/refs.html#coalplant
			var conv = 0.931;
			var coal = g_co2/1000 / conv;
			if ( coal.toFixed(1) == 1 ) { // Notice ==, don't use === here
				return "1 pound of coal";
			} else {
				return sigFigs(coal, 2) + " pounds of coal";
			}
		},
		help: "This product results in the same amount of carbon entering the atmosphere as " +
			  "burning the stated pounds of coal.",
		name: "coal"
	});
};

/**
 * letterClass: The class applied to all letters except the active letter
 * activeClass: The class applied to the letter that represents the given amount of carbon
 * co2min: The lower end of the scale
 * co2max: The upper end of the scale
 */
// Taken from the European Commission "Study on different options for communicating environmental information for products"
var letterFormatter = function(letterClass, activeClass, co2min, co2max) {
	return({
		text: function(g_co2) {
			
			var active_letter = -1;
			
			var letters = 
			['<span style="color: rgb(0,163,76)" class="' + letterClass +'">A</span>',
			 '<span style="color: rgb(170,191,40)" class="' + letterClass +'">B</span>', 
			 '<span style="color: rgb(255,222,22)" class="' + letterClass +'">C</span>',
			 '<span style="color: rgb(252,176,64)" class="' + letterClass +'">D</span>',
			 '<span style="color: rgb(237,28,36)" class="' + letterClass +'">E</span>'];
			
			for (var i=0; i<letters.length; i++) {
				if (g_co2 < (co2max-co2min)/letters.length*(i+1)+co2min) {
					active_letter = i;
					break;
				}
			}
			if (active_letter === -1) active_letter = letters.length-1;
			
			letters[active_letter] = letters[active_letter].replace(letterClass, activeClass);
			
			return letters;
		},
		help: "This is a letter grade used to represent the carbon associated with the " +
			  "product. An 'A' is for products with the lowest carbon emissions, an 'E' " +
			  "for those with the most.",
		name: "letter"
	});
};

function sigFigs(n, sig) {
    var mult = Math.pow(10,
        sig - Math.floor(Math.log(n) / Math.LN10) - 1);
    return Math.round(n * mult) / mult;
}

































