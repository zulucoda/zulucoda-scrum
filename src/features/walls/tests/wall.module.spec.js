/**
 * Created by Muzikayise Flynn Buthelezi (zuluCoda) on 2016/11/27.
 * Copyright mfbproject.co.za - muzi@mfbproject.co.za
 * Copyright zulucoda - mfbproject
 */
import wallModule from './../modules/wall.module';

describe('Wall Module - Unit Test', ()=>{

  let _wallModule;

  beforeEach(()=>{
    angular.mock.module(wallModule);
    angular.mock.inject((WallModule)=>{
      _wallModule = WallModule;
    });
  });

  it('wall.name should be null by default', ()=>{
    expect(_wallModule.wall.name).toBeNull();
  });

  it('wall.id should be 0 by default', ()=>{
    expect(_wallModule.wall.id).toBe(0);
  });

  it('should set wall.name', ()=>{
    _wallModule.wall.name = 'some name';
    expect(_wallModule.wall.name).toEqual('some name');
  });

  it('should set wall.id', ()=>{
    _wallModule.wall.id = 999;
    expect(_wallModule.wall.id).toBe(999);
  });

});