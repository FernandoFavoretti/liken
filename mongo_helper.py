ll_movies(collection, field_list, limit):
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
    dict_teste = {}
    for movie in cursor:
        js_all.append(movie)
    return json.dumps(js_all)

