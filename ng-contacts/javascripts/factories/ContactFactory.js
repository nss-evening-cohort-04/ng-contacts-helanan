"use strict";

app.factory("ContactFactory", function($q, $http, FIREBASE_CONFIG){

	var getContactList = function(){
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
		reutrn $q((resolve, reject) =>{
			$http.post(`${FIREBASE_CONFIG.databaseURL}/contacts.json`,
				JSON.stringify({
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

	return {getContactList:getContactList, postNewContact:postNewContact}
})

