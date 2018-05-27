$( document ).ready( function() {
    var $playerImg = $( '#player-img-sel' );

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCVYXTZN-hdFv10bCoEZvhX4jW5Mri5ngk",
        authDomain: "rock-paper-scissors-13c0e.firebaseapp.com",
        databaseURL: "https://rock-paper-scissors-13c0e.firebaseio.com",
        projectId: "rock-paper-scissors-13c0e",
        storageBucket: "",
        messagingSenderId: "135919242745"
    };
    firebase.initializeApp( config );

    var database = firebase.database();

    database.ref().set({
        player: "here"
    });

    // Using .on("value", function(snapshot)) syntax will retrieve the data
    // from the database (both initially and every time something changes)
    // This will then store the data inside the variable "snapshot". We could rename "snapshot" to anything.
    database.ref().on("value", function(snapshot) {
        // Then we console.log the value of snapshot
        console.log(snapshot.val());
  
        // Then we change the html associated with the number.
        // $("#click-value").text(snapshot.val().clickCount);
  
        // Then update the clickCounter variable with data from the database.
        // clickCounter = snapshot.val().clickCount;
    }, function(error) {
        console.log("The read failed: " + error.code);
    });

    $playerImg.on("click", ".player-img", function() {
        var name = ($(this).attr("data-name"));

        $( "#player-choice" ).toggleClass( "fa-hand-" + name );
        $( "#player-choice" ).toggleClass( "fa-camera-retro" );
        // $( "#player-choice" ).toggleClass( "fa-camera-retro" );
        console.log(name);
    });
});



