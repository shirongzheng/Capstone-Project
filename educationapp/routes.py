from flask import Flask, render_template, request, session, redirect, url_for
from educationapp import app
import json

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/bargraph")
def bargraph():
    return render_template("bargraph.html")

@app.route("/gender")
def gender():
    return render_template("gender.html")

@app.route("/zoomable")
def zoomable():
    return render_template("zoomable.html")

@app.route("/treemap")
def treemap():
    return render_template("treemap.html")

@app.route("/logisticregression")
def logisticregression():
    return render_template("logisticregression.html")

@app.route("/dendrogram")
def dendrogram():
    return render_template("dendrogram.html")

@app.route("/isomap1")
def isomap1():
    return render_template("isomap1.html")

@app.route("/isomap2")
def isomap2():
    return render_template("isomap2.html")

@app.route("/heatmap")
def heatmap():
    return render_template("heatmap.html")

@app.route("/heatmap2")
def heatmap2():
    return render_template("heatmap2.html")

@app.route("/attendance_index")
def attendance_index():
    return render_template("attendance_index.html")
