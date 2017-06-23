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


function get_parameter_for_api_call(){
    id_movie = findGetParameter("movie")
    get_movie_from_api(id_movie)
}



function get_movie_from_api(id_movie){
    rest_result = jQuery.ajax({
        url: "http://104.198.178.60:4001/linken/api/movies/id/"+id_movie,
        type: "GET",

        contentType: 'application/json; charset=utf-8',
        success: function(resultData) {
           // Read data from json
           var titulo = resultData[0].titulo;
           var descricao =  resultData[0].descricao;
           var genero =  resultData[0].genero;
           var id =  resultData[0].id_movie;
           //input data
           input_data(titulo,descricao, genero, id)

        },
        error : function(jqXHR, textStatus, errorThrown) {
        },

        timeout: 120000,
    });
}

function get_comments_from_api(id_movie){
    rest_result = jQuery.ajax({
        url: "http://127.0.0.1:5000/linken/api/movies/getcomments/"+id_movie,
        type: "GET",

        contentType: 'application/json; charset=utf-8',
        success: function(resultData) {
            // Read data from json
            array_comments = resultData

            //input data
            input_comments(array_comments)

        },
        error : function(jqXHR, textStatus, errorThrown) {
        },

        timeout: 120000,
    });
}

function get_most_suggest_from_api(id_movie){
    rest_result = jQuery.ajax({
        url: "http://127.0.0.1:5000/linken/api/movies/getmost/"+id_movie,
        type: "GET",

        contentType: 'application/json; charset=utf-8',
        success: function(resultData) {
            input_most_suggest(resultData)
        },
        error : function(jqXHR, textStatus, errorThrown) {
        },

        timeout: 120000,
    });
}

function input_data(titulo,descricao,genero,id){
    //set_image
    $("#imagem_filme")
        .append("<img width='100%' src='./../../movie_fig/mini_"+id+"'>");

    //set_title
    $("#titulo_filme").text(titulo)

    //set_descricao
    $("#descricao_filme")
        .append('<p>')
        .append('<span>'+descricao+'</span>')

    $.each( genero, function(gen) {
        $("#categorias_filme").append('<span>'+genero[gen]+'</span>')
    });

    //pede mais sugeridos
    get_most_suggest_from_api(id)

    //pede comentarios para api
    get_comments_from_api(id)



}

function input_comments(array_comments) {

    console.log(array_comments)
    $.each(array_comments, function(comment) {
        //input comments
        $("#comments_go_here")
            .append('<div class="col-xs-12 comment">' +
                '<div class="row"> ' +
                '<div class="col-sm-2">' +
                '<div class="row comment-image"> ' +
                '<img src="./../../movie_fig/mini_'+array_comments[comment].id_movie_new+'" class="full-width"/>' +
                ' </div> </div> ' +
                '<div class="col-sm-10">' +
                ' <div class="row comment-details"> ' +
                '<h3>'+array_comments[comment].movie_title+'</h3> ' +
                '<span> USER </span> ' +
                '<p> '+array_comments[comment].comment+' </p> </div> </div> </div> </div>');
    });



}

function input_most_suggest(json_data){
    $.each(json_data, function(key, value) {
        var array_titulo_count = key.split("|")
        $('#suggest_slider')
            .append('<div class="slick-slide slick-current slick-active" data-slick-index="0" aria-hidden="false" tabindex="-1" role="option" aria-describedby="slick-slide00">' +
                '   <img src="./../../movie_fig/mini_'+array_titulo_count[0]+'" class=""/> '+
                '   <div class="movie-name">'+array_titulo_count[1]+'</div> '+
                '   <div class="votes">'+value+'</div> ' +
                '</div>')

    });


}