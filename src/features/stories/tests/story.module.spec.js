/**
 * Created by Muzikayise Flynn Buthelezi (zuluCoda) on 2016/11/29.
 * Copyright mfbproject.co.za - muzi@mfbproject.co.za
 * Copyright zulucoda - mfbproject
 */
import storyModule from '../modules/story.module'

describe('Story Module - Unit Test', ()=>{
  let _storyModule;
  beforeEach(()=>{
    angular.mock.module(storyModule);
    angular.mock.inject((StoryModule)=>{
      _storyModule = StoryModule;
    });
  });

  it('should have story.id', ()=>{
    expect(_storyModule.story.id).toBe(0);
  });

  it('should have story.wallId', ()=>{
    expect(_storyModule.story.wallId).toBe(0);
  });

  it('should have story.name', ()=>{
    expect(_storyModule.story.name).toBeNull();
  });

  it('should have story.description', ()=>{
    expect(_storyModule.story.description).toBeNull();
  });

  it('should have story.assignedTo', ()=>{
    expect(_storyModule.story.assignedTo).toBeNull();
  });

  it('should have story.status', ()=>{
    expect(_storyModule.story.status).toEqual('backlog');
  });

  it('should have story.estimate', ()=>{
    expect(_storyModule.story.estimate).toEqual('medium');
  });

});