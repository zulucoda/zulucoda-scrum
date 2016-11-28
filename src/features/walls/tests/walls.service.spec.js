/**
 * Created by Muzikayise Flynn Buthelezi (zuluCoda) on 2016/11/27.
 * Copyright mfbproject.co.za - muzi@mfbproject.co.za
 * Copyright zulucoda - mfbproject
 */
import wallsService from '../services/walls.service';
import wallModule from '../modules/wall.module';

let zulucodaScrumData = require('json-loader!./../../../public/data/zulucoda.scrum.data.json');

describe('Walls Services - Unit Test', ()=>{

  let http, service, actual, _wallModule, rootScope;

  beforeEach(() => {
    angular.mock.module(wallsService);
    angular.mock.module(wallModule);
    angular.mock.inject(($httpBackend, WallsService, WallModule, $rootScope) => {
      http = $httpBackend;
      service = WallsService;
      actual = null;
      _wallModule = WallModule;
      rootScope = $rootScope;
    });

    http.expectGET('/data/zulucoda.scrum.data.json').respond(200, zulucodaScrumData);
    service.getAll().then((result)=>{
      actual = result;
    });
    http.flush();
  });

  it('should get data from service', () => {
    expect(actual).toEqual(zulucodaScrumData.walls);
  });

  it('should add wall to walls', ()=>{
    let wall = _wallModule.wall;
    wall.name = 'some wall name';
    service.add(wall);
    service.getAll().then((result)=>{
      actual = result;
    });
    rootScope.$digest();
    expect(actual.length).toBe(4);
    expect(actual[3].id).toEqual(4);
  });

});