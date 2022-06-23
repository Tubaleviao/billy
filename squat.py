import json, asyncio
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
		for i in range(start, end, direction):
			self.servo(servo).angle = i
			await asyncio.sleep(0.005)

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
