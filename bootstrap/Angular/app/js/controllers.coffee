# Controllers 

@MenuCtrl = ($scope) ->
	$scope.navLinks = [
		text: 'Breakfast'
		href: 'Breakfast.html'
	,
		text: 'Lunch'
		href: 'Lunch.html'
	,
		text: 'Dinner'
		href: 'Dinner.html'
	]

	$scope.menuItems =
		breakfast: {}
		lunch: 
			headings: ['Item', 'Price', 'Calories']
			items: [
				item: 'Hamburger'
				price: 6.75
				calories: 475
			,
				item:'Chicken Sandwich Plate'
				price: 9.45
				calories: 587
			,
				item: 'Kalebone Roast Sandwich'
				price: 7.50
				calories: 355
			]
		dinner: {}