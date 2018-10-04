# Idle JS

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
