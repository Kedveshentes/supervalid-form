'use strict';

app.directive('autoComplete', ['$http', function ($http) {
	return {
		restrict: 'AE',
		templateUrl: '/js/autocomplete/autocomplete.html',
		scope: {
			selectedSuggestion: '='
		},
		link: function link($scope, elem, attrs) {
			$scope.selectedSuggestion = '';

			$scope.search = function () {
				$http.get('/search/occupation/', { params: { string: $scope.searchText } }).success(function (response) {
					$scope.searchArray = response;
					if ($scope.activeIndex !== undefined && $scope.searchArray.length - 1 < $scope.activeIndex) {
						$scope.activeIndex = 0;
					}
				});
			};

			$scope.setActiveIndex = function (index) {
				$scope.activeIndex = index;
			};

			$scope.clearOccupationsData = function () {
				$scope.searchArray = [];
			};

			$scope.selectSuggestion = function (index) {
				$scope.selectedSuggestion = $scope.searchArray[index];
				$scope.searchText = $scope.selectedSuggestion;
				$scope.clearOccupationsData();
			};

			$scope.autocompleteOffClicked = function () {
				$scope.selectedSuggestion = $scope.searchText;
				$scope.clearOccupationsData();
			};

			$scope.checkKeyDown = function (event) {
				switch (event.keyCode) {
					case 40:
						// DOWN
						event.preventDefault();
						if ($scope.activeIndex < $scope.searchArray.length - 1) {
							$scope.setActiveIndex($scope.activeIndex + 1);
						} else if (!$scope.activeIndex) {
							$scope.activeIndex = 0;
						}
						break;
					case 38:
						// UP
						event.preventDefault();
						if ($scope.activeIndex > 0) {
							$scope.setActiveIndex($scope.activeIndex - 1);
						}
						break;
					case 27:
						// ESC
						event.preventDefault();
						$scope.clearOccupationsData();
						break;
					case 13:
						// ENTER
						event.preventDefault();
						if ($scope.activeIndex !== undefined && $scope.searchArray.length !== 0) {
							$scope.selectSuggestion($scope.activeIndex);
						} else {
							$scope.autocompleteOffClicked();
						}
						break;
				}
			};
		}
	};
}]);