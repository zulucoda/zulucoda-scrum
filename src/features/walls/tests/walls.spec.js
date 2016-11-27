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
    let controller, wall, rootScope, wallsService, uibModal, fakeModalInstance, wallModalOptions, actualOptions;

    fakeModalInstance = {
      close: jasmine.createSpy('modalInstance.close').and.callFake(function (data) {
        if(this.result.confirmCB && typeof this.result.confirmCB === 'function') {
          this.result.confirmCB(data);
        }
      }),
      dismiss: jasmine.createSpy('modalInstance.dismiss').and.callFake(function (reason) {
        if(this.result.cancelCB && typeof this.result.cancelCB === 'function') {
          this.result.cancelCB(reason);
        }
      }),
      result: {
        then: jasmine.createSpy('modalInstance.result.then').and.callFake(function (confirm, cancel) {
          this.confirmCB = confirm || this.confirmCB;
          this.cancelCB = cancel || this.cancelCB;
        }),
        catch: jasmine.createSpy('modalInstance.result.catch').and.callFake(function (cb) {
          this.cancelCB = cb || this.cancelCB;
        })
      }
    };

    wallModalOptions = {
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      template: require('./../partials/walls.modal.html'),
      controller: 'WallsModalController',
      controllerAs: 'wallModal',
      size: 'lg',
      resolve: {
        currentWall: jasmine.any(Function)
      }
    };

    beforeEach(angular.mock.inject(($controller, $rootScope, $q)=>{
      controller = $controller;
      rootScope = $rootScope;
      wallsService = jasmine.createSpyObj('WallsService', ['getAll', 'add']);
      wallsService.getAll.and.returnValue($q.when({data: zulucodaScrumData}));

      uibModal = jasmine.createSpyObj('$uibModal', ['open']);
      uibModal.open.and.callFake((options)=>{
        actualOptions = options;
        return fakeModalInstance ;
      });
    }));

    function initialiseController() {
      wall = controller('WallsController', {
        WallsService: wallsService,
        $uibModal: uibModal
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

    describe('controller methods', ()=>{
      beforeEach(()=>{
        initialiseController();
      });

      // describe('wall.add', ()=>{
      //   describe('when successful', ()=>{
      //     beforeEach(()=>{
      //       wall.name = 'some test wall name';
      //     });
      //
      //     it('should add append new wall with existing walls', ()=>{
      //       wall.add();
      //       expect(wallsService.add).toHaveBeenCalledWith(wall.name);
      //       expect(wall.walls.length).toBe(4);
      //     });
      //   });
      // });

      describe('wall.open', ()=>{
        it('should open ui wall modal', ()=>{
          wall.currentWall = {};
          wall.open();
          expect(uibModal.open).toHaveBeenCalledWith(wallModalOptions);
          expect(actualOptions.resolve.currentWall()).toEqual({});
        });
        it('should call modalInstance.result on modal close', ()=>{
          let modalInstance = uibModal.open(wallModalOptions);
          modalInstance.close({});
          expect(modalInstance.result.then).toHaveBeenCalled();
        });
      });
    });

  });
});
