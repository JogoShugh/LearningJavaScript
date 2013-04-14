# Utilities
copy = (from, to, propertiesToCopy) ->
	for property in propertiesToCopy
		to[property] = from[property]

# Module setup
@Menu = angular.module 'Menu', []

# Routing
@Menu.config ($routeProvider) ->
	$routeProvider.when('/menu/:meal', {
		templateUrl: 'partials/menu.html'
		controller: 'RouteController'
	}).otherwise({
		redirectTo: '/menu/breakfast'
	})

# Controllers
@MenuController = ($scope, $rootScope, $http) ->
	$rootScope.navLinks = [
		text: 'Breakfast'
		meal: 'breakfast'
	,
		text: 'Lunch'
		meal: 'lunch'
	,
		text: 'Dinner'
		meal: 'dinner'
	]

	$http.get('data/mealMenus.json').success (data) ->
		$rootScope.mealMenus = data

	$rootScope.getMenuFor = (meal) ->
		if @mealMenus[meal]?
			return @mealMenus[meal]
		else
			menu = @mealMenus.default
			menu.name = meal
			return menu

@RouteController = ($scope, $rootScope, $routeParams) ->
	meal = $routeParams.meal
	$scope.menu = meal
	meal = $rootScope.getMenuFor(meal)
	copy meal, $scope, ['name', 'headings', 'items']