
// adds an event listener to start the "startCloneTimer" once the document object model is loaded.
document.addEventListener('DOMContentLoaded', () => {
  startCloneTimer();               // ← start the 5‑second loop
});


// updatePoints takes the current points when "generate points" button is pressed on game.html
function updatePoints(){
    const displayedPoints = document.getElementById('points');
    const currentClones = document.getElementById('clones');
    //Read from the data attribute (always a string) and convert it to integer
    const current = Number(displayedPoints.dataset.points) || 0; // dataset.points → "0"
    const currentCloneCount = Number(currentClones.dataset.points) || 0;
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

let cloneTimerId = null;   // global so we can stop it later if we want

function startCloneTimer() {
  // Guard: don’t start two timers by accident
  if (cloneTimerId !== null) return;

  // Every 5 seconds we run the tick function
  cloneTimerId = setInterval(() => {
    const pointsEl = document.getElementById('points');
    const clonesEl = document.getElementById('clones');
  // ---- replace getNumber ----
    const currentPoints = Number(pointsEl.dataset.points) || 0;
    const currentClones = Number(clonesEl.dataset.points) || 0;

    // Add ONE point **per** clone you own
    const newPoints = currentPoints + currentClones;

    pointsEl.dataset.points = newPoints;
    pointsEl.innerHTML = newPoints 
  }, 5000);
}