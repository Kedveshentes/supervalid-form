describe('Testing form functionality', function () {

    var elements = {
        nameInput     : element(by.model('vm.user.name')),
        emailInput    : element(by.model('vm.user.email')),
        emailRequired : element(by.css('.error-message-name-required')),
        emailInvalid  : element(by.css('.error-message-email-invalid'))
    };

    beforeEach(function () {
        browser.get('http://localhost:1235');
    });

    it('should have a title', function () {
        expect(browser.getTitle()).toEqual('Unnecessarily Valid Form');
    });

    it('should find error message and .ng-invalid class on touched name field if it\'s invalid or required and left empty', function () {
        elements.nameInput.click();
        elements.emailInput.click();

        expect(elements.emailRequired.isDisplayed()).toBe(true);

        expect(elements.nameInput.getAttribute('class').then(function (classes) {
            return classes;
        })).toMatch('ng-invalid');
    });

    it('should find "required" error message and .ng-invalid class on email field if it was focused and left invalid', function () {
        elements.nameInput.click();
        elements.emailInput.click();
        elements.emailInput.sendKeys('asd@asd');
        elements.nameInput.click();

        expect(elements.emailInvalid.isDisplayed()).toBe(true);

        expect(elements.emailInput.getAttribute('class').then(function (classes) {
            return classes;
        })).toMatch('ng-invalid');

        elements.emailInput.click();
        elements.emailInput.sendKeys('.asd');

        expect(elements.emailInput.getAttribute('class').then(function (classes) {
            return classes;
        })).not.toMatch('ng-invalid');
    });
});
