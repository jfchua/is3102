//VIEW ALL EVENTS,
app.controller('eventExternalController', ['$scope', '$http','$state','$routeParams','shareData', function ($scope, $http,$state, $routeParams, shareData) {

	angular.element(document).ready(function () {

	$scope.data = {};
	//var tempObj= {id:1};
	//console.log(tempObj)
	$http.get("//localhost:8443/event/viewAllEvents").then(function(response){
		$scope.events = response.data;
		console.log("DISPLAY ALL EVENT");
		console.log($scope.events);

	},function(response){
		alert("did not view all events");
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

$scope.requestForTicketSales = function(event){
	if(confirm('CONFIRM TO HAVE TICKET SALES FOR '+event.event_title+'?')){

		var tempObj ={eventId: event.id};
		console.log("fetch id "+ tempObj);
		//var buildings ={name: $scope.name, address: $scope.address};
		$http.post("//localhost:8443/event/requestTicket", JSON.stringify(tempObj)).then(function(response){
			//$scope.buildings = response.data;
			console.log("REQUEST FOR TICKET SALES");
			alert('SUCCESS REQUEST! GOING BACK TO VIEW EVENTS...');
			//if (confirm('LEVEL IS SAVED! GO BACK TO VIEW BUILDINGS?'))
			$state.go("dashboard.viewAllEventsEx");
		},function(response){
			alert("DID NOT REQUEST");
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
	   var getEvents = function(){
			//need to changed to same as workspace calendar view all events with status success approved,processing
			$http.get("//localhost:8443/eventManager/viewApprovedEvents").then(function(response){
				$scope.events = response.data;
				//console.log("DISPLAY ALL EVENT fir event manager");
				//console.log("EVENT DATA ARE OF THE FOLLOWING: " + $scope.buildings);
				//ADD EVENTS INTO EVENTSOURCES OF CALENDAR
				
				if($scope.events.length!=0){
					var index=0;
				    angular.forEach($scope.events, function() {

				         var event=[{start: $scope.events[index].event_start_date,
				        	 		end: $scope.events[index].event_end_date,			         
				        		 	title:'Booked',
				        		 	allDay: false,
				        		 	color: 'IndianRed',
				        		 	overlap:false
				         			}];
				         
				        $scope.haha.push(event);
				        	index = index + 1;
				    });
				    
				  var today = new Date();
					var end = new Date(); 
					var start= new Date();
				    start.setDate(today.getDate() + 5)
				    end.setDate(today.getDate() + 5)
				   // $scope.haha.push([{start:start,end:end,title:"IT Show 2017",allDay: true,editable:true,overlap:false}]);//need to delete this line
					   
				    console.log( $scope.haha);
					}
			},function(response){
				//alert(response);
				//console.log("response is : ")+JSON.stringify(response);
			}	
			)	
			
		}
	   
	   
	   
	   //RETRIEVE MAINTENANCES
	   //$scope.eventsFormated=[];
	   var getMaints = function(){
			//var buildings ={name: $scope.name, address: $scope.address};
			$http.get("//localhost:8443/maintenance/viewMaintenance").then(function(response){
				$scope.maints = response.data;
				if($scope.maints.length!=0){
					var index=0;
				    angular.forEach($scope.maints, function() {

				         var maint=[{start: $scope.maints[index].start,
				        	 		end: $scope.maints[index].end,			         
				        		 	title:"Booked",
				        		 	allDay: false,
				        		 	color: 'IndianRed'
				         			}];
				         
				        $scope.haha.push(maint);
				        	index = index + 1;
				    });
				   // $scope.eventSources.push([{start:today,end:next,title:"Book Sale 2017",allDay: false}]);//need to delete this line
				   // console.log( $scope.eventSources);
					}
			},function(response){
				//alert(response);
				//console.log("response is : ")+JSON.stringify(response);
			}	
			)	
			
		}
	   
	   getEvents();
	   getMaints();
	
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
}])



