const gpio = require('pigpio').Gpio

let vel = 5 // velocity
let max = 2500 // max angle: 2500
let min = 500 // min angle: 500
let pulseWidth = 500
let inc = vel
let right_feet_pin = 2

const right_feet = new gpio(right_feet_pin, {mode: gpio.OUTPUT})

setInterval( () => {
	right_feet.servoWrite(pulseWidth)
	pulseWidth += inc
	if(pulseWidth >= 2500){
		inc -= vel
	}else if(pulseWidth <= 500){
		inc = vel
	}
}, 10);

