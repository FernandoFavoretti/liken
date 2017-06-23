function solr_response(data){
    first_movie = data.response.docs[0];
    titulo_comment = first_movie.titulo;
    id_movie = first_movie.id_movie;
    window.location = 'details-movie.html?movie=' + id_movie ;


}

$(document).ready(function(){
    $('#find_movie').on('click', find);
    function find(event) {
        movie_name = $('#search_movie_name').val();
        solr_query ="http://104.198.178.60:8983/solr/linken/select?indent=on&q=titulo:"+movie_name+"&wt=json&callback=?&json.wrf=solr_response";
        response = $.getJSON(solr_query);
        console.log(response)
        console.log(response)
    }
});

