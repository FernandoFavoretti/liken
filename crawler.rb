require 'open-uri'
require 'nokogiri'
require 'json'
require 'mongo'

require 'mongo'

Mongo::Logger.logger.level = ::Logger::FATAL

client = Mongo::Client.new([ '127.0.0.1:27017' ], :database => 'sw')

movies_array = []
descricao_array = []
genero_array = []

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
    name = fig.attr('alt')
    File.open("movie_fig/#{File.basename(name)}",'wb'){
        |f| f.write(open(uri).read)
    }



  end

  parse_page.css('#contentlayout')
      .css('#col_main')
      .css('.data_box')
      .css('.img_side_content')
      .css('.content')
      .css('.titlebar_02')
      .css('a')
      .map do |movie|
    url = "http://www.adorocinema.com"+movie["href"]
    print("\nCrawling url #{url}\n")
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


    client[:filmes].insert_one json

  end

end

client.close

