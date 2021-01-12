function displayAdjustedHour(){
  // for loop to get work hours of the day
  for (var i = 9; i <= 17; i++){
    var adjustedHour = i;
    var timeCode = " A.M."

    // adjusts to non-military time (PM)
    if (adjustedHour>12){
      adjustedHour-=12;
    }
    // adjusting for PM time 
    if (i>11){
      timeCode = " P.M."
    }
    // creating div box
    var timeBlock = document.createElement("div");
    timeBlock.className = "day-display";
    timeBlock.id = "hour-" + i;
    document.body.appendChild(timeBlock);

    // paragraph portion of div
    var timeInfo = document.createElement("p");
    timeInfo.className = "day-align time-text";
    timeInfo.innerHTML = adjustedHour + timeCode; 
    timeBlock.appendChild(timeInfo);
    
    // text area of div
    var dailyTasks = document.createElement("textarea");
    dailyTasks.className = "day-align search-area";
    timeBlock.appendChild(dailyTasks);

    // button area of div
    var saveBtn = document.createElement("button");
    saveBtn.className = "day-align save-btn";
    saveBtn.innerText = "save";
    timeBlock.appendChild(saveBtn);
  }
}
displayAdjustedHour();

function hourUpdater() {
  // get current hour
  var currentHour = moment().hours();

  // loop over time blocks
  $(".day-display").each(function() {
    // split #hour-9 and returns 9 
    var blockHour = parseInt($(this).attr("id").split("-")[1]);

    // check if we've moved past this time
    if (blockHour < currentHour) {
      $(this).addClass("past");
    } 
    else if (blockHour === currentHour) {
      $(this).removeClass("past");
      $(this).addClass("present");
    } 
    else {
      $(this).removeClass("past");
      $(this).removeClass("present");
      $(this).addClass("future");
    }
  });
}
hourUpdater();

$(document).ready(function() {
  $(".save-btn").on("click", function() {
    // logging key as id and value as task description
    var taskDescription = $(this).siblings(".search-area").val();
    var id = $(this).parent().attr("id");
    localStorage.setItem(id, taskDescription);
    alert("You made an update in your schedule! Refresh to check for changes");
  });
  // displaying saved data


  // for loop to store hourly tasks
  for (var i = 9; i <= 17; i ++){
    $("#hour-" + i + " .search-area").val(localStorage.getItem("hour-" + i));
  }

  // display current day on page
  $("#currentDay").text(moment().format("dddd, MMMM Do"));
});


