import json, asyncio
from math import ceil, floor
from adafruit_servokit import ServoKit

class Move:
	def __init__(self):
		self.kit = ServoKit(channels=16)
		positions = json.load(open('positions.json'))
		self.crouching = positions['crouching']
		self.standing = positions['standing']
#		self.stand()

	async def squatDown(self):
		s = self.standing
		c = self.crouching
		p = self.parallel
		await asyncio.sleep(1)
		await asyncio.gather(*[p(i, s[i], c[i]) for i in [*s]])

	async def standUp(self):
		s = self.standing
		c = self.crouching
		p = self.parallel
		await asyncio.sleep(1)
		await asyncio.gather(*[p(i, c[i], s[i]) for i in [*s]])

	async def parallel(self, servo, start, end):
		direction = 1 if start < end else -1
		increment = round((max([start, end])-min([start,end]))/20) * direction
		current = start
		delay = 7
		variance = 40
		mid = ((end-start)/2)+ start
		for i in range(start, end, increment):
			nap = floor(delay+(variance*abs(1-(current/mid))))
			self.servo(servo).angle = i
			await asyncio.sleep(nap/1000)

	def servo(self, number):
		return self.kit.servo[int(number)]

	def stand(self):
		s = self.standing
		for key in s.keys():
			self.servo(key).angle = s[key]

if __name__ == '__main__':
	m = Move()
	asyncio.run(m.squatDown())
	asyncio.run(m.standUp())
