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

	setPose(positions){
		posistions.forEach( p => members[p.pin].position = p.position)
		this.move()
	}

	move() { members.forEach(m => m.lib.servoWrite(m.position)) }
}

const body = new Body(positions.standing)

