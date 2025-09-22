// Chad Verbus
// CSC102

document.addEventListener('DOMContentLoaded', () => {
    const overlay   = document.getElementById('loadingOverlay');
    const mainView  = document.querySelector('.mainView');

// Get the duration (seconds) from the markup; fall back to 3 s.
    const seconds   = 1.5;
    const timeoutMs = seconds * 1000;

// Helper – actually perform the hide/fade and then reveal the game.
    const hideOverlay = () => {
        if (!overlay) return;                     // safety

        // Start the CSS fade (opacity transition is defined in loading.css)
        overlay.style.opacity = '0';

        // When the transition finishes, remove the overlay element
        // and make the main view visible.
        const onFadeEnd = (e) => {
            if (e.propertyName !== 'opacity') return;
            overlay.removeEventListener('transitionend', onFadeEnd);
            overlay.remove();
            if (mainView) {
                mainView.style.visibility = 'visible';
            }
        };
        overlay.addEventListener('transitionend', onFadeEnd);
    };

// Start a timer that will call hideOverlay after the desired time.
    const timerId = setTimeout(hideOverlay, timeoutMs);
// If the browser fires the window “load” event before the timer,
//     cancel the timer and hide the overlay immediately.
    // window.addEventListener('load', () => {
    //     clearTimeout(timerId);
    //     hideOverlay();
    // });
});