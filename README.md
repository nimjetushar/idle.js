# Idle JS

[![Build Status](https://travis-ci.com/nimjetushar/idle.js.svg?branch=master)](https://travis-ci.com/nimjetushar/idle.js)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/dd702ab0b3b44834ad7c7d9f65c64d99)](https://www.codacy.com/app/tushar/idle.js?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=nimjetushar/idle.js&amp;utm_campaign=Badge_Grade)
<br/>
[![GitHub license](https://img.shields.io/github/license/nimjetushar/idle.js.svg)](https://github.com/nimjetushar/idle.js/blob/master/LICENSE)

Detects idle state of the application

```
Sample example:-

<!-- create configuration -->
const config = new IdleConfig();
config.idle(180000);
config.titleDisabled(false);

function idleCallback() {
    <!-- this function is triggered on idle state for particular time  -->
}

<!-- passing configuration and idle callback -->
const idlePrd = idleProvider(config, idleCallback);

idlePrd.watch()

```

## Methods

**_idleProvider_**
```
const idlePrd = idleProvider(config, idleCallback);
```

1: watch: Watch is used to initialize the idle timer
```
idlePrd.watch()
```

2: unwatch: This is used to cancel the currently running timer
```
idlePrd.unwatch()
```

3: Destroy: This is used to destroy the event which resets the idle timer. If you call destroy callback and the events won't fire as the events are destroyed/removed.
```
idlePrd.destroy()
```

**_IdleConfig_**
```
const config = new IdleConfig();
```

1: Setting idle timer: This is used to set the idle timer for which the application will get idle complete event idleProvider.idle( specify time in ms ). The input should be in integer. Default time is 30 min.
```
config.idle( 60000 )
```

2: Auto resume: Based on this the idle timer will resume. By default auto resume is false
```
config.autoResume( boolean )
```

3: Select interrupt: Interrupt are the event for which you want to reset the idle timer. eg- interrupt: 'mousemove keydown DOMMouseScroll mousewheel mousedown touchstart touchmove scroll'
```
config.interrupt( string )
```

4: Disable Title change: This will change the title of the application when application is idle. If this is set to true document's title change will be disabled. By default it is set to false
```
config.titleDisabled( boolean )
```

5: Document title on idle: This is used to change the document title based on your choice of text.
```
config.title( string )
```
