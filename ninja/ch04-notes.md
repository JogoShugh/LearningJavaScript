# Chapter 4

## 4.2.4 Inline functions, while named, are only visible within the functions themselves

Example: 

```javascript
var myFunc = function myFuncHasThisNameButOnlyInsideItself() {
	console.log(myFuncHasThisNameButOnlyInsideItself); // shows function definition
}

myFunc(); // Executes the func, thus printing the function definition
console.log(myFuncHasThisNameButOnlyInsideItself); // shows undefined
```

## 4.2.5 Don't callee me, I'm hangee up on you.

The `arguments.callee` is forbidden in ES5 standard strict mode, and will be dropped in new versions!

For legacy, it refers to the currently-executing function, and can be invoked for recursion. Sad, I kind of liked it.

## 4.2.6 

# 4.3 Objectification of Functions

* Functions are first-class objects
* Can have properties, methods, and variables and properties
* And, they are callable (invokable)
* 
## 4.3.1 Use !! to create Booleans from expressions

* Use `!!(expr)` to turn any JavaScript expression into a Boolean equivalent.

Examples:

```javascript
console.log(!!"he shot me down" === true);
console.log(!!0 === false);
```
## 4.3.2 function iKnowWhatYouDidLastMicrosecond(action) {...}

* Memoization == the process of building up a function that's capable of remembering its previously computed values.
* Can accomplish with function properties

Example:

```javascript
function iKnowWhatYouDidLastMicrosecond(action) {
	// And how many times you did it!
	if (!iKnowWhatYouDidLastMicrosecond.memory) iKnowWhatYouDidLastMicrosecond.memory = {};
	if (iKnowWhatYouDidLastMicrosecond.memory[action] != null) {
		iKnowWhatYouDidLastMicrosecond.memory[action]++;
	} else {
		iKnowWhatYouDidLastMicrosecond.memory[action] = 1;
	}
	console.log("You have done '" + action + "' " + 
		iKnowWhatYouDidLastMicrosecond.memory[action] + " times!");
}

iKnowWhatYouDidLastMicrosecond('swim');
iKnowWhatYouDidLastMicrosecond('run');
iKnowWhatYouDidLastMicrosecond('hike');
iKnowWhatYouDidLastMicrosecond('sleep');
iKnowWhatYouDidLastMicrosecond('sleeeeeeep');
iKnowWhatYouDidLastMicrosecond('swim');
iKnowWhatYouDidLastMicrosecond('sleep');
iKnowWhatYouDidLastMicrosecond('hike');
iKnowWhatYouDidLastMicrosecond('sleeeeeeep');
iKnowWhatYouDidLastMicrosecond('hike');
```

```coffeescript
iKnowWhatYouDidLastMicrosecond = (action) ->
	# And how many times you did it!
	if not iKnowWhatYouDidLastMicrosecond.memory? iKnowWhatYouDidLastMicrosecond.memory = {}
	if iKnowWhatYouDidLastMicrosecond.memory[action]!
		iKnowWhatYouDidLastMicrosecond.memory[action]++
	else
		iKnowWhatYouDidLastMicrosecond.memory[action] = 1
	console.log "You have done '#{action}' #{iKnowWhatYouDidLastMicrosecond.memory[action]} times!")

iKnowWhatYouDidLastMicrosecond 'swim'
iKnowWhatYouDidLastMicrosecond 'run'
iKnowWhatYouDidLastMicrosecond 'hike'
iKnowWhatYouDidLastMicrosecond 'sleep'
iKnowWhatYouDidLastMicrosecond 'sleeeeeeep'
iKnowWhatYouDidLastMicrosecond 'swim'
iKnowWhatYouDidLastMicrosecond 'sleep'
iKnowWhatYouDidLastMicrosecond 'hike'
iKnowWhatYouDidLastMicrosecond 'sleeeeeeep'
iKnowWhatYouDidLastMicrosecond 'hike'
```
# 4.3.3 Faking array methods

When you invoke the prototype of Array on your own instance, you'll get the side-effect of having a collection of items, and a populated `length` property.

See the 4.10 example.

# 4.4 Variable-length argument lists







