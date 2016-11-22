"use strict";

app.factory("ContactFactory", function($q, $http, FIREBASE_CONFIG){

	var getContactView = function(){
	 return $q((resolve, reject) =>{
	 	$http.get(`${FIREBASE_CONFIG.databaseURL}/contacts.json`)
	 	.success(function(response){
	 		let contacts= [];
	 		Object.keys(response).forEach(function(key){
	 			response[key].id = key;
	 			contacts.push(response[key]);
	 		});
	 		resolve(contacts);
	 	})
	 	.error(function(errorResponse){
	 	  reject(errorResponse);
	 	})
	 })
	}

	var postNewContact = function(newContact){
		return $q((resolve, reject) =>{
			$http.post(`${FIREBASE_CONFIG.databaseURL}/contacts.json`,
				JSON.stringify({
					firstName: newContact.firstName,
					lastName: newContact.lastName,
					email: newContact.email,
					phone: newContact.phone,
					city: newContact.city,
					state: newContact.state,
					zip: newContact.zip,
					assignedTo: newContact.assignedTo,
					isCompleted: newContact.isCompleted,
					task: newContact.contact
				})
			)
			.success(function(postResponse){
				resolve(postResponse);
			})
			.error(function(postError){
				reject(postError);
			})
		})
	}

	return {getContactView:getContactView, postNewContact:postNewContact}
})

