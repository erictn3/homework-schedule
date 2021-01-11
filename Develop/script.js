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
  });
  // displaying saved data
  // for loop maybe
  $("#hour-9 .search-area").val(localStorage.getItem("hour-9"));
  $("#hour-10 .search-area").val(localStorage.getItem("hour-10"));
  $("#hour-11 .search-area").val(localStorage.getItem("hour-11"));
  $("#hour-12 .search-area").val(localStorage.getItem("hour-12"));
  $("#hour-13 .search-area").val(localStorage.getItem("hour-13"));
  $("#hour-14 .search-area").val(localStorage.getItem("hour-14"));
  $("#hour-15 .search-area").val(localStorage.getItem("hour-15"));
  $("#hour-16 .search-area").val(localStorage.getItem("hour-16"));
  $("#hour-17 .search-area").val(localStorage.getItem("hour-17"));
});


