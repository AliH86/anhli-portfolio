// Step 3 blockout: the geography is fixed; cameras compose the same place.
export const geography={
  house:{position:[-14,0,-8],size:[9,5.2,7]},
  music:{position:[11,0,5],size:[3.4,2.6,3]},
  desk:{position:[-3,0,13],size:[1.8,.8,.8]},
  greenhouse:{position:[17,0,-12],size:[6,3.1,4]},
  courtyard:{position:[0,0,0],radius:7},
  horizon:{z:[-120,-180],height:[12,20]},
};
export const cameras={
  garden:{position:[35,19,47],target:[0,1,-8],fov:43},
  music:{position:[19,4,15],target:[11,1.3,5],fov:44},
  shows:{position:[1,7,26],target:[0,1.4,0],fov:40},
  visual:{position:[27,5,1],target:[17,1.5,-12],fov:46},
  story:{position:[-6,4,-30],target:[-15,1.8,-48],fov:46},
  sky:{position:[-6,4,-30],target:[-15,18,-75],fov:46},
};
