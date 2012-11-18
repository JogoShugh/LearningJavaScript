function findSequence(goal, trip, debug, verbose) {
  
  if (trip) debugger; 

  // Causes the debugging window to catch right here. Hit F11 to step into the next 
  // statement. F10 steps over any function calls, and simply goes to the next line
  // (or breakpoint if any others are set).
  
  function find(start, history) {
    find.afterEntry(start, history);
    
    if (start == goal) {
      find.afterGoalMet();
      return history;
    }
    else if (start > goal) {
      find.whenStartExceedsGoal();
      return null;
    }
    else 
    {
      find.whenStartDoesntExceedGoal();
      
      var result = find(start + 5, "(" + history + " + 5)");
      
      if (result != null) {
          find.whenResultIsNotNull(result);
          return result;
      } else {
          find.whenResultIsNull();
          return find(start * 3, "(" + history + " * 3)");
      }
    } 
  }
  
  find.findRecursions = 0;
  find.totalFindCalls = 0;
  find.nullReturns = 0;
  find.d=debug;
  find.v=verbose;
  
  find.afterEntry = function(start, history) {
    if (find.d){
      var message = "";
      var indent = "";    
      find.totalFindCalls++;    
      indent = "*".x(find.findRecursions);
      message = pad(find.totalFindCalls,6) + " " + pad(find.findRecursions,6) + indent + " " + start + " " + history + " = " + eval(history); 
      print(message);
    }
  };
    
  find.afterGoalMet = function() {
    if(find.v) print("Hi. You should only see this messae ONCE per test..");
    if(find.d) find.findRecursions--;
  };
    
  find.whenStartExceedsGoal = function() {
      if(find.d) { 
        find.findRecursions--;
        find.nullReturns++;
      }
      if(find.v) print("Null returns. Well, you've seen me " + find.nullReturns + " times already!");
  };
  
  find.whenStartDoesntExceedGoal = function() {
    if(find.d) find.findRecursions++;
  };
  
  find.whenResultIsNotNull = function(result) {
    if(find.v) print("NOT NULL: " + find.findRecursions + ": " + result);
    if(find.d) find.findRecursions--;  
  };
  
  find.whenResultIsNull = function() {
    if(find.v) print("NULL -- now switching to the find(start * 3 ....");
  };
  
  return find(1, "1");
}

String.prototype.x = function(numberOfTimesToMultiply) {
  var stringToMultiply = this;   
  var multipliedString = "";
  for(var i = 0; i < numberOfTimesToMultiply; i++) {
     multipliedString += stringToMultiply; 
  }   
  return multipliedString ;
}

  
function pad(
  a,// the number to convert 
  b // number of resulting characters
){
  return (
    1e15 + a + // combine with large number
    ""  // convert to string
  ).slice(-b) // cut leading "1"
}

var tripDebugger = true;
var debug = true;
var verbose = true;
print(findSequence(24, tripDebugger, debug, verbose));