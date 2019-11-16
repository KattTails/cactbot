using System;
using System.Globalization;
using System.Windows.Forms;

namespace Cactbot {
  public partial class CactbotEventSourceConfigPanel : UserControl {
    private CactbotEventSourceConfig config;
    private CactbotEventSource source;

    public CactbotEventSourceConfigPanel(CactbotEventSource source) {
      InitializeComponent();

      this.source = source;
      this.config = source.Config;

      SetupControlProperties();
      SetupConfigEventHandlers();
    }

    private void SetupControlProperties() {
      this.textUserConfigFile.Text = config.UserConfigFile;
      this.checkWatchFileChanges.Checked = config.WatchFileChanges;
      this.checkACTFollowsIngameEncounters.Checked = config.ACTFollowsIngameEncounters;
      this.checkACTFollowsIngameEncountersSeconds.Checked = config.ACTFollowsIngameEncountersDelay;
      this.numericACTFollowsIngameEncountersSeconds.Enabled = config.ACTFollowsIngameEncountersDelay;
      this.numericACTFollowsIngameEncountersSeconds.Value = config.ACTFollowsIngameEncountersSeconds;
    }

    private void SetupConfigEventHandlers() {
      
    }

    private void InvokeIfRequired(Action action) {
      if (this.InvokeRequired) {
        this.Invoke(action);
      } else {
        action();
      }
    }

    private void buttonSelectUserConfigFile_Click(object sender, EventArgs e) {
      var ofd = new FolderBrowserDialog();
      try {
        ofd.SelectedPath = System.IO.Path.GetDirectoryName(new Uri(config.UserConfigFile).AbsolutePath);
      } catch (Exception) { }

      if (ofd.ShowDialog() == DialogResult.OK) {
        this.config.UserConfigFile = new Uri(ofd.SelectedPath).AbsoluteUri;
        this.textUserConfigFile.Text = this.config.UserConfigFile;
      }
    }

    private void textUserConfigFile_Leave(object sender, EventArgs e) {
      try {
        if (!String.IsNullOrWhiteSpace(textUserConfigFile.Text)) {
          var path = new Uri(textUserConfigFile.Text);
          if (!System.IO.Directory.Exists(path.LocalPath))
            path = new Uri(path, ".");
          this.config.UserConfigFile = path.AbsoluteUri;
        } else {
          this.config.UserConfigFile = "";
        }
        this.textUserConfigFile.Text = this.config.UserConfigFile;
      } catch (Exception ex) {
        this.source.LogError("User Config Directory Uri must be a valid directory.");
        this.source.LogError(ex.Message);
      }
    }

    private void checkWatchFileChanges_CheckedChanged(object sender, EventArgs e)
    {
      this.config.WatchFileChanges = this.checkWatchFileChanges.Checked;
    }

    private void checkACTEndEncountersByIngame_CheckedChanged(object sender, EventArgs e) {
      this.config.ACTFollowsIngameEncounters = this.checkACTFollowsIngameEncounters.Checked;
    }

    private void checkACTFollowsIngameEncountersSeconds_CheckedChanged(object sender, EventArgs e) {
      this.config.ACTFollowsIngameEncountersDelay = true;
      this.numericACTFollowsIngameEncountersSeconds.Enabled = this.checkACTFollowsIngameEncountersSeconds.Checked;
    }

    private void numericACTFollowsIngameEncountersSeconds_ValueChanged(object sender, EventArgs e) {
      this.config.ACTFollowsIngameEncountersSeconds = (uint)this.numericACTFollowsIngameEncountersSeconds.Value;
    }
  }
}
