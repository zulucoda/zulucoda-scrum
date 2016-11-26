import app from './app';

describe('app', () => {

  beforeEach(() => {
    angular.mock.module(app);
  });

  // describer('url config', () => {
  //   let urlRouterProvider, locationProvider;
  //   beforeEach(angular.mock.inject(($urlRouterProvider, $locationProvider) => {
  //     urlRouterProvider = $urlRouterProvider;
  //     locationProvider = $locationProvider;
  //   }));
  //
  //   it('should have html5mode set to true', ()=>{
  //     expect(true).toBeTruthy();
  //   });
  // });

  // describe('AppCtrl', () => {
  //   let ctrl;
  //
  //   beforeEach(() => {
  //     angular.mock.module(app);
  //
  //     angular.mock.inject(($controller) => {
  //       ctrl = $controller('AppCtrl', {});
  //     });
  //   });
  //
  //   it('should contain the starter url', () => {
  //     expect(ctrl.url).toBe('https://github.com/preboot/angular-webpack');
  //   });
  // });
});