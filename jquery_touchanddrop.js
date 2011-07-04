// jQuery Touch And Drop 1.1
// 
// Developed By Brian Notess http://briannotess.com
// This plugin is based on jQuery WipeTouch 1.0.0 Developed  by Devv: http://devv.com and
// EasyDrag 1.4 - Drag & Drop jQuery Plug-in  http://fromvega.com// 
// 
// 
// USAGE
// $(selector).touchAndDrop(options);
// 
// 
// Your options in this version are limited to:
//
// onDrop: a function to be executed when the touch event ends
// minMove: an integer value that requires the element to be moved a minimum amount before the onDrop executes.
// 
// EXAMPLE
//		$('.touchme').touchAndDrop({
//				onDrop: function() {alert('Dropped'},
//				minMove: 15
//			});
//		
//
// For More info visit www.freshroastcreative.com/touchanddrop
//
// V1.1 added argument to "onDrop" function that passes back the active node element

(function($) {
	var actNode = null; //init variable for storing active node object.

	$.fn.touchAndDrop = function(options) {
	
	//Sets up Defaults Object 	
 	var defaults = {
		actNode: null,
		stopProp: false,
    	onDrop: null,
    	minMove: 20
    
	}; // end defaults
 	 		 
 	//Combines defaults with your options 		 
 	var opts = $.extend({}, defaults, options);		 	
 	 		 	
   	var isMoving = false; //variable to determine if element is moving. 	

		    		
	return this.each(function(){
		//sets up position object to store event position data
		var pos = $.extend({
    		 startX: null,
    		 startY: null,
    		 curX: null,// keeps touch X position while moving on the screen
			 curY: null, // keeps touch Y position while moving on the screen
			 lastTouchX: null,
			 lastTouchY: null,
			 offsetX: null,
			 offsetY: null
    	});	
			
		function onTouchStart(e){
			if (opts.stopProp) {
				e.stopPropagation();
			}
			
			actNode = $(this); //assign active node opbject
			
			//set event position data on touchstart
			pos.startX = e.touches[0].pageX;
			pos.startY = e.touches[0].pageY;
			pos.curX = pos.startX;
			pos.curY = pos.startY;
			pos.lastTouchX = pos.curX;// 
			pos.lastTouchY = pos.curY;
			
			isMoving = true;//set up touchmove event
			this.addEventListener('touchmove', onTouchMove, false);
			
			pos.offsetY  = this.offsetTop;//store element offset values
			pos.offsetX = this.offsetLeft;
						
														
					
		}
		
		function onTouchMove(e)
			{
				
				e.preventDefault()//prevent scrolling 
	
				if (isMoving)
				{
					//update elements current position
					pos.curX = e.touches[0].pageX;
					pos.curY = e.touches[0].pageY;
					
					//positions element during move
					var spanX = (pos.curX - pos.lastTouchX);
					var spanY = (pos.curY - pos.lastTouchY);
					
					//allow absolute positioning.
					$(this).css("position", "absolute");

					// set z-index
					$(this).css("z-index", "10000");
					
					//updates elements CSS as it is dragged
					$(this).css({ "left": (spanX + pos.offsetX) + "px", "top": (spanY+ pos.offsetY)+ "px" });
									
				}
			}
		function onTouchEnd(e)
			{
			
				
				//calculates if minimum drag requirement is met
				if ((Math.abs(pos.curX - pos.startX) < opts.minMove) && (Math.abs(pos.curY - pos.startY) < opts.minMove))  {
					//do nothing
				}
				else {
				
					this.removeEventListener('touchmove', onTouchMove, false);
					isMoving = false;	
				
					//calls function
					opts.onDrop(actNode); //passes active node object back as an argument. 
										
				
				}
				
				
			}
							
			//Set up touch event listeners. 
			this.addEventListener('touchstart', onTouchStart, false);
			this.addEventListener('touchend', onTouchEnd, false);		
			
												
		});				 
		
	}

})(jQuery);