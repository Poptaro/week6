from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask("app")
CORS(app)

API_KEY = "RGAPI-ff584b12-2de6-4121-8180-f1d6f428342e"
USERNAME = "Rokusho"
TAG = "Kana"


@app.route("/player/<username>/<tag>", methods=["GET"])
def getGameName(username, tag):
  url = f"https://americas.api/riotgames.com/riot/account/v1/accounts/by-riot-id/"
  headers = {"X-Riot-Token": API_KEY}

  try:
    response = requests.get(f"https://americas.api/riotgames.com/riot/account/v1/accounts/by-riot-id/{username}/{tag}", headers)
    print(jsonify(response))

  except:
    print('FAILED')


app.run(debug=True, port=3000)

# print(gameName)