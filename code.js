// updatePoints takes the current points when "generate points" button is pressed on game.html


function updatePoints(){
  const displayedPoints = document.getElementById('points');

  //Read from the data attribute (always a string) and convert it to integer
  const current = Number(displayedPoints.dataset.points) || 0; // dataset.points → "0"

  //Increment
  const newValue = current + 1;

  //Write back to both the attribute and the visible text in game.html
  displayedPoints.dataset.points = newValue; //Note: Dataset a clean, standards‑based way to attach custom data to DOM elements without polluting the DOM’s core attributes
  displayedPoints.innerHTML = newValue;
}

// buyClone checks to see if the current points is greater or equal to 5
function buyClone(){
    const displayedPoints = document.getElementById('points');
    const displayedClones = document.getElementById('clones');
    //Read from the data attribute (always a string) and convert or coerce it to an integer
    const currentPoints = Number(displayedPoints.dataset.points) || 0; // dataset.points → "0"
    const currentClones = Number(displayedClones.dataset.points) || 0;
    //Decrement points to purchase a clone
    if (currentPoints >= 5){
        //subtract current points and assign a new value
        const newPointsValue = currentPoints - 5; 
        //Write back to both the attribute and the visible text
        displayedPoints.dataset.points = newPointsValue;
        //Update game.html with new Points value
        displayedPoints.innerHTML = newPointsValue;
        //clones
        // increment current clone value and assign it to new const
        const newCloneValue = currentClones + 1
        //update dataset, specifically points with newCloneValue
        displayedClones.dataset.points = newCloneValue; //Note: Dataset a clean, standards‑based way to attach custom data to DOM elements without polluting the DOM’s core attributes
        //update game.html with new clone value
        displayedClones.innerHTML = newCloneValue;
    }else{
        // if not enough points, let the player know.
        displayedClones.innerHTML = "NEED 5 POINTS"
    }
}

// buyMarineClone checks to see if there are greater or equal to 4
function buyMarineClone(){
    // grab the current displayed clone value and assign it to const
    const displayedClones = document.getElementById('clones');
    // grab the current displayed marine clones value and assign it to const
    const displayedMarineClones = document.getElementById('marineClones');
    //Read from the data attribute (always a string)
    const currentClones = Number(displayedClones.dataset.points) || 0; //Note: Dataset a clean, standards‑based way to attach custom data to DOM elements without polluting the DOM’s core attributes
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