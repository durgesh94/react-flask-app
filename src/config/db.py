# db.py
import os
from flask_pymongo import PyMongo

mongo = PyMongo()

def initialize_db(app):
    app.config['MONGO_URI'] = os.getenv('MONGO_URI')
    mongo.init_app(app)
