function findSequence(goal, trip, debug, verbose) {
  
  if (trip) debugger; 

  // Causes the debugging window to catch right here. Hit F11 to step into the next 
  // statement. F10 steps over any function calls, and simply goes to the next line
  // (or breakpoint if any others are set).
  
  function find(start, history) {
    afterEntry(start, history);
    
    if (start == goal) {
      afterGoalMet();
      return history;
    }
    else if (start > goal) {
      whenStartExceedsGoal();
      return null;
    }
    else 
    {
      whenStartDoesntExceedGoal();
      
      var result = find(start + 5, "(" + history + " + 5)");
      
      if (result != null) {
          whenResultIsNotNull(result);
          return result;
      } else {
          whenResultIsNull();
          return find(start * 3, "(" + history + " * 3)");
      }
    } 
  }
  
  var findRecursions = 0;
  var totalFindCalls = 0;
  var nullReturns = 0;
  var d=debug;
  var v=verbose;
  
  function afterEntry(start, history) {
    if (d){
      var message = "";
      var indent = "";    
      totalFindCalls++;    
      indent = "*".x(findRecursions);
      message = pad(totalFindCalls,6) + " " + pad(findRecursions,6) + indent + " " + start + " " + history + " = " + eval(history); 
      print(message);
    }
  }
    
  function afterGoalMet() {
    if(v) print("Hi. You should only see this messae ONCE per test..");
    if(d) findRecursions--;
  }
    
  function whenStartExceedsGoal() {
      if(d) { 
        findRecursions--;
        nullReturns++;
      }
      if(v) print("Null returns. Well, you've seen me " + nullReturns + " times already!");
  }
  
  function whenStartDoesntExceedGoal() {
    if(d) findRecursions++;
  }
  
  function whenResultIsNotNull(result) {
    if(v) print("NOT NULL: " + findRecursions + ": " + result);
    if(d) findRecursions--;  
  }
  
  function whenResultIsNull() {
    if(v) print("NULL -- now switching to the find(start * 3 ....");
  }
  
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