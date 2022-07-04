const gpio = require('pigpio').Gpio
right = new gpio(2, {mode: gpio.OUTPUT})
right.servoWrite(500)
