// Initialize Firebase
var config = {
    apiKey: "AIzaSyCoBUJXKrtXq4q9Xbjrp8UtPf1Y8ZBrGt4",
    authDomain: "train-scheduler-24326.firebaseapp.com",
    databaseURL: "https://train-scheduler-24326.firebaseio.com",
    projectId: "train-scheduler-24326",
    storageBucket: "train-scheduler-24326.appspot.com",
    messagingSenderId: "508585891150",
    appId: "1:508585891150:web:b589b002272718da"
  };
  // Initialize Firebase
  firebase.initializeApp(config);
  var database = firebase.database();

  database.ref().on("child_added", function(childSnapShot){
    const data = childSnapShot.val();
   //console.log(data)
    const $newRow = $("<tr>")
    const $tableData1 = $("<td>").text(data.name);
    const $tableData2 = $("<td>").text(data.destination);
    const $tableData3 = $("<td>").text(data.frequency);
    const idk = mathBullshit(data.frequency, data.time)
    const $tableData4 = $("<td>").text(idk.nextArrival);
    const $tableData5 = $("<td>").text(idk.minutesAway);
    $newRow.append($tableData1, $tableData2, $tableData3, $tableData4, $tableData5)
    $("#new-train").append($newRow);
  }); 

  $("#my-form").on("submit", function(event){
      event.preventDefault();

      const data = $(this).serializeArray()
      const newTrain = {
        name: data[0].value,
        destination: data[1].value,
        time: data[2].value,
        frequency: data[3].value
      }
      database.ref().push(newTrain);
  })

  function mathBullshit (frequency, time){
    // starting time. use moment to take current time 1 year in past
    var firstTimeConverted = moment(time, "HH:mm").subtract(1,"years");
    var currentTime = moment();
    
    // time difference between first and current
    var diffTime = currentTime.diff(firstTimeConverted, "minutes");
  
    var minutesAway = diffTime % frequency;

    var minutesUntilDeparture = frequency -  minutesAway;

    var nextArrival = moment().add(minutesUntilDeparture, "minutes");
    
    
    return {minutesAway: minutesUntilDeparture, nextArrival: nextArrival.format("HH:mm")};
  }




  
