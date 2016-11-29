/**
 * Created by Muzikayise Flynn Buthelezi (zuluCoda) on 2016/11/29.
 * Copyright mfbproject.co.za - muzi@mfbproject.co.za
 * Copyright zulucoda - mfbproject
 */
import storiesService from '../services/stories.service'
import _ from 'lodash'
import storyModule from '../modules/story.module'

let zulucodaScrumData = require('json-loader!./../../../public/data/zulucoda.scrum.data.json');

describe('Stories Service - Unit Test', ()=>{

  let http, service, actual, getStoriesForWallId, _storyModule, rootScope;

  getStoriesForWallId = _.filter(zulucodaScrumData.stories, (s) => { return s.wallId == 1});

  beforeEach(()=>{
    angular.mock.module(storiesService);
    angular.mock.module(storyModule);

    angular.mock.inject(($httpBackend, StoriesService, StoryModule, $rootScope)=>{
      http = $httpBackend;
      service = StoriesService;
      actual = null;
      _storyModule = StoryModule;
      rootScope = $rootScope;
    });

    http.expectGET('/data/zulucoda.scrum.data.json').respond(200, zulucodaScrumData);
    service.getAllByWallId(1).then((result)=>{
      actual = result;
    });
    http.flush();
  });

  it('should get data from service', () => {
    expect(actual).toEqual(getStoriesForWallId);
  });


  it('should add story to stories', ()=>{
    let story = _storyModule.story;
    story.name = 'some new wall name';
    story.assignedTo = 'some user';
    story.description = 'some description';
    story.estimate = 'some estimate';
    story.status = 'some status';
    story.wallId = 1;
    service.addOrEdit(story);
    service.getAllByWallId(1).then((result)=>{
      actual = result;
    });
    rootScope.$digest();
    expect(actual.length).toBe(20);
    expect(actual[19].id).toEqual(20);
  });

  it('should edit story to stories', ()=>{
    let story = getStoriesForWallId[0];
    story.name = 'edit some story name';
    service.addOrEdit(story);
    service.getAllByWallId(1).then((result)=>{
      actual = result;
    });
    rootScope.$digest();
    expect(actual.length).toBe(19);
    expect(actual[0].id).toEqual(1);
    expect(actual[0].name).toEqual('edit some story name');
  });

});