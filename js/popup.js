
document.addEventListener('DOMContentLoaded', function() {
	/*
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {name: "clearAll"}, null);
		console.log("fired clearAll");
	});
	*/

	//document.getElementById('inputMemberNumber').focus();
	var submitButton = document.getElementById('submit');
	var inputMemberNumber = document.getElementById('inputMemberNumber');
	var inputBadgeNumber = document.getElementById('inputBadgeNumber');
	//submitButton.setAttribute('disabled', true);


	function validateNumberOnly(value) {
		console.log('validateNumberOnly: ' + value);
		if (value == "") { return false; }
		return !/\D/.test(value);
	}

	submitButton.addEventListener("click", function() {
	    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	      var member_number = inputMemberNumber.value;
	      var badge_number = inputBadgeNumber.value;

	      inputMemberNumber.classList.remove('shake');
	      inputBadgeNumber.classList.remove('shake');

	      if (validateNumberOnly(member_number) && validateNumberOnly(badge_number)) {
		      chrome.runtime.sendMessage({name: "popupLoginClicked", member_number: member_number, badge_number: badge_number});
     		  window.close();
	      }
	      else {
	      	// this feels sloppy
	      	if (!validateNumberOnly(member_number)) { inputMemberNumber.classList.add('shake'); }
	      	if (!validateNumberOnly(badge_number)) { inputBadgeNumber.classList.add('shake'); }
	      	console.log("can't submit, need 2 numbers");
	      }


	    });
	  
	});

  inputMemberNumber.addEventListener("blur", function() {
  	console.log('blur fired');
  	var formgroup = document.getElementById('formgroupMemberNumber');

  	if(validateNumberOnly(this.value)) {
  		formgroup.classList.remove('has-error');
  		formgroup.classList.add('has-success');
  	}
  	else {
  		formgroup.classList.remove('has-success');
  		formgroup.classList.add('has-error');
  		this.value = '';
  		this.focus();
  	}

  });

  inputBadgeNumber.addEventListener("blur", function() {
  	console.log('blur fired');
  	var formgroup = document.getElementById('formgroupBadgeNumber');

  	if(validateNumberOnly(this.value)) {
  		formgroup.classList.remove('has-error');
  		formgroup.classList.add('has-success');  	}
  	else {
  		formgroup.classList.remove('has-success');
  		formgroup.classList.add('has-error');
      	this.value = '';
  		this.focus();
  	}

  });

});