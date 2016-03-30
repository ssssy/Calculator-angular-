var app = angular.module('app', []);
app.controller('dropdown', function($scope, dropdownFactory){
		

	$scope.selected={};

	$scope.init = function(){
		dropdownFactory.get().then(function(reponse){
			$scope.data = dropdownFactory.formatData( reponse.data);
			console.log($scope.data.zones)
	});
	}
});

//factory retrieve data
app.factory('dropdownFactory', function($http){

	var formatData = function(data){
		var result = {info:data.info,zones:{}};

		angular.forEach(data.zones,function(z){
			var name = z.name;
			var fares = z.fares;
			result.zones[name] = {};

			angular.forEach(fares,function(fare){
				if(!result.zones[name][fare.type]){
					result.zones[name][fare.type]={};
				}
				result.zones[name][fare.type][fare.purchase] = {trips:fare.trips,price:fare.price};

			});
		})
		return result;
	//	console.log(result);
}
	return {
		get: function(){
			console.log("inside function");
			// return formatData()
	
			return $http.get('fare.json');
		},
		formatData:formatData
	}
});

// app.filter('unique', function() {
//    return function(collection, keyname) {
//       var output = [], 
//           keys = [];

//       angular.forEach(collection, function(item) {
//           var key = item[keyname];
//           if(keys.indexOf(key) === -1) {
//               keys.push(key);
//               output.push(item);
//           }
//       });
//       return output;
//    };
// });
