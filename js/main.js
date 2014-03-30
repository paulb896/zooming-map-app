var app = angular.module("zoomingMapApp", [])
app.directive("map", function(){
  return {
    restrict: "A",
    replace:true,
    transclude:true,
    template: '<div><div class="map" id="map"></div><span ng-transclude></span></div>',
    controller:function($scope){
      this.updateZoom = function(zoomLevel){
        var approximateZoom = 8 + Math.round(zoomLevel / 40);
        console.log('Updating zoom', approximateZoom);
        //$scope.map.setZoom(zoomLevel/14)

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
app.directive("dial", function(){
  return {
    restrict: "A",
    replace:true,
    template: '<img id="dial" class="dial" src="images/dial.png"></span>',
    require:'^map',
    link: function(scope, element, attrs, mapController) {
      var rotationSnap = 20;
      var rotationMin = 0;
      var rotationMax = 360;
      var dialValue = 0;
      var dial = document.getElementById('dial');
      Draggable.create(dial, {
        type:"rotation",
        throwProps:true,
        dragResistance :0.99,
        edgeResistance:0.75,
        maxDuration:2,
        bounds:{minRotation:rotationMin, maxRotation:rotationMax},
        snap:function(endValue) {
          dialValue = Math.round(endValue / rotationSnap) * rotationSnap;
          return dialValue;
        },
        onThrowComplete:function() {
          mapController.updateZoom(dialValue);
        },
        lockAxis:true
      });
      TweenMax.to(dial, 5, {css:{rotation:320},ease:Elastic.easeOut});
    }
  }
});