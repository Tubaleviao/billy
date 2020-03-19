const gpio = require('pigpio').Gpio
let mode = {mode: gpio.OUTPUT}

let max = 2500 // max angle: 2500
let min = 500 // min angle: 500

const right_feet = {pin: 2, lib: new gpio(2, mode), position: 1400, default: 1400}
const right_knee = {pin: 3, lib: new gpio(3, mode), position: 600, default: 600}
const right_thigh = {pin: 4, lib: new gpio(4, mode), position: 1600, default: 1600}
const right_hip = {pin: 5, lib: new gpio(5, mode), position: 1400, default: 1400}
const left_feet = {pin: 6, lib: new gpio(6, mode), position: 1550, default: 1550}
const left_knee = {pin: 7, lib: new gpio(7, mode), position: 2400, default: 2400}
const left_thigh = {pin: 8, lib: new gpio(8, mode), position: 1500, default: 1500}
const left_hip = {pin: 9, lib: new gpio(9, mode), position: 1700, default: 1700}
const lr_neck = {pin: 10, lib: new gpio(10, mode), position: 1400, default: 1400}
const ud_neck = {pin: 11, lib: new gpio(11, mode), position: 1900, default: 1900}

right_feet.lib.servoWrite(right_feet.position)
right_knee.lib.servoWrite(right_knee.position)
right_thigh.lib.servoWrite(right_thigh.position)
right_hip.lib.servoWrite(right_hip.position)
left_feet.lib.servoWrite(left_feet.position)
left_knee.lib.servoWrite(left_knee.position)
left_thigh.lib.servoWrite(left_thigh.position)
left_hip.lib.servoWrite(left_hip.position)
lr_neck.lib.servoWrite(lr_neck.position)
ud_neck.lib.servoWrite(ud_neck.position)

let move = (obj, angle, max_vel=0) => {
	if(max_vel == 0){
		let inc = (angle-obj.position)/100
		let movement = setInterval(fu, 20)		
		function fu(){
			if(obj.position == angle){
				clearInterval(movement);
			}else{
				obj.position = obj.position+inc
				obj.lib.servoWrite(Math.floor(obj.position))
			}
		}
	}
}

let move2 = async (obj, destiny, d2=0) => {
	
	let inc = (destiny-obj.position)/100
	let old_position = obj.position+0
	let first = true
	let initial = obj.position+0
	const mid = ((destiny-initial)/2)+ initial
	const variance = 40
	const delay = 7
	async function go(){
		if(obj.position != destiny){
			if(first || old_position != obj.position){
				let new_time = Math.floor(delay+(variance*Math.abs(1-(obj.position/mid))))
				setTimeout(fu, new_time)
				old_position = obj.position+0
				first = false
			}
		}
	}
	async function fu(){
		obj.lib.servoWrite(Math.floor(obj.position))
		obj.position = obj.position+inc
		setTimeout(go, d2)
	}
	go()
	
}

let goDown = (angle=400) => {
	move2(right_feet, right_feet.position+angle)
	move2(left_feet, left_feet.position-angle, 5)
	move2(right_knee, right_knee.position+(200+angle*2))
	move2(left_knee, left_knee.position-(200+angle*2), 5)
	move2(right_thigh, right_thigh.position-(200+angle*2))
	move2(left_thigh, left_thigh.position+(200+angle*2) , 5)
}

let goUp = (angle=400) => {
	move2(right_feet, right_feet.default) // for each 100 here
	move2(left_feet, left_feet.default, 5) 
	move2(right_knee, right_knee.default) // increase 200 here
	move2(left_knee, left_knee.default, 5) 
	move2(right_thigh, right_thigh.default) 
	move2(left_thigh, left_thigh.default, 5) 
}

setTimeout(goDown, 3000)
setTimeout(goUp, 6000)
