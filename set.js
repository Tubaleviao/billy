const gpio = require("pigpio").Gpio

const pin = Number(process.argv[2])
const value = Number(process.argv[3])

const servo = new gpio(pin, {mode: gpio.OUTPUT})

servo.servoWrite(value)

setTimeout(() => console.log("he"), 2000)
