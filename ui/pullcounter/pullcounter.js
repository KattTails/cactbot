'use strict';

let Options = {
  Language: 'en',
};

let gPullCounter;

class PullCounter {
  constructor(element) {
    this.element = element;
    this.zone = null;
    this.bossStarted = false;
    this.party = [];
    this.bosses = [];

    callOverlayHandler({
      call: 'cactbotLoadData',
      overlay: OverlayPluginApi.overlayName,
    })
      .then((data) => gPullCounter.SetSaveData(data));

    this.ReloadTriggers();
  }

  OnFightStart(boss) {
    this.pullCounts[boss.id] = (this.pullCounts[boss.id] || 0) + 1;
    this.bossStarted = true;

    this.element.innerText = this.pullCounts[boss.id];
    this.element.classList.remove('wipe');

    callOverlayHandler({
      call: 'cactbotSaveData',
      overlay: OverlayPluginApi.overlayName,
      data: JSON.stringify(this.pullCounts),
    });
  }

  OnLogEvent(e) {
    if (this.bossStarted)
      return;
    for (let i = 0; i < e.detail.logs.length; ++i) {
      let log = e.detail.logs[i];
      if (log.match(gLang.countdownEngageRegex())) {
        if (this.countdownBoss)
          this.OnFightStart(this.countdownBoss);
        else
          this.AutoStartBossIfNeeded();
        return;
      }
      for (let b = 0; b < this.bosses.length; ++b) {
        let boss = this.bosses[b];
        if (log.match(boss.startRegex)) {
          this.OnFightStart(boss);
          return;
        }
      }
    }
  }

  OnZoneChange(e) {
    this.element.innerText = '';
    this.zone = e.detail.zoneName;
    this.ReloadTriggers();
  }

  ReloadTriggers() {
    this.bosses = [];
    this.countdownBoss = null;
    if (!this.zone || !this.pullCounts)
      return;

    for (let i = 0; i < gBossFightTriggers.length; ++i) {
      let boss = gBossFightTriggers[i];
      if (!this.zone.match(boss.zoneRegex))
        continue;
      this.bosses.push(boss);
      if (boss.countdownStarts) {
        // Only one boss can be started with countdown in a zone.
        if (this.countdownBoss)
          console.error('Countdown boss conflict: ' + boss.id + ', ' + this.countdownBoss.id);
        this.countdownBoss = boss;
      }
    }
  }

  OnInCombatChange(e) {
    if (!e.detail.inGameCombat) {
      this.bossStarted = false;
      return;
    }
    this.AutoStartBossIfNeeded();
  }

  AutoStartBossIfNeeded() {
    // Start an implicit boss fight for this zone in parties of 8 people
    // where no other bosses have been specified.
    if (this.bosses.length > 0)
      return;
    if (this.bossStarted)
      return;
    if (this.party.length != 8)
      return;
    this.OnFightStart({
      id: this.zone,
      countdownStarts: true,
    });
  }

  OnPartyWipe() {
    this.element.classList.add('wipe');
  }

  OnPartyChange(e) {
    this.party = e.party;
  }

  SetSaveData(data) {
    try {
      if (data)
        this.pullCounts = JSON.parse(data);
      else
        this.pullCounts = {};
    } catch (err) {
      console.error('onSendSaveData parse error: ' + err.message);
    }
    this.ReloadTriggers();
  }
}

UserConfig.getUserConfigLocation('pullcounter', function() {
  addOverlayListener('onLogEvent', (e) => gPullCounter.OnLogEvent(e));
  addOverlayListener('onZoneChangedEvent', (e) => gPullCounter.OnZoneChange(e));
  addOverlayListener('onInCombatChangedEvent', (e) => gPullCounter.OnInCombatChange(e));
  addOverlayListener('onPartyWipe', () => gPullCounter.OnPartyWipe());
  addOverlayListener('PartyChanged', (e) => gPullCounter.OnPartyChange(e));

  gPullCounter = new PullCounter(document.getElementById('pullcounttext'));
});
