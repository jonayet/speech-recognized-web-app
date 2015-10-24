(function ($, gps, speechApi) {
    "use_strict";

    var targetCoordinates = { latitude: 22.811044, longitude: 90.361507 };
    var targetAddress = "Dhaka";
    var areaRadius = 2.5; // Km

    if (!speechApi) {
        console.log("speechApi not supported");
        return;
    }

    function confirm(success, aborted) {
        speechApi.speak("Confirm by Yes or No. Or say Cancel to skip.");
        speechApi.listen(function(confirmResp) {
            switch (confirmResp.text) {
            case "yes":
                if (success)
                    success(true);
                break;
            case "no":
                if (success)
                    success(false);
                break;
                case "cancel":
                    speechApi.speak("canceled.");
                if (aborted)
                    aborted(true);
                break;
            default:
                speechApi.speak("unknown response.");
                confirm(success, aborted);
            }
        });
    }

    function askForInput(text, success, aborted) {
        speechApi.speak(text, function () {
            speechApi.listen(function (result) {
                if (!result.error) {
                    speechApi.speak("did you said?" + result.text, function () {
                        confirm(function (yes) {
                            if (yes && success)
                                success(result.text);
                            if (!yes)
                                askForInput(text, success, aborted);
                        }, function() {
                            if (aborted)
                                aborted();
                        });
                    });
                } else {
                    speechApi.speak("error occured. please try again.");
                }
            });
        });
    }

    $("#btn_start").click(function () {
        $('#btn_start').prop('disabled', true);
        gps.getLocation(function (position) {
            var distance = position.getDistance(targetCoordinates);
            if (distance < areaRadius) {
                speechApi.speak("are you around " + targetAddress, function () {
                    confirm(function(yes) {
                        if (yes) {
                            askForInput("please give some input.", function (text) {
                                speechApi.speak("you have entered: " + text  + ":" + ".thank you.", function() {
                                    $('#btn_start').prop('disabled', false);
                                });
                            }, function () {
                                $('#btn_start').prop('disabled', false);
                            });
                        } else {
                            $('#btn_start').prop('disabled', false);
                        }
                    }, function() {
                        $('#btn_start').prop('disabled', false);
                    });
                });
            } else {
                $('#btn_start').prop('disabled', false);
            }
        });
    });

})(window.$, window.gps, window.speechApi);