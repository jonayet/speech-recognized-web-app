(function (speechApi, speechSynthesis, speechSynthesisUtterance) {
    "use_strict";

    if (!speechSynthesis) {
        console.log("speechSynthesis is not supported");
        return;
    }

    window.speechApi = speechApi || {};

    function speak(text, callback) {
        var msg = new speechSynthesisUtterance();
        //var voices = window.speechSynthesis.getVoices();
        //msg.voice = voices[10];
        msg.voiceURI = 'native';
        msg.volume = 1; // 0 to 1
        msg.rate = 1; // 0.1 to 10
        msg.pitch = 1; //0 to 2
        msg.text = text;
        msg.lang = 'en-US';

        msg.onend = function() {
            if (callback) {
                callback();
            }
        };

        msg.onerror = function(e) {
            if (callback) {
                callback(e);
            }
        };
        speechSynthesis.speak(msg);
    }

    window.speechApi.speak = speak;
})(window.speechApi , window.speechSynthesis, window.SpeechSynthesisUtterance);
