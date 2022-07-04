import json
from time import sleep
from multiprocessing import Process
from math import ceil, floor
from adafruit_servokit import ServoKit

class Move:
	def __init__(self):
		self.kit = ServoKit(channels=16)
		positions = json.load(open('positions.json'))
		self.crouching = positions['crouching']
		self.standing = positions['standing']
#		self.stand()

	def runInParallel(self, fns):
		proc = []
		for p in fns:
			p.start()
			proc.append(p)
		for p in proc:
			p.join()

	def squatDown(self):
		s = self.standing
		c = self.crouching
		fn = self.parallel
		sleep(1)
		self.runInParallel([Process(target=fn, args=(i,s[i],c[i])) for i in [*s]])

	def standUp(self):
		s = self.standing
		c = self.crouching
		fn = self.parallel
		sleep(1)
		self.runInParallel([Process(target=fn, args=(i,c[i],s[i])) for i in [*s]])

	def parallel(self, servo, start, end):
		direction = 1 if start < end else -1
		increment = round((max([start, end])-min([start,end]))/50) * direction
		delay = 10
		variance = 40
		mid = ((end-start)/2)+ start
		for current in range(start, end, increment):
			nap = floor(delay+(variance*abs(1-(current/mid))))
			self.servo(servo).angle = current
			sleep(nap/1000)
			if int(servo) < 8:
				sleep(5/1000)

	def servo(self, number):
		return self.kit.servo[int(number)]

	def stand(self):
		s = self.standing
		for key in s.keys():
			self.servo(key).angle = s[key]

if __name__ == '__main__':
	m = Move()
	m.squatDown()
	m.standUp()
