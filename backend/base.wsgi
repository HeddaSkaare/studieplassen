import sys
sys.path.insert(0, '/gib2_mapstudy/backend')
activate_this =
'/home/geomatikkstud/.local/share/virtualenvs/StudyPlace/bin/activate_this.py'
with open(activate_this) as file_:
    exec(file_.read(), dict(__file__=activate_this))
from base import base as application