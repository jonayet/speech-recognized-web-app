(function ($, speechApi) {
    "use_strict";

    if (!speechApi) {
        console.log("speechApi not supported");
        return;
    }

    function askForSOmething() {
        speechApi.speak("please say something...", function() {
            speechApi.listen(function (result) {
                if (!result.error) {
                    speechApi.speak("did you said?." + result.text + ". please confirm.");
                    speechApi.listen(function(result) {
                        if (result.text === "yes") {
                            speechApi.speak("text recognized succed");
                            return;
                        } else {
                            askForSOmething();
                        }
                    });

                } else {
                    speechApi.speak("some error occured.");
                }
            });
        });
    }

    $("#btn_saySomething").click(function () {
        askForSOmething();
    });

})(window.$, window.speechApi);