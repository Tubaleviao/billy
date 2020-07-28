const gpio = require('pigpio').Gpio
const positions = require('./positions')

let max = 2500 // max angle: 2500
let min = 500 // min angle: 500

class Body{

	constructor(defaultPosition){
		this.members = [2,3,4,5,6,7,8,9,10,11]
		const newMember = p => JSON.parse( {pin: p, lib: (new gpio(p, {mode: gpio.OUTPUT})) } )
		this.members = this.members.map( p => newMember(p))
		this.setPose(defaultPosition)
	}

	setPose(position){
		position.forEach( p => members[p.pin].pulse = p.pulse)
		this.instantMove()
	}

	instantMove() { members.forEach(m => m.lib.servoWrite(m.pulse)) }
}

const body = new Body(positions.standing)

setTimeout(() => body.setPose(positions.crouched), 2000)
setTimeout(() => {}, 2000)
