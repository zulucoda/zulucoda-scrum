/**
 * Created by Muzikayise Flynn Buthelezi (zuluCoda) on 2016/11/27.
 * Copyright mfbproject.co.za - muzi@mfbproject.co.za
 * Copyright zulucoda - mfbproject
 */
import wallsModalModule from './../controllers/walls.modal.controller';

describe('Walls Modal - Unit Test', ()=>{

  let controller, wallModal, uibModalInstance;

  beforeEach(()=>{
    angular.mock.module(wallsModalModule);
    angular.mock.inject(($controller)=>{
      controller = $controller;
      uibModalInstance = jasmine.createSpyObj('$uibModalInstance', ['dismiss']);
    });
  });

  function initialiseController () {
    wallModal = controller('WallsModalController', {
      $uibModalInstance: uibModalInstance
    });
  }

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
  });

});