using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SpeechRecognizedWebApp
{
    public class SpeechRecognitionResult
    {
        public SpeechRecognitionResult(String text, params String[] alternates)
        {
            this.Text = text;
            this.Alternates = alternates.ToList();
        }

        public String Text
        {
            get;
            set;
        }

        public List<String> Alternates
        {
            get;
            private set;
        }
    }
}