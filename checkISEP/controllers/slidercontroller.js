//angular.module('myApp', ['ui.bootstrap']);
var slideapp = angular.module('plunker', ['ui.bootstrap']);


// Controller  for Carousel
function CarouselCtrl($scope) {

// initializing the time Interval
  $scope.myInterval = 5000;
  
 // Initializing  slide rray  
$scope.slides = [
	{image:'img/img_1.jpg',text:'Rule n.1'},
	{image:'img/img_2.jpg',text:'Rule n.2'},
	{image:'img/img_3.jpg',text:'Rule n.3'}
];

  var slides = $scope.slides;
  console.log(slides);

} // Controller Ends here