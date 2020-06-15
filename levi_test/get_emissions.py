import requests
from requests import get
import pandas as pd
import json
import pprint as pprint

url = 'https://pkgstore.datahub.io/core/co2-fossil-by-nation/fossil-fuel-co2-emissions-by-nation_json/data/2b4874bb29c461a614e92773956ad573/fossil-fuel-co2-emissions-by-nation_json.json'

def emissions_pull():
    response = json.loads(requests.get(url).text)

    df = pd.DataFrame.from_dict(response, orient='columns')

    df = df.drop(columns=['Bunker fuels (Not in Total)'])

    df = df.loc[((df['Year'] == 2014) & (df['Total'] > 50000)) | ((df['Country'] == "UNITED KINGDOM") | (df['Country'] == "CHINA (MAINLAND)") | (df['Country'] == "USA"))]

    json_data = df.reset_index().to_json(orient='records')

    return json_data

