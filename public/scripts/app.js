$(document).ready(function () {

  console.log('everything is loaded');
//carousel plugin
  $('.pics').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    dots: true,
    arrows: false,
    fade: true,
    autoplaySpeed: 1000,
  });
  //jquery fade in
  $(".mainTitle").hide().fadeIn(5000);
  $(".indexSection").hide().fadeIn(5500);


  app.renderGoogleMap('seattle');



})

//end of document.ready

  //this is my app's namspace so I don't collide with the global scope

  var app = app || {};

   app.mapOptions = {
    seattle:  {
      center: new google.maps.LatLng(47.6204, -122.3491),
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    },
    fiji:  {
      center: new google.maps.LatLng(-18.0000, 179.0000),
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    },
    sapporo: {
      center: new google.maps.LatLng(43.0667, 141.3500),
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
  }







      app.maps = new Object ();
      app.markers = new Object ();


  $(".mySpot button").on("click", function () {
    var posit = $(this).data('location');

    app.renderGoogleMap(posit);
    console.log('completed');

    if (posit == 'seattle') {
        $('.mySpot h4').html('The current temperature is ' + Math.round(weatherData.responseJSON.list[0].main.temp * 9/5 - 459.67) + ' degrees with ' + weatherData.responseJSON.list[0].weather[0].description + '.').css("color", "#005C5C");
    }else if (posit == 'fiji') {
        $('.mySpot h4').html('The current temperature is ' + Math.round(weatherData.responseJSON.list[1].main.temp * 9/5 - 459.67) + ' degrees with ' + weatherData.responseJSON.list[1].weather[0].description + '.').css("color", "#FFD700");
    }else if (posit == 'sapporo') {
        $('.mySpot h4').html('The current temperature is ' + Math.round(weatherData.responseJSON.list[2].main.temp * 9/5 - 459.67) + ' degrees with ' + weatherData.responseJSON.list[2].weather[0].description + '.').css("color", "#ACC0C6");
      }
  });


 //now I'm gonna creat the locations of the marker of the maps
  app.renderGoogleMap  = function (location) {
      app.maps[location] = new google.maps.Map($("#map-canvas")[0], app.mapOptions[location]);

      app.markers[location] = new google.maps.Marker({
        position: app.mapOptions[location].center,
        map: app.maps[location],
        title: 'Lifting your dreams'
      });//end of marker

      console.log("igot dat");
      //set my default at the space needle
      app.markers[location].setMap(app.maps[location]);
  }//end of renderNewMap function

   app.getWeather = {
  type: 'get',
  url: 'http://api.openweathermap.org/data/2.5/group?id=5809844,2130037,2205218',
  data: 'json',
  success: function(data){
    console.log("I did it bitches!");
    console.dir(data)
      $('.mySpot h4').html('The current temperature is ' + Math.round(data.list[0].main.temp * 9/5 - 459.67) + ' degrees with ' +data.list[0].weather[0].description + '.').css("color", "#005C5C");
    return (data.responseText);





  },error:  function () {
    console.log("I didn't work you big dumb idiot");
  }


}//end

var weatherData = $.ajax(app.getWeather);





//an evevt listener to wait for the map
