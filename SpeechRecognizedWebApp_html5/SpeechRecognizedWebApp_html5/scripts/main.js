(function ($, speak) {
    "use_strict";

    if (!speak) {
        console.log("I can't speak!");
        return;
    }

    function sayHello() {
        speak("Hello!");
    }

    $("#btn_sayHello").click(function() {
        sayHello();
    });

})(window.$, window.speak);