/**
 * Created by Muzikayise Flynn Buthelezi (zuluCoda) on 2016/11/29.
 * Copyright mfbproject.co.za - muzi@mfbproject.co.za
 * Copyright zulucoda - mfbproject
 */

function generateData(startCount, numOfStories, wallId, wallName, assignedTo, status, estimate) {
  for (var i = startCount; i < numOfStories; i++) {
    var storyNum = i+1;
    console.log('{'+
      '"id":'+ storyNum +','+
      '"wallId":'+ wallId +','+
      '"name": "Add '+ wallName +' Items to number '+ storyNum +'",'+
      '"description": "'+ wallName +' Items description '+ storyNum +'",'+
      '"assignedTo": "'+ assignedTo +'",'+
      '"status": "'+ status +'",'+
      '"estimate": "'+ estimate +'"'+
  '},');
  }
}

generateData(0,5, 1, 'JHB CDB Travel Project', 'Joe the Product owner', 'backlog', 'large');
generateData(5,10, 1, 'JHB CDB Travel Project', 'Mandy the Designer', 'todo', 'large');
generateData(10,14, 1, 'JHB CDB Travel Project', 'Mandy the Designer', 'in_progress', 'small');
generateData(14,19, 1, 'JHB CDB Travel Project', 'Roger the QA', 'in_progress', 'medium');

generateData(0,8, 2, 'Jozzi Map Project', 'Joe the Product owner', 'backlog', 'large');
generateData(8,10, 2, 'Jozzi Map Project', 'Andrew the BA', 'todo', 'large');
generateData(10,12, 2, 'Jozzi Map Project', 'David the Developer', 'in_progress', 'small');
generateData(12,14, 2, 'Jozzi Map Project', 'Roger the QA', 'done', 'medium');

generateData(0,10, 3, 'Joburg Taxi Racing Game Project', 'Andrew the BA', 'backlog', 'medium');