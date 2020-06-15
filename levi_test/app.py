
from flask import Flask
from flask_pymongo import PyMongo
from flask import Flask, render_template, redirect, jsonify
import json
from bson.json_util import dumps
from bson.objectid import ObjectId
from flask import request


# Create an instance of Flask
app = Flask(__name__)

# Use PyMongo to establish Mongo connection
mongo = PyMongo(app, uri="mongodb://localhost:27017/emissions_db")


# Route to render index.html template using data from Mongo
@app.route("/")

def welcome():
    return(
        f"Welcome to my home page!<br/>"
        f"Available Routes:<br/>"
        f"/mongo-data<br/>"
        
        f"/visual<br/>"
        

    )
    


# Route that will trigger the emissions function
@app.route("/emissions")
def emissions():

    # Run the get_emissions function
    #emissions_data = get_emissions.emissions_pull()

    # Update the Mongo database using update and upsert=True
    #mongo.db.collection.update({}, emissions_data, upsert=True)

    # Redirect back to home page
    #return redirect("/")



 @app.route('/mongo-data')
 
 def connect():

# Find one record of data from the mongo database
   emission_data = mongo.db.collection

   db_data = []

   for emi in  emission_data.find():
        emi.pop('_id')
        db_data.append(emi)
    
    # Return template and data
   return jsonify(db_data)

# Find one record of data from the mongo database
#emissions_data = mongo.db.collection.find_one()
# Return template and data
#return render_template("index.html", Gas=emissions_data)



# Geo Map with January 2015 Data
@app.route('/visual')
def show():

 return render_template('index.html')



if __name__ == "__main__":
    app.run(debug=True)