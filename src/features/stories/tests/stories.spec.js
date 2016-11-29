/**
 * Created by Muzikayise Flynn Buthelezi (zuluCoda) on 2016/11/28.
 * Copyright mfbproject.co.za - muzi@mfbproject.co.za
 * Copyright zulucoda - mfbproject
 */
import stories from '../stories.index'

describe('Stories - Unit Test', ()=>{

  beforeEach(()=>{
    angular.mock.module(stories);
  });

  describe('routes', ()=>{
    let state, currentState;
    beforeEach(()=>{
      angular.mock.inject(($state)=>{
        state = $state;
        currentState = state.get('/stories/:wall-id');
      });
    });

    it('should associate current state with url', ()=>{
      expect(currentState.url).toEqual('/stories/:wall-id');
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
    let controller, stories, stateParams, story, location;
    beforeEach(()=>{
      angular.mock.inject(($controller, StoryModule, $location)=>{
        controller = $controller;
        stateParams = {
          wallId: 100
        };
        story = StoryModule;
        location = $location;
      });
    });

    function initialiseController () {
      stories = controller('StoriesController',{
        $stateParams: stateParams,
        StoryModule: story,
        $location: location
      });
    }

    describe('initialise controller', ()=>{

      it('should get wallId from state param', ()=>{
        initialiseController();
        expect(stories.story.wallId).toBe(100);
      });

      it('should redirect to walls when wallId state param is undefined', ()=>{
        stateParams.wallId = undefined;
        initialiseController();
        expect(location.path()).toEqual('/walls');
      });

    });

  });

});