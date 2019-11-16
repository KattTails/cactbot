namespace Cactbot
{
    partial class CactbotEventSourceConfigPanel
    {
        private System.ComponentModel.IContainer components = null;

        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region

        private void InitializeComponent()
        {
      System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(CactbotEventSourceConfigPanel));
      this.checkWatchFileChanges = new System.Windows.Forms.CheckBox();
      this.labelDevReloader = new System.Windows.Forms.Label();
      this.tableLayoutPanel4 = new System.Windows.Forms.TableLayoutPanel();
      this.buttonSelectUserConfigFile = new System.Windows.Forms.Button();
      this.textUserConfigFile = new System.Windows.Forms.TextBox();
      this.label1 = new System.Windows.Forms.Label();
      this.tableLayoutPanel3 = new System.Windows.Forms.TableLayoutPanel();
      this.tableLayoutPanel1 = new System.Windows.Forms.TableLayoutPanel();
      this.numericACTFollowsIngameEncountersSeconds = new System.Windows.Forms.NumericUpDown();
      this.checkACTFollowsIngameEncounters = new System.Windows.Forms.CheckBox();
      this.labelACTEncounters = new System.Windows.Forms.Label();
      this.checkACTFollowsIngameEncountersSeconds = new System.Windows.Forms.CheckBox();
      this.tableLayoutPanel4.SuspendLayout();
      this.tableLayoutPanel3.SuspendLayout();
      this.tableLayoutPanel1.SuspendLayout();
      ((System.ComponentModel.ISupportInitialize)(this.numericACTFollowsIngameEncountersSeconds)).BeginInit();
      this.SuspendLayout();
      // 
      // checkWatchFileChanges
      // 
      resources.ApplyResources(this.checkWatchFileChanges, "checkWatchFileChanges");
      this.checkWatchFileChanges.Name = "checkWatchFileChanges";
      this.checkWatchFileChanges.UseVisualStyleBackColor = true;
      this.checkWatchFileChanges.CheckedChanged += new System.EventHandler(this.checkWatchFileChanges_CheckedChanged);
      // 
      // labelDevReloader
      // 
      resources.ApplyResources(this.labelDevReloader, "labelDevReloader");
      this.labelDevReloader.Name = "labelDevReloader";
      // 
      // tableLayoutPanel4
      // 
      resources.ApplyResources(this.tableLayoutPanel4, "tableLayoutPanel4");
      this.tableLayoutPanel4.Controls.Add(this.buttonSelectUserConfigFile, 0, 0);
      this.tableLayoutPanel4.Controls.Add(this.textUserConfigFile, 0, 0);
      this.tableLayoutPanel4.Name = "tableLayoutPanel4";
      // 
      // buttonSelectUserConfigFile
      // 
      resources.ApplyResources(this.buttonSelectUserConfigFile, "buttonSelectUserConfigFile");
      this.buttonSelectUserConfigFile.Name = "buttonSelectUserConfigFile";
      this.buttonSelectUserConfigFile.UseVisualStyleBackColor = true;
      this.buttonSelectUserConfigFile.Click += new System.EventHandler(this.buttonSelectUserConfigFile_Click);
      // 
      // textUserConfigFile
      // 
      resources.ApplyResources(this.textUserConfigFile, "textUserConfigFile");
      this.textUserConfigFile.Name = "textUserConfigFile";
      this.textUserConfigFile.Leave += new System.EventHandler(this.textUserConfigFile_Leave);
      // 
      // label1
      // 
      resources.ApplyResources(this.label1, "label1");
      this.label1.Name = "label1";
      // 
      // tableLayoutPanel3
      // 
      resources.ApplyResources(this.tableLayoutPanel3, "tableLayoutPanel3");
      this.tableLayoutPanel3.Controls.Add(this.numericACTFollowsIngameEncountersSeconds, 0, 0);
      this.tableLayoutPanel3.Name = "tableLayoutPanel3";
      // 
      // tableLayoutPanel1
      // 
      resources.ApplyResources(this.tableLayoutPanel1, "tableLayoutPanel1");
      this.tableLayoutPanel1.Controls.Add(this.checkACTFollowsIngameEncountersSeconds, 0, 15);
      this.tableLayoutPanel1.Controls.Add(this.tableLayoutPanel3, 1, 15);
      this.tableLayoutPanel1.Controls.Add(this.label1, 0, 12);
      this.tableLayoutPanel1.Controls.Add(this.tableLayoutPanel4, 1, 12);
      this.tableLayoutPanel1.Controls.Add(this.labelDevReloader, 0, 13);
      this.tableLayoutPanel1.Controls.Add(this.checkWatchFileChanges, 1, 13);
      this.tableLayoutPanel1.Controls.Add(this.labelACTEncounters, 0, 14);
      this.tableLayoutPanel1.Controls.Add(this.checkACTFollowsIngameEncounters, 1, 14);
      this.tableLayoutPanel1.Name = "tableLayoutPanel1";
      // 
      // numericACTFollowsIngameEncountersSeconds
      // 
      resources.ApplyResources(this.numericACTFollowsIngameEncountersSeconds, "numericACTFollowsIngameEncountersSeconds");
      this.numericACTFollowsIngameEncountersSeconds.Maximum = new decimal(new int[] {
            240,
            0,
            0,
            0});
      this.numericACTFollowsIngameEncountersSeconds.Name = "numericACTFollowsIngameEncountersSeconds";
      this.numericACTFollowsIngameEncountersSeconds.ValueChanged += new System.EventHandler(this.numericACTFollowsIngameEncountersSeconds_ValueChanged);
      // 
      // checkACTFollowsIngameEncounters
      // 
      resources.ApplyResources(this.checkACTFollowsIngameEncounters, "checkACTFollowsIngameEncounters");
      this.checkACTFollowsIngameEncounters.Name = "checkACTFollowsIngameEncounters";
      this.checkACTFollowsIngameEncounters.UseVisualStyleBackColor = true;
      this.checkACTFollowsIngameEncounters.CheckedChanged += new System.EventHandler(this.checkACTEndEncountersByIngame_CheckedChanged);
      // 
      // labelACTEncounters
      // 
      resources.ApplyResources(this.labelACTEncounters, "labelACTEncounters");
      this.labelACTEncounters.Name = "labelACTEncounters";
      // 
      // checkACTFollowsIngameEncountersSeconds
      // 
      resources.ApplyResources(this.checkACTFollowsIngameEncountersSeconds, "checkACTFollowsIngameEncountersSeconds");
      this.checkACTFollowsIngameEncountersSeconds.Name = "checkACTFollowsIngameEncountersSeconds";
      this.checkACTFollowsIngameEncountersSeconds.UseVisualStyleBackColor = true;
      this.checkACTFollowsIngameEncountersSeconds.CheckedChanged += new System.EventHandler(this.checkACTFollowsIngameEncountersSeconds_CheckedChanged);
      // 
      // CactbotEventSourceConfigPanel
      // 
      resources.ApplyResources(this, "$this");
      this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
      this.Controls.Add(this.tableLayoutPanel1);
      this.Name = "CactbotEventSourceConfigPanel";
      this.tableLayoutPanel4.ResumeLayout(false);
      this.tableLayoutPanel4.PerformLayout();
      this.tableLayoutPanel3.ResumeLayout(false);
      this.tableLayoutPanel1.ResumeLayout(false);
      this.tableLayoutPanel1.PerformLayout();
      ((System.ComponentModel.ISupportInitialize)(this.numericACTFollowsIngameEncountersSeconds)).EndInit();
      this.ResumeLayout(false);

        }

    #endregion

    private System.Windows.Forms.CheckBox checkWatchFileChanges;
    private System.Windows.Forms.Label labelDevReloader;
    private System.Windows.Forms.TableLayoutPanel tableLayoutPanel4;
    private System.Windows.Forms.Button buttonSelectUserConfigFile;
    private System.Windows.Forms.TextBox textUserConfigFile;
    private System.Windows.Forms.Label label1;
    private System.Windows.Forms.TableLayoutPanel tableLayoutPanel3;
    private System.Windows.Forms.TableLayoutPanel tableLayoutPanel1;
    private System.Windows.Forms.CheckBox checkACTFollowsIngameEncounters;
    private System.Windows.Forms.Label labelACTEncounters;
    private System.Windows.Forms.NumericUpDown numericACTFollowsIngameEncountersSeconds;
    private System.Windows.Forms.CheckBox checkACTFollowsIngameEncountersSeconds;
  }
}
