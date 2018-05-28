$( document ).ready( function() {
    var $playerImg = $( ".player-img-sel" );
    var $startButton = $( "#start-button" );

    var numCurrPlayers = 0;
    var playerOne = false;
    var pOneChoice = "";
    var playerTwo = false;
    var pTwoChoice = "";

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

    // Retrieve data from database, called when application starts and every time there is an update to the database
    database.ref().on("value", function(snapshot) {
        // Then we console.log the value of snapshot
        console.log(snapshot.val());

        if (snapshot.child("numCurrPlayers").exists()) {
            numCurrPlayers = snapshot.val().numCurrPlayers;
        }
    }, function(error) {
        console.log("The read failed: " + error.code);
    });


    $startButton.on( "click", function() {
        $( "#start-form" ).hide();
        $( "#game-board" ).toggleClass( "is-invisible" );

        numCurrPlayers++;

        if (numCurrPlayers === 1) {
            playerOne = true;
            console.log("Player 1");

            $( "#player1-selectors" ).toggleClass( "is-invisible" );

            database.ref().set({
                numCurrPlayers: numCurrPlayers,
                playerOne: playerOne,
                pOneChoice: pOneChoice, 
                playerTwo: playerTwo,
                pTwoChoice: pTwoChoice 
            });
        }
        else if (numCurrPlayers === 2) {
            playerTwo = true;
            console.log("Player 2");

            $( "#player2-selectors" ).toggleClass( "is-invisible" );

            database.ref().update({
                numCurrPlayers: numCurrPlayers,
                playerTwo: playerTwo
            });
        }
    });


    // Player 1 pushes selection
    // Player 2 pushes selection

    // Every update, look for player 1 selection and player 2 selection
    // Compare logic


    $playerImg.on("click", ".player-img", function() {
        var choice = ($(this).attr("data-choice"));

        if( playerOne ) {
            $( "#player-one-choice" ).toggleClass( "fa-hand-" + choice );
            $( "#player-one-choice" ).toggleClass( "fa-camera-retro" );
            $( "#player1-selectors" ).toggleClass( "is-invisible" );

            database.ref().update({
                pOneChoice: choice
            });
        }
        else {  // must be Player 2
            $( "#player-two-choice" ).toggleClass( "fa-hand-" + choice );
            $( "#player-two-choice" ).toggleClass( "fa-camera-retro" );
            $( "#player2-selectors" ).toggleClass( "is-invisible" );

            database.ref().update({
                pTwoChoice: choice
            });
        }

        // console.log(name);
    });
});



