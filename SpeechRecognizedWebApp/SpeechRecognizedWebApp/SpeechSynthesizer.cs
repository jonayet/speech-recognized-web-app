﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Speech.Synthesis;
using System.Threading;
using System.Web;
using System.Web.UI;
using System.Web.UI.HtmlControls;

namespace SpeechRecognizedWebApp
{
    [ConstructorNeedsTag(false)]
    public class SpeechSynthesizer : HtmlGenericControl, ICallbackEventHandler
    {
        private readonly System.Speech.Synthesis.SpeechSynthesizer synth = new System.Speech.Synthesis.SpeechSynthesizer();
     
        public SpeechSynthesizer() : base("audio")
        {
            this.Age = VoiceAge.NotSet;
            this.Gender = VoiceGender.NotSet;
           this.Culture = CultureInfo.CurrentCulture;
           this.VoiceName = String.Empty;
           this.Ssml = false;
       }
    
       [DefaultValue("")]
       public String VoiceName { get; set; }
    
       [DefaultValue(100)]
       public Int32 Volume { get; set; }
    
       [DefaultValue(0)]
       public Int32 Rate { get; set; }
    
       [TypeConverter(typeof(CultureInfoConverter))]
       public CultureInfo Culture { get; set; }
    
       [DefaultValue(VoiceGender.NotSet)]
       public VoiceGender Gender { get; set; }
    
       [DefaultValue(VoiceAge.NotSet)]
       public VoiceAge Age { get; set; }
    
       [DefaultValue(false)]
       public Boolean Ssml { get; set; }
    
       protected override void OnInit(EventArgs e)
       {
           AsyncOperationManager.SynchronizationContext = new SynchronizationContext();
    
           var sm = ScriptManager.GetCurrent(this.Page);
           var reference = this.Page.ClientScript.GetCallbackEventReference(this, "text", String.Format("function(result){{ document.getElementById('{0}').src = result; document.getElementById('{0}').play(); }}", this.ClientID), String.Empty, true);
           var script = String.Format("\ndocument.getElementById('{0}').speak = function(text){{ {1} }};\n", this.ClientID, reference);
    
           if (sm != null)
           {
               this.Page.ClientScript.RegisterStartupScript(this.GetType(), String.Concat("speak", this.ClientID), String.Format("Sys.WebForms.PageRequestManager.getInstance().add_pageLoaded(function() {{ {0} }});\n", script), true);
           }
           else
           {
               this.Page.ClientScript.RegisterStartupScript(this.GetType(), String.Concat("speak", this.ClientID), script, true);
           }
    
           base.OnInit(e);
       }
    
       protected override void OnPreRender(EventArgs e)
       {
           this.Attributes.Remove("class");
           this.Attributes.Remove("src");
           this.Attributes.Remove("preload");
           this.Attributes.Remove("loop");
           this.Attributes.Remove("autoplay");
           this.Attributes.Remove("controls");
           
           this.Style[HtmlTextWriterStyle.Display] = "none";
           this.Style[HtmlTextWriterStyle.Visibility] = "hidden";
    
           base.OnPreRender(e);
       }
    
       public override void Dispose()
       {
           this.synth.Dispose();
    
           base.Dispose();
       }
    
       #region ICallbackEventHandler Members
    
       String ICallbackEventHandler.GetCallbackResult()
       {
           using (var stream = new MemoryStream())
           {
               this.synth.Rate = this.Rate;
               this.synth.Volume = this.Volume;
               this.synth.SetOutputToWaveStream(stream);
    
               if (String.IsNullOrWhiteSpace(this.VoiceName) == false)
               {
                     this.synth.SelectVoice(this.VoiceName);
                 }
               else
               {
                     this.synth.SelectVoiceByHints(this.Gender, this.Age, 0, this.Culture);
                 }
    
               if (this.Ssml == false)
               {
                     this.synth.Speak(this.Context.Items["data"] as String);
                 }
              else
              {
                     this.synth.SpeakSsml(this.Context.Items["data"] as String);
                 }
   
              return (String.Concat("data:audio/wav;base64,", Convert.ToBase64String(stream.ToArray())));
          }
      }
   
      void ICallbackEventHandler.RaiseCallbackEvent(String eventArgument)
      {
          this.Context.Items["data"] = eventArgument;
      }
   
      #endregion
  }
}