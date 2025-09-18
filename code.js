function updatePoints(){
  const displayedPoints = document.getElementById('points');

  //Read from the data attribute (always a string)
  const current = Number(displayedPoints.dataset.points) || 0; // dataset.points → "0"

  //Increment
  const newValue = current + 1;

  //Write back to both the attribute and the visible text
  displayedPoints.dataset.points = newValue;
  displayedPoints.innerHTML = newValue;
}

function buyClone(){
    const displayedPoints = document.getElementById('points');
    const displayedClones = document.getElementById('clones');
    //Read from the data attribute (always a string)
    const currentPoints = Number(displayedPoints.dataset.points) || 0; // dataset.points → "0"
    const currentClones = Number(displayedClones.dataset.points) || 0;
    //Decrement points to purchase a clone
    if (currentPoints >= 5){
        //points
        const newPointsValue = currentPoints - 5;
        //Write back to both the attribute and the visible text
        displayedPoints.dataset.points = newPointsValue;
        displayedPoints.innerHTML = newPointsValue;
        //clones
        const newCloneValue = currentClones + 1
        displayedClones.dataset.points = newCloneValue;
        displayedClones.innerHTML = newCloneValue;
    }else{
        displayedClones.innerHTML = "NEED 5 POINTS"
    }
}