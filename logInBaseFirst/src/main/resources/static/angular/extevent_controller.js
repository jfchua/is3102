//VIEW ALL EVENTS,
app.controller('eventExternalController', ['$scope', '$rootScope', '$http','$state','$routeParams','shareData', function ($scope, $rootScope,$http,$state, $routeParams, shareData) {
	
	
	angular.element(document).ready(function () {

	$scope.data = {};
	//var tempObj= {id:1};
	//console.log(tempObj)
	$http.get("//localhost:8443/tixGetFeedback").then(function(response){
		$scope.feedbacks = response.data;
		console.log("DISPLAY ALL EVENT");
		console.log($scope.feedbacks);

	},function(response){
		alert("did not view all events");
		//console.log("response is : ")+JSON.stringify(response);
	}	
	)
	
	$http.get("//localhost:8443/event/viewAllEvents").then(function(response){
		$scope.order_item = "id";
		$scope.order_reverse = false;
		$scope.events = response.data;
		console.log("DISPLAY ALL EVENT");
		console.log($scope.events);

	},function(response){
		alert("did not view all feedback");
		//console.log("response is : ")+JSON.stringify(response);
	}	
	)
	
	
});

$scope.viewApprovedEvents = function(){
	$scope.data = {};
	//var tempObj= {id:1};
	//console.log(tempObj)
	$http.get("//localhost:8443/event/viewApprovedEvents").then(function(response){
		$scope.events = response.data;
		console.log("DISPLAY ALL EVENT");
		console.log("EVENT DATA ARE OF THE FOLLOWING: " + $scope.events);

	},function(response){
		alert("did not view approved events");
		//console.log("response is : ")+JSON.stringify(response);
	}	
	)	
}

$scope.getEvent = function(event){			
		shareData.addData(event);
}
$scope.passEvent = function(event){
	shareData.addData(event);
	console.log(event);
}
$scope.passEventToTix = function(event){
	$rootScope.event = event;
	console.log("PASSING" + $rootScope.event);
	$state.go("dashboard.configureTicketsEx");
}
$scope.passEventToViewTix = function(id){
	shareData.addData(id);
}

$scope.requestForTicketSales = function(event){
	if(confirm('Confirm ticket sales for '+event.event_title+'?' + " This action cannot be undone")){

		var tempObj ={eventId: event.id};
		console.log("fetch id ");
		console.log(tempObj);
		//var buildings ={name: $scope.name, address: $scope.address};
		$http.post("//localhost:8443/event/requestTickets", JSON.stringify(tempObj)).then(function(response){
			//$scope.buildings = response.data;
			console.log("REQUEST FOR TICKET SALES");
			$scope.requestedTicket = true;
			alert('Successfully set ticket sales');
			//if (confirm('LEVEL IS SAVED! GO BACK TO VIEW BUILDINGS?'))
			$state.go($state.current, {}, {reload: true}); 
		},function(response){
			alert("Did not request ticket sales. Check if the event has been approved");
			//console.log("response is : ")+JSON.stringify(response);
		}	
		)
	}	
}

$scope.getEventById= function(){

	$scope.event1 = JSON.parse(shareData.getData());
	$scope.event1.event_start_date = new Date($scope.event1.event_start_date);
	$scope.event1.event_end_date = new Date($scope.event1.event_end_date);
	var dataObj = {			
			units:$scope.event1.units,
			event_title: $scope.event1.event_title,
			event_content: $scope.event1.event_content,
			event_description: $scope.event1.event_description,
			event_approval_status: $scope.event1.event_approval_status,						
			event_start_date: $scope.event1.event_start_date,						
			event_end_date: $scope.event1.event_end_date,
			filePath: $scope.event1.filePath,
	};
	$scope.event = angular.copy($scope.event1)

	var url = "https://localhost:8443/event/updateEvent";
	console.log("EVENT DATA ARE OF THE FOLLOWING: " + $scope.event1.event_title);
}





$scope.getEventByIdForDelete= function(){

	//var buildings ={name: $scope.name, address: $scope.address};
	//$http.post("//localhost:8443/building/getBuilding", JSON.stringify(tempObj))
	$scope.event = shareData.getData();

	var url = "https://localhost:8443/event/deleteEvent";
	console.log("EVENT DATA ARE OF THE FOLLOWING: " + $scope.event);
}


$scope.getBookings = function(id){		
	$scope.dataToShare = [];	  
	$scope.shareMyData = function (myValue) {
		//$scope.dataToShare = myValue;
		//shareData.addData($scope.dataToShare);
	}
	$scope.url = "https://localhost:8443/booking/viewAllBookings/"+id;
	//$scope.dataToShare = [];
	console.log("GETTING THE EVENT INFO")
	var getBookings = $http({
		method  : 'GET',
		url     : 'https://localhost:8443/booking/viewAllBookings/' + id        
	});
	console.log("Getting the bookings using the url: " + $scope.url);
	getBookings.success(function(response){
		//$scope.dataToShare.push(id);
		//$location.path("/viewLevels/"+id);
		console.log('GET Booking SUCCESS! ' + JSON.stringify(response));
		console.log("ID IS " + id);
		$scope.bookings = response.data;
		shareData.addData(JSON.stringify(response));
		//$location.path("/viewLevels");
	});
	getBookings.error(function(response){
		$state.go("dashboard.viewAllEventsEx");
		console.log('GET Booking FAILED! ' + JSON.stringify(response));
	});

}
}]);
//VIEW ALL APPROVED EVENTS
app.controller('viewApprovedEventsController', ['$scope', '$http','$state','$routeParams','shareData', function ($scope, $http,$state, $routeParams, shareData) {

	angular.element(document).ready(function () {
		$scope.data = {};
		//var tempObj= {id:1};
		//console.log(tempObj)
		$http.get("//localhost:8443/event/viewApprovedEvents").then(function(response){
			$scope.events = response.data;
			console.log("DISPLAY ALL EVENT");
			console.log("EVENT DATA ARE OF THE FOLLOWING: " + $scope.events);

		},function(response){
			alert("did not view approved events");
			//console.log("response is : ")+JSON.stringify(response);
		}	
		)
	
});


$scope.getEvent = function(event){		
	
		shareData.addData(event);


}
$scope.passEvent = function(event){
	shareData.addData(event);
}
$scope.getEventById= function(){

	$scope.event1 = JSON.parse(shareData.getData());
	$scope.event1.event_start_date = new Date($scope.event1.event_start_date);
	$scope.event1.event_end_date = new Date($scope.event1.event_end_date);
	var dataObj = {			
			units:$scope.event1.units,
			event_title: $scope.event1.event_title,
			event_content: $scope.event1.event_content,
			event_description: $scope.event1.event_description,
			event_approval_status: $scope.event1.event_approval_status,						
			event_start_date: $scope.event1.event_start_date,						
			event_end_date: $scope.event1.event_end_date,
			filePath: $scope.event1.filePath,
	};
	$scope.event = angular.copy($scope.event1)

	var url = "https://localhost:8443/event/updateEvent";
	console.log("EVENT DATA ARE OF THE FOLLOWING: " + $scope.event1.event_title);
}





$scope.getEventByIdForDelete= function(){

	//var buildings ={name: $scope.name, address: $scope.address};
	//$http.post("//localhost:8443/building/getBuilding", JSON.stringify(tempObj))
	$scope.event = shareData.getData();

	var url = "https://localhost:8443/event/deleteEvent";
	console.log("EVENT DATA ARE OF THE FOLLOWING: " + $scope.event);
}


$scope.getBookings = function(id){		
	$scope.dataToShare = [];	  
	$scope.shareMyData = function (myValue) {
		//$scope.dataToShare = myValue;
		//shareData.addData($scope.dataToShare);
	}
	$scope.url = "https://localhost:8443/booking/viewAllBookings/"+id;
	//$scope.dataToShare = [];
	console.log("GETTING THE EVENT INFO")
	var getBookings = $http({
		method  : 'GET',
		url     : 'https://localhost:8443/booking/viewAllBookings/' + id        
	});
	console.log("Getting the bookings using the url: " + $scope.url);
	getBookings.success(function(response){
		//$scope.dataToShare.push(id);
		//$location.path("/viewLevels/"+id);
		console.log('GET Booking SUCCESS! ' + JSON.stringify(response));
		console.log("ID IS " + id);
		$scope.bookings = response.data;
		shareData.addData(JSON.stringify(response));
		//$location.path("/viewLevels");
	});
	getBookings.error(function(response){
		$state.go("dashboard.viewAllEventsEx");
		console.log('GET Booking FAILED! ' + JSON.stringify(response));
	});

}



}]);
//DELETE EVENT
app.controller('deleteEventExController', ['$scope',  '$timeout','$http','shareData','$state', function ($scope,  $timeout,$http ,shareData,$state) {
	angular.element(document).ready(function () {

		$scope.event = shareData.getData();
	});
	$scope.deleteEvent = function(){
		if(confirm('CONFIRM TO DELETE EVENT '+$scope.event.event_title+'?')){

			var tempObj ={eventId:$scope.event.id};
			console.log("fetch id "+ tempObj);
			//var buildings ={name: $scope.name, address: $scope.address};
			$http.post("//localhost:8443/event/deleteEvent", JSON.stringify(tempObj)).then(function(response){
				//$scope.buildings = response.data;
				console.log("Cancel the EVENT");
				alert('EVENT IS DELETED! GOING BACK TO VIEW EVENTS...');
				//if (confirm('LEVEL IS SAVED! GO BACK TO VIEW BUILDINGS?'))
				$state.go("dashboard.viewAllEventsEx");
			},function(response){
				alert("DID NOT CANCEL EVENT");
				//console.log("response is : ")+JSON.stringify(response);
			}	
			)
		}
		

	}

}])

app.controller('addEController', ['$scope', '$http','$state','$routeParams','shareData', function ($scope, $http,$state, $routeParams, shareData){
	console.log("start selecting venue");
	var getBuild = $http({
		method  : 'GET',
		url     : 'https://localhost:8443/building/viewBuildings',
	});
	console.log("GETTING THE BUILDINGS");
	getBuild.success(function(response){
		$scope.buildings = response;
		$scope.selectedBuilding;
		console.log("RESPONSE IS" + JSON.stringify(response));

		console.log('Buildings Gotten');
	});
	getBuild.error(function(){
		alert('Get building error!!!!!!!!!!');
	});
	$scope.currentlySelectedBuilding;
	$scope.selectBuild = function(){
		$scope.selectedBuilding=$scope.currentlySelectedBuilding;
	}
	console.log("finish selecting building");

	$scope.getLevel = function(id){
		$scope.dataToShare = [];
		//var id = $scope.currentlySelected;
		$scope.url = "https://localhost:8443/level/viewLevels/"+id;
		//$scope.dataToShare = [];
		console.log("GETTING THE ALL LEVELS INFO")
		var getLevels = $http({
			method  : 'GET',
			url     : 'https://localhost:8443/level/viewLevels/'+id,
	});
		console.log("Getting the levels using the url: " + $scope.url);
		getLevels.success(function(response){
			$scope.levels = response;
			$scope.selectedLevel;
			console.log("RESPONSE IS" + JSON.stringify(response));

			console.log('Levels Gotten');
		});
		getLevels.error(function(){
			alert('Get levels error!!!!!!!!!!');
		});		
		$scope.currentlySelectedLevel;
		$scope.selectLevel = function(){
			$scope.selectedLevel=$scope.currentlySelectedLevel;
		}
		console.log("finish selecting level");		
	}
	
	$scope.selectedUnits=[];
	$scope.getUnit = function(levelId){
		//$scope.url = "https://localhost:8443/property/viewUnits/";
		
		$scope.levelID = levelId; 
		var dataObj = {id: $scope.levelID};
		console.log("GETTING THE ALL UNITS INFO")
		var getUnits = $http({
			method  : 'POST',
			url     : 'https://localhost:8443/property/viewUnitsWithBookings/',
			data    : dataObj,
	});
		console.log("REACHED HERE FOR SUBMIT LEVEL " + JSON.stringify(dataObj));
		getUnits.success(function(response){
			$scope.units = response;
			console.log("RESPONSE IS" + JSON.stringify(response));
			console.log($scope.units);
		});
		getUnits.error(function(){
			alert('Get units error!!!!!!!!!!');
		});		
		
		$scope.currentlySelectedUnit;
		$scope.selectUnit = function(){
			console.log("currently selected unit bookings");
			console.log($scope.currentlySelectedUnit.bookings);
			
			 getEvents($scope.currentlySelectedUnit.bookings);
			 console.log("currently selected unit schedules");
			 console.log($scope.currentlySelectedUnit.schedule);
			 getMaints($scope.currentlySelectedUnit.schedule);//put here or after for loop
			var duplicate = false;
			var index = 0;
		    angular.forEach($scope.selectedUnits, function() {
		        if(duplicate==false&&$scope.currentlySelectedUnit.id == $scope.selectedUnits[index].id)
		        	duplicate = true;
		        else
		        	index = index + 1;
		    });
		    console.log(duplicate);
			if(!duplicate){
				$scope.selectedUnits.push($scope.currentlySelectedUnit);
			}
			
			
			
			console.log("Hailing test:");
			console.log($scope.currentlySelectedUnit);
			console.log($scope.selectedUnits);
		}

		$scope.deleteUnit = function(unit){
			var index = $scope.selectedUnits.indexOf(unit);
			$scope.selectedUnits.splice(index, 1);  
		}
		console.log("finish selecting units");	
		
		$scope.checkAvail = function(){
			console.log("start checking availability");
			$scope.data = {};

			var dataObj = {
					units: $scope.selectedUnits,
					event_start_date: ($scope.event.event_start_date).toString(),
					event_end_date: ($scope.event.event_end_date).toString(),
			};
			console.log("REACHED HERE FOR SUBMIT EVENT " + JSON.stringify(dataObj));
			var send = $http({
				method  : 'POST',
				url     : 'https://localhost:8443/event/checkAvailability',
				data    : dataObj //forms user object
			});
			$scope.avail = "";
			send.success(function(){
				$scope.avail = "AVAILABLE!";
				console.log($scope.avail);
			});
			send.error(function(){
				$scope.avail = "NOT AVAILABLE!";
				console.log($scope.avail);
			});
		}
	}
	/*
	$scope.checkAvail = function(){
		console.log("start checking availability");
		$scope.data = {};

		var dataObj = {
				units: $scope.selectedUnits,
				event_start_date: ($scope.event.event_start_date).toString(),
				event_end_date: ($scope.event.event_end_date).toString(),
		};
		console.log("REACHED HERE FOR SUBMIT EVENT " + JSON.stringify(dataObj));
		var send = $http({
			method  : 'POST',
			url     : 'https://localhost:8443/event/checkAvailability',
			data    : dataObj //forms user object
		});
		send.success(function(){
			alert('SELECTED UNITS ARE AVAILABLE!');
		});
		send.error(function(){
			alert('SELECTED UNITS ARE NOT AVAILABLE!');
		});
	}*/
	$scope.checkRent = function(){
		console.log("start checking rent");
		$scope.data = {};

		var dataObj = {
				units: $scope.selectedUnits,
				event_start_date: ($scope.event.event_start_date).toString(),
				event_end_date: ($scope.event.event_end_date).toString(),
		};
		console.log("REACHED HERE FOR SUBMIT EVENT " + JSON.stringify(dataObj));
		var send = $http({
			method  : 'POST',
			url     : 'https://localhost:8443/event/checkRent',
			data    : dataObj //forms user object
		});
		//$scope.avail = "";
		send.success(function(response){
			$scope.totalRent = response;
			$scope.totalRentAfter = response*1.07;
			console.log($scope.totalRent);
		});
		send.error(function(response){
			$scope.totalRent = response;
			console.log($scope.totalRent);
		});
	}
	$scope.eventTypes=[{'name':'Concert','eventType':'CONCERT'},
	                  {'name':'Conference','eventType':'CONFERENCE'},
	                  {'name':'Fair','eventType':'FAIR'},
	                  {'name':'Family Entertainment','eventType':'FAMILY'},
	                  {'name':'Lifestyle/Leisure','eventType':'LIFESTYLE'},
	                  {'name':'Seminar/Workshop','eventType':'SEMINAR'}];
	$scope.eventType=$scope.eventTypes[0].eventType;
	
	$scope.addEvent = function(){
		console.log("start adding");
		$scope.data = {};

		var dataObj = {
				units: $scope.selectedUnits,
				event_title: $scope.event.event_title,
				event_content: $scope.eventType,
				event_description: $scope.event.event_description,
				event_approval_status: "PROCESSING",
				event_start_date: ($scope.event.event_start_date).toString(),
				event_end_date: ($scope.event.event_end_date).toString(),
				filePath: $scope.event.filePath,
		};
		console.log("REACHED HERE FOR SUBMIT EVENT " + JSON.stringify(dataObj));
		var send = $http({
			method  : 'POST',
			url     : 'https://localhost:8443/event/addEvent',
			data    : dataObj //forms user object
		});

		console.log("SAVING THE Event");
		send.success(function(){
			alert('Event IS SAVED!');
			$state.go("dashboard.viewAllEventsEx");
		});
		send.error(function(){
			alert('SAVING Event GOT ERROR BECAUSE UNIT IS NOT AVAILABLE!');
		});
	};
	  $scope.uiConfig = {
		      calendar:{
		        width: 300,
		        editable:false,
		        header:{
		          left: 'month agendaWeek agendaDay',
		          center: 'title',
		          right: 'today prev,next'
		        },
		        eventClick: $scope.alertEventOnClick,
		        eventDrop: $scope.alertOnDrop,
		        eventResize: $scope.alertOnResize
		      }
		    };

	  
	  $scope.haha=[];
	   //RETRIEVE EVENTS
	   //$scope.eventsFormated=[];
	   var getEvents = function(bookings){
			//need to changed to same as workspace calendar view all events with status success approved,processing		
			var index=0;
		    angular.forEach(bookings, function() {

		         var booking=[{start: bookings[index].event_start_date_time,
		        	 		end: bookings[index].event_end_date_time,			         
		        		 	title:'Booked',
		        		 	allDay: false,
		        		 	color: 'IndianRed',
		        		 	overlap:false
		         			}];
		         
		        $scope.haha.push(booking);
		        	index = index + 1;
		    });	
		   
		
			
			
		}
	  // getEvents(); 
	   
	   
	   //RETRIEVE MAINTENANCES
	   //$scope.eventsFormated=[];
	   var getMaints = function(schedules){
			var index=0;
		    angular.forEach(schedules, function() {

		         var maint=[{start: schedules[index].start_time,
		        	 		end: schedules[index].end_time,			         
		        		 	title:"Maintenance",
		        		 	allDay: false,
		        		 	color: 'SteelBlue'
		         			}];
		         
		        $scope.haha.push(maint);
		        	index = index + 1;
		    });
			//var buildings ={name: $scope.name, address: $scope.address};
			console.log( $scope.haha);
				
			
		}
	   
	  
	
}]);

app.controller('updateEController', ['$scope', '$http','$state','$routeParams','shareData', function ($scope, $http,$state, $routeParams, shareData){
	angular.element(document).ready(function () {
		//VIEW EVENT
			$scope.event1 = shareData.getData();
			$scope.event1.event_start_date = new Date($scope.event1.event_start_date);
			$scope.event1.event_end_date = new Date($scope.event1.event_end_date);
			var dataObj = {			
					units:$scope.event1.units,
					event_title: $scope.event1.event_title,
					event_content: $scope.event1.event_type,
					event_description: $scope.event1.event_description,
					event_approval_status: $scope.event1.approvalStatus,						
					event_start_date: $scope.event1.event_start_date,						
					event_end_date: $scope.event1.event_end_date,
					filePath: $scope.event1.filePath,
			};
			
			$scope.event = angular.copy($scope.event1)
			console.log($scope.event1);
			var url = "https://localhost:8443/event/updateEvent";
			console.log($scope.event1.event_title);
			
			//GET SELECTED UNITS
			var id=$scope.event.id;
	
			$scope.url = "https://localhost:8443/booking/viewAllSelectedUnits/"+id;
			console.log("GETTING THE EVENT INFO")
			var getBookings = $http({
				method  : 'GET',
				url     : 'https://localhost:8443/booking/viewAllSelectedUnits/' + id        
			});
			console.log("Getting the bookings Units using the url: " + $scope.url);
			getBookings.success(function(response){
				console.log('GET Selected Units SUCCESS! ' + JSON.stringify(response));
				console.log("ID IS " + id);
				console.log("test hailing");
				console.log(response);
				$scope.selectedBookingsUnits1 = response;
				$scope.selectedBookingsUnits=angular.copy($scope.selectedBookingsUnits1);
				
			});
			getBookings.error(function(response){
				$state.go("dashboard.viewAllEventsEx");
				console.log('GET Selected Units FAILED! ' + JSON.stringify(response));
			});		
		
		
		//FOR SELECTING BULDING
			console.log("start selecting venue");
			var getBuild = $http({
				method  : 'GET',
				url     : 'https://localhost:8443/building/viewBuildings',
			});
			console.log("GETTING THE BUILDINGS");
			getBuild.success(function(response){
				$scope.buildings = response;
				$scope.selectedBuilding;
				console.log("RESPONSE IS" + JSON.stringify(response));
	
				console.log('Buildings Gotten');
			});
			getBuild.error(function(){
				alert('Get building error!!!!!!!!!!');
			});
			$scope.currentlySelectedBuilding;
			$scope.selectBuild = function(){
				$scope.selectedBuilding=$scope.currentlySelectedBuilding;
			}
			console.log("finish selecting building");
		
	});
	 //RESET SELECTED BOOKINGS UNITS TO LAST SAVED EVENT
	$scope.resetBookings = function(){
		$scope.selectedBookingsUnits=angular.copy($scope.selectedBookingsUnits1);
	}
	//DELETE BOOKING UNIT FROM SELECTED BOOKING  UNIT
	$scope.deleteBookingUnit = function(unit){
		var index = $scope.selectedBookingsUnits.indexOf(unit);
		$scope.selectedBookingsUnits.splice(index, 1);  
	}
	
	$scope.getLevel = function(id){
		$scope.dataToShare = [];		
		$scope.url = "https://localhost:8443/level/viewLevels/"+id;
		console.log("GETTING THE ALL LEVELS INFO")
		var getLevels = $http({
			method  : 'GET',
			url     : 'https://localhost:8443/level/viewLevels/'+id,
	});
		console.log("Getting the levels using the url: " + $scope.url);
		getLevels.success(function(response){
			$scope.levels = response;
			$scope.selectedLevel;
			console.log("RESPONSE IS" + JSON.stringify(response));

			console.log('Levels Gotten');
		});
		getLevels.error(function(){
			alert('Get levels error!!!!!!!!!!');
		});		
		$scope.currentlySelectedLevel;
		$scope.selectLevel = function(){
			$scope.selectedLevel=$scope.currentlySelectedLevel;
		}
		console.log("finish selecting level");		
	}
	
	//$scope.selectedUnits=[];
	$scope.getUnit = function(levelId){
		//$scope.url = "https://localhost:8443/property/viewUnits/";
		
		$scope.levelID = levelId; 
		var dataObj = {id: $scope.levelID};
		console.log("GETTING THE ALL UNITS INFO")
		var getUnits = $http({
			method  : 'POST',
			url     : 'https://localhost:8443/property/viewUnits/',
			data    : dataObj,
	});
		console.log("REACHED HERE FOR SUBMIT LEVEL " + JSON.stringify(dataObj));
		getUnits.success(function(response){
			$scope.units = response;
			console.log("RESPONSE IS" + JSON.stringify(response));

			console.log('Units Gotten');
		});
		getUnits.error(function(){
			alert('Get units error!!!!!!!!!!');
		});		
		
		$scope.currentlySelectedUnit;
		$scope.selectUnit = function(){
			
			var duplicate = false;
			var index = 0;
		    angular.forEach($scope.selectedBookingsUnits, function() {
		        if(duplicate==false&&$scope.currentlySelectedUnit.id == $scope.selectedBookingsUnits[index].id)
		        	duplicate = true;
		        else
		        	index = index + 1;
		    });
		    console.log(duplicate);
			if(!duplicate){
				$scope.selectedBookingsUnits.push($scope.currentlySelectedUnit);
			}
			
		}

		$scope.deleteUnit = function(unit){
			var index = $scope.selectedBookingsUnits.indexOf(unit);
			$scope.selectedBookingsUnits.splice(index, 1);  
		}
		console.log("finish selecting units");	
		/*
		$scope.checkAvail = function(){
			console.log("start checking availability");
			$scope.data = {};

			var dataObj = {
					units: $scope.selectedBookingsUnits,
					event_start_date: ($scope.event.event_start_date).toString(),
					event_end_date: ($scope.event.event_end_date).toString(),
			};
			console.log("REACHED HERE FOR SUBMIT EVENT " + JSON.stringify(dataObj));
			var send = $http({
				method  : 'POST',
				url     : 'https://localhost:8443/event/checkAvailability',
				data    : dataObj //forms user object
			});
			$scope.avail = "";
			send.success(function(){
				$scope.avail = "AVAILABLE!";
				console.log($scope.avail);
			});
			send.error(function(){
				$scope.avail = "NOT AVAILABLE!";
				console.log($scope.avail);
			});
		}	*/
	}
	
	$scope.checkAvail = function(){
		console.log("start checking availability");
		$scope.data = {};

		var dataObj = {			
				id: $scope.event.id,
				units: $scope.selectedBookingsUnits,
				event_start_date: ($scope.event.event_start_date).toString(),
				event_end_date: ($scope.event.event_end_date).toString(),
		};
		console.log("REACHED HERE FOR SUBMIT EVENT " + JSON.stringify(dataObj));
		var send = $http({
			method  : 'POST',
			url     : 'https://localhost:8443/event/checkAvailabilityForUpdate',
			data    : dataObj //forms user object
		});
		$scope.avail = "";
		send.success(function(){
			$scope.avail = "AVAILABLE!";
			console.log($scope.avail);
		});
		send.error(function(){
			$scope.avail = "NOT AVAILABLE!";
			console.log($scope.avail);
		});
	}

	$scope.checkRent = function(){
		console.log("start checking rent");
		$scope.data = {};

		var dataObj = {
				units: $scope.selectedBookingsUnits,
				event_start_date: ($scope.event.event_start_date).toString(),
				event_end_date: ($scope.event.event_end_date).toString(),
		};
		console.log("REACHED HERE FOR SUBMIT EVENT " + JSON.stringify(dataObj));
		var send = $http({
			method  : 'POST',
			url     : 'https://localhost:8443/event/checkRent',
			data    : dataObj //forms user object
		});
		//$scope.avail = "";
		send.success(function(response){
			$scope.totalRent = response;
			$scope.totalRentAfter = response*1.07;
			console.log($scope.totalRent);
		});
		send.error(function(response){
			$scope.totalRent = response;
			console.log($scope.totalRent);
		});
	}

	$scope.updateEvent = function(){
		console.log("Start updating");
		var unitIdsString="";
		//var unitIdsObj=shareData.getData();
		//console.log(unitIdsObj);
		//var unitIdsObj = JSON.parse(shareData.getData());
		//unitIdsString+=unitIdsObj;
		//console.log("test hailing");
		//console.log(unitIdsString);
		$scope.data = {};
		console.log($scope.event.id);
		var dataObj = {	
				id: $scope.event.id,
				units: $scope.selectedBookingsUnits,		
				event_title: $scope.event.event_title,
				event_content: $scope.event.event_content,
				event_description: $scope.event.event_description,
				event_approval_status: "PROCESSING",
				event_start_date: ($scope.event.event_start_date).toString(),
				event_end_date: ($scope.event.event_end_date).toString(),
				//event_period: $scope.event.event_period,
				filePath: $scope.event.filePath,
		};		
		console.log(dataObj.units);
		console.log("REACHED HERE FOR SUBMIT EVENT " + JSON.stringify(dataObj));

		var send = $http({
			method  : 'POST',
			url     : 'https://localhost:8443/event/updateEvent',
			data    : dataObj //forms user object
		});

		console.log("UPDATING THE EVENT");
		send.success(function(){
			alert('EVENT IS SAVED! GOING BACK TO VIEW ALL EVENTS');
			$state.go("dashboard.viewAllEventsEx");
		});
		send.error(function(){
			alert('SAVING Event GOT ERROR BECAUSE UNIT IS NOT AVAILABLE!');
		});
	};	
}]);





app.controller('bookingController', ['$scope','$http','$state','$routeParams','shareData', function ($scope, $http,$state, $routeParams, shareData) {
	angular.element(document).ready(function () {	
	//console.log(tempObj)
	console.log("DISPLAY ALL BOOKINGS");
	$scope.event = shareData.getData();
	var id=$scope.event.id;

	$scope.url = "https://localhost:8443/booking/viewAllBookings/"+id;
	//$scope.dataToShare = [];
	console.log("GETTING THE EVENT INFO")
	var getBookings = $http({
		method  : 'GET',
		url     : 'https://localhost:8443/booking/viewAllBookings/' + id        
	});
	console.log("Getting the bookings using the url: " + $scope.url);
	getBookings.success(function(response){
		//$scope.dataToShare.push(id);
		//$location.path("/viewLevels/"+id);
		console.log('GET Booking SUCCESS! ' + JSON.stringify(response));
		console.log("ID IS " + id);
		$scope.bookings = response;
		
		//$location.path("/viewLevels");
	});
	getBookings.error(function(response){
		$state.go("dashboard.viewAllEventsEx");
		console.log('GET Booking FAILED! ' + JSON.stringify(response));
	});
	
	var url = "https://localhost:8443/booking/viewAllBookings";	
    console.log("BOOKING DATA ARE OF THE FOLLOWING: " + $scope.bookings);	
	});

$scope.deleteBooking = function(id){
    var r = confirm("Confirm cancel? \nEither OK or Cancel.");
    if (r == true) {
    	$scope.url = "https://localhost:8443/booking/deleteBooking/"+id;
    	var deleteBooking = $http({
			method  : 'POST',
			url     : 'https://localhost:8443/booking/deleteBooking/' + id        
		});
    	console.log("Deleting the event using the url: " + $scope.url);
		deleteBooking.success(function(response){
			alert('DELETE BOOKING SUCCESS! ');
			console.log("ID IS " + id);
			$state.go("dashboard.viewAllEventsEx");
		});
		deleteBooking.error(function(response){
			alert('DELETE BOOKING FAIL! ');
			$state.go("dashboard.viewAllEventsEx");
			console.log('DELETE BOOKING FAILED! ' + JSON.stringify(response));
		});
    } else {
        alert("Cancel deleting booking");
    }
    //document.getElementById("demo").innerHTML = txt;	
	/*
	$scope.data = {};
	console.log("Start deleting event");
	$scope.url = "https://localhost:8443/booking/deleteBooking/"+id;
	console.log("GETTING THE EVENT INFO")
	var deleteBooking = $http({
		method  : 'POST',
		url     : 'https://localhost:8443/booking/deleteBooking/' + id        
	});
	console.log("Deleting the event using the url: " + $scope.url);
	deleteBooking.success(function(response){
		console.log('DELETE BOOKING SUCCESS! ' + JSON.stringify(response));
		console.log("ID IS " + id);
	});
	deleteBooking.error(function(response){
		$location.path("/viewAllEventsEx");
		console.log('DELETE BOOKING FAILED! ' + JSON.stringify(response));
	});*/
			
	/*
	$scope.event = JSON.parse(shareData.getData());
	console.log($scope.event.id);
	var tempObj ={eventId:$scope.event.id};
	console.log("fetch id "+ tempObj);
	
	$http.post("//localhost:8443/event/deleteEvent", JSON.stringify(tempObj)).then(function(response){
		
		console.log("Cancel the EVENT");
	},function(response){
		alert("DID NOT Cancel EVENT");
		
	}	
	)*/
}

$scope.passBooking=function(booking){
	console.log(booking);
	var obj={
			event:$scope.event,
			booking:booking
			};
	shareData.addData(obj);
}
}])

app.controller('paymentHistoryExController', ['$scope', '$http','$state','$routeParams','shareData', function ($scope, $http,$state, $routeParams, shareData) {
	angular.element(document).ready(function () {
		$scope.data = {};	
		//$scope.org = shareData.getData();
		$scope.order_item = "id";
		$scope.order_reverse = false;
		$scope.url = "https://localhost:8443/event/getPaymentHistory/";
		console.log("GETTING THE PAYMENT HISTORY");
		var getPayments = $http({
			method  : 'GET',
			url     : 'https://localhost:8443/event/getPaymentHistory/',

		});
		console.log("Getting the payments using the url: " + $scope.url);
		getPayments.success(function(response){
			console.log('GET PAYMENTS SUCCESS! ');
			console.log(JSON.stringify(response));
			console.log(response);
			$scope.payments = response;
		});
		getPayments.error(function(response){
			$state.go("dashboard.viewPaymentPlansEx");
			console.log('GET PAYMENTS FAILED! ');
		});
	});
}]);


app.controller('paymentExController', ['$scope', '$http','$state','$routeParams','shareData', function ($scope, $http,$state, $routeParams, shareData) {
	angular.element(document).ready(function () {
		$scope.data = {};	
		$scope.order_item = "id";
		$scope.order_reverse = false;
		console.log("START:):):):)");
		$http.get("//localhost:8443/event/viewAllPayments").then(function(response){
			$scope.plans = response.data;
			console.log("DISPLAY ALL PAYMENT PLANS");
			console.log($scope.plans);
		},function(response){
			alert("did not view plans");
		}	
		)
		
		$http.get("//localhost:8443/event/getTotal").then(function(response){
			$scope.totalAmount = response.data;
			console.log("DISPLAY TOTAL BALANCE");
			console.log($scope.totalAmount);
		},function(response){
			alert("did not view plans");
		}	
		)
	});
	$scope.paymentPlanNull = function(paymentPlan){
		  return !(paymentPlan === null)
	}
	$scope.passPaymentPlan = function(plan){
		shareData.addData(plan);
	}

}]);

app.controller('paymentDetailsExController', ['$scope', '$http','$state','$routeParams','shareData', function ($scope, $http,$state, $routeParams, shareData) {
	angular.element(document).ready(function () {
		$scope.data = {};
		$scope.plan= shareData.getData();
		$scope.order_item = "id";
		$scope.order_reverse = false;
		$scope.url = "https://localhost:8443/event/viewPaymentDetails/"+$scope.plan;
		console.log("GETTING THE EVENTS");
		var getPayments = $http({
			method  : 'GET',
			url     : 'https://localhost:8443/event/viewPaymentDetails/' + $scope.plan,

		});
		console.log("Getting the payments using the url: " + $scope.url);
		getPayments.success(function(response){
			console.log('GET PAYMENTS SUCCESS! ');
			console.log(JSON.stringify(response));
			console.log(response);
			$scope.paymentPlan = response;
		});
		getPayments.error(function(response){
			$state.go("dashboard.viewPaymentPlansEx");
			console.log('GET PAYMENTS FAILED! ');
		});		
	});
	
}]);



//Unit Plan of Event used by event organiser
app.controller('areaPlanController', function ($scope, $http,shareData) {

	
	var bookingId;
	angular.element(document).ready(function () {
		var obj=shareData.getData();
		$scope.booking=obj.booking;
		$scope.event=obj.event;
		console.log($scope.booking);
		console.log($scope.event);
		
		//get event id from previous page
	
		  			var dataObj={id:$scope.booking.id};
		  			
		  			var getAreas= $http({
		  				method  : 'POST',
		  				url     : 'https://localhost:8443/area/viewAreas/',
		  				data    : dataObj,
		  		});
		  			console.log("REACHED HERE FOR VIEWING AREAS " + JSON.stringify(dataObj));
		  			getAreas.success(function(response){
		  				console.log(response);
		  				$scope.areas = response;
		  				
		  			});
		  			getAreas.error(function(){
		  				
		  			});		
		  		
	});
	
	
	$scope.passEvent=function(){
		shareData.addData($scope.event);
	}



	$scope.viewArea=function(){
		


	}

	$scope.addArea = function () {  
		
		$scope.areas.push({"id": 0,"areaName": "#area","description": "#","square": {"left": 100,"top": 100,"height": 100,"width": 100, "color": "coral","type": "rect"}});
		console.log("test "+JSON.stringify($scope.areas));

	} 

	$scope.saveAreas = function () {   

		console.log("Test: start saving areas");
		var saveAreas=$scope.areas;
		var areasString=angular.toJson(saveAreas);
		console.log(areasString);

		var dataObj = {
				id: $scope.booking.id,
				Areas:{
					Area:saveAreas
				}
		};

		console.log(dataObj);

		$http.post('/event/saveAreas', JSON.stringify(dataObj)).then(function(response){
			console.log("pure response is "+JSON.stringify(response.data));
	

		},function(response){//else is not saved successfully
			console.log("DID NOT SAVE");
			console.log("response is "+JSON.stringify(response.data));
		})


	} //END SAVE AREAS

	$scope.remove = function(area) { 
		var index = $scope.areas.indexOf(area);
		$scope.areas.splice(index, 1);     
	}

	$scope.showDetails= function (thisArea) {   
		//console.log(thisArea.id); 

		$scope.showDetail="id: "+ thisArea.id+", areaName: " + thisArea.areaName+", description: " + thisArea.description+"left: " + thisArea.square.left + ", top: " +  thisArea.square.top+ ", height: " + thisArea.square.height + ", width: " + thisArea.square.width;    

	} 
	$scope.resize = function(area,evt,ui) {

		console.log("resize");

		area.square.width = evt.size.width;//working restrict A
		area.square.height = evt.size.height;
		area.square.left = parseInt(evt.position.left);
		area.square.top = parseInt(evt.position.top);
	}
	$scope.drag = function(area,evt,ui) {

		console.log(evt);
		console.log("DRAGGING");
		area.square.left = parseInt(evt.position.left);
		area.square.top = parseInt(evt.position.top);
		area.square.width = evt.helper.context.clientWidth;
		area.square.height = evt.helper.context.clientHeight;
	}



	/*
	    var areaIds="";
	    $scope.addToAreaIds=function(areaId){
	        areaIds+=(areaId+" ");
	        console.log(areaIds);
	    }

	    $scope.passAreaIds=function(){
	    	var stringToPassArea=areaIds.substring(0,areaIds.length-1);
	    	console.log(stringToPassArea);
	    	var objToPassArea={'areas':stringToPassArea};
	    	shareData.addData(JSON.stringify(objToPassArea));
	    	console.log(JSON.stringify(objToPassArea));
	    }
	 */

})

app.controller('ticketSaleExController', ['$scope', '$http','$state','$routeParams','shareData', function ($scope, $http,$state, $routeParams, shareData) {
	$scope.payment={};
	angular.element(document).ready(function () {
		$scope.data = {};	
		$scope.eventId = shareData.getData();
		$scope.url = "https://localhost:8443/event/getEvent1/"+$scope.eventId;
		//$scope.dataToShare = [];
		console.log("GETTING THE Event");
		var getEvent = $http({
			method  : 'GET',
			url     : 'https://localhost:8443/event/getEvent1/' + $scope.eventId,

		});
		console.log("Getting the event using the url: " + $scope.url);
		getEvent.success(function(response){
			console.log('GET PAYMENT PLAN SUCCESS! ');
			console.log(response);
			$scope.event = response;
		});
		getEvent.error(function(response){
			$state.go("dashboard.viewTicketSales");
			console.log('GET PAYMENT FAILED! ');
		});
		
		
		$scope.order_item = "cat";
		$scope.order_reverse = false;
		$scope.url1 = "https://localhost:8443/event/getTicketSales/"+$scope.eventId;
		//$scope.dataToShare = [];
		console.log("GETTING THE EVENTS");
		var getSales = $http({
			method  : 'GET',
			url     : 'https://localhost:8443/event/getTicketSales/' + $scope.eventId,

		});
		console.log("Getting the events using the url: " + $scope.url1);
		getSales.success(function(response){
			console.log('GET EVENTS SUCCESS! ');
			console.log(JSON.stringify(response));
			console.log(response);
			$scope.sales = response;
		});
		getSales.error(function(response){
			$state.go("dashboard.viewAllEventsEx");
			console.log('GET EVENTS FAILED! ');
		});
		
		
	});
	
}]);



