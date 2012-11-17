var findRecursions = 0;
var totalFindCalls = 0;
var nullReturns = 0;
var d=true;
var v=true;

function findSequence(goal) {
  
  debugger; 
  // Causes the debugging window to catch right here. Hit F11 to step into the next 
  // statement. F10 steps over any function calls, and simply goes to the next line
  // (or breakpoint if any others are set).
  
  function find(start, history) { // Declare a new function, which can be called by 
                                  // code later on inside of the findSequence function only.
    
    // Declare some debugging and visualization values
    if (d){
      var message = "";
      var indent = "";
    
      totalFindCalls++;    
      indent = "*".x(findRecursions);
      message = pad(totalFindCalls,6) + " " + pad(findRecursions,6) + indent + " " + start + " " + history + " = " + eval(history); 
      print(message);
    }
    
    if (start == goal) { 
      if(v) print("Hi. You should only see this messae ONCE per test..");
      if(d) findRecursions--;
      return history; // 
    }
    else if (start > goal) {
      if(d) { 
        findRecursions--;
        nullReturns++;
      }
      if(v) print("Null returns. Well, you've seen me " + nullReturns + " times already!");
      return null;
    }
    else 
    {
      if(d) findRecursions++;

      var result = find(start + 5, "(" + history + " + 5)");
      
      if (result != null) {
          if(v) print("NOT NULL: " + findRecursions + ": " + result);
          if(d) findRecursions--;
          return result;
      } else {
          if(v) print("NULL -- now switching to the find(start * 3 ....");
          return find(start * 3, "(" + history + " * 3)");
      }
    } 
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

print(findSequence(24));