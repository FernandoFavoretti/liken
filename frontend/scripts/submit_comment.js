function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

function solr_response(data){
    first_movie = data.response.docs[0];
    titulo_comment = first_movie.titulo;
    id_movie_commented = first_movie.id_movie;
    actual_id = findGetParameter("movie");
    comment = $('#new_comment').val();
    var string_comment =id_movie_commented+"|"+comment+"|"+actual_id+"|"+titulo_comment;
    url = "http://127.0.0.1:5000/linken/api/movies/addcomment/"+string_comment
    $.getJSON(url);
    $('.modal-ghost').fadeOut('100');
    $('.modal').fadeOut('100');
    location.reload();

}

$(document).ready(function(){
    $('#add_comment').on('click', addcomment);
    function addcomment(event) {
        id_movie = findGetParameter("movie")
        movie_name = $('#comment_nome_filme').val(),
        solr_query ="http://104.198.178.60:8983/solr/linken/select?indent=on&q=titulo:"+movie_name+"&wt=json&callback=?&json.wrf=solr_response";
        response = $.getJSON(solr_query);

    }
});

