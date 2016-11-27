/**
 * Created by Muzikayise Flynn Buthelezi (zuluCoda) on 2016/11/27.
 * Copyright mfbproject.co.za - muzi@mfbproject.co.za
 * Copyright zulucoda - mfbproject
 */
import wallsModalModule from './../controllers/walls.modal.controller';
import wallModule from './../modules/wall.module';

describe('Walls Modal - Unit Test', ()=>{

  let controller, wallModal, uibModalInstance, _wallModule;

  beforeEach(()=>{
    angular.mock.module(wallsModalModule);
    angular.mock.module(wallModule);
    angular.mock.inject(($controller, WallModule)=>{
      controller = $controller;
      uibModalInstance = jasmine.createSpyObj('$uibModalInstance', ['dismiss', 'close']);
      _wallModule = WallModule;
    });
  });

  function initialiseController () {
    wallModal = controller('WallsModalController', {
      $uibModalInstance: uibModalInstance
    });
  }

  describe('initialise controller', ()=>{

    it('should set wallModal.wall object when adding new wall', ()=>{
      initialiseController();
      expect(wallModal.wall).toEqual(_wallModule.wall);
    });
  });

  describe('controller methods', ()=>{
    beforeEach(()=>{
      initialiseController();
    });

    describe('wallModal.cancel', ()=>{
      it('should call uibModalInstance.dismiss', ()=>{
        wallModal.cancel();
        expect(uibModalInstance.dismiss).toHaveBeenCalledWith('cancel');
      });
    });

    describe('wallModal.add', ()=>{
      it('should call uibModalInstance.close', ()=>{
        wallModal.wall.name = 'some new wall name';
        wallModal.add();
        expect(uibModalInstance.close).toHaveBeenCalledWith(wallModal.wall);
      });

    });
  });

});