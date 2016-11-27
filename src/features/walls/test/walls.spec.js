/**
 * Created by Muzikayise Flynn Buthelezi (zuluCoda) on 2016/11/26.
 * Copyright mfbproject.co.za - muzi@mfbproject.co.za
 * Copyright zulucoda - mfbproject
 */
import walls from '../index';
let zulucodaScrumData = require('json-loader!./../../../public/data/zulucoda.scrum.data.json');

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
    let controller, wall, rootScope, wallsService;

    beforeEach(angular.mock.inject(($controller, $rootScope, $q)=>{
      controller = $controller;
      rootScope = $rootScope;
      wallsService = jasmine.createSpyObj('WallsService', ['getAll']);
      wallsService.getAll.and.returnValue($q.when(zulucodaScrumData.walls));
    }));

    function initialiseController() {
      wall = controller('WallsController', {
        WallsService: wallsService
      });
      rootScope.$digest();
    }

    describe('initialise controller', ()=>{
      beforeEach(()=>{
        initialiseController();
      });

      it('should populate wall.walls with wall list from service', ()=>{
        expect(wallsService.getAll).toHaveBeenCalled();
        expect(wall.walls).toEqual(zulucodaScrumData.walls);
      });
    });

  });
});
