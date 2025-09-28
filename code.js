//Chad Verbus
//09/19/2025
// Firstpass,refactoring in the future; Duplicate statments etc.
// v0.0.1 alizan
// Using defer via game.html; Lazy loading; Core game loop; Add

//global vars (accessible by every function)
let cloneTimerId = null;
let messageUpdateTick = null;
let repairTick = null;
let totalManualActions = null;
let aCurrentFactoryDamage = null;
let currentMessage = null;
let prevMessage = null;

// adds an event listener to start the "startCloneTimer" once the document object model is loaded.
document.addEventListener('DOMContentLoaded', () => {
  startTickTimer();               // ← start the 5‑second loop for game tick
  startMessageUpdateTick();
  startRepairTick();
  postMessage("Game starting... May the clone gods be with you!"); //Prints a message to the player.
});

// tick timer, every 5 seconds tick
function startTickTimer() {
    // Guard: don’t start two timers by accident
    if (cloneTimerId !== null) return;
    postMessage("Tick Timer Started");
    // Every 5 seconds we run the tick function
    cloneTimerId = setInterval(() => {
        recalcPoints();
        recalcDefensePoints();
    }, 5000);
}

// message update function; ever half second, update messages and others; need to refactor
function startMessageUpdateTick(){
    if (messageUpdateTick !== null) return;
    messageUpdateTick = setInterval(() => {
        if (currentMessage != null && currentMessage != prevMessage){
            postMessage(currentMessage);
            prevMessage = currentMessage;
        }
        updateTotalActions();
        spawnEnemies();
        calcEndGame();
    }, 500 )
}

// This starts a timer for 25 seconds; Then calls calcFactoryRepair;
function startRepairTick(){
    if (repairTick !== null) return; //tick already started
    repairUpdateTick = setInterval(() => {
        calcFactoryRepair();
    }, 25000)
}

// func to post text via .innerHTML to the message center;
function postMessage(aMessage){
    if (aMessage != null){
        currentMessage = aMessage;
        const displayedGameMessage = document.getElementById("currentGameMessages");
        displayedGameMessage.dataset.message = currentMessage;
        displayedGameMessage.innerHTML = currentMessage;
    }
}

// updates total actions the global game.html;
function updateTotalActions(){
    const displayedTotalActions = document.getElementById("totalActions");
    displayedTotalActions.innerHTML = totalManualActions;
}

// updatePoints takes the current points when "generate points" button is pressed on game.html;
function updatePoints(){
    totalManualActions += 1;
    aCurrentFactoryDamage += 1;
    const displayedFactoryDamagePoints = document.getElementById("factoryDamagePoints");
    const displayedBuildPoints = document.getElementById('buildPoints');
    // Read from the data attribute (always a string) and convert it to integer
    const currentBuildPoints = Number(displayedBuildPoints.dataset.points) || 0; // dataset.points → "0"
    const currentFactoryDamagePoints = Number(displayedFactoryDamagePoints.dataset.points) || 0;
    // Increment 
    const newBuildPointsValue = currentBuildPoints + 1;
    const newFactoryDamagePointsValue = aCurrentFactoryDamage;
    // Write back to both the attribute and the visible text in game.html
    displayedFactoryDamagePoints.dataset.points = newFactoryDamagePointsValue;
    displayedFactoryDamagePoints.innerHTML = newFactoryDamagePointsValue;
    displayedBuildPoints.dataset.points = newBuildPointsValue; //Note: Dataset a clean, standards‑based way to attach custom data to DOM elements without polluting the DOM’s core attributes
    displayedBuildPoints.innerHTML = newBuildPointsValue;
}

// buyClone checks to see if the current points is greater or equal to 5;
function buyBuildClone(){
    const displayedPoints = document.getElementById('buildPoints');
    const displayedBuildClones = document.getElementById('buildClones');
    //Read from the data attribute (always a string) and convert or coerce it to an integer
    const currentBuildPoints = Number(displayedPoints.dataset.points) || 0; // dataset.points → "0"
    const currentBuildClones = Number(displayedBuildClones.dataset.points) || 0;
    //Decrement points to purchase a clone
    if (currentBuildPoints >= 5){
        totalManualActions += 1;
        aCurrentFactoryDamage += 10;
        const newFactoryDamagePointsValue = aCurrentFactoryDamage;
        const displayedFactoryDamagePoints = document.getElementById("factoryDamagePoints");
        //Write back to both the attribute and the visible text in game.html
        displayedFactoryDamagePoints.dataset.points = newFactoryDamagePointsValue;
        displayedFactoryDamagePoints.innerHTML = newFactoryDamagePointsValue;        
        //subtract current points and assign a new value
        const newBuildPointsValue = currentBuildPoints - 5; 
        //Write back to both the attribute and the visible text
        displayedPoints.dataset.points = newBuildPointsValue;
        //Update game.html with new Points value
        displayedPoints.innerHTML = newBuildPointsValue;
        //clones
        // increment current clone value and assign it to new const
        const newCloneValue = currentBuildClones + 1
        //update dataset, specifically points with newCloneValue
        displayedBuildClones.dataset.points = newCloneValue; //Note: Dataset a clean, standards‑based way to attach custom data to DOM elements without polluting the DOM’s core attributes
        //update game.html with new clone value
        displayedBuildClones.innerHTML = newCloneValue;
        postMessage("1 Build Clone purchased, consumed 5 Build Points");
    }else{
        // if not enough points, let the player know.
        postMessage("NEED 5 POINTS to BUY a Build Clone");
    }
}

// buyMarineClone checks to see if there are greater or equal to 4;
function buyMarineClone(){ 
    // grab the current displayed clone value and assign it to const
    const displayedBuildClones = document.getElementById('buildClones');
    // grab the current displayed marine clones value and assign it to const
    const displayedMarineClones = document.getElementById('marineClones');
    //Read from the data attribute (always a string)
    const currentBuildClones = Number(displayedBuildClones.dataset.points) || 0; //Note: Dataset a clean, standards‑based way to attach custom data to DOM elements without polluting the DOM’s core attributes
    const currentMarineClones = Number(displayedMarineClones.dataset.points) || 0; 
    //Decrement points to purchase a clone
    if (currentBuildClones >= 4){
        totalManualActions += 1;
        aCurrentFactoryDamage += 20;
        const newFactoryDamagePointsValue = aCurrentFactoryDamage;
        const displayedFactoryDamagePoints = document.getElementById("factoryDamagePoints");
        //Write back to both the attribute and the visible text in game.html
        displayedFactoryDamagePoints.dataset.points = newFactoryDamagePointsValue;
        displayedFactoryDamagePoints.innerHTML = newFactoryDamagePointsValue;           
        //clones
        const newBuildCloneValue = currentBuildClones - 4;
        //Write back to both the attribute and the visible text
        displayedBuildClones.dataset.points = newBuildCloneValue;
        displayedBuildClones.innerHTML = newBuildCloneValue;
        //marineClones
        const newMarineCloneValue = currentMarineClones + 1;
        displayedMarineClones.dataset.points = newMarineCloneValue;
        displayedMarineClones.innerHTML = newMarineCloneValue;
        postMessage("1 Marine clone purchased, consumed 4 Build Clones");
    }else{
        postMessage("NEED 4 Build Clones to purchase Marine clone.");
    }
}

function buyRepairClone(){
    const displayedBuildPoints = document.getElementById('buildPoints');
    const displayedBuildClones = document.getElementById('buildClones');
    const displayedMarineClones = document.getElementById('marineClones');
    const displayedRepairClones = document.getElementById('repairClones');
    const currentBuildPoints = Number(displayedBuildPoints.dataset.points) || 0;
    const currentBuildClones = Number(displayedBuildClones.dataset.points) || 0; //Note: Dataset a clean, standards‑based way to attach custom data to DOM elements without polluting the DOM’s core attributes
    const currentMarineClones = Number(displayedMarineClones.dataset.points) || 0;
    const currentRepairClones = Number(displayedRepairClones.dataset.points) || 0;
    if (currentBuildClones >= 2 && currentMarineClones >= 1 && currentBuildPoints >= 100){
        totalManualActions += 1;
        aCurrentFactoryDamage += 30;
        const newFactoryDamagePointsValue = aCurrentFactoryDamage;
        const displayedFactoryDamagePoints = document.getElementById("factoryDamagePoints");
        //Write back to both the attribute and the visible text in game.html
        displayedFactoryDamagePoints.dataset.points = newFactoryDamagePointsValue;
        displayedFactoryDamagePoints.innerHTML = newFactoryDamagePointsValue;      
        const newBuildPointsValue = currentBuildPoints - 100;
        const newBuildClonesValue = currentBuildClones - 2;
        const newMarineClonesValue = currentMarineClones - 1;
        const newRepairClonesValue = currentRepairClones + 1;
        displayedBuildPoints.dataset.points = newBuildPointsValue;
        displayedBuildPoints.innerHTML = newBuildPointsValue;
        displayedBuildClones.dataset.points = newBuildClonesValue;
        displayedBuildClones.innerHTML = newBuildClonesValue;
        displayedMarineClones.dataset.points = newMarineClonesValue;
        displayedMarineClones.innerHTML = newMarineClonesValue;
        displayedRepairClones.dataset.points = newRepairClonesValue;
        displayedRepairClones.innerHTML = newRepairClonesValue;
        postMessage("1 Repair clone built, consumed 2 build clones, 1 marine clone and 100 buildpoints");
    }else{
        postMessage("NEED 2 build clones, 1 marine clones and 100 build points");
    }
}

// placeholder function; WIP will be a Enemy controller.
function spawnEnemies(){
    const currentActions = totalManualActions;
    switch (currentActions) {
        case 100:
            postMessage("Enemies approach!!");
            enemiesAttack(1);
            break;
        case 200:
            postMessage("Enemies approach!!");
            enemiesAttack(2);
            break;
        case 300:
            postMessage("Enemies approach!!");
            enemiesAttack(3);
            break;
        case 500:
            postMessage("Enemies approach!!");
            enemiesAttack(4);
            break;
        case 750:
            postMessage("Enemies approach!!");
            enemiesAttack(5);
            break;
        case 1000:
            postMessage("Enemies approach!!");
            enemiesAttack(6);
            break;
        default:
            break;
    }
}

// Supporting place holder funciton for a battle director; 
function enemiesAttack(aType){
    switch (aType) {
        case 1:
            attackFactory(50);
            break;
        case 2:
            attackFactory(100);
            break;
        case 3:
            attackFactory(200);
            break;
        case 4:
            attackFactory(400);
            break;
        case 5:
            attackFactory(600);
            break;
        case 6:
            attackFactory(1000);
            break;
        default:
            break;
    }
}

// placeholder function to simulate a battle; WIP.
function attackFactory(enemies){
    const displayedFactoryDamagePoints = document.getElementById("factoryDamagePoints");
    const displayedDefensivePoints = document.getElementById('defensePoints');
    const currentFactoryDamagePointsValue = Number(displayedFactoryDamagePoints.dataset.points) || 0;  
    const currentDefensivePointsValue = Number(displayedDefensivePoints.dataset.points) || 0;
    const newDamage = enemies - currentDefensivePointsValue;
    const newFactoryDamagePointsValue = currentFactoryDamagePointsValue + newDamage
    displayedFactoryDamagePoints.dataset.points = newFactoryDamagePointsValue;
    displayedFactoryDamagePoints.innerHTML = newFactoryDamagePointsValue;
    postMessage('Your Factory took ' + newDamage + ' Damage from enemies!!')
}

function recalcPoints(){
    const displayedBuildPoints = document.getElementById('buildPoints');
    const displayedBuildClones = document.getElementById('buildClones');
  // ---- coerce string to int----
    const currentBuildPoints = Number(displayedBuildPoints.dataset.points) || 0;
    const currentBuildClones = Number(displayedBuildClones.dataset.points) || 0;

    // Add ONE point **per** clone owned
    const newPoints = currentBuildPoints + currentBuildClones;
    displayedBuildPoints.dataset.points = newPoints;
    displayedBuildPoints.innerHTML = newPoints;
}

function recalcDefensePoints(){
    // Defense points are equal to the amount of marine clones present at the factory.
    const displayedDefensePoints = document.getElementById('defensePoints');
    const displayedMarineClones = document.getElementById('marineClones');
    // ---- coerce string to int ----
    const currentMarineClones = Number(displayedMarineClones.dataset.points) || 0;
    // Add ONE point **per** clone you own
    const newDefensePoints = currentMarineClones * 5;
    displayedDefensePoints.dataset.points = newDefensePoints;
    displayedDefensePoints.innerHTML = newDefensePoints;
}

function calcFactoryRepair(){
    const displayedFactoryDamage = document.getElementById("factoryDamagePoints");
    const displayedRepairClones = document.getElementById("repairClones");
    const currentFactoryDamagePoints = Number(displayedFactoryDamage.dataset.points) || 0;
    const currentRepairClonesPoints = Number(displayedRepairClones.dataset.points) || 0;
    if (currentFactoryDamagePoints > 0 && currentRepairClonesPoints >= 1){
        aCurrentFactoryDamage = currentFactoryDamagePoints - 1000;
        if (aCurrentFactoryDamage < 0){
            aCurrentFactoryDamage = 0;
        }
        //define and wrtie to our values to innerHTML.
        const newRepairClonesPoints = currentRepairClonesPoints - 1;
        displayedFactoryDamage.dataset.points = aCurrentFactoryDamage;
        displayedFactoryDamage.innerHTML = aCurrentFactoryDamage;
        displayedRepairClones.dataset.points = newRepairClonesPoints;
        displayedRepairClones.innerHTML = newRepairClonesPoints;
        postMessage("Repaired 1000 Damage!, consumed 1 Repair Clone");
    }
}

// checks for end game state, if currentFactoryDamageValue is greater or equal to 2k show end game animation.
function calcEndGame(){
    const displayedFactoryDamage = document.getElementById("factoryDamagePoints");
    const currentFactoryDamageValue = Number(displayedFactoryDamage.dataset.points) || 0; // coerce string to int.
    if (currentFactoryDamageValue >= 2000){
        postMessage("GAME OVER, YOU LOSE!");
        showEndGameOverlay();
    }
}

function showEndGameOverlay() {
    /* -- Grab the overlay – we accept both the correct ID and the old typo.-- */
    const overlay = document.querySelector('#endGameOverlay, #endGameOVerlay');
    if (!overlay) {
        console.error('End-game overlay element not found');
        return;
    }

    /* -- (inline style from the original markup would otherwise win.) -- */
    overlay.style.visibility = 'visible';
    overlay.style.opacity    = '1';

    /* -----------------------------------------------------------------
       3️⃣ Add the animation helper classes.
       ----------------------------------------------------------------- */
    overlay.classList.add('eg-show');               // fade‑in wrapper

    const flash = overlay.querySelector('.loadEndGame');
    if (flash) flash.classList.add('eg-flash');    // background flash

    const txt = overlay.querySelector('.gameover');
    if (txt) {
        txt.classList.add('eg-pulse');
        txt.classList.add('eg-shake');
    }

    /* -----------------------------------------------------------------
       4️⃣ After the longest animation (≈2 s) clean up and reset the game.
       ----------------------------------------------------------------- */
    const CLEANUP_TIME = 2000; // ms – matches the flash + shake length
    setTimeout(() => {
        // remove the helper classes so we can show the overlay again later
        overlay.classList.remove('eg-show');
        flash && flash.classList.remove('eg-flash');
        txt && txt.classList.remove('eg-pulse', 'eg-shake');

        // hide it again (visibility:hidden) – ready for the next play‑through
        overlay.style.visibility = 'hidden';
        overlay.style.opacity    = '0';

        // ----> YOUR ORIGINAL reset routine <----
        resetGame();
    }, CLEANUP_TIME);

    // After the animation finishes (≈2 s) hide the overlay and reset the game
    const totalDuration = 2000; // ms – matches the longest animation (flash + shake)
    setTimeout(() => {
        // clean up classes so we can show it again later
        overlay.classList.remove('eg-show');
        if (flash) flash.classList.remove('eg-flash');
        if (txt) {
            txt.classList.remove('eg-pulse');
            txt.classList.remove('eg-shake');
        }
        // hide again (visibility:hidden) – ready for next round
        overlay.style.visibility = 'hidden';

        // Call reset func
        
    }, totalDuration); //define timeout duration;
    resetGame();
}

// resets game; sets the page to its default state.
function resetGame(){
    cloneTimerId = null;
    messageUpdateTick = null;
    repairTick = null;
    totalManualActions = 0;
    aCurrentFactoryDamage = 0;
    currentMessage = 0;
    prevMessage = 0;
    const displayedFactoryDamagePoints = document.getElementById("factoryDamagePoints");
    const displayedBuildPoints = document.getElementById('buildPoints');
    const displayedBuildClones = document.getElementById('buildClones');
    const displayedMarineClones = document.getElementById('marineClones');
    const displayedRepairClones = document.getElementById('repairClones');
    displayedFactoryDamagePoints.dataset.points = 0;
    displayedFactoryDamagePoints.innerHTML = "0"
    displayedBuildPoints.dataset.points = 0;
    displayedBuildPoints.innerHTML = "0"
    displayedBuildClones.dataset.points = 0;
    displayedBuildClones.innerHTML = "0"
    displayedMarineClones.dataset.points = 0;
    displayedMarineClones.innerHTML = "0"
    displayedRepairClones.dataset.points = 0;
    displayedRepairClones.innerHTML = "0"
}