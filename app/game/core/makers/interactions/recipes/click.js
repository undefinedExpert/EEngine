/**
  * @desc Placing interaction to a button
  * @function click
 * @param {object} button - what button gonna have action
 * @param {number} fn - callback fn, for an event what's going to happen whenever the interaction will shown
  * @return object - button with a event listener
 */
function click(button, fn) {
  button.addEventListener('click', () => {
    fn();
  });

  return button;
}

export default click;