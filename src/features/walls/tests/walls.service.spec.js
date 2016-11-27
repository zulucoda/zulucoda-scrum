/**
 * Created by Muzikayise Flynn Buthelezi (zuluCoda) on 2016/11/27.
 * Copyright mfbproject.co.za - muzi@mfbproject.co.za
 * Copyright zulucoda - mfbproject
 */
import wallsService from '../services/walls.service';
let zulucodaScrumData = require('json-loader!./../../../public/data/zulucoda.scrum.data.json');

describe('Walls Services - Unit Test', ()=>{

  let http, service, actual;

  beforeEach(() => {
    angular.mock.module(wallsService);
    angular.mock.inject(($httpBackend, _WallsService_) => {
      http = $httpBackend;
      service = _WallsService_;
      actual = null;
    })
  });

  it('should get data from service', () => {
    http.expectGET('/data/zulucoda.scrum.data.json').respond(200, zulucodaScrumData);
    service.getAll().then((result)=>{
      actual = result;
    });
    http.flush();
    expect(actual).toEqual(zulucodaScrumData.walls);
  });

});