// Copyright (c) 2014 8pecxstudios

//Options settings rebuilt 28/09/2014

var Cc = Components.classes;
var Ci = Components.interfaces;
var Cu = Components.utils;

var ServicesPrefs = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefService).getBranch("general.useragent.");
var ServicesPref = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefService).getBranch("extensions.language_manager.");

//Get string sets to localised content.
var localisedContent = Cc["@mozilla.org/intl/stringbundle;1"].getService(Ci.nsIStringBundleService); 
var _bundleOptionsWindow = localisedContent.createBundle("chrome://LanguageManager/locale/options.properties");

//Version Detection Preference
var browserVersionDetection= ServicesPref.getBoolPref("versiondetection");	
	
var gLanguageMangerOptions = {

init: function(){

try{

//Localise Content	
		var navBarTitle = document.getElementById("NavTitle");
		var navBarSupport = document.getElementById("NavSupport");
		var navBarContact = document.getElementById("NavContact");
		//var navBarOffcanvasFAQ = document.getElementById("OffcanvasFAQ");
		var OptionsPanelTitle = document.getElementById("OptionsPanel");
		var OptionsSelectBrowser = document.getElementById("SelectBrowser");
				var OptionsSelectBrowserMenuCF = document.getElementById("form-cyberfox-mode");
				var OptionsSelectBrowserMenuFF = document.getElementById("form-firefox-mode");
				var OptionsSelectBrowserMenuFFB = document.getElementById("form-firefoxbeta-mode");
		var OptionsButtonReset = document.getElementById("resetLanguage");				
		var OptionsBrowserDetection = document.getElementById("form-version-detection-label");
		var CopyrightLabel = document.getElementById("labelCopy");
		
		document.title = _bundleOptionsWindow.GetStringFromName("lmOptionsTitle");
		navBarTitle.innerHTML = _bundleOptionsWindow.GetStringFromName("lmOptionsNavBarTitle");		
		navBarSupport.innerHTML = _bundleOptionsWindow.GetStringFromName("lmOptionsNavBarSupport");
		navBarContact.innerHTML = _bundleOptionsWindow.GetStringFromName("lmOptionsNavBarContact");
		//navBarOffcanvasFAQ.innerHTML = _bundleOptionsWindow.GetStringFromName("lmOptionsNavBarOffcanvasFAQ");
		OptionsPanelTitle.innerHTML = _bundleOptionsWindow.GetStringFromName("lmOptionsPanelTitle");
		OptionsSelectBrowser.innerHTML = _bundleOptionsWindow.GetStringFromName("lmSelectBrowser");
				OptionsSelectBrowserMenuCF.innerHTML = _bundleOptionsWindow.GetStringFromName("lmSelectBrowserMenuCF");
				OptionsSelectBrowserMenuFF.innerHTML = _bundleOptionsWindow.GetStringFromName("lmSelectBrowserMenuFF");
				OptionsSelectBrowserMenuFFB.innerHTML = _bundleOptionsWindow.GetStringFromName("lmSelectBrowserMenuFFB");
		OptionsButtonReset.innerHTML = _bundleOptionsWindow.GetStringFromName("lmCurrentLanguageReset");	
		OptionsBrowserDetection.innerHTML = _bundleOptionsWindow.GetStringFromName("lmBrowserDetection");
		CopyrightLabel.innerHTML = _bundleOptionsWindow.GetStringFromName("lmCopyright");
		
//Browser Version Detection	
var browserVersionDetectionPreference = document.getElementById("form-version-detection");
	
//Firefox Mode	
var firefoxModePreference = document.getElementById("form-firefox-mode");

//Browser Information			
var browserAppInformation = Components.classes["@mozilla.org/xre/app-info;1"]
			.getService(Components.interfaces.nsIXULAppInfo); 	

						
		//Check if browser Cyberfox
		if (browserAppInformation.name.toLowerCase() === "Cyberfox".toLowerCase()) {
		     ServicesPref.setCharPref("browser_mode", "cyberfoxmode");
		     firefoxModePreference.setAttribute('disabled', true);
		}

		//Check if browser Firefox
		if (browserAppInformation.name.toLowerCase() === "Firefox".toLowerCase()) {
			
			if (ServicesPref.getBoolPref("firefoxfirstrun") === false){
					ServicesPref.setCharPref("browser_mode", "firefoxmode");
					ServicesPref.setBoolPref("firefoxfirstrun", true);
				}
				
			document.getElementById("form-cyberfox-mode").setAttribute('disabled', true);		
				
		}
		
		//Set checkbox state based on preference value
		if (ServicesPref.getBoolPref("versiondetection")){
		    browserVersionDetectionPreference.setAttribute("checked", "checked");
		}

		switch (ServicesPref.getCharPref("browser_mode")) {

		    case "cyberfoxmode":
				document.getElementById("form-browser-select").value = "browser_cyberfox";
				document.getElementById("form-browser-select").setAttribute('disabled', true);
		        document.getElementById("form-firefoxbeta-mode").setAttribute('disabled', true);
		        break;

		    case "firefoxmode":
				document.getElementById("form-browser-select").value = "browser_firefox";
		        browserVersionDetectionPreference.setAttribute("disabled", true);
		        break;

		    case "firefoxbetamode":
				document.getElementById("form-browser-select").value = "browser_beta";
		        browserVersionDetectionPreference.setAttribute("disabled", true);
		        break;

		}
		
	document.getElementById("current-locale").innerHTML = _bundleOptionsWindow.GetStringFromName("lmCurrentLanguage") +" "+ "<strong>" + ServicesPrefs.getCharPref("locale").toString() + "</strong>";	

			}catch (e){
				//Catch any nasty errors and output to dialogue and console
				alert("Were sorry but something has gone wrong! " + e);
		}
	
},
		
		
browserVersionDetectionCheckbox: function() {

	try{
		
		if (ServicesPref.getBoolPref("versiondetection")){	
				ServicesPref.setBoolPref("versiondetection",false);		
		}else{
				ServicesPref.setBoolPref("versiondetection", true);
		}			
			}catch (e){
				//Catch any nasty errors and output to dialogue and console
				alert("Were sorry but something has gone wrong! " + e);
		}
},

browserModeChanged: function(){

	try{
	
        switch (document.getElementById("form-browser-select").value) {
        
            case "browser_cyberfox":
                ServicesPref.setCharPref("browser_mode", "cyberfoxmode");
            break;
 
            case "browser_firefox":
                ServicesPref.setCharPref("browser_mode", "firefoxmode");
                break;

            case "browser_beta":
                ServicesPref.setCharPref("browser_mode", "firefoxbetamode");
                break;

        }
		
			}catch (e){
				//Catch any nasty errors and output to dialogue and console
				alert("Were sorry but something has gone wrong! " + e);
		}		

},

restoreDefaultLanguage: function(){

	try{
		//Clear Locale 
		ServicesPrefs.clearUserPref("locale");

		//Refresh Preference
		var container = document.getElementById("form-clear-locale");
			var content = container.innerHTML;
				container.innerHTML= content;
			
			}catch (e){
				//Catch any nasty errors and output to dialogue and console
				alert("Were sorry but something has gone wrong! " + e);
		}			

	}
				
}

window.addEventListener("load", function () { gLanguageMangerOptions.init(); }, false);
	
