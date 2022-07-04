const gpio = require("pigpio").Gpio

const servo = new gpio(10, {mode: gpio.OUTPUT})

let position = 800
servo.servoWrite(position)

let right = true
let sayno = () => {
	if(right) position -= 10
	else position += 10
	servo.servoWrite(position)
	if(position <= 600) right = false
	else if(position >= 1000) right = true
}
let move = () => setInterval(sayno, 10)
setTimeout(move, 2000)
