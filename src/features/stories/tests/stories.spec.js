/**
 * Created by Muzikayise Flynn Buthelezi (zuluCoda) on 2016/11/28.
 * Copyright mfbproject.co.za - muzi@mfbproject.co.za
 * Copyright zulucoda - mfbproject
 */
import stories from '../stories.index'
import _ from 'lodash'

let zulucodaScrumData = require('json-loader!./../../../public/data/zulucoda.scrum.data.json');

describe('Stories - Unit Test', ()=>{

  beforeEach(()=>{
    angular.mock.module(stories);
  });

  describe('routes', ()=>{
    let state, currentState;
    beforeEach(()=>{
      angular.mock.inject(($state)=>{
        state = $state;
        currentState = state.get('stories');
      });
    });

    it('should associate current state with url', ()=>{
      expect(currentState.url).toEqual('/stories/:wallId');
    });

    it('should associate current state with template', ()=>{
      expect(currentState.template).toEqual(require('../partials/stories.html'));
    });

    it('should associate current state with controller', ()=>{
      expect(currentState.controller).toEqual('StoriesController');
    });

    it('should associate current state with controllerAs', ()=>{
      expect(currentState.controllerAs).toEqual('stories');
    });
  });

  describe('controller', ()=>{
    let controller, stories, stateParams, location, getStoriesForWallId, storiesService, q, rootScope, storyBacklog,
      storyTodo, storyInProgress, storyDone, fakeModalInstance, storyModalOptions, _storyModule, uibModal, actualOptions;

    getStoriesForWallId = _.filter(zulucodaScrumData.stories, (s) => { return s.wallId == 1});
    storyBacklog = _.filter(getStoriesForWallId, {'status': 'backlog'});
    storyTodo = _.filter(getStoriesForWallId, {'status': 'todo'});
    storyInProgress = _.filter(getStoriesForWallId, {'status': 'in_progress'});
    storyDone = _.filter(getStoriesForWallId, {'status': 'done'});

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

    storyModalOptions = {
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      template: require('./../partials/stories.modal.html'),
      controller: 'StoryModalController',
      controllerAs: 'storyModal',
      size: 'lg',
      resolve: {
        currentStory: jasmine.any(Function)
      }
    };

    beforeEach(()=>{
      angular.mock.inject(($controller, $location, $q, $rootScope, StoryModule)=>{
        controller = $controller;
        q = $q;
        rootScope = $rootScope;
        stateParams = {
          wallId: 1
        };
        location = $location;
        storiesService = jasmine.createSpyObj('StoriesService', ['getAllByWallId', 'addOrEdit']);
        storiesService.getAllByWallId.and.returnValue(q.when(getStoriesForWallId));
        _storyModule = StoryModule;

        uibModal = jasmine.createSpyObj('$uibModal', ['open']);
        uibModal.open.and.callFake((options)=>{
          actualOptions = options;
          return fakeModalInstance ;
        });
      });
    });

    function initialiseController () {
      stories = controller('StoriesController',{
        $stateParams: stateParams,
        StoriesService: storiesService,
        $location: location,
        $uibModal: uibModal,
      });
      rootScope.$digest();
    }

    describe('initialise controller', ()=>{

      it('should get wallId from state param', ()=>{
        initialiseController();
        expect(stories.currentWallId).toBe(1);
      });

      it('should redirect to walls when wallId state param is undefined', ()=>{
        stateParams.wallId = undefined;
        initialiseController();
        expect(location.path()).toEqual('/walls');
      });

      it('should get stories for wallId and set stories.stories', ()=>{
        initialiseController();
        expect(storiesService.getAllByWallId).toHaveBeenCalledWith(1);
        expect(stories.stories).toEqual(getStoriesForWallId);
      });

      it('should set stories.backlog', ()=>{
        initialiseController();
        expect(stories.backlog).toEqual(storyBacklog);
      });

      it('should set stories.storyTodo', ()=>{
        initialiseController();
        expect(stories.storyTodo).toEqual(storyTodo);
      });

      it('should set stories.storyInProgress', ()=>{
        initialiseController();
        expect(stories.storyInProgress).toEqual(storyInProgress);
      });

      it('should set stories.storyDone', ()=>{
        initialiseController();
        expect(stories.storyDone).toEqual(storyDone);
      });

      it('should set stories.currentStory', ()=>{
        initialiseController();
        expect(stories.currentStory).toEqual(_storyModule.story);
      });

    });

    describe('controller methods', ()=>{

      describe('wall.open', ()=>{
        it('should open ui story modal', ()=>{
          initialiseController();
          stories.currentStory = {};
          stories.open({});
          expect(uibModal.open).toHaveBeenCalledWith(storyModalOptions);
          expect(actualOptions.resolve.currentStory()).toEqual({});
        });
        it('should call modalInstance.result on modal close', ()=>{
          initialiseController();
          stories.currentWallId = 1;
          let currentStory = _storyModule.story;
          currentStory.name = 'some new wall name';
          currentStory.assignedTo = 'some user';
          currentStory.description = 'some description';
          currentStory.estimate = 'some estimate';
          currentStory.status = 'some status';
          currentStory.wallId = 1;
          stories.open(currentStory);
          let modalInstance = uibModal.open(storyModalOptions);
          modalInstance.close(currentStory);
          rootScope.$digest();
          expect(modalInstance.result.then).toHaveBeenCalled();
          expect(storiesService.addOrEdit).toHaveBeenCalledWith(currentStory);
          expect(storiesService.getAllByWallId).toHaveBeenCalledWith(1);
        });
      });
    })

  });

});