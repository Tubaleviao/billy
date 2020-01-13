const gpio = require('pigpio').Gpio

let max = 2500 // max angle: 2500
let min = 500 // min angle: 500
let right_feet_pin = 2
let right_knee_pin = 3
let right_thigh_pin = 4
let right_hip_pin = 5
let left_feet_pin = 6
let left_knee_pin = 7
let left_thigh_pin = 8
let left_hip_pin = 9
let neck_lr_pin = 10
let neck_ud_pin = 11

const right_feet = new gpio(right_feet_pin, {mode: gpio.OUTPUT})
const right_knee = new gpio(right_knee_pin, {mode: gpio.OUTPUT})
const right_thigh = new gpio(right_thigh_pin, {mode: gpio.OUTPUT})
const right_hip = new gpio(right_hip_pin, {mode: gpio.OUTPUT})
const left_feet = new gpio(left_feet_pin, {mode: gpio.OUTPUT})
const left_knee = new gpio(left_knee_pin, {mode: gpio.OUTPUT})
const left_thigh = new gpio(left_thigh_pin, {mode: gpio.OUTPUT})
const left_hip = new gpio(left_hip_pin, {mode: gpio.OUTPUT})
const lr_neck = new gpio(neck_lr_pin, {mode: gpio.OUTPUT})
const ud_neck = new gpio(neck_ud_pin, {mode: gpio.OUTPUT})


// defaults (standing)
let rf_p = 1450 // 2 (+ = up)
let rk_p = 500 // 3
let rt_p = 1700 // 4
let rh_p = 1300 // 5
let lf_p = 1550 // 6 (- = up)
let lk_p = 2400 // 7
let lt_p = 1500 // 8
let lh_p = 1600 // 9
let lrn_p = 1200 // 10
let upn_p = 1900 // 11

right_feet.servoWrite(rf_p) 
right_knee.servoWrite(rk_p) 
right_thigh.servoWrite(rt_p) 
right_hip.servoWrite(rh_p) 
left_feet.servoWrite(lf_p) 
left_knee.servoWrite(lk_p) 
left_thigh.servoWrite(lt_p) 
left_hip.servoWrite(lh_p) 
lr_neck.servoWrite(lrn_p) 
ud_neck.servoWrite(upn_p) 

let move = (servo, position, angle, max_vel=0) => {
	if(max_vel == 0){
		let inc = (angle-position)/100
		let movement = setInterval(fu, 20)
		function fu(){
			if(position == angle){
				clearInterval(movement);
			}else{
				position = position+inc
				//console.log(Math.floor(position))
				servo.servoWrite(Math.floor(position))
			}
		}
	}
}

let goDown = (angle=400) => {
	move(right_feet, rf_p, rf_p+angle) // (angle-(angle-100)*0.2)
	move(right_knee, rk_p, rk_p+(200+angle*2))
	move(right_thigh, rt_p, rt_p-(200+angle*2))
	move(left_feet, lf_p, lf_p-angle)
	move(left_knee, lk_p, lk_p-(200+angle*2))
	move(left_thigh, lt_p, lt_p+(200+angle*2))
}

let goUp = (angle=400) => {
	move(right_feet, rf_p+angle, rf_p) // for each 100 here
	move(right_knee, rk_p+(200+angle*2), rk_p) // increase 200 here
	move(right_thigh, rt_p-(200+angle*2), rt_p) 
	move(left_feet, lf_p-angle, lf_p) 
	move(left_knee, lk_p-(200+angle*2), lk_p) 
	move(left_thigh, lt_p+(200+angle*2), lt_p) 
}

setTimeout(goDown, 3000)
setTimeout(goUp, 6000)

//setTimeout(goReallyDown, 3000)
//setTimeout(goReallyUp, 6000)