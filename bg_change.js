

// cont2 영역시 배경컬러 바꾸기

$(window).scroll(function(){
  let scrollTop = $(this).scrollTop() + 300; 
  let offsetCont2 = $('.cont2').offset().top; 
  let offsetCont4 = $('.cont4').offset().top; 

  if (scrollTop > offsetCont2 && scrollTop < offsetCont4) {  
    $('body').addClass('on');
  } else {
    $('body').removeClass('on');
  }
});





 $(window).scroll(function(){
  let scrollTop = $(this).scrollTop(); 
  let offsetSection7 = $('#section7').offset().top;
  

  if (scrollTop > offsetSection7) {  
    $('.section7').addClass('on');
    $('body').css('background-color', '#59229E');
  } else {
    $('.section7').removeClass('on');
    $('body').css('background-color', ''); 
  }
}); 


