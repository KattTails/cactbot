'use strict';

// comment
let Options = {

  Opacity: 0.85,

  LowerOpacityOutOfCombat: true,
  OpacityOutOfCombat: 0.35,

  ShowDoTTicker: ['BRD'],
  ShowDoTTickerOutOfCombat: true,
  ShowDoTTickerTime: false,

  ShowHoTTicker: ['MNK'],
  ShowHoTTickerOutOfCombat: false,
  ShowHoTTickerTime: false,

  ResetOnWipe: false,
};

let kDoTTickInterval = 3.0;

function computeBackgroundColorFrom(element, classList) {
  let div = document.createElement('div');
  let classes = classList.split('.');
  for (let i = 0; i < classes.length; ++i)
    div.classList.add(classes[i]);
  element.appendChild(div);
  let color = window.getComputedStyle(div).backgroundColor;
  element.removeChild(div);
  return color;
}

class Bars {
  constructor(options) {
    this.options = options;
    this.job = 0;
    this.inCombat = false;

    this.o = {};
  }

  addDoTHoTContainer() {
    let id = 'dot-hot-container';
    let root = document.getElementById('container');
    let container = document.getElementById(id);
    if (!container) {
      container = document.createElement('div');
      container.id = id;
      if (this.options.LowerOpacityOutOfCombat && !this.inCombat)
        container.style.opacity = this.options.OpacityOutOfCombat;
      else container.style.opacity = this.options.Opacity;
      root.appendChild(container);
    }
    return container;
  }

  InitDoTTicker() {
    let container = this.addDoTHoTContainer();

    this.o.dotTickContainer = document.createElement('div');
    this.o.dotTickContainer.id = 'dot-ticker';
    container.appendChild(this.o.dotTickContainer);

    this.o.dotTicker = document.createElement('timer-bar');
    this.o.dotTickContainer.appendChild(this.o.dotTicker);
    this.o.dotTicker.width = window.getComputedStyle(this.o.dotTickContainer).width;
    this.o.dotTicker.height = window.getComputedStyle(this.o.dotTickContainer).height;
    this.o.dotTicker.bg = computeBackgroundColorFrom(this.o.dotTicker, 'bar-border-color');
    this.o.dotTicker.fg = computeBackgroundColorFrom(this.o.dotTicker, 'dot-tick-color');
    this.o.dotTicker.centertext = this.options.ShowDoTTickerTime ? 'remain' : '';
    this.o.dotTicker.style = 'empty';
    this.o.dotTicker.loop = true;
    if (!this.options.ShowDoTTickerOutOfCombat)
      this.HideDoT();
    else this.ShowDoT(this.options.Opacity);
  }

  InitHoTTicker() {
    let container = this.addDoTHoTContainer();

    this.o.hotTickContainer = document.createElement('div');
    this.o.hotTickContainer.id = 'hot-ticker';
    container.appendChild(this.o.hotTickContainer);

    this.o.hotTicker = document.createElement('timer-bar');
    this.o.hotTickContainer.appendChild(this.o.hotTicker);
    this.o.hotTicker.width = window.getComputedStyle(this.o.hotTickContainer).width;
    this.o.hotTicker.height = window.getComputedStyle(this.o.hotTickContainer).height;
    this.o.hotTicker.bg = computeBackgroundColorFrom(this.o.hotTicker, 'bar-border-color');
    this.o.hotTicker.fg = computeBackgroundColorFrom(this.o.hotTicker, 'hot-tick-color');
    this.o.hotTicker.centertext = this.options.ShowHoTTickerTime ? 'remain' : '';
    this.o.hotTicker.style = 'empty';
    this.o.hotTicker.loop = true;
    if (!this.options.ShowHoTTickerOutOfCombat)
      this.HideHoT();
    else this.ShowHoT(this.options.Opacity);
  }

  ShowDoT(opacity) {
    this.o.dotTickContainer.style.opacity = opacity;
  }

  ShowHoT(opacity) {
    this.o.hotTickContainer.style.opacity = opacity;
  }

  HideHoT() {
    this.o.hotTickContainer.style.opacity = 0.0;
  }

  HideDoT() {
    this.o.dotTickContainer.style.opacity = 0.0;
  }

  StartHoT() {
    // Resync if over 100ms out
    if (this.o.hotTicker.duration == 0 || this.o.hotTicker.value > 0.1) {
      this.o.hotTicker.style = 'fill';
      this.o.hotTicker.duration = 3.0;
    }
  }

  StartDoT() {
    // Resync if over 100ms out
    if (this.o.dotTicker.duration == 0 || this.o.dotTicker.value > 0.1) {
      this.o.dotTicker.style = 'fill';
      this.o.dotTicker.duration = 3.0;
    }
  }

  StopHoT() {
    this.o.hotTicker.duration = 0;
    this.o.hotTicker.style = 'empty';
  }

  StopDoT() {
    this.o.dotTicker.duration = 0;
    this.o.dotTicker.style = 'empty';
  }

  HandleHoTTick() {
    if (!this.o.hotTicker)
      return;
    this.StartHoT();
  }

  HandleDoTTick() {
    if (!this.o.dotTicker)
      return;
    this.StartDoT();
  }

  OnPartyWipe(e) {
    // TODO: reset dot/hot bars if set
    if (this.options.ResetOnWipe) {
      if (this.o.hotTicker)
        this.StopHoT();
      if (this.o.dotTicker)
        this.StopDoT();
    }
  }

  OnInCombatChanged(e) {
    if (this.inCombat == e.detail.inGameCombat)
      return;

    this.inCombat = e.detail.inGameCombat;
    if (this.o.dotTickContainer) {
      if (this.inCombat) {
        this.ShowDoT(this.options.Opacity);
      } else if (!this.inCombat && this.options.LowerOpacityOutOfCombat) {
        if (this.options.ShowDoTTickerOutOfCombat)
          this.ShowDoT(this.options.OpacityOutOfCombat);
      } else if (!this.inCombat) {
        if (!this.options.ShowDoTTickerOutOfCombat)
          this.HideDoT();
      }
    }
    if (this.o.hotTickContainer) {
      if (this.inCombat) {
        this.ShowHoT(this.options.Opacity);
      } else if (!this.inCombat && this.options.LowerOpacityOutOfCombat) {
        if (this.options.ShowHoTTickerOutOfCombat)
          this.ShowHoT(this.options.OpacityOutOfCombat);
      } else if (!this.inCombat) {
        if (!this.options.ShowHoTTickerOutOfCombat)
          this.HideHoT();
      }
    }
  }

  OnZoneChanged(e) {
    if (this.o.dotTicker)
      this.StopDoT();
    if (this.o.hotTicker)
      this.StopHoT();
  }

  OnPlayerChanged(e) {
    if (e.detail.job != this.job) {
      let container = document.getElementById('dot-hot-container');
      if (container) {
        while (container.childNodes.length)
          container.removeChild(container.childNodes[0]);
      }
      this.o = {};
      this.job = e.detail.job;
      if ((this.options.ShowDoTTicker.indexOf(this.job) >= 0) &&
        this.options.ShowDoTTickerOutOfCombat) {
        this.InitDoTTicker();
        if (this.options.LowerOpacityOutOfCombat)
          this.ShowDoT(this.options.OpacityOutOfCombat);
        else this.ShowDoT(this.options.Opacity);
      }
      if ((this.options.ShowHoTTicker.indexOf(this.job) >= 0) &&
        this.options.ShowHoTTickerOutOfCombat) {
        this.InitHoTTicker();
        if (this.options.LowerOpacityOutOfCombat)
          this.ShowHoT(this.options.OpacityOutOfCombat);
        else this.ShowHoT(this.options.Opacity);
      }
    }
  }

  OnLogEvent(e) {
    for (let i = 0; i < e.detail.logs.length; i++) {
      let log = e.detail.logs[i];
      //
      // 18:DoT Tick on Ovni for 13003 damage.
      // 18:HoT Tick on Tini Poutini for 2681 damage.
      // 18:Shadow Flare DoT Tick on Arsenal Centaur for 151 damage.
      //
      if (log[15] == '1' && log[16] == '8') {
        if (log.search('HoT Tick') == 18)
          this.HandleHoTTick();
        else if (log.search('DoT Tick') == 18)
          // Ground effect dots get listed separately.
          // Ignore for now
          this.HandleDoTTick();
      }
    }
  }
}

let gBars;

UserConfig.getUserConfigLocation('dot-tracker', function() {
  addOverlayListener('onPlayerChangedEvent', function(e) {
    gBars.OnPlayerChanged(e);
  });
  addOverlayListener('onPartyWipe', function(e) {
    gBars.OnPartyWipe(e);
  });
  addOverlayListener('onInCombatChangedEvent', function(e) {
    gBars.OnInCombatChanged(e);
  });
  addOverlayListener('onZoneChangedEvent', function(e) {
    gBars.OnZoneChanged(e);
  });
  addOverlayListener('onLogEvent', function(e) {
    gBars.OnLogEvent(e);
  });

  gBars = new Bars(Options);
});
