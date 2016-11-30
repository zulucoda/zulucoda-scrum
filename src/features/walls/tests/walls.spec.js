/**
 * Created by Muzikayise Flynn Buthelezi (zuluCoda) on 2016/11/26.
 * Copyright mfbproject.co.za - muzi@mfbproject.co.za
 * Copyright zulucoda - mfbproject
 */
import walls from '../walls.index'
import wallModule from '../modules/wall.module'

let zulucodaScrumData = require('json-loader!./../../../public/data/zulucoda.scrum.data.json');

describe('Walls - Unit Test',() =>{

  beforeEach(()=>{
    angular.mock.module(walls);
    angular.mock.module(wallModule);
  });

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
    let controller, wall, rootScope, wallsService, uibModal, fakeModalInstance, wallModalOptions, actualOptions,
      _wallModule, state, storiesService;

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
      size: 'lg'
    };

    beforeEach(angular.mock.inject(($controller, $rootScope, $q, WallModule, $state)=>{
      controller = $controller;
      rootScope = $rootScope;
      wallsService = jasmine.createSpyObj('WallsService', ['getAll', 'add']);
      wallsService.getAll.and.returnValue($q.when(zulucodaScrumData.walls));

      uibModal = jasmine.createSpyObj('$uibModal', ['open']);
      uibModal.open.and.callFake((options)=>{
        actualOptions = options;
        return fakeModalInstance ;
      });

      _wallModule = WallModule;

      state = $state;

      storiesService = jasmine.createSpyObj('StoriesService', ['getAllByWallId']);
      storiesService.getAllByWallId.and.returnValue($q.when(zulucodaScrumData.stories));
    }));

    function initialiseController() {
      wall = controller('WallsController', {
        WallsService: wallsService,
        $uibModal: uibModal,
        $state: state,
        StoriesService: storiesService
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

      describe('wall.open', ()=>{
        it('should open ui wall modal', ()=>{
          wall.currentWall = {};
          wall.open();
          expect(uibModal.open).toHaveBeenCalledWith(wallModalOptions);
        });
        it('should call modalInstance.result on modal close', ()=>{
          wall.open();
          let modalInstance = uibModal.open(wallModalOptions);
          let currentWall = _wallModule.wall;
          wall.name = 'some wall name';
          modalInstance.close(currentWall);
          rootScope.$digest();
          expect(modalInstance.result.then).toHaveBeenCalled();
          expect(wallsService.add).toHaveBeenCalledWith(currentWall);
        });
      });

      describe('wall.viewStories', ()=>{
        beforeEach(()=>{
          initialiseController();
        });

        it('should navigate to /stories/:wallId', ()=>{
          spyOn(state, 'go');
          let wallId = 1;
          wall.viewStories(wallId);
          expect(state.go).toHaveBeenCalledWith('stories', {wallId: wallId});
        });
      });

      describe('wall.wall.getWallStats', ()=>{
        beforeEach(()=>{
          initialiseController();
        });

        it('should StoriesService.getAllByWallId', ()=>{
          wall.getWallStats({id:1});
          rootScope.$digest();
          expect(storiesService.getAllByWallId).toHaveBeenCalledWith(1);
        });
      });
    });

  });
});
