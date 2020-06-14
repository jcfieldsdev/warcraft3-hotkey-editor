#!/usr/bin/env python
# coding=utf-8

import json
import os

path='../hotkeys/'

try:
	files=[f for f in os.listdir(path) if f.endswith('.txt')]
except OSError:
	files=[]

files.sort()

print('Content-Type: application/json; charset=utf-8\n')
print(json.dumps(files))