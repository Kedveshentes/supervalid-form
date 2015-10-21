app.service('formService', ['$http',
	function ($http) {
        'use strict';

		this.sendUserData = function (data) {
			return $http.post('/userdata', data);
		}
	}]);
