var app = angular.module('zoomingMapApp', []);
app.directive('map', function(){
  return {
    restrict: 'A',
    replace:true,
    transclude:true,
    templateUrl: 'partials/map.html',
    controller:function($scope){
      this.updateZoom = function(zoomLevel){
        var approximateZoom = 9 + zoomLevel;
        $scope.map.setZoom(approximateZoom);
      }
    },
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

      var map = new google.maps.Map(document.getElementById('map'),
        mapOptions);
      scope.map = map;
      var marker = new google.maps.Marker({
        position: placeLatlng,
        map: map,
        title: placeName,
        animation: google.maps.Animation.DROP
      });
    }
  }
});
app.directive('dial', function(){
  return {
    restrict: 'A',
    replace:true,
    templateUrl: 'partials/dial.html',
    require:'^map',
    link: function(scope, element, attrs, mapController) {
      var rotationMin = parseInt(attrs.minRotation);
      var rotationMax = parseInt(attrs.maxRotation);
      var dialValue = parseInt(attrs.startZoom);
      Draggable.create(element, {
        type:'rotation',
        throwProps:true,
        dragResistance :0.05,
        bounds:{minRotation:rotationMin, maxRotation:rotationMax},
        overshootThreshold:1,
        maxDuration:0.01,
        snap:function(endValue) {
          dialValue = endValue;
          return endValue;
        },
        onThrowComplete:function() {
          mapController.updateZoom(Math.round(dialValue / 33));
        }
      });
      TweenMax.to(dial, 5, {css:{rotation:dialValue},ease:Elastic.easeOut});
    }
  }
});