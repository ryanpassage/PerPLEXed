/*
 * background.js
 * 
 */

//var API_URL = "http://api.cmwa.local:5000/test?member=" + member_number + "&badge=" + badge_number;
var API_URL = "http://api.cmwa.com/plex/get"

function contentMessage(message, callback = null) {
	// send a message to the content script.  just easier than repeating the same 3 lines of code
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, message, callback);
	});
}

function getLogin(member_number, badge_number) {
	var path = '/' + member_number + '/' + badge_number;

	var xhr = new XMLHttpRequest();
	xhr.open("GET", API_URL + path, true);

	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			var response = JSON.parse(xhr.responseText);
			var responseT = xhr.responseText;

			console.log("getLogin XHR: ");
			console.log(response);

			if (response.success) {
				contentMessage({name: "sendingLogin", loginInfo: response});
			}
			else {
				contentMessage({name: "xhrFailure", error: response.error || "Unknown error."});
			}
		}
	}

	try {
		xhr.send(null);
	}
	catch (e) {
		console.error("XHR error: " + e);
	} 
}

chrome.runtime.onMessage.addListener(function (message) {
	if (message.name == "popupLoginClicked") {
		getLogin(message.member_number, message.badge_number);
	}
});


// listen for events
chrome.runtime.onInstalled.addListener(function(detail) {
	console.log("Extension installed.");
	// create an alarm to run this extension every 1 minute to check for loggedIn state?
});

