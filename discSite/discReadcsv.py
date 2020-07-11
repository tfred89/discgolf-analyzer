import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "discSite.settings")

import django
django.setup()

import csv

with open('discs_2_8.csv', newline='') as f:
    reader = csv.reader(f)
    data = list(reader)

#  now write to DB