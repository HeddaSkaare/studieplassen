from base import app, db
from placedb import Place
from flask import render_template, request

@app.route("/personadd", methods=['POST'])
def personadd():
    navn = request.form["navn"]
    stoy = request.form["stoy"]
    vurdering = request.form["vurdering"]
    ledighet = request.form["ledighet"]
    lokasjon = request.form["lokasjon"]
    entry = Place(navn, stoy, vurdering, ledighet, lokasjon)
    db.session.add(entry)
    db.session.commit()

    return render_template("index.html")
