(function (speechApi, webkitSpeechRecognition) {
    "use_strict";

    if (!webkitSpeechRecognition) {
        console.log("webkitSpeechRecognition is not supported");
        return;
    }

    window.speechApi = speechApi || {};

    function listen(callback) {
        var recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en';

        recognition.onend = function (e) {
            if (callback) {
                callback({
                    error: 'no results'
                });
            }
        };

        recognition.onresult = function (e) {
            recognition.onend = null;
            if (callback) {
                callback({
                    text: e.results[0][0].transcript,
                    confidence: e.results[0][0].confidence
                });
            }
        }
        recognition.start();
    }

    window.speechApi.listen = listen;
})(window.speechApi, window.webkitSpeechRecognition);
