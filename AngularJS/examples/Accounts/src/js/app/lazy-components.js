var ProfilerController = /** @class */ (function () {
  function ProfilerController(greeterService) {
      this.greeterService = greeterService;
      this.greeterService.greet(this.data);
  }
  return ProfilerController;
}());

var HeatMapController = /** @class */ (function () {
  function HeatMapController(anotherGreeterService) {
      this.anotherGreeterService = anotherGreeterService;
      this.anotherGreeterService.greet('yay');
  }
  return HeatMapController;
}());


angular.module('perfcomponents', [])
  .directive('heatmap', () => {
    return {
      restrict: 'E',
      controllerAs: 'heatmapCtrl',
      controller: HeatMapController,
      templateUrl: 'components/heatmap.html'
    };
  }).directive('perfProfiler', () => {
    return {
      restrict: 'E',
      controllerAs: 'perfProfilerCtrl',
      controller: ProfilerController,
      templateUrl: 'components/perf-profiler.html',
      scope: {},
      bindToController: {
        data: '='
      }
    };
  }).run(($templateCache) => {
    $templateCache.put('components/heatmap.html', '<div class="heatmap">Heatmap View</div>');
    $templateCache.put('components/perf-profiler.html', '<div class="profiler">Profiler View {{perfProfilerCtrl.data}}</div>');
  });