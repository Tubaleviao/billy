import sys
from adafruit_servokit import ServoKit
kit = ServoKit(channels=16)


kit.servo[int(sys.argv[1])].angle = int(sys.argv[2])
