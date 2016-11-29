/**
 * Created by Muzikayise Flynn Buthelezi (zuluCoda) on 2016/11/29.
 * Copyright mfbproject.co.za - muzi@mfbproject.co.za
 * Copyright zulucoda - mfbproject
 */
import storyModalModule from './../controllers/story.modal.controller'
import storyModule from './../modules/story.module'

describe('Stories Modal - Unit Test', ()=>{

  let controller, storyModal, uibModalInstance, _storyModule;

  beforeEach(()=>{
    angular.mock.module(storyModalModule);
    angular.mock.module(storyModule);
    angular.mock.inject(($controller, StoryModule)=>{
      controller = $controller;
      uibModalInstance = jasmine.createSpyObj('$uibModalInstance', ['dismiss', 'close']);
      _storyModule = StoryModule;
    });
  });

  function initialiseController () {
    storyModal = controller('StoryModalController', {
      $uibModalInstance: uibModalInstance
    });
  }

  describe('initialise controller', ()=>{

    it('should set storyModal.wall object when adding new wall', ()=>{
      initialiseController();
      expect(storyModal.story).toEqual(_storyModule.story);
    });
  });

  describe('controller methods', ()=>{
    beforeEach(()=>{
      initialiseController();
    });

    describe('storyModal.cancel', ()=>{
      it('should call uibModalInstance.dismiss', ()=>{
        storyModal.cancel();
        expect(uibModalInstance.dismiss).toHaveBeenCalledWith('cancel');
      });
    });

    describe('storyModal.add', ()=>{
      it('should call uibModalInstance.close', ()=>{
        storyModal.story.name = 'some new wall name';
        storyModal.story.assignedTo = 'some user';
        storyModal.story.description = 'some description';
        storyModal.story.estimate = 'some estimate';
        storyModal.story.status = 'some status';
        storyModal.story.wallId = 1;
        storyModal.add();
        expect(uibModalInstance.close).toHaveBeenCalledWith(storyModal.story);
      });

    });
  });

});