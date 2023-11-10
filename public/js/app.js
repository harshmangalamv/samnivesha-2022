// for navbar

$(function () {
  $(document).scroll(function () {
    var $nav = $(".nav-bar");
    $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
  });
});

// for home page content
//
// $(window).on("load",function() {
//   $(window).scroll(function() {
//     var windowBottom = $(this).scrollTop() + $(this).innerHeight();
//     $(".fade").each(function() {
//       /* Check the location of each desired element */
//       var objectBottom = $(this).offset().top + $(this).outerHeight();
//
//       /* If the element is completely within bounds of the window, fade it in */
//       if (objectBottom < windowBottom) { //object comes into view (scrolling down)
//         if ($(this).css("opacity")==0) {$(this).fadeTo(500,1);}
//       } else { //object goes out of view (scrolling up)
//         if ($(this).css("opacity")==1) {$(this).fadeTo(500,0);}
//       }
//     });
//   }).scroll(); //invoke scroll-handler on page-load
// });


$(document).ready(function() {
    $(window).scroll( function(){
        $('.fade').each( function(i){
            var bottom_of_object = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            if( bottom_of_window > bottom_of_object ){
                $(this).addClass('animate__animated animate__fadeInUp');
            }
            // if( bottom_of_window < bottom_of_object ){
            //     $(this).removeClass('animate__animated animate__fadeInUp');
            // }
        });
    });
});



// event

  $(document).ready(function () {

      $('#modalx-fadeScale').popup({
          pagecontainer: '.container',
          transition: 'all 0.3s'
      });

  });


// $(document).ready(function() {
//
// /* Every time the window is scrolled ... */
// $(window).scroll( function(){
//
//     /* Check the location of each desired element */
//     $('.hideme').each( function(i){
//
//         var bottom_of_object = $(this).position().top + $(this).outerHeight();
//         var bottom_of_window = $(window).scrollTop() + $(window).height();
//
//         /* If the object is completely visible in the window, fade it it */
//         if( bottom_of_window > bottom_of_object ){
//
//             $(this).animate({'opacity':'1'},700);
//
//         }
//     });
// });
// });
