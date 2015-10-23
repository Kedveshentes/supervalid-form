app.controller('formController', ['formService', 'moment',
function (formService, moment) {
    'use strict';

	let aMoment18YearsAgo = moment().subtract(18, 'years');

	this.dateChanged = () => {
		this.tooYoung = moment(this.user.date) > aMoment18YearsAgo;
		this.regForm.date.$setValidity("You are too young", !this.tooYoung);
	}

	this.submit = () => {
		formService.saveUserData(this.user)
			.success(function (data) {
				alert('Your data has been sent successfully!')
			})
			.error(function (data) {
				alert('Something went wrong, most likely you have passed the client side validation.')
			});
	}
}]);
