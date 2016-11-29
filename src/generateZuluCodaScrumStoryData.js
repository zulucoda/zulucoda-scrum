/**
 * Created by Muzikayise Flynn Buthelezi (zuluCoda) on 2016/11/29.
 * Copyright mfbproject.co.za - muzi@mfbproject.co.za
 * Copyright zulucoda - mfbproject
 */

function generateData(numOfStories, wallId, wallName, assignedTo, status, estimate) {
  console.log('[');
  for (var i = 0; i < numOfStories; i++) {
    var storyNum = i+1;
    console.log('story: {'+
      '"id":'+ storyNum +','+
      '"wallId":'+ wallId +','+
      '"name": "Add '+ wallName +' Items to number '+ storyNum +'",'+
      '"description": "'+ wallName +' Items description '+ storyNum +'",'+
      '"assignedTo": "'+ assignedTo +'",'+
      '"status": "'+ status +'",'+
      '"estimate": "'+ estimate +'"'+
  '}');

  }
  console.log(']')
}

generateData(3);