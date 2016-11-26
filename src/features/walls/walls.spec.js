/**
 * Created by Muzikayise Flynn Buthelezi (zuluCoda) on 2016/11/26.
 * Copyright mfbproject.co.za - muzi@mfbproject.co.za
 * Copyright zulucoda - mfbproject
 */
import walls from './index';

describe('Walls - Unit Test',() =>{

  beforeEach(angular.mock.module(walls));

  describe('routes', ()=>{
    let state, currentState;

    beforeEach(angular.mock.inject(($state)=>{
      state = $state;
    }));

    describe('when state is walls', ()=>{

      beforeEach(()=>{
        currentState = state.get('walls');
      });

      it('url should be /', ()=>{
        expect(currentState.url).toBe('/');
      });

      it('template should be defined', ()=>{
        expect(currentState.template).toBeDefined();
      });

      it('controller should be WallsController', () => {
        expect(currentState.controller).toBe('WallsController');
      });

      it('controller as should be wall', () => {
        expect(currentState.controllerAs).toBe('wall');
      });

    });
  });

  describe('controller', ()=> {
    let controller, wall, rootScope;

    beforeEach(angular.mock.inject(($controller, $rootScope)=>{
      controller = $controller;
      rootScope = $rootScope;
    }));

    function initialiseController() {
      wall = controller('WallsController', {});
      rootScope.$digest();
    }

    describe('initialise controller', ()=>{
      beforeEach(()=>{
        initialiseController();
      });

      it('should set wall.walls empty array', ()=>{
        expect(wall.walls).toEqual([])
      });
    });

  });
});
