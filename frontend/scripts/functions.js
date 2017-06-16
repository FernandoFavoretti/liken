$(document).ready(function(){

  $('.slider').slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 5,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });

  $('.addComment').on('click', function(){
    $('.modal-ghost').fadeIn('100');
    $('.modal').fadeIn('100');
  });

  $('.closeModal, .modal-ghost').on('click', function(){
    $('.modal-ghost').fadeOut('100');
    $('.modal').fadeOut('100');
  });


});
