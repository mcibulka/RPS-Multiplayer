$( document ).ready( function() {
    var $playerImg = $( ".player-img-sel" );
    var $startButton = $( "#start-button" );

    var playerID = 0;

    var numCurrPlayers = 0;     // for future implementation to refuse connections
    var playerOne = false;
    var pOneChoice = "";
    var pOneWins = false;
    var playerTwo = false;
    var pTwoChoice = "";
    var pTwoWins = false;
    var draw = false;

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
    

    function checkWin(){
        if( playerID === 1 ){    // display Player Two's hand
            $( "#player-two-choice" ).addClass( "fa-hand-" + pTwoChoice );
            $( "#player-two-choice" ).removeClass( "fa-camera-retro" );
        }
        else {  // must be Player Two, display Player One's hand
            $( "#player-one-choice" ).addClass( "fa-hand-" + pOneChoice );
            $( "#player-one-choice" ).removeClass( "fa-camera-retro" );
        }

        if(( pOneChoice === "rock" ) && ( pTwoChoice === "paper" )) {
            pTwoWins = true;
        }
        else if(( pOneChoice === "rock" ) && ( pTwoChoice === "scissors" )) {
            pOneWins = true;
        }
        else if(( pOneChoice === "paper" ) && ( pTwoChoice === "rock" )) {
            pOneWins = true;
        }
        else if(( pOneChoice === "paper" ) && ( pTwoChoice === "scissors" )) {
            pTwoWins = true;
        }
        else if(( pOneChoice === "scissors" ) && ( pTwoChoice === "rock" )) {
            pTwoWins = true;
        }
        else if(( pOneChoice === "scissors" ) && ( pTwoChoice === "paper" )) {
            pOneWins = true;
        }
        else {
            draw = true;
        }

        database.ref().update({
            pOneWins: pOneWins,
            pTwoWins: pTwoWins,
            draw: draw
        });
    }


    function displayWin(){
        if( pOneWins ) {
            console.log("Player One Wins");
        }
        else if( pTwoWins ) {
            console.log("Player Two Wins");
        }
        else {
            console.log("Draw!");
        }
    }


    // Retrieve data from database, called when application starts and every time there is an update to the database
    database.ref().on("value", function(snapshot) {

        if (snapshot.child("numCurrPlayers").exists()) {
            numCurrPlayers = snapshot.val().numCurrPlayers;
        }

        // Player One has made their selection
        if (snapshot.child("pOneChoice").exists()) {
            pOneChoice = snapshot.val().pOneChoice;
        }

        // Player Two has made their selection
        if (snapshot.child("pTwoChoice").exists()) {
            pTwoChoice = snapshot.val().pTwoChoice;
        }

        if ((pOneChoice !== "") && (pTwoChoice !== "")) {
            checkWin();
        }

        if (snapshot.child("pOneWins").exists()) {
            pOneWins = snapshot.val().pOneWins;
        }

        if (snapshot.child("pTwoWins").exists()) {
            pTwoWins = snapshot.val().pTwoWins;
        }

        if (snapshot.child("draw").exists()) {
            draw = snapshot.val().draw;
        }

        if( pOneWins || pTwoWins || draw ){
            displayWin();
        }
    }, function(error) {
        console.log("The read failed: " + error.code);
    });


    $startButton.on( "click", function() {
        $( "#start-form" ).hide();
        $( "#game-board" ).toggleClass( "is-invisible" );

        numCurrPlayers++;

        if (numCurrPlayers === 1) {
            playerID = 1;
            playerOne = true;

            $( "#player1-selectors" ).toggleClass( "is-invisible" );

            // Create new instance of data
            database.ref().set({
                numCurrPlayers: numCurrPlayers,
                playerOne: playerOne,
                pOneChoice: pOneChoice,
                pOneWins: pOneWins, 
                playerTwo: playerTwo,
                pTwoChoice: pTwoChoice,
                pTwoWins: pTwoWins,
                draw: draw 
            });
        }
        else if (numCurrPlayers === 2) {
            playerID = 2;
            playerTwo = true;

            $( "#player2-selectors" ).toggleClass( "is-invisible" );

            // Update these keys rather than overwrite data with .set()
            database.ref().update({
                numCurrPlayers: numCurrPlayers,
                playerTwo: playerTwo
            });
        }
    });


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
    });
});



