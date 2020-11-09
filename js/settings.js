// JavaScript Document

function cookiesEnabled(){
	if(!navigator.cookieEnabled){
		return false;
	}else{
		globalIsCookieEnabled = true;
		return true;
	}
}

function setLocalVar(property, value){
	var appname = "coffeetimer";
	
	if (('localStorage' in window) && window.localStorage !== null) {
	  localStorage.setItem(appname + ":" + property, value);
	}else{
	  var date = new Date();
	  date.setTime(date.getTime()+(365*24*60*60*1000));
	  var expires = date.toGMTString();
	  var cookiestr = appname + ":" + property + '="' + escape(value) + '"; expires='+expires+'; path=/';
	  document.cookie = cookiestr;
	}
}

function getLocalVar(property){
	var appname = "coffeetimer";
	if (('localStorage' in window) && window.localStorage !== null){
		return localStorage.getItem(appname + ":" + property);		
	}else{
		var c_value = document.cookie;
		var c_start = c_value.indexOf(" " + appname + ":" + property + "=");
		if (c_start == -1){
			c_start = c_value.indexOf(appname + ":" + property + "=");
		}
		if (c_start == -1){
			c_value = null;
		}else{
			c_start = c_value.indexOf("=", c_start) + 1;
			var c_end = c_value.indexOf(";", c_start);
			if (c_end == -1){
				c_end = c_value.length;
			}
			c_value = unescape(c_value.substring(c_start, c_end));
		}
		return c_value;
	}
}

function loadUserSettings(){
	
	return Array(getLocalVar("wakeupHour"), getLocalVar("wakeupMinute"), getLocalVar("startNotification"), getLocalVar("endNotification"), getLocalVar("startNotify"), getLocalVar("endNotify"));
	
}

function saveDefaultSettings(){
	setLocalVar("wakeupHour", 7); 
	setLocalVar("wakeupMinute", 30); 
	setLocalVar("startNotification", 0); 
	setLocalVar("endNotification", 5);
	setLocalVar("displayStartupSettings", true);
	setLocalVar("startNotify", 1);
	setLocalVar("endNotify", 1); 
}

function startUpApp(){	
	if(cookiesEnabled()){
		if( getLocalVar("wakeupHour") !== null ){
			
			globalUserSettings = loadUserSettings();
			if( getLocalVar("displayStartupSettings") != "false"){ 
				globalStartUpFlag = true;
				showPopUp();
			}
			
		
		}else{
			globalUserSettings[0] = 7;
			globalUserSettings[1] = 30;
			globalUserSettings[2] = 0;
			globalUserSettings[3] = 5;
			globalUserSettings[4] = 1;
			globalUserSettings[5] = 1;			
			saveDefaultSettings();
			globalStartUpFlag = true;
			showPopUp();
		}
		
		
		
	}else{
		globalMsgTxt = "This app utilizes Cookies to serve your preferences. Please enable cookies in your browser settings.";
		showPopUp();
	}
	
	
	CoffeeTimer.configureCoffeeTimer(globalUserSettings[0], globalUserSettings[1], globalUserSettings[2], globalUserSettings[3], globalUserSettings[4], globalUserSettings[5]);
}

function populateUserSettings(){
	
	if( getLocalVar("wakeupHour") !== null ){
		$("select#wakeuphour").val(getLocalVar("wakeupHour"));
		$("select#wakeupminute").val(getLocalVar("wakeupMinute"));		
		$("select#notifybeforeminute").val(getLocalVar("startNotification"));		
		$("select#notifyafterminute").val(getLocalVar("endNotification"));
		
		if(getLocalVar("startNotify") == 1){
			$("input#notifybefore").prop('checked', true);
		}else{
			$("input#notifybefore").prop("checked", false);
		}
		
		if(getLocalVar("endNotify") == 1){
			$("input#notifyafter").prop('checked', true);
		}else{
			$("input#notifyafter").prop("checked", false);
		}
		
		if(getLocalVar("displayStartupSettings") == "true"){
			$("input#showStartupSettings").prop("checked", true);
		}else{
			$("input#showStartupSettings").prop("checked", false);
		}
	}
	
}

$(document).on('change', 'select#wakeuphour', function(){
			setLocalVar("wakeupHour", this.value); 
			CoffeeTimer.configureCoffeeTimer(this.value, getLocalVar("wakeupMinute"), getLocalVar("startNotification"), getLocalVar("endNotification"), getLocalVar("startNotify"), getLocalVar("endNotify"));
		});
$(document).on('change', 'select#wakeupminute', function(){
			setLocalVar("wakeupMinute", this.value); 
			CoffeeTimer.configureCoffeeTimer(getLocalVar("wakeupHour"), this.value, getLocalVar("startNotification"), getLocalVar("endNotification"), getLocalVar("startNotify"), getLocalVar("endNotify"));
		});		
$(document).on('change', 'select#notifybeforeminute', function(){
			setLocalVar("startNotification", this.value); 
			CoffeeTimer.configureCoffeeTimer(getLocalVar("wakeupHour"), getLocalVar("wakeupMinute"), this.value, getLocalVar("endNotification"), getLocalVar("startNotify"), getLocalVar("endNotify"));
		});
$(document).on('change', 'select#notifyafterminute', function(){
			setLocalVar("endNotification", this.value); 
			CoffeeTimer.configureCoffeeTimer(getLocalVar("wakeupHour"), getLocalVar("wakeupMinute"), getLocalVar("startNotification"), this.value, getLocalVar("startNotify"), getLocalVar("endNotify"));
		});		


$(document).on('click', 'input#notifybefore', function(){
			if(this.checked){
				setLocalVar("startNotify", 1);
				CoffeeTimer.configureCoffeeTimer(getLocalVar("wakeupHour"), getLocalVar("wakeupMinute"), getLocalVar("startNotification"), getLocalVar("endNotification"), 1, getLocalVar("endNotify")); 
			}else{ 
				setLocalVar("startNotify", 0); 
				CoffeeTimer.configureCoffeeTimer(getLocalVar("wakeupHour"), getLocalVar("wakeupMinute"), getLocalVar("startNotification"), getLocalVar("endNotification"), 0, getLocalVar("endNotify"));
			} 
		});		
$(document).on('click', 'input#notifyafter', function(){
			if(this.checked){
				setLocalVar("endNotify", 1);
				CoffeeTimer.configureCoffeeTimer(getLocalVar("wakeupHour"), getLocalVar("wakeupMinute"), getLocalVar("startNotification"), getLocalVar("endNotification"), getLocalVar("startNotify"), 1); 
			}else{ 
				setLocalVar("endNotify", 0);
				CoffeeTimer.configureCoffeeTimer(getLocalVar("wakeupHour"), getLocalVar("wakeupMinute"), getLocalVar("startNotification"), getLocalVar("endNotification"), getLocalVar("startNotify"), 0);
			} 
		});
$(document).on('click', 'input#showStartupSettings', function(){
			if(this.checked){
				setLocalVar("displayStartupSettings", true); 
			}else{ setLocalVar("displayStartupSettings", false); } 
		});				

function silentNotificationAlarm(){
	CoffeeTimer.silentAlarm();
}

function stopNotificationAlarm(){
	CoffeeTimer.stopAlarm();
}