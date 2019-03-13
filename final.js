var showDebug = true; //Debug On/Off 

var swOn = false; //stopwatch is running
var swRun; //interval timer for stopwatch
var swMin = 0; //stopwatch minutes
var swSec = 0; //stopwatch seconds
var swHun = 0; //stopwatch hundredths
var timeNew = "new"; //state of the timer
var timeInput; //user input time
var cdRun; //interval for timer
var secCount = 1; //output seconds
var minCount = 1; //output minutes
var cdMin = 0; //countdown minutes
var cdSec = 0; //countdown seconds
var cdHun = 0; //countdown hundredths

//stopwatch functions
function swStart() { //fxn when start/pause button is clicked
	 if (showDebug) {
		var outputText = "Stopwatch started";
			addEventOutputTracking("Event", outputText, "");
	}
	if (swOn == false) { //if stopped, start 
		swOn = true; 
			document.getElementById("swStart").innerHTML = "Pause";
			document.getElementById("swReset").innerHTML = "Reset";
				swRun = setInterval(swIncrement, 10); //interval timer increments every 10ms
					if (showDebug) {
						var outputText = "Stopwatch started";
							addEventOutputTracking("Function swStart()", outputText, "");
							return;
					}
	}
	else { //if running, pause
		clearInterval(swRun);
			swOn = false;
				document.getElementById("swStart").innerHTML = "Start";
				document.getElementById("swReset").innerHTML = "Reset";
					if (showDebug) {
						var outputText = "Stopwatch paused";
							addEventOutputTracking("Action", outputText, "");
							return;
		}
	}
}

function swIncrement() { //increment every 10ms
		swHun++;
			if (swHun == 100) { //reset hundredths to 0, increment seconds by 1
				swHun = 0;
				swSec++;
			}
				if (swSec == 60) { //reset seconds to 0, increment minutes by 1
					swSec = 0;
					swMin++;
				}
	
					if (swMin == 99 && swSec == 99 & swHun == 99) { //stops at 99:99:99
						clearInterval(swRun);
						
						}
	
	var m = swMin; //minute output 
	var s = swSec; //second output 
	var h = swHun; //hundreth output 
	
		if (swMin < 10) m = "0" + swMin; 
		if (swSec < 10) s = "0" + swSec; 
		if (swHun < 10) h = "0" + swHun; 
		
			document.getElementById("swDisplay").innerHTML = m + ":" + s + ":" + h; //output 
}

function swReset() { //reset the stopwatch
	if (showDebug) {
		var outputText = "Function swReset() Stopwatch Reset";
			addEventOutputTracking("User click", outputText, "");
	}
			document.getElementById("swReset").innerHTML = "Reset";
				swMin = 0;
				swSec = 0;
				swHund = 0;
				
	if (swOn == true) {
		clearInterval(swRun);
		swRun = setInterval(swIncrement, 10); 
	}
		document.getElementById("swDisplay").innerHTML = "00:00:00";
}

//countdown functions

function validateInput() { //regex validate input
	if (showDebug) {
		var outputText = " validateInput() was called.";
			addEventOutputTracking("Function", outputText, "");
	}
	
	if (timeNew == "new" && timeNew != "done") { 
		timeInput = document.getElementById("timeInput").value;
			var regex = /^\d{2}:\d{2}:\d{2}$/;
				cdMin = timeInput.substring(0,2); 
				cdSec = timeInput.substring(3,5); 
				cdHun = timeInput.substring(6); 
	   
		if (regex.test(timeInput) && ((cdMin <= 9 && cdSec <= 59)|| (cdMin == 10 && cdSec == 0 && cdHun ==0))){ //true 
	    		if (showDebug) {
					var outputText = "Countdown timer input " + timeInput + " is valid";
						addEventOutputTracking("Input validated", outputText, "");
					}
						document.getElementById("cdDisplay").innerHTML = timeInput;
						
						if (showDebug) {
							var outputText = "Countdown timer set to " + timeInput;
								addEventOutputTracking("Countdown timer display updated", outputText, "");
							}
							document.getElementById("timeInput").innerHTML = "Countdown Timer is running";
	    						cdTime(); //go to countdown timer fxn
	    						swDisable(); //hide stopwatch
	    					}
	   					 		else {
	    								if (showDebug) {
											var outputText = "Countdown timer input " + timeInput + " invalid";
											alert("Input invalid");
											addEventOutputTracking("Input invalid", outputText, "");
										}
									}
								}
								
										else cdTime(); //go to cdTime fxn
} //end fxn validateInput()

//countdown timer fxn
function cdTime() { 
	if (showDebug) {
		var outputText = "Countdown Timer started";
		addEventOutputTracking("User Event", outputText, "");
	}
		if (timeNew == "done") { //if user clicks the start button after time has finsihed
			if (showDebug) {
				var outputText = "Countdown is finished";
					addEventOutputTracking("Start Timer button clicked", outputText, "");
				}
				document.getElementById("timePrompt").innerHTML = "Please click reset all to start a new timer";
				document.getElementById("validate").innerHTML = "";
				return;
			}
				if ((timeNew == "new" || timeNew == "off")) { //if stopped, start unless it's done
					timeNew = "on"; 
					cdRun = setInterval(timeDown, 10); //timer to increment every 10ms
							
							if (showDebug) {
								var outputText = "Countdown started";
									addEventOutputTracking("User Event", outputText, "");
									return;
								}
			}
				else { //if running, pause 
					clearInterval(cdRun);
					timeNew = "off";
					
						if (showDebug) {
							var outputText = "Countdown time is " + timeNew + ".";
							addEventOutputTracking("Action", outputText, "");
							return;
						}
			}
	}

function timeDown() { //decrement time 
	cdHun--;
		if (cdHun == -1) { //reset hundredths after reaching 0, decrement seconds by 1
			cdHun = 99;
			secCount++; 
			cdSec--;
	}
				if (cdSec == -1) { //reset seconds after reaching 0, decrement minutes by 1
					cdSec = 59;
					minCount++; 
					cdMin--;
				}
	
						if (cdMin == 0 && cdSec == 0 && cdHun ==0) {
							clearInterval(cdTime);
								timeNew = "done";
									document.getElementById("cdDisplay").innerHTML = "Countodwn Finished"; //alert countdown done
									alert("Your countdown time of " + timeInput + " is finished!");
									
										if (showDebug) {
											var outputText = "Countdown is finished!";
												addEventOutputTracking("Timer finished", outputText, "");
											}	
											return;
}
	//output formatting
	var M = cdMin; 
	var S = cdSec; 
	var H = cdHun; 
	if (cdMin < 10 && minCount != 1) M = "0" + cdMin; 
	if (cdSec < 10 && secCount != 1) S = "0" + cdSec; 
	if (cdHun < 10) H = "0" + cdHun; 
	document.getElementById("cdDisplay").innerHTML = M + ":" + S + ":" + H; 
}

function cdDisable() {
		document.getElementById("cdArea").style.visibility = "hidden"; //hide when sw running
}

function swDisable() {
		document.getElementById("swArea").style.visibility = "hidden"; //hide when timer running
}
	
//debug output	
function addEventOutputTracking(eventName, outputText, extraText) {
	
	var node = document.getElementById("debugOutput"); 
	var pChildNode = document.createElement("p"); //new element that will be child of node
	node.appendChild(pChildNode); //adding p element as child of div
	pChildNode.appendChild(document.createTextNode("Event: " + eventName + " - " + outputText + " " + extraText)); //adding text to new p element
	
} //end fxn addEventOutputTracking

//onload fxns
window.onload = function() {
	document.getElementById("swStart").onclick = function(evt) { //sw start/pause button
		if (showDebug) {
			var outputText = "Start button was clicked.";
			addEventOutputTracking("onClick", outputText, "");
		}
		swStart(); //start sw fxn
		cdDisable(); //hide countdown timer
	} 
	
	document.getElementById("swReset").onclick = function(evt) { //stopwatch reset button
		if (showDebug) {
			var outputText = "swReset button was clicked.";
			addEventOutputTracking("onClick", outputText, "");
		}
		swReset() //reset sw fxn
	} 

	document.getElementById("startTime").onclick = function(evt) { //countdown timer start/pause button
		if (showDebug) {
			var outputText = "Start Timer button was clicked.";
			addEventOutputTracking("User Event", outputText, "");
		}
		validateInput(); //validate input
	} 

	if (showDebug) document.getElementById("debugOnOff").innerHMTL = "Debug is On";
		else document.getElementById("debugOnOff").innerHTML = "Debug is off";
	
	document.getElementById("debugOnOff").onclick = function(evt) { 
		if (showDebug) { 
			showDebug = false;
				document.getElementById("debugOnOff").innerHTML = "Debug is Off";
					addEventOutputTracking("onclick", "debugOnOff", " - Debugging turned OFF");
			
				} else { //show debug off, turn on
					showDebug = true;
						document.getElementById("debugOnOff").innerHTML = "Debug is On";
							addEventOutputTracking("onclick", "debugOnOff", " - Debugging turned ON");
						}
	} 
	
	document.getElementById("hideDebug").onclick = function(evt) { //onclick fxn hide debug area	
		showDebug = false;
			document.getElementById("debugOutput").style.visibility = "hidden";
			document.getElementById("hideDebug").style.visibility = "hidden";
			document.getElementById("debugOnOff").style.visibility = "hidden";
	} 
	
} // end window.onload

function refreshPage(){ //reset to show both timers and debug area
    window.location.reload();
} //end fxn reset output




































