/**
 * Created by Muzikayise Flynn Buthelezi (zuluCoda) on 2016/11/29.
 * Copyright mfbproject.co.za - muzi@mfbproject.co.za
 * Copyright zulucoda - mfbproject
 */
import storiesService from '../services/stories.service'

let zulucodaScrumData = require('json-loader!./../../../public/data/zulucoda.scrum.data.json');

describe('Stories Service - Unit Test', ()=>{

  let http, service, actual;

  beforeEach(()=>{
    angular.mock.module(storiesService);

    angular.mock.inject(($httpBackend, StoriesService)=>{
      http = $httpBackend;
      service = StoriesService;
      actual = null;
    });

    http.expectGET('/data/zulucoda.scrum.data.json').respond(200, zulucodaScrumData);
    service.getAll().then((result)=>{
      actual = result;
    });
    http.flush();
  });

  it('should get data from service', () => {
    expect(actual).toEqual(zulucodaScrumData.stories);
  });

});