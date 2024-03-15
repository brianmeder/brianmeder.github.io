
function userGreeting() {
    var goodbyeTime = new Date();
    const hours = goodbyeTime.getHours();
    if (hours >= 5 && hours < 12) { 
        document.write("<h1>🌅Good morning, User🌅</h1>");

      }
      else if (hours >= 12 && hours < 18) {
        document.write("<h1>🌞Good afternoon, User🌞</h1>");
      }
      else {
        document.write("<h1>🌙Good evening, User🌙</h1>");
    }
  }