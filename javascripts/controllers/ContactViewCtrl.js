"use strict";

app.controller("AddContactCtrl", function($scope, ContactFactory){
	$scope.welcome = "hi";
	$scope.showContactView = true;
	$scope.newGroup = {};
	$scope.contacts = [];

	let getContacts = function(){
		ContactFactory.getContactView().then(function(fbContacts){
			$scope.contacts = fbContacts;
		});
	}

getContacts();
	$scope.allContacts = function(){
		$scope.showContactView = true;
	};

	$scope.newContact = function(){
		$scope.showContactView = false;
	};

	$scope.addNewContact = function(){
	 $scope.newContact.isCompleted = false;
	 ContactFactory.postNewContact($scope.newContact).then(function(contactId){
	 	getContacts();
	 	 $scope.newContact = {};
	 	 $scope.showContactView = true;
	 });
   }
});