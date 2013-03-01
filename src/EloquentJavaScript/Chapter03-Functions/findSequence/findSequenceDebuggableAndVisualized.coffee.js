d=true
v=true

findSequence = (goal) ->  
  findRecursions = 0
  totalFindCalls = 0
  nullReturns = 0
  # debugger
  """
  Causes the debugging window to catch right here. Hit F11 to step into the next 
  statement. F10 steps over any function calls, and simply goes to the next line
  (or breakpoint if any others are set).
  """
  find = (start, history) -> # Declare a new function, which can be called by 
                             # code later on inside of the findSequence function only.

    # Declare some debugging and visualization values
    if d
      message = ""
      indent = ""
    
      totalFindCalls++
      indent = Array(findRecursions).join "*"
      message = pad(totalFindCalls, 6) + " " + pad(findRecursions,6) + indent + " " + start + " " + history + " = " + eval(history) 
      print(message)
    
    if start == goal 
      print("Hi. You should only see this messae ONCE per test..") if v
      findRecursions-- if d
      return history

    else if start > goal
      if d 
        findRecursions--
        nullReturns++
      print("Null returns. Well, you've seen me " + nullReturns + " times already!") if v
      return null
    else 
      findRecursions++ if d

      result = find(start + 5, "(" + history + " + 5)")
      
      if result != null
          print("NOT NULL: " + findRecursions + ": " + result) if v
          findRecursions-- if d
          return result
      else
          print("NULL -- now switching to the find(start * 3 ....") if v
          return find(start * 3, "(" + history + " * 3)")  
  
  return find(1, "1")

pad = (a, b) ->
  return (
    1e15 + a +  # combine with large number
    ""          # convert to string
  ).slice(-b)   # cut leading "1"

print = (value) ->
  console.log value

print findSequence 24

window.d = d
window.findSequence = findSequence