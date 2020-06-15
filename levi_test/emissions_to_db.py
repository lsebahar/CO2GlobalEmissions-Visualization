# Dependencies
from flask import Flask
import pymongo
import datetime
import get_emissions

# The default port used by MongoDB is 27017

conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)

# Declare the database
db = client.emissions_db

# Declare the collection
collection = db.emissions_info

db.collection.drop

emissions_var = get_emissions.emissions_pull()

db.collection.insert_many([emissions_var])