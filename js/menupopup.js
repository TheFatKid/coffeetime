// JavaScript Document
var globalDeviceType = 0;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	globalDeviceType = 1;
}

var menuIcon, menuDiv, menuHandle, menuItems, menuItem, menuItemImg, popUpDiv, staticMsgDiv, popUpCloseDiv, popUpOverlayDiv, popUpDataDiv, coffeeMsgDiv, coffeeTimeDiv, displayTimerDiv;	
	
function showMenu(){	
	if( menuDiv.css('display') === "none" ){		
		
		menuDiv.slideToggle(400, function(){
				menuItems.slideDown(200);
				menuHandle.slideDown(200);
			});
		menuIcon.animate({width:'toggle'}, 100);
		
		}else{
			menuItems.slideUp(200);			
			menuDiv.animate({width:'toggle'}, 400, function(){
				menuIcon.animate({width:'toggle'}, 400);
			});
			menuHandle.slideUp(200);
		}
}

function showPopUp(){
	if(globalStartUpFlag){
		globalStartUpFlag = false;
		popUpDataDiv.html($("div#userSettings").html());
		if(globalDeviceType === 0){
			popUpOverlayDiv.show();
		}
		popUpDiv.show();
	}
	else{
		if( popUpDiv.css('display') === "none" ){		
			var elemid = $(this).attr("id");
			if(elemid === "showMSG"){
				popUpDataDiv.html(staticMsgDiv.html());
			}else if(elemid === "showBenefits"){
				popUpDataDiv.html($("div#showBenefitsTxt").html());
			}else if(elemid === "showPrefference"){
				
				if(cookiesEnabled()){
					popUpDataDiv.html($("div#userSettings").html());
					populateUserSettings();
				}else{
					popUpDataDiv.html("<strong>To use this feature, please enable coockies.</strong>");
				}
				
			}else{
				popUpDataDiv.html(globalMsgTxt);
			}
			if(globalDeviceType === 0){
				popUpOverlayDiv.show();
			}
			popUpDiv.show();
			
		}else{
			popUpDiv.hide();
			popUpOverlayDiv.hide();
			
		}
	}
}

function addStyleClasses(){
	if(globalDeviceType === 1){
		menuIcon.addClass("optionsMenuIconHHD");
		popUpDiv.addClass("popUpHHD");
		popUpCloseDiv.addClass("popUpCloseHHD");
		menuHandle.addClass("optionsMenuHandleHHD");
		menuItemImg.addClass('menuItemImgHHD');
		menuItem.addClass('menuItemHHD');
		
		menuDiv.css({
					width: "100vw"
				});
		if(document.documentElement.clientHeight > document.documentElement.clientWidth){
			coffeeMsgDiv.addClass("coffeeMsgHHDh");
			coffeeTimeDiv.addClass("coffeeTimeHHDh");
			displayTimerDiv.addClass("displayTimerHHDh");
		}else{
			//if(document.documentElement.clientHeight > document.documentElement.clientWidth){
			coffeeMsgDiv.addClass("coffeeMsgHHDw");
			coffeeTimeDiv.addClass("coffeeTimeHHDw");
			displayTimerDiv.addClass("displayTimerHHDw");
		}
		
	}else{
		menuIcon.addClass("optionsMenuIconBS");
		popUpDiv.addClass("popUpBS");
		popUpCloseDiv.addClass("popUpCloseBS");
		menuHandle.addClass("optionsMenuHandleBS");
		menuItemImg.addClass('menuItemImgBS');
		menuItem.addClass('menuItemBS');
		
		coffeeMsgDiv.addClass("coffeeMsgBS");
		coffeeTimeDiv.addClass("coffeeTimeBS");
		displayTimerDiv.addClass("displayTimerBS");
		
		menuDiv.css({
					width: "20vw"
				});
	}
}

function setEvents(){
	menuIcon =  $('div#optionsMenuIcon'),
	menuDiv = $('div#optionsMenu'),
	menuHandle = $('div#optionsMenuHandle'),
	menuItems = $('ul.menuItems'),
	menuItem = $('li.menuItem'),
	menuItemImg = $('img.menuItemImg');
	popUpDiv = $('div#popUp');
	popUpCloseDiv = $('div#popUpClose');
	staticMsgDiv = $('div#staticMsg');
	popUpOverlayDiv = $('div#popUpOverlay');
	popUpDataDiv = $('div#popUpData');	
	
	coffeeMsgDiv = $('div#coffeeMsg');
	coffeeTimeDiv = $('div#coffeeTime');
	displayTimerDiv = $('div#displayTimer');
	
	addStyleClasses();
	menuIcon.on('click', showMenu);
	menuHandle.on('click', showMenu);
	$("li#showMSG").on('click', showPopUp);
	$("li#showBenefits").on('click', showPopUp);
	$("li#showPrefference").on('click', showPopUp);
	popUpCloseDiv.on('click', showPopUp);
}