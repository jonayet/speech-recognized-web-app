(function (speechSynthesis, speechSynthesisUtterance) {
    "use_strict";

    if (!speechSynthesis) {
        console.log("speechSynthesis is not supported");
        return;
    }

    function speak(text, callback) {
        var u = new speechSynthesisUtterance();
        u.text = text;
        u.lang = 'en-US';

        u.onend = function () {
            if (callback) {
                callback();
            }
        };

        u.onerror = function (e) {
            if (callback) {
                callback(e);
            }
        };
        speechSynthesis.speak(u);
    }

    window.speak = speak;
})(window.speechSynthesis, window.SpeechSynthesisUtterance);
