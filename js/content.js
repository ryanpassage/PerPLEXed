
chrome.runtime.onMessage.addListener(function (message) {
	console.log("content.js received message: " + message.name);

	if (message.name == "sendingLogin") {
		// dump the info into the Plex login form
		document.getElementById('txtUserID').value = message.loginInfo.login.user_id;
		document.getElementById('txtPassword').value = message.loginInfo.login.password;
		document.getElementById('txtCompanyCode').value = 'cmw-a';
	}
	else if (message.name == "clearAll") {
		console.log('received clearAll');
		document.getElementById('txtUserID').value = "";
		document.getElementById('txtPassword').value = "";
	}
	else if (message.name = "xhrFailure") {
		window.location = window.location + "Message=" + encodeURIComponent(message.error);
	}
});

