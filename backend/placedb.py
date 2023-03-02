from base import db

class Place(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    navn = db.Column(db.String(100), unique=True, nullable=False)
    stoy = db.Column(db.Integer, nullable=False)
    vurdering = db.Column(db.Integer, nullable=False)
    ledighet = db.Column(db.time, nullable=True)
    lokasjon = db.Column(db.Point, nullable=True) #må endres til FALSE !!

    def __init__(self, navn, stoy, vurdering, ledighet, lokasjon):
        self.nave = navn
        self.stoy = stoy 
        self.vurdering = vurdering
        self.ledighet = ledighet
        self.lokasjon = lokasjon