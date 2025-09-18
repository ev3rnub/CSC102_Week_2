// updatePoints takes the current points when "generate points" button is pressed on game.html


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

// buyClone checks to see if the current points is greater or equal to 5
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

// buyMarineClone checks to see if there are greater or equal to 4
function buyMarineClone(){
    const displayedClones = document.getElementById('clones');
    const displayedMarineClones = document.getElementById('marineClones');
    //Read from the data attribute (always a string)
    const currentClones = Number(displayedClones.dataset.points) || 0;
    const currentMarineClones = Number(displayedMarineClones.dataset.points) || 0;
    //Decrement points to purchase a clone
    if (currentClones >= 4){
        //clones
        const newCloneValue = currentClones - 4;
        //Write back to both the attribute and the visible text
        displayedClones.dataset.points = newCloneValue;
        displayedClones.innerHTML = newCloneValue;
        //marineClones
        const newMarineCloneValue = currentMarineClones + 1
        displayedMarineClones.dataset.points = newMarineCloneValue;
        displayedMarineClones.innerHTML = newMarineCloneValue;
    }else{
        displayedMarineClones.innerHTML = "NEED 4 Clones"
    }
}