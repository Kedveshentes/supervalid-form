'use strict';

app.service('formService', ['$http', function ($http) {
	'use strict';

	this.saveUserData = function (data) {
		return $http.post('/userdata', data);
	};
}]);