<%@ Page Language="C#" %>

<%@ Register TagPrefix="web" Namespace="SpeechRecognizedWebApp" Assembly="SpeechRecognizedWebApp" %>

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
    </style>
</head>
<body>
    <form id="HtmlForm" runat="server">
        <div>Hello!</div>

        <input type="button" class="button" value="Start" onclick=" start() " />
        <input type="button" class="button" value="Stop" onclick="stop()" />

        <web:SpeechRecognition runat="server" id="processor" ClientIDMode="Static" Mode="Desktop" Culture="en-US" OnSpeechRecognized="OnSpeechRecognized" OnClientSpeechRecognized="onSpeechRecognized" />
    </form>

    <script type="text/javascript">
        function onSpeechRecognized(result) {
            var alternatives = "";
            if (result.Alternatives) {
                alternatives = String.join(', ', result.Alternatives);
            }

            //window.alert('Recognized: ' + result.Text + '\nAlternatives: ' + alternatives);
            console.log('Recognized: ' + result.Text + '\nAlternatives: ' + alternatives);
        }

        function start() {
            document.getElementById('processor').startRecording();            
        }

        function stop() {
            document.getElementById('processor').stopRecording();
        }
    </script>
</body>
</html>
