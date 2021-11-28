jQuery(document).ready(function ($) {
    var deadline = Date.parse( $(".countdown-container").data("deadline") ),
        current = Date.parse( $(".countdown-container").data("current") );
    if (deadline - current <= 0) {
        location.reload(true);
    };
    var x = setInterval(function() {
        var distance =  deadline - current,
            days = Math.floor( distance / (1000 * 60 * 60 * 24) ),
            hours = Math.floor( ( distance / (1000 * 60 * 60) ) % 24 ),
            minutes = Math.floor( (distance / 1000 / 60) % 60 ),
            seconds = Math.floor( (distance / 1000) % 60 );
        $(".digits.days").text(days);
        $(".digits.hours").text( ('0' + hours).slice(-2) );
        $(".digits.minutes").text( ('0' + minutes).slice(-2) );
        $(".digits.seconds").text( ('0' + seconds).slice(-2) );
        current += 1000;
        if (distance <= 0) {
            clearInterval(x);
            location.reload(true);
        };
    }, 1000);
});