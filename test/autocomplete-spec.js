describe('Testing the autocomplete directive', function () {

    browser.get('http://localhost:1235');

    var elements = {
        nameInput         : element(by.model('vm.user.name')),
        autoCompleteInput : element(by.css('.autocomplete .form-control')),
        suggestionsList   : element(by.css('.autocomplete .suggestions'))
    };

    it('should set .suggestions visible after entering a letter "p" into the autocomplete field and then hide on blur', function () {
        elements.autoCompleteInput.click();
        elements.autoCompleteInput.sendKeys('p');
        expect(elements.suggestionsList.isDisplayed()).toBe(true);
        elements.nameInput.click();
        expect(elements.suggestionsList.isDisplayed()).toBe(false);
    });

    it('should set .suggestions visible after entering a letter "p" into the autocomplete field and then hide on pressing ESC', function () {
        elements.autoCompleteInput.click();
        elements.autoCompleteInput.sendKeys('p');
        elements.autoCompleteInput.sendKeys(protractor.Key.ESC);
        expect(elements.suggestionsList.isDisplayed()).toBe(false);
    });var rows = element.all(by.repeater('cat in pets'));

    it('should keep the value in the autocomplete field even after blur', function () {
        browser.get('http://localhost:1235');
        elements.autoCompleteInput.click();
        elements.autoCompleteInput.sendKeys('randomjob');
        elements.nameInput.click();
        expect(elements.autoCompleteInput.getAttribute('value')).toEqual('randomjob');
    });

    it('should move the selection up and down', function () {
        browser.get('http://localhost:1235');
        elements.autoCompleteInput.click();
        elements.autoCompleteInput.sendKeys('a');

        var suggestion     = element(by.repeater('searchResult in searchArray').row(2)),
            nextSuggestion = element(by.repeater('searchResult in searchArray').row(3));
        browser.actions().mouseMove(suggestion).perform();
        elements.autoCompleteInput.sendKeys(protractor.Key.DOWN);
        expect(nextSuggestion.getAttribute('class').then(function (classes) {
            return classes;
        })).toMatch('active');


        elements.autoCompleteInput.sendKeys(protractor.Key.UP);
        expect(suggestion.getAttribute('class').then(function (classes) {
            return classes;
        })).toMatch('active');
    });
});
