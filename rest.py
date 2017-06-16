# -*- coding: utf-8 -*-
from flask import Flask, make_response
from flask_cors import CORS
global session
global collection
global collection_t
import mongo_helper

from pymongo import MongoClient
app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return "{\"Hello\": 2}"

## USERS



@app.route('/linken/api/health', methods=['GET'])
def get_status_from_mongo():
    import json
    return json.dumps({"STATUS":"UP"}), 200


@app.route('/linken/api/movies/<field_list>/<int:limit>', methods=['GET'])
def get_mongo_movies(field_list, limit):
    #list : titulo, descricao, genero, id (id_movie)
    js = mongo_helper.get_all_movies(collection, field_list, limit)
    return js, 200


@app.route('/linken/api/movies/id/<int:id>', methods=['GET'])
def get_movie_id(id):
    from flask import Response
    js = mongo_helper.get_movie_id(collection, id)
    r = Response(response=js, status=200, mimetype="application/json")
    r.headers["Content-Type"] = "application/json; charset=utf-8"
    return r

@app.route('/linken/api/movies/search/<query>', methods=['GET'])
def search_on_field(query):
    from flask import Response
    js = mongo_helper.search_movie_by_field("titulo",query,collection)
    r = Response(response=js, status=200, mimetype="application/json")
    r.headers["Content-Type"] = "application/json; charset=utf-8"
    return r

## INTERNAUTAS

'''
@app.route('/select/inter/<int:usuarioid>', methods=['GET'])
def get_profile_internauta(usuarioid):
    return ""+str(profiler.make_profile(usuarioid, session, check=True, internauta=True))
'''

if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser(description='KAPLA!')
    parser.add_argument('-host', '--host', help='Host of the rest')
    parser.add_argument('-port', '--port', help='port of the rest')
    args = vars(parser.parse_args())
    global collection
    client = MongoClient()
    client = MongoClient('104.198.178.60', 4000)
    db = client['sw']
    collection = db['filmes']
    print "Connected to Mongo DB"
    app.run(host=args["host"], port=args["port"], threaded=True)

