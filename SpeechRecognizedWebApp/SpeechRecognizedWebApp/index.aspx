<%@ Page Language="C#" %>

<%@ Import Namespace="SpeechLib" %>
<%@ Register TagPrefix="web" Namespace="SpeechRecognizedWebApp" Assembly="SpeechRecognizedWebApp" %>
<%@ Register TagPrefix="web" Namespace="System.Speech" Assembly="System.Speech, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Title</title>
    <script runat="server">

        private void OnSpeechRecognized(object sender, SpeechRecognizedEventArgs e)
        {

        }

        protected void Page_Load(object sender, EventArgs e)
        {

        }

    </script>
    <style type="text/css">
        .button {
            height: 41px;
            width: 169px;
        }

        #Text1 {
            margin-top: 0px;
        }
    </style>
</head>
<body>
    <form id="HtmlForm" runat="server">
        <div>Hello!</div>

        <input id="buttonStart" type="button" class="button" value="Start" onclick=" start() " />
        <input type="button" class="button" value="Stop" onclick="stop()" />
            <input type="button" value="Speak" onclick="speak()" style="height: 41px; width: 167px; margin-top: 0px" /><textarea id="text-output" cols="20" rows="6" ></textarea>
        <web:SpeechRecognition runat="server" ID="processor" ClientIDMode="Static" Mode="Desktop" Culture="en-US" OnSpeechRecognized="OnSpeechRecognized" OnClientSpeechRecognized="onSpeechRecognized" />

        <div>
            <web:SpeechSynthesizer runat="server" ID="synthesizer" Age="Senior" Gender="Male" Culture="en-US" Rate="0" Volume="100" />
            &nbsp;</div>

    </form>

    <script type="text/javascript">
        function onSpeechRecognized(result) {
            var alternatives = "";
            if (result.Alternatives) {
                alternatives = String.join(', ', result.Alternatives);
            }

            var textbox = document.getElementById('text-output');
            textbox.value = 'Recognized: ' + result.Text + '\nAlternatives: ' + alternatives;
        }

        function start() {
            document.getElementById('processor').startRecording();
        }

        function stop() {
            document.getElementById('processor').stopRecording();
        }

        function speak() {
            var textbox = document.getElementById('text-output');
            document.getElementById('synthesizer').speak(textbox.value);
        }
    </script>
</body>
</html>
