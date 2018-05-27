$( document ).ready( function() {
    var $playerImg = $( '#player-img-sel' );

    $playerImg.on("click", ".player-img", function() {
        var name = ($(this).attr("data-name"));

        $( "#player-choice" ).toggleClass( "fa-hand-" + name );
        $( "#player-choice" ).toggleClass( "fa-camera-retro" );
        // $( "#player-choice" ).toggleClass( "fa-camera-retro" );
        console.log(name);
    });
});



