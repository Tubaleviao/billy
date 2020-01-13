const gpio = require('pigpio').Gpio

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
let rf_p = 1500 // 2
let rk_p = 500 // 3
let rt_p = 1600 // 4
let rh_p = 1400 // 5
let lf_p = 900 // 6
let lk_p = 2400 // 7
let lt_p = 1500 // 8
let lh_p = 1500 // 9
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
