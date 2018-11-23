/*
 * @author Tushar
 * @version 1.0
 * idle library which can be used in any javascript application
 * This library is used to detect if application is idle.
 */
export class IdleConfig {
  get options() {
    return this._options;
  }

  constructor() {
    this._options = {
      idle: 1800000, // (default is 30min)
      autoResume: false, // lets events automatically resume (unsets idle state/resets warning)
      interrupt:
        "mousemove keydown DOMMouseScroll mousewheel mousedown touchstart touchmove scroll",
      isTitleDisabled: false, // disable changes in document's title
      title: "Session has expired",
      autoRefreshTitle: false,
      titleRefreshTimer: 300000, // (default is 5min)
      container: "body" // container on which event listiner is applied
    };
  }

  idle(seconds = 0) {
    if (seconds <= 0) {
      throw new Error("Idle must be a value in seconds, greater than 0.");
    }
    this._options.idle = seconds;
  }

  titleDisabled(value) {
    if (typeof value === "boolean") {
      this._options.isTitleDisabled = value;
    } else {
      throw new Error("title disable value must be boolean");
    }
  }

  interrupt(events) {
    if (!events && typeof value !== "string") {
      throw new Error(
        "event listner must be string. eg:- mousemove, keydown, DOMMouseScroll, mousewheel, etc."
      );
    }
    this._options.interrupt = events;
  }

  autoResume(value) {
    if (typeof value === "boolean") {
      this._options.autoResume = value;
    } else {
      throw new Error("auto resume value must be boolean");
    }
  }

  title(value) {
    if (typeof value === "string") {
      this._options.title = value;
    } else {
      throw new Error("title value must be boolean");
    }
  }
}

export default function IdleProvider(idleConfig, callback) {
  const state = {
      isRunning: false
    },
    options = idleConfig.options,
    initialDocTitle = document.title;

  let idleTimer;

  //clear timer
  function clearTimer() {
    clearTimeout(idleTimer);
  }

  //reset timer and start idle time from start
  function resetTimer() {
    if (!state.isRunning) return;

    clearTimer();
    idleTimer = setTimeout(idleComplete.bind(this), options.idle);
  }

  /*
   * toggle document title
   * @param {boolean} status - change document title based on status
   */
  function toggleDocTitle(status) {
    document.title = status ? options.title : initialDocTitle;
  }

  function refreshTitle() {
    setTimeout(() => {
      toggleDocTitle(false);
    }, options.titleRefreshTimer);
  }

  //execute callback when idle for specified time
  function idleComplete() {
    state.isRunning = false;

    //auto resume idle timer
    if (options.autoResume) {
      ngip.watch();
    }

    if (!options.isTitleDisabled) {
      toggleDocTitle(true);
    }

    if (options.autoRefreshTitle) {
      refreshTitle();
    }

    if (callback) {
      callback();
    }
  }

  // Adding interrupt listener
  document
    .querySelector(options.container)
    .addEventListener(options.interrupt, resetTimer.bind(this));

  const ngip = {
    watch: () => {
      state.isRunning = true;
      clearTimer();
      toggleDocTitle(false);
      idleTimer = setTimeout(idleComplete.bind(this), options.idle);
    },
    unwatch: () => {
      state.isRunning = false;
      toggleDocTitle(false);
      clearTimer();
    },
    destroy: () => {
      toggleDocTitle(false);
      document
        .querySelector(options.container)
        .removeEventListener(options.interrupt, resetTimer.bind(this));
    }
  };

  return ngip;
}
