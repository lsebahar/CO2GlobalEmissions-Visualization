from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import get_emissions

# Create an instance of Flask
app = Flask(__name__)

# Use PyMongo to establish Mongo connection
mongo = PyMongo(app, uri="mongodb://localhost:27017/emissions_db")


# Route to render index.html template using data from Mongo
@app.route("/")
def home():

    # Find one record of data from the mongo database
    emissions_data = mongo.db.collection.find_one()

    
    # Return template and data
    return render_template("index.html", Gas=emissions_data)


# Route that will trigger the emissions function
@app.route("/emissions")
def emissions():

    # Run the get_emissions function
    emissions_data = get_emissions.emissions_pull()

    # Update the Mongo database using update and upsert=True
    mongo.db.collection.update({}, emissions_data, upsert=True)

    # Redirect back to home page
    return redirect("/")


if __name__ == "__main__":
    app.run(debug=True)