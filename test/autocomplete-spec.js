describe('Testing form functionality', function () {

    browser.get('http://localhost:1235');

    it('should set .suggestions visible after entering a letter "p" into the autocomplete field', function () {
        element(by.css('.autocomplete .form-control')).click();
        element(by.css('.autocomplete .form-control')).sendKeys('p');
        expect(element(by.css('.autocomplete .suggestions')).isDisplayed()).toBe(true);
    });

    it('should set .suggestions hidden after pressing ESC', function () {
        element(by.css('.autocomplete .form-control')).click();
        element(by.css('.autocomplete .form-control')).sendKeys(protractor.Key.ESC);
        expect(element(by.css('.autocomplete .suggestions')).isDisplayed()).toBe(false);
    });

    it('should find error message and .ng-invalid class on touched name field if it\'s invalid or required and left empty', function () {
        element(by.model('vm.user.name')).click();
        element(by.model('vm.user.email')).click();

        expect(element(by.css('.error-message-name-required')).isDisplayed()).toBe(true);

        expect(element(by.model('vm.user.name')).getAttribute('class').then(function (classes) {
            return classes;
        })).toMatch('ng-invalid');
    });
});
