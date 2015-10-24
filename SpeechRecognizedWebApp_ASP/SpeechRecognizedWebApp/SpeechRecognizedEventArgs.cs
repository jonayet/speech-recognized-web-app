using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SpeechRecognizedWebApp
{
    [Serializable]
    public sealed class SpeechRecognizedEventArgs : EventArgs
    {
        public SpeechRecognizedEventArgs(SpeechRecognitionResult result)
        {
            this.Result = result;
        }

        public SpeechRecognitionResult Result
        {
            get;
            private set;
        }
    }
}