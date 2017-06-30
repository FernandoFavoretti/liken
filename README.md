### ACH2077	Soluções Web Baseadas em Software Livre
@Authors: 
> Alan Kenji

> Fernando Favoretti

> Marcelo Kazuya

> Mim Koo 

---

#### Software criado exclusivamente para fins educacionais

> Tecnologias:

1. Servidor NGINX Google Cloud 
2. Api rest em flask (python)
3. Solr
4. MongoDB
5. Ruby Crawler
6. Front (CSS3, HTML5, Javascrip)

> Endpoints

1. Api http://104.198.178.60:4001


  a. /linken/api/health - Status do Servidor 
  
  b. /linken/api/movies/<field_list>/<int:limit> - Retorna a lista de campos escolhida dentro de um limite (#list : titulo, descricao, genero, id (id_movie))
  
  c. /linken/api/movies/id/<int:id> - Retorna tudo sobre um determinado id de filme
  
  d. Funções internas para funcionamento da aplicação
  
2. Aplicação: http://104.198.178.60:6001 


### Os mesmos serão retirados do ar ao fim da avaliação por questões de segurança
