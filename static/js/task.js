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

/*
 * These libraries are loaded in /templates/exp.html
 *
 * Requires:
 *     psiturk (go to https://psiturk.org/)
 *     utils.js:        required by psiturk
 *     backbone:        required by psiturk
 *     bootstrap:       required by psiturk
 *     underscore:      required by psiturk
 *     jquery:          required by psiturk
 *     jquery UI:       required for ranking of displays
 *     hues_helper.js:  extra code for formatting carbon displays
 *     exp_design.js:   holds the experimental designs
 */

// Initialize psiturk object
var psiTurk = new PsiTurk(uniqueId, adServerLoc, mode);

// Condition determines carbon formatter (see config.txt)
var mycondition = parseInt(condition); 

// Counterbalance determins experiment (see config.txt)
var mycounterbalance = parseInt(counterbalance);  // 0 counter balances

//Use counterbalance (column) to determine experiment #
/*
  Counterbalance Table
  0: Shirt
  1: Fridge
  2: Meat
  3: Travel
*/

/*
  Condition Table
  0: Null
  1: Grams
  2: Driving
  3: Grey Gradient
  4: Color Gradient
  5: Low Icon
  6: High Icon
  7: Factories
  8: Leaves
*/

var expNumber = mycounterbalance
var formatters;
var exp_params;
var attrs;
var descs;
var all_instructions = [
  'shirt_instructions.html',
  'refrigerator_instructions.html',
  'steak_instructions.html',
  'travel_instructions.html'
];

var instructionPages;
var experiment_data;
var demographics;
var instructions;
var checkquestionnaire;
var carbon_levels;

//Task object to keep track of the current phase
var currentview;

var experiment_parameter_setup = function(expNum){
  // Holds the modified experiment data
  var all_demographics = ['shirt_demographics.html','refrigerator_demographics.html','steak_demographics.html','travel_demographics.html'];
  demographics = all_demographics[expNum];
  instructions = all_instructions[expNum];

  // All pages to be loaded
  checkquestionnaire;
  if(mycounterbalance === 2) {
    checkquestionnaire = 'steak_checkquestionnaire.html';
    var pages = [
      instructions,
      'steakUSDA.html',
      checkquestionnaire,
      'postquestionnaire.html',
      'display_methods.html',
       demographics,
      'dce.html'
    ];
  } else {
    checkquestionnaire = 'checkquestionnaire.html';
    var pages = [
      instructions,
      checkquestionnaire,
      'postquestionnaire.html',
      'display_methods.html',
      demographics,
      'dce.html'
    ];
  }

  //Image arrays for each experiment with images
  var refrigerator_images = [
    '/static/images/kfn.jpg',                    
    '/static/images/kfi.jpg', 
    '/static/images/kfi.jpg', 
    '/static/images/kfi.jpg', 
    '/static/images/ksn.jpg',
    '/static/images/ksi.jpg',
    '/static/images/ksi.jpg',
    '/static/images/ksi.jpg'
  ];
  
  // Low, Medium, and High carbon values for each product
  var shirt_carbon = [5000, 6000, 7000];
  var fridge_carbon = [95000, 105000, 115000];
  var meat_carbon = [14000, 15000, 16000];
  var travel_carbon = [17000, 18000, 19000];
  
  var thresholds = [shirt_carbon[1], fridge_carbon[1], meat_carbon[1], travel_carbon[1]];
  
  // The first and last elements of carbon_levels set the ranges for the continous/comparable scales
  carbon_levels = [shirt_carbon, fridge_carbon, meat_carbon, travel_carbon];

  // The formatters are loaded in carbon_formatters.js
  formatters = [
    nullFormatter(), 
    gFormatter(), 
    drivingFormatter(), 
    gradientFormatter('gray_display',carbon_levels[expNum][0],carbon_levels[expNum][2],'g'),
    gradientFormatter('color_display',carbon_levels[expNum][0],carbon_levels[expNum][2],'c'),
    highLowFormatter('low_icon',0,thresholds[expNum]),  
    highLowFormatter('high_icon',1,thresholds[expNum]),
    fillFormatter('factories',carbon_levels[expNum][0],carbon_levels[expNum][2],0),
    fillFormatter('leaves',carbon_levels[expNum][0],carbon_levels[expNum][2],1)
  ];

  // Attributes and descriptions arrays, each element corresponds to each experiment
  // Used in experiment setup
  attrs = [
    {
    //Shirt    
      price: 'Price:', 
      org:   'Organic Content:', 
      plab:  'Processing Method:', 
      slab:  'Social Label:',
      cf:    'Carbon Footprint:'
    }, {
    //Refrigerator
      img:   '', 
      price: 'Price:', 
      cap:   'Capacity:',
      brand: 'Brand:',
      con:   'Configuration:',
      ice:   'Ice/Water Dispenser:',
      cf:    'Carbon Footprint:'
    },{
    //Steak
      price: 'Price:',
      label: 'Agriculture Label:', 
      cert:  'Certification:', 
      cf:    'Carbon Footprint:' 
    }, {
    //Travel
      route:     '',
      toll:      'Toll:',
      time:      'Time:', 
      variation: 'Variation of time:',
      safe:      'Safety:', 
      cf:        'Carbon Footprint:' 
    }
  ];

  var dueTo = [
    ' The carbon this product released is due to manufacturing, transportation, and consumption.',
    ' The carbon this product released is due to one year of use.',
    ' The carbon this product released is due to manufacturing, transportation, and consumption.',
    ''
  ];
              
  descs = [           
    {
    //Shirt 
      price:  'This is the price you would pay at the register.', 
      org:    'The percent of organic cotton in shirt. ', 
      plab:   'Organic shirts use dyes and methods which meet standards set by the Organic' +
              'Trade Association. Eco-friendly shirts use low-impact synthetic dyes which ' +
              'reduce water pollution.', 
      slab:   'Fair trade products pay sustainable wages to producers in developing countries.',
      cf:     formatters[mycondition].help + dueTo[expNum]
    }, {
    //Refrigerator
      img:   '', 
      price: 'The price you would pay in the store.', 
      cap:   'Total capacity of fridge and freezer.',
      brand: 'Brand name on refrigerator.',
      con:   'The way the doors are configured (french door has freezer below refrigerator, side by side has freezer ' +
             'on one side and refrigerator on the other.',
      ice:   'Whether or not the refrigerator has an ice maker, water dispenser.',
      cf:     formatters[mycondition].help + dueTo[expNum]
    },{
    //Steak
      price: 'The price per pound you would pay at your meat supplier.',
      label: 'The package that contains the steak may be labeled as follows:\n'+
             'Sustainable means the beef was produced using sustainable practices.\n'+
             'Organic means the beef was produced using organic practices.\n'+
             'Local means the meat was produced for distribution and sale locally.\n'+
             'Typical means no special practices. ', 
      cert:  'The package that contains the steak may be certified as follows:\n'+
             'USDA certification means the processes used and all claims made by the product label have been verified by the USDA.\n'+
             'Third Party means the processes used and all claims made by the product label have been verified by a third party unrelated to the farm of origin or retailer.\n'+
             'Self means the processes used and all claims made by the product label have been verified by the farmer producing the food.\n',
      cf:    formatters[mycondition].help + dueTo[expNum]
    },{
    //Travel
      route:     'How you get from home to work.', 
      toll:      'The toll for this route.',
      time:      'The total round trip time going to work and home again.', 
      variation: 'The standard deviation of the trip time. 95% of the values lie within 2 standard deviations of the mean.',
      safe:      'Chance of an accident. 3 denotes safer than normal, 2 denotes normal, and 1 denotes less safe than normal.',
      cf:        formatters[mycondition].help + dueTo[expNum]
    }
  ];

  // A function used in DCE setup to put proper info in proper boxes, 
  // depending on experiment num
  exp_params = function(val, j, name, num, format, alts) { 
    //Fridge Display parameters
    var ice_options = ['No ice or water','Only ice','Only water','Ice and water'];
    // Depending on the ice option and config the fridge has
    // to have the relavent image. This takes care of that
    // as the ice can be 0,1,2,3 and config 0,1, so the 
    // refrigerator_images array is given 4 redundant images
    // so that we can index just like a matrix with ice and config
    var fridge_num = val[name + '.con']*4 + val[name + '.ice'];
    var config_options = ['French door', 'Side by side'];
    var brands = ['GE', 'LG', 'Kenmore', 'Whirlpool'];
    
    //Meat display parameters
    var meat_labels = ['Sustainable','Organic','Local','Typical'];
    var meat_certs = ['USDA','Third Party','Self'];
   
    //Shirt Display parameters
    var shirt_price = [15, 18];
    var organic_content = [5, 45, 70];
    var p_label = ['Organic','Eco friendly'];
    var s_label = ['Fair trade','$1 Donated to Cancer Research'];
    
    //Travel display parameters
    
    var params = [
      {
      //Shirt
        price: '$' + shirt_price[val[name +'.price']], 
        org:   organic_content[val[name +'.org']] +' %', 
        plab:  p_label[val[name +'.plab']],
        slab:  s_label[val[name +'.slab']],
        cf:    format(carbon_levels[expNum][val[name +'.cf']]), 
        alt:   alts[j]
      },{
      //Refrigerator
        price: '$' + val[name + '.price'], 
        img:   refrigerator_images[fridge_num],
        cap:   val[name +'.cap'] + ' ft\u00B3', 
        brand: brands[val[name + '.brand']],
        con:   config_options[val[name + '.con']],
        ice:   ice_options[val[name + '.ice']],
        cf:    format(carbon_levels[expNum][val[name + '.cf']]), 
        alt:   alts[j]
      }, {
      //Steak
        price: '$' + val[name +'.price'], 
        label: meat_labels[val[name +'.label']], 
        cert:  meat_certs[val[name +'.cert']],
        cf:    format(carbon_levels[expNum][val[name +'.cf']]), 
        alt:   alts[j]
      },{
      //Travel
        route:     'Route '+(j+1), 
        toll:      '$' + val[name +'.toll'], 
        time:      Math.round(val[name +'.time']*60)+' minutes',
        variation: val[name+'.variation'] + ' minutes',
        safe:      val[name+'.safe'],
        cf:        format(carbon_levels[expNum][val[name +'.cf']]), 
        alt:       alts[j]
      }
    ];
    
    return params[num];
  };
                    
  psiTurk.preloadImages(refrigerator_images);

  psiTurk.preloadPages(pages);
  psiTurk.preloadPages(all_instructions);
  psiTurk.preloadPages(['steakUSDA.html','steak_checkquestionnaire.html'])

  if(mycounterbalance === 2) { 
    instructionPages = [ 
      instructions,
      'steakUSDA.html'
    ];
  } else {
    instructionPages = [ 
      instructions,
    ];
  }
};

// Ranking Task
var DisplayMethods = function() {
  
  psiTurk.showPage('display_methods.html');
  psiTurk.recordTrialData({'phase':'displaymethods', 'status':'begin'});
  
  var pop_template = {
    content:'',
    title: 'Details', 
        placement: 'left', 
        container: 'body'};
  
  $.each(formatters, function(i, formatter) {
      console.log(formatter.name);
    var pop = jQuery.extend({}, pop_template);
    pop.content = formatter.help;
    $('#b_' + formatter.name).popover(pop);
    if(formatter.name.localeCompare('highc') == 0)
      $('#' + formatter.name + '>.display-content').html( formatter.text(carbon_levels[expNumber][2]) );
    else if(formatter.name.localeCompare('lowc') == 0)
      $('#' + formatter.name + '>.display-content').html( formatter.text(carbon_levels[expNumber][0]) );
    else {
      $('#' + formatter.name + '>.display-content').html( formatter.text(carbon_levels[expNumber][1]) );
    }
  });
  
  $('.display-option').randomize();
  var ini_order = $('.display-option').map( function() { return this.id; }).get().join();
  console.log(ini_order);
  psiTurk.recordUnstructuredData('iniOrder', ini_order );
  
  $( '#sortable' ).sortable( {
    axis: 'y',
        tolerance: 'pointer',
        placeholder: 'ui-state-default placeholder',
        forceHelperSize: true});
   
  $('#next').click(function () {
    
    if (confirmEntry('display')) {      
      var rank = $('.display-option').map(function(val, i) {
        return this.id;
      }).get();
      
      $.map(rank, function(value, i) {  
        console.log('rank'+i + ',' + value );
        psiTurk.recordUnstructuredData('rank'+i, value ); 
      });
      
      recordResponses('display');
      
      currentview = new Demographics();
    }
  });
  
};

var Questionnaire = function() {
  
  psiTurk.showPage('postquestionnaire.html');
  psiTurk.recordTrialData({'phase':'questionnaire', 'status':'begin'});
  
  $('#next').click(function () {
    if (confirmEntry('postquiz')) {
      recordResponses('postquiz');
        psiTurk.saveData({
          success: function(){
              psiTurk.completeHIT(); // when finished quit
          }, 
          error: prompt_resubmit});
    }
  });
  
};

var Demographics = function() {
  
  psiTurk.showPage(demographics);
  psiTurk.recordTrialData({'phase':'demographics', 'status':'begin'});
  

  $('#next').click(function () {
    if (confirmEntry('demographics')) {
      recordResponses('demographics');
      currentview = new Questionnaire();
    }
  });
  
};

var CheckQuestionnaire = function() {
  psiTurk.recordTrialData({'phase':'check', 'status':'begin'});
  
  psiTurk.showPage(checkquestionnaire);
  
  $('#next').click(function() {
    if (confirmEntry('checkquiz')) {
      recordResponses('checkquiz');
      currentview = new DCE(experiment_data);
    }
  }); 
  
};

/**
 * This runs a discrete choice experiment
 * <p>
 * @param ed, The experimental design. An array of JSON objects
 */
var DCE = function(ed) {
  console.log(ed);
  psiTurk.showPage('dce.html');
  psiTurk.recordTrialData({'phase':'DCE', 'status':'begin'});
  // Add test setup information
  psiTurk.recordUnstructuredData('condition', mycondition);
  psiTurk.recordUnstructuredData('counterbalance', mycounterbalance);
  psiTurk.recordUnstructuredData('display', formatters[mycondition].name);
    
  var choice_index = 0;
  
  var setupChoiceTable = function() {
    
    // Add the attribute rows to the table
    for (attr in ed.attr_labels) {
      // Skip this row if we're not showing any carbon information.
      if (mycondition === 0 & attr === 'cf') continue;
      var row_string = '<tr><td id="attr' + attr + '">' + ed.attr_labels[attr] + '</td>';
      for (card in ed.card_labels) {
        row_string += '<td id="' + ed.card_labels[card] + attr + '">1</td>';
      }
      row_string += '</tr>';
      $('#dce_table').find('tbody').append(row_string);
      $('#attr' + attr).tooltip({container: 'body', placement: 'center', title:ed.attr_desc[attr]});
    } 
    
    // Add the radio selector buttons to the bottom of the table
    var radio_string = '<tr><td></td>';
    for (card in ed.card_labels) {
      radio_string += '<td><label><input type="radio" id="' + ed.card_labels[card] 
               + 'radio" name="choice" value="error"></label></td>'
    }
    radio_string += '</tr>';
    $('#dce_table').find('tbody').append(radio_string);
    
  };
  
  var choiceMade = function() {
    return ($('input[name=choice]:checked').val());
  };
  
  var updateChoiceSet = function(i) {
    // Uncheck the radio buttons
    $('input[name=choice]:checked').prop('checked', false);
    $('.progress-bar').css('width', 100*(i+1)/ed.choice_sets.length + '%');
    $('#progresslabel').text('Progress: ' + (i+1) + ' of ' + ed.choice_sets.length);
    
    // Log the next choice situation and get it loaded
    console.log('Progress: ' + (i + 1) + ', Choice Set ' + 
            ed.choice_sets[i].choice_set);
    
    for (card in ed.card_labels) {
      for (attr in ed.attr_labels) {
        // Load the value
        var value = ed.choice_sets[i][card][attr];
        if (value[0] === '/') {
          // This is an image
          $('#' + ed.card_labels[card] + attr).html('<img src="' + ed.choice_sets[i][card][attr] + '"></img>');
        } else {
          $('#' + ed.card_labels[card] + attr).html( value );
        }
      };
      // Update option button value so data is saved according to formatting before randomization
      $('#' + ed.card_labels[card] +'radio').prop('value', 'alt'+ed.choice_sets[i][card]['alt']);
    };

  };
  
  var saveData = function() {
    psiTurk.recordUnstructuredData( 'choiceset' + ed.choice_sets[choice_index].choice_set, 
                $('input[name=choice]:checked').val() );
    console.log('for choiceset ' + ed.choice_sets[choice_index].choice_set + ' user chose ' +
                $('input[name=choice]:checked').val() );
  };
  
  $('#next').click(function() {
    // If a choice hasn't been made, present an alert
    if (!choiceMade()) {
      alert('You must make a selection before proceeding');
    } else if (choice_index >= ed.choice_sets.length-1) {
      // Finished with choice experiment
      saveData();
      console.log('Finished with DCE choices!');
      currentview = new DisplayMethods();
    } else {
      // Save the current choice then load the next one
      saveData();
      choice_index++;
      updateChoiceSet(choice_index);
    }
  });
  
  // Setup choice table and load the first choice set
  setupChoiceTable();
  
  // Load up the first choice set
  updateChoiceSet(choice_index);
  
};

/* Takes an experimental design and formats it for later use */
var formatExperiment = function(data) {
  // Grab just the data for the block, not needed if no blocks
  // data = _.filter(data, function(obj) { return(obj.Block === mycondition + 1); } );
  
  // Shuffle the experimental design and record the new order for later analysis
  data = _.shuffle(data);
  
  var shuffled_order = $.map(data, function(val,i) {
    return(val['Choice.situation']);
  });
  psiTurk.recordUnstructuredData('shuffled_order', shuffled_order);
  
  var formatter = formatters[mycondition].text;
  
  var d = {};
  
  //attrs and descs are arrays of attributes and descriptions for display
  //they are input by experiment number, which is determined by condition and 
  //counterbalance. 
  d.attr_labels = attrs[expNumber];
  
  d.attr_desc = descs[expNumber];
  
  // The labels are the html id's of where the info will go 
  d.card_labels = {alt1: 'card1', alt2: 'card2'};

  d.show_none = false;

  // Loop through each item in the data array and create an output to be used later
  // in showing the choice situation. Randomize the order of cards within a choice set
  d.choice_sets = $.map(data, function(val,i) {
    // Shuffle an array from 1 to the number of cards
    var alts = _.shuffle(_.range(1, _.values(d.card_labels).length+1));
    var set = {};
    for (var j=0; j < alts.length; j++) {
      var name = 'alt' + alts[j];
      //exp_params is a function which takes the val (exp data), index j
      //(alt number), expNumber, the relevant formatter, the array of alts,
      //and returns the proper set of values
      set['alt'+(j+1)] = exp_params(val, j, name, expNumber, formatter, alts);
    }
    set.choice_set = val['Choice.situation'];
    return(set);
  });
  
  return( d );
};




/*******************
 * Run Task
 ******************/
$(window).load( function(){
  
  // Shortcuts to set the condition/counterbalance 
  if (mode === 'debug') {
    // You can enable debug shortcuts like this:
    enable_shortcut('zxc', function() { 
      console.log('Shortcut pressed!');
      var count = parseInt(prompt('Counterbalance Table\n' +
        '0: Shirt\n' +
        '1: Fridge\n' +
        '2: Meat\n' +
        '3: Travel'));
      var cond = parseInt(prompt('Condition Table\n' +
        '0: Null\n' +
        '1: Grams\n' +
        '2: Driving\n' +
        '3: Grey Gradient\n' +
        '4: Color Gradient\n' +
        '5: Low Icon\n' +
        '6: High Icon\n' +
        '7: Factories\n' +
        '8: Leaves'));
      mycondition = cond;
      mycounterbalance = count;
      expNumber = count;
      
      start_exp();
    });
  }

  // Shortcuts for skipping to particular parts of the experiments to speed debugging
  if (mode === 'debug') {
    // You can enable debug shortcuts like this:
    enable_shortcut('wer', function() {
      currentview = new DCE(experiment_data);
    });
    enable_shortcut('asd', function() {
      currentview = new DisplayMethods();
    });
  }

  // Monitor what buttons people click. (Uses jQuery delegated methods, very cool!)
  $(document).on('click', 'button', function() {
    var value = $.trim($(this).text());
    var id = $(this).attr('id');
    console.log(value + ', ' + id);
    psiTurk.recordTrialData({'button_click': value, 'id': id});
  }); 
    
  // Start the experiment!
  var start_exp = function() {
    experiment_parameter_setup(expNumber);
    experiment_data = formatExperiment(exp[expNumber]);

    psiTurk.doInstructions(
      instructionPages,
      function() { 
        currentview = new CheckQuestionnaire(); 
      }
    );    
  };

  start_exp();

});
