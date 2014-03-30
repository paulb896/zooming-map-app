var app = angular.module("zoomingMapApp", [])
app.directive("map", function(){
  return {
    restrict: "A",
    replace:true,
    template: '<div class="map" id="map"></div>',
    link: function(scope, element, attrs) {
      var latitude = attrs.latitude;
      var longitude = attrs.longitude;
      var placeName = attrs.place;
      var zoomLevel = parseInt(attrs.zoom);
      var placeLatlng = new google.maps.LatLng(latitude,longitude);
      var mapOptions = {
        zoom: zoomLevel,
        center: placeLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      var map = new google.maps.Map(document.getElementById(attrs.id),
        mapOptions);

      var marker = new google.maps.Marker({
        position: placeLatlng,
        map: map,
        title: placeName,
        animation: google.maps.Animation.DROP
      });
    }
  }
});
app.directive("dial", function(){
  return {
    restrict: "A",
    replace:true,
    template: '<img id="dial" class="dial" src="dial.png"></span>',
    link: function(scope, element, attrs) {
      var rotationSnap = 20;
      var dialValue = 0;
      Draggable.create("#dial", {
        type:"rotation",
        throwProps:true,
        dragResistance :0.99,
        maxDuration:2,
        snap:function(endValue) {
          if (endValue < 10) {
            endValue = 10;
          } else if (endValue > 350){
            endValue = 350;
          } else {
            endValue = Math.round(endValue / rotationSnap) * rotationSnap;
          }
          dialValue = endValue;
          return endValue;
        },
        onThrowComplete:function() {
          // Add callback to map update here
          console.log("Throw complete, end value is", dialValue);
        },
        lockAxis:true
      });
    }
  }
});