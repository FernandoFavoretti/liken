# -*- coding: utf-8 -*-
def get_all_movies(collection, field_list, limit):
    import json
    if field_list == "all":
        cursor = collection.find({}, {"_id": False}).sort("id_movie", 1).limit(limit)
        js_all = []
        for movie in cursor:
            js_all.append(movie)
        return json.dumps(js_all)
    else:
        fields = field_list.split(",")
        fields = [str(x) for x in fields]
        all_fields = ["titulo", "descricao", "id_movie", "genero", "_id"]
        field_dict = {}
        for field in all_fields:
            if field not in fields:
                field_dict[field] = False

        cursor = collection.find({}, field_dict).limit(limit)
        js_all = []
        real_dict = {}
        for movie in cursor:
            js_all.append(movie)
        return json.dumps(js_all)

def get_movie_id(collection, id):
    import json
    # -*- coding: utf-8 -*-
    cursor = collection.find({"id_movie": id}, {"_id": False})
    js_all = []
    for movie in cursor:
        js_all.append(movie)
    return json.dumps(js_all)


def add_comment(collection, string):
    string = string.split("|")
    print string
    id_movie_new = string[0]
    comment = string[1]
    id_movie_actual = string[2]
    movie_title = string[3]
    dict_comment = {}
    dict_comment["id_movie_new"] = id_movie_new
    dict_comment["comment"] = comment
    dict_comment["id_movie_actual"] = id_movie_actual
    dict_comment["movie_title"] = movie_title
    final_dict = dict_comment
    collection.insert_one(final_dict)


def get_comments(collection, id_movie):
    import json
    cursor = collection.find({"id_movie_actual": str(id_movie)}, {"_id": False})
    js_all = []
    for comment in cursor:
        print comment
        js_all.append(comment)
    return json.dumps(js_all)

def get_most_suggest(collection, id_movie):
    import json
    cursor = collection.find({"id_movie_actual": str(id_movie)}, {"_id": False, "movie_title":1, "id_movie_new":1})
    js_all = []
    print js_all
    list_ids =[]
    for comment in cursor:
        js = json.loads(json.dumps(comment))
        list_ids.append(js["id_movie_new"]+"|"+js["movie_title"])
    dict_count = ({x: list_ids.count(x) for x in list_ids})

    return json.dumps(dict_count)


