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
      storyTodo, storyInProgress, storyDone;

    getStoriesForWallId = _.filter(zulucodaScrumData.stories, 'wallId', 1);
    storyBacklog = _.filter(getStoriesForWallId, 'status', 'backlog');
    storyTodo = _.filter(getStoriesForWallId, 'status', 'todo');
    storyInProgress = _.filter(getStoriesForWallId, 'status', 'in_progress');
    storyDone = _.filter(getStoriesForWallId, 'status', 'done');

    beforeEach(()=>{
      angular.mock.inject(($controller, $location, $q, $rootScope)=>{
        controller = $controller;
        q = $q;
        rootScope = $rootScope;
        stateParams = {
          wallId: 1
        };
        location = $location;
        storiesService = jasmine.createSpyObj('StoriesService', ['getAllByWallId']);
        storiesService.getAllByWallId.and.returnValue(q.when(getStoriesForWallId));
      });
    });

    function initialiseController () {
      stories = controller('StoriesController',{
        $stateParams: stateParams,
        StoriesService: storiesService,
        $location: location
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

    });

  });

});