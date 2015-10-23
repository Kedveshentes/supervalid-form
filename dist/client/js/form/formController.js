'use strict';

app.controller('formController', ['formService', 'moment', function (formService, moment) {
	'use strict';

	var _this = this;

	var aMoment18YearsAgo = moment().subtract(18, 'years');

	this.dateChanged = function () {
		_this.tooYoung = moment(_this.user.date) > aMoment18YearsAgo;
		_this.regForm.date.$setValidity("You are too young", !_this.tooYoung);
	};

	this.submit = function () {
		formService.saveUserData(_this.user).success(function (data) {
			alert('Your data has been sent successfully!');
		}).error(function (data) {
			alert('Something went wrong, most likely you have passed the client side validation.');
		});
	};
}]);