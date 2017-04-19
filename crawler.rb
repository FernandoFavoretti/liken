require 'open-uri'
require 'nokogiri'
require 'json'
require 'mongo'


Mongo::Logger.logger.level = ::Logger::FATAL

client = Mongo::Client.new([ '127.0.0.1:27017' ], :database => 'sw')

movies_array = []
descricao_array = []
genero_array = []

counter = 0
for i in 1..200
  json = {}
  pagina = i
  url = "http://www.adorocinema.com/filmes/todos-filmes/notas-espectadores/?page=#{i}"
  print("\nCrawling page #{i}\n")
  html = open(url)
  parse_page = Nokogiri::HTML(html)


  parse_page.css('#contentlayout')
      .css('.img_side_content')
      .css('img')
      .map do |fig|
    uri = fig.attr('src')
    name = "mini_#{counter}"
    File.open("movie_fig/#{File.basename(name)}",'wb'){
        |f| f.write(open(uri).read)
    }
    movies_array.push(name)
    counter += 1
    end

  counter = counter - movies_array.length
  movies_array.clear
  parse_page.css('#contentlayout')
      .css('#col_main')
      .css('.data_box')
      .css('.img_side_content')
      .css('.content')
      .css('.titlebar_02')
      .css('a')
      .map do |movie|
    url = "http://www.adorocinema.com"+movie["href"]
    html_filme = open(url)
    movie_page = Nokogiri::HTML(html_filme)
    movie_page.css('.col-xs-12')
        .css('h1.item')
        .map do |filme|
      json["titulo"] = filme.inner_html.gsub(/\n/,'')
    end

    movie_page.css('.col-xs-12')
        .css('#content-start')
        .css('.synopsis-txt')
        .map do |desc|
      json["descricao"] = desc.inner_html.gsub(/\n/,'')
    end

    one_genre = []
    movie_page.css('.col-xs-12')
        .css('#content-start')
        .css('.meta-body-item')
        .css('span[itemprop="genre"]')
        .map do |genero|
      one_genre.push(genero.text)
    end
    json["genero"] = (one_genre)
    json["id_movie"] = counter
    counter += 1
    client[:filmes].insert_one json

  end

end

client.close

