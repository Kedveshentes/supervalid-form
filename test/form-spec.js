describe('Testing form functionality', function () {
    browser.get('http://localhost:1235');

    it('should have a title', function () {
        expect(browser.getTitle()).toEqual('Supervalid Form');
    });

    it('should find error message and .ng-invalid class on touched name field if it\'s invalid or required and left empty', function () {
        element(by.model('vm.user.name')).click();
        element(by.model('vm.user.email')).click();

        expect(element(by.css('.error-message-name-required')).isDisplayed()).toBe(true);

        expect(element(by.model('vm.user.name')).getAttribute('class').then(function (classes) {
            return classes;
        })).toMatch('ng-invalid');
    });

    it('should find "required" error message and .ng-invalid class on email field if it was focused and left invalid', function () {
        element(by.model('vm.user.name')).click();
        element(by.model('vm.user.email')).click();
        element(by.model('vm.user.email')).sendKeys('asd@asd');
        element(by.model('vm.user.name')).click();

        expect(element(by.css('.error-message-email-invalid')).isDisplayed()).toBe(true);

        expect(element(by.model('vm.user.email')).getAttribute('class').then(function (classes) {
            return classes;
        })).toMatch('ng-invalid');

        element(by.model('vm.user.email')).click();
        element(by.model('vm.user.email')).sendKeys('.asd');

        expect(element(by.model('vm.user.email')).getAttribute('class').then(function (classes) {
            return classes;
        })).not.toMatch('ng-invalid');
    });
});
