// JavaScript Document
CoffeeTimer = {
		config: {
			RefreshInterval: 100000,
			TimerInterval: 1000,
			coffeeHours:   [9, 10, 11, 13, 14, 15, 16],
			coffeeMinutes: [30, 0, 30, 30, 0, 0, 0],
			coffeeBounds: ["L", "L", "U", "L", "L", "L", "L"],
			coffeeMSG: null,
			coffeeTime: null,
			startNotification: 0,
			endNotification: 5,
			startNotify: 1,
			endNotify: 1,
			alarmTimes: 99,
			alarmBox: null,
			alarmMsg: null
		},
		
		init: function( config ){
			var self = CoffeeTimer;
			
			self.config.coffeeMSG = config.coffeeMSG;
			self.config.coffeeTime = config.coffeeTime;
			self.config.alarmBox = config.alarmBox;	
			self.config.alarmMsg = config.alarmMsg;			
			
			var doffset = $(self.config.coffeeMSG).offset();
			var dwidth =  $(self.config.coffeeMSG).width;
			
			$(self.config.alarmBox).css({
				width: dwidth,
				top: doffset.top -75,
				left: doffset.left - 75
			});
			
			self.checkCoffeeTime();
			self.bindEvents();
			
			return;
		},
		
		bindEvents: function(){
			var self = CoffeeTimer;			
			self.coffeeTimerr = setInterval(self.checkCoffeeTime, self.config.TimerInterval);			
			return;
		},
		
		configureCoffeeTimer: function(wakeupHour, wakeupMinute, startNotifyMinute, endNotifyMinute, startNotify, endNotify){
			var self = CoffeeTimer;	
			self.resetCoffeeTimer(wakeupHour, wakeupMinute);
			
			self.config.startNotification = startNotifyMinute;
			self.config.endNotification = endNotifyMinute;
			
			self.config.startNotify = startNotify;
			self.config.endNotify = endNotify;
			return;			
		},
		
		resetCoffeeTimer: function(hours, minutes){
			var self = CoffeeTimer; 			
			hours = parseInt(hours) + 2;
			for( var i=0; i<7; i++ ){
				self.config.coffeeHours[i] = hours;
				if( i === 0 || i === 2 || i === 3 ){
					self.config.coffeeMinutes[i] = minutes;
				}else{
					self.config.coffeeMinutes[i] = 0;
				}
				
				if( i === 2 ){
					hours += 2;
				}else{
					hours++;
				}/// hours setting
			}//for
			console.log(self.config.coffeeHours);
			console.log(self.config.coffeeMinutes);
			return;
		},
		
		checkCoffeeTime: function(){
			var self = CoffeeTimer,
			cDate = new Date();
			
			var cHours = parseInt(cDate.getHours()), cMinutes = parseInt(cDate.getMinutes());
			
			if( ( self.config.coffeeHours.includes( cHours ) && cMinutes >= self.config.coffeeMinutes[ self.config.coffeeHours.indexOf(cHours)] && self.config.coffeeBounds[ self.config.coffeeHours.indexOf(cHours)] === "L" ) || ( self.config.coffeeHours.includes( cHours ) && cMinutes < self.config.coffeeMinutes[ self.config.coffeeHours.indexOf(cHours)] && self.config.coffeeBounds[ self.config.coffeeHours.indexOf(cHours)] === "U" ) ){
				self.config.coffeeMSG.innerHTML = "It's Coffee Time!";
				self.config.coffeeTime.innerHTML = "Coffee Time Ends In: <br>" + self.timeToEndCoffeeTime(self, cDate, cHours, cMinutes) + "<br><small>"+self.nextCoffeeTime(cDate, cHours, cMinutes)+"</small>";
			}else{
				self.config.coffeeMSG.innerHTML = "It's Not Coffee Time! ";
				self.config.coffeeTime.innerHTML = "Coffee Time Starts In: <br>" + self.timeToStartCoffeeTime(self, cDate, cHours, cMinutes);
			}
		},
		
		nextCoffeeTime: function(cDate, cHours, cMinutes){
			var self = CoffeeTimer, strReturn = "";			
			if(self.config.coffeeHours.indexOf(cHours) > 2){
				strReturn = "Next Coffee Time is ";
				strReturn += self.config.coffeeHours[0]>9? self.config.coffeeHours[0]: "0"+self.config.coffeeHours[0];
				strReturn += ":";
				strReturn += self.config.coffeeMinutes[0]>9? self.config.coffeeMinutes[0]: "0"+self.config.coffeeMinutes[0];
				
				strReturn += self.config.coffeeHours[0]>11? " pm" : " am";
			}else{
				strReturn = "Next Coffee Time is ";
				strReturn += self.config.coffeeHours[3]>9? self.config.coffeeHours[3]: "0"+self.config.coffeeHours[3];
				strReturn += ":";
				strReturn += self.config.coffeeMinutes[3]>9? self.config.coffeeMinutes[3]: "0"+self.config.coffeeMinutes[3];
				
				strReturn += self.config.coffeeHours[3]>11? " pm" : " am";
			}
			return strReturn;
		},
		
		reloadTimer: function(){
			var self = CoffeeTimer;
			clearInterval(self.coffeeTimerr);
			location.reload();
		},
		
		timeToStartCoffeeTime: function(self, cDate, cHours, cMinutes){
			var self = CoffeeTimer;
			var strReturn = "", newDate, minutes, hours, seconds, milliseconds, i;
			
			if(self.config.coffeeHours.includes( cHours )){
				if( self.config.coffeeBounds[self.config.coffeeHours.indexOf(cHours)] === "L" ){
					newDate = new Date(cDate.getFullYear(), cDate.getMonth(), cDate.getDate(), self.config.coffeeHours[self.config.coffeeHours.indexOf(cHours)], self.config.coffeeMinutes[self.config.coffeeHours.indexOf(cHours)], 0, 0);
					
					milliseconds = newDate.getTime() - cDate.getTime();
					
					hours = Math.abs( parseInt((milliseconds/1000)/60/60) ); 
					minutes = Math.abs( parseInt((((milliseconds - (hours*60*60*1000) ) /1000)/60)) );					
					seconds = Math.abs( parseInt( ( (( milliseconds - (hours*60*60*1000) ) - (minutes*60*1000) ) /1000) ) );
					
					strReturn = hours < 10 ? "0"+hours +"h " : hours+"h ";	
					strReturn += minutes < 10 ? "0"+minutes+"m " : minutes+"m ";	
					strReturn += seconds < 10 ? "0"+seconds+"s " : seconds+"s";
					
				}else{
					
					if( (self.config.coffeeHours.indexOf(cHours) + 1 ) < self.config.coffeeHours.length ){
						newDate = new Date(cDate.getFullYear(), cDate.getMonth(), cDate.getDate(), self.config.coffeeHours[self.config.coffeeHours.indexOf(cHours) +1 ], self.config.coffeeMinutes[self.config.coffeeHours.indexOf(cHours) + 1], 0, 0);
						milliseconds = newDate.getTime() - cDate.getTime();
						
						hours = Math.abs( parseInt((milliseconds/1000)/60/60) ); 
						minutes = Math.abs( parseInt((((milliseconds - (hours*60*60*1000) ) /1000)/60)) );					
						seconds = Math.abs( parseInt( ( (( milliseconds - (hours*60*60*1000) ) - (minutes*60*1000) ) /1000) ) );
						
						strReturn = hours < 10 ? "0"+hours +"h " : hours+"h ";	
						strReturn += minutes < 10 ? "0"+minutes+"m " : minutes+"m ";	
						strReturn += seconds < 10 ? "0"+seconds+"s " : seconds+"s";
					}
					else{
						newDate = new Date();
						newDate.setDate( cDate.getDate() + 1 );
						
						newDate = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate(), self.config.coffeeHours[0], self.config.coffeeMinutes[0], 0, 0);
						milliseconds = newDate.getTime() - cDate.getTime();
						
						hours = Math.abs( parseInt((milliseconds/1000)/60/60) ); 
						minutes = Math.abs( parseInt((((milliseconds - (hours*60*60*1000) ) /1000)/60)) );					
						seconds = Math.abs( parseInt( ( (( milliseconds - (hours*60*60*1000) ) - (minutes*60*1000) ) /1000) ) );
						
						strReturn = hours < 10 ? "0"+hours +"h " : hours+"h ";	
						strReturn += minutes < 10 ? "0"+minutes+"m " : minutes+"m ";	
						strReturn += seconds < 10 ? "0"+seconds+"s " : seconds+"s";
					}
				}
			}else{
				
				if( cHours < self.config.coffeeHours[0] ){
					newDate = new Date(cDate.getFullYear(), cDate.getMonth(), cDate.getDate(), self.config.coffeeHours[0], self.config.coffeeMinutes[0], 0, 0);
					
					milliseconds = newDate.getTime() - cDate.getTime();
					hours = Math.abs( parseInt((milliseconds/1000)/60/60) ); 
					minutes = Math.abs( parseInt((((milliseconds - (hours*60*60*1000) ) /1000)/60)) );					
					seconds = Math.abs( parseInt( ( (( milliseconds - (hours*60*60*1000) ) - (minutes*60*1000) ) /1000) ) );
					
					strReturn = hours < 10 ? "0"+hours +"h " : hours+"h ";	
					strReturn += minutes < 10 ? "0"+minutes+"m " : minutes+"m ";	
					strReturn += seconds < 10 ? "0"+seconds+"s " : seconds+"s";
					
				}else if( cHours > self.config.coffeeHours[self.config.coffeeHours.length - 1] ){
					
					newDate = new Date();
					newDate.setDate( cDate.getDate() + 1 );
					
					newDate = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate(), self.config.coffeeHours[0], self.config.coffeeMinutes[0], 0, 0);
					milliseconds = newDate.getTime() - cDate.getTime();
					
					hours = Math.abs( parseInt((milliseconds/1000)/60/60) ); 
					minutes = Math.abs( parseInt((((milliseconds - (hours*60*60*1000) ) /1000)/60)) );					
					seconds = Math.abs( parseInt( ( (( milliseconds - (hours*60*60*1000) ) - (minutes*60*1000) ) /1000) ) );
					
					strReturn = hours < 10 ? "0"+hours +"h " : hours+"h ";	
					strReturn += minutes < 10 ? "0"+minutes+"m " : minutes+"m ";	
					strReturn += seconds < 10 ? "0"+seconds+"s " : seconds+"s";	
					
				}else{
					i = 0;
					while( cHours > self.config.coffeeHours[i] ){
						
						i++;
					}
					
					newDate = new Date(cDate.getFullYear(), cDate.getMonth(), cDate.getDate(), self.config.coffeeHours[i], self.config.coffeeMinutes[i], 0, 0);
					milliseconds = newDate.getTime() - cDate.getTime();
					
					hours = Math.abs( parseInt((milliseconds/1000)/60/60) ); 
					minutes = Math.abs( parseInt((((milliseconds - (hours*60*60*1000) ) /1000)/60)) );					
					seconds = Math.abs( parseInt( ( (( milliseconds - (hours*60*60*1000) ) - (minutes*60*1000) ) /1000) ) );
					
					strReturn = hours < 10 ? "0"+hours +"h " : hours+"h ";	
					strReturn += minutes < 10 ? "0"+minutes+"m " : minutes+"m ";	
					strReturn += seconds < 10 ? "0"+seconds+"s " : seconds+"s";
					
				}
				
			}
			self.checkAlarm(hours, minutes, seconds, 1);
			return strReturn;
		},
		
		timeToEndCoffeeTime: function(self, cDate, cHours, cMinutes){
			var self = CoffeeTimer;
			var strReturn = "", newDate, minutes, hours, seconds, milliseconds, i;
			
			if( self.config.coffeeBounds[self.config.coffeeHours.indexOf(cHours)] === "U" ){
					newDate = new Date(cDate.getFullYear(), cDate.getMonth(), cDate.getDate(), self.config.coffeeHours[self.config.coffeeHours.indexOf(cHours)], self.config.coffeeMinutes[self.config.coffeeHours.indexOf(cHours)], 0, 0); 
					
					milliseconds = newDate.getTime() - cDate.getTime();
					
					//hours = Math.floor((milliseconds/1000)/60/60); 
					//minutes = Math.ceil((((milliseconds - (hours*60*60*1000) ) /1000)/60));
					hours = Math.abs( parseInt((milliseconds/1000)/60/60) ); 
					minutes = Math.abs( parseInt((((milliseconds - (hours*60*60*1000) ) /1000)/60)) );					
					seconds = Math.abs( parseInt( ( (( milliseconds - (hours*60*60*1000) ) - (minutes*60*1000) ) /1000) ) );
					
					strReturn = hours < 10 ? "0"+hours +"h " : hours+"h ";	
					strReturn += minutes < 10 ? "0"+minutes+"m " : minutes+"m ";	
					strReturn += seconds < 10 ? "0"+seconds+"s " : seconds+"s";	
					
			}else if( self.config.coffeeBounds[self.config.coffeeHours.indexOf(cHours)] === "L" &&  self.config.coffeeHours.indexOf(cHours) + 1 == self.config.coffeeHours.length){
					newDate = new Date(cDate.getFullYear(), cDate.getMonth(), cDate.getDate(), self.config.coffeeHours[self.config.coffeeHours.indexOf(cHours)], 59, 59, 999); 
					
					milliseconds = newDate.getTime() - cDate.getTime();
					
					hours = Math.abs( parseInt((milliseconds/1000)/60/60) ); 
					minutes = Math.abs( parseInt((((milliseconds - (hours*60*60*1000) ) /1000)/60)) );					
					seconds = Math.abs( parseInt( ( (( milliseconds - (hours*60*60*1000) ) - (minutes*60*1000) ) /1000) ) );
					
					strReturn = hours < 10 ? "0"+hours +"h " : hours+"h ";	
					strReturn += minutes < 10 ? "0"+minutes+"m " : minutes+"m ";	
					strReturn += seconds < 10 ? "0"+seconds+"s " : seconds+"s";
			}else{
				i = self.config.coffeeHours.indexOf(cHours) + 1;
				for(var j = i; j<self.config.coffeeBounds.length; j++){
					if( self.config.coffeeBounds[i] === "L" ){
						i++;
					}
				}
								
				if(self.config.coffeeBounds[i] === "U"){
					newDate = new Date(cDate.getFullYear(), cDate.getMonth(), cDate.getDate(), self.config.coffeeHours[i], self.config.coffeeMinutes[i], 0, 0); 
				}else{
					if( i >= self.config.coffeeBounds.length ){ i = self.config.coffeeBounds.length - 1;}
					newDate = new Date(cDate.getFullYear(), cDate.getMonth(), cDate.getDate(), self.config.coffeeHours[i], 59, 59, 999); 
				}
				
				milliseconds = newDate.getTime() - cDate.getTime();
				
				hours = Math.abs( parseInt((milliseconds/1000)/60/60) ); 
				minutes = Math.abs( parseInt((((milliseconds - (hours*60*60*1000) ) /1000)/60)) );					
				seconds = Math.abs( parseInt( ( (( milliseconds - (hours*60*60*1000) ) - (minutes*60*1000) ) /1000) ) );
				
				strReturn = hours < 10 ? "0"+hours +"h " : hours+"h ";	
				strReturn += minutes < 10 ? "0"+minutes+"m " : minutes+"m ";	
				strReturn += seconds < 10 ? "0"+seconds+"s " : seconds+"s";
				
			}
			self.checkAlarm(hours, minutes, seconds, 2);
			return strReturn;
		},
		
		checkAlarm: function(hours, minutes, seconds, startendFlag){ 
			var self = CoffeeTimer;			
			if(self.config.startNotify == 1 && startendFlag == 1){
				if(hours == 0 && minutes == self.config.startNotification && (seconds >=0 && seconds<2)   && self.config.alarmTimes >= 30){
					var msg = minutes > 0? "Coffee time is starting in "+ minutes+" minutes!" : "It's Coffee Time!";
					self.playAlarm(msg);
				}
			}
			else if(self.config.endNotify == 1 && startendFlag == 2){
				if(hours == 0 && minutes == self.config.endNotification && (seconds >=0 && seconds<2) && self.config.alarmTimes >= 30){
					var msg = "Coffee time is ending in "+ minutes+" minutes!";
					self.playAlarm(msg);
				}
			}
		},
		
		playAlarm: function(msg){
			var self = CoffeeTimer;
			self.config.alarmTimes = 0;
			self.playSound();
			//alert(msg);
			$(self.config.alarmMsg).html(msg);
			$(self.config.alarmBox).show();
		},
		
		silentAlarm: function(){
			var self = CoffeeTimer;
			self.config.alarmTimes = 99;
			return;			
		},
		
		stopAlarm: function(){
			var self = CoffeeTimer;
			self.config.alarmTimes = 99;
			$(self.config.alarmBox).hide();
			return;			
		},
		
		playSound: function(){
			var self = CoffeeTimer;
			var volume=5, sound="default";
			if (self.config.alarmTimes < 30){
				//check if browser supports ogg file type (only IE doesnt)
				if ((new Audio()).canPlayType("audio/ogg; codecs=vorbis")){
					//real browser
					var audio = new Audio("sounds/" + sound + ".ogg");
				}else{
					//IE	
					var audio = new Audio("sounds/" + sound + ".mp3");
				}	
				audio.load();
				audio.volume = parseInt(volume)/10;
				audio.play();	
				self.config.alarmTimes++;
				//play alarm again
				setTimeout(function(){self.playSound();}, 4000);							
			}
		}
	};