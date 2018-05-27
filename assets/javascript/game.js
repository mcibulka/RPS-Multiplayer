$( document ).ready( function() {
    var $playerImg = $( '#player-img-sel' );

    var numCurrPlayers = 0;

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

    // Using .on("value", function(snapshot)) syntax will retrieve the data
    // from the database (both initially and every time something changes)
    // This will then store the data inside the variable "snapshot". We could rename "snapshot" to anything.
    database.ref().on("value", function(snapshot) {
        // Then we console.log the value of snapshot
        console.log(snapshot.val());
  
        // If Firebase has a highPrice and highBidder stored, update our client-side variables
        if (snapshot.child("numCurrPlayers").exists()) {
            // Set the variables for highBidder/highPrice equal to the stored values.
            numCurrPlayers = snapshot.val().numCurrPlayers;
            console.log("Current count: " + numCurrPlayers);
        }
    }, function(error) {
        console.log("The read failed: " + error.code);
    });


    numCurrPlayers++;

    if (numCurrPlayers === 0) {
        console.log("Player 1");

        database.ref().set({
            numCurrPlayers: numCurrPlayers 
        });
    }
    else if (numCurrPlayers === 1) {
        console.log("Player 2");

        database.ref().update({
            numCurrPlayers: numCurrPlayers
        });
    }


    $playerImg.on("click", ".player-img", function() {
        var name = ($(this).attr("data-name"));

        $( "#player-choice" ).toggleClass( "fa-hand-" + name );
        $( "#player-choice" ).toggleClass( "fa-camera-retro" );
        // $( "#player-choice" ).toggleClass( "fa-camera-retro" );
        console.log(name);
    });
});



