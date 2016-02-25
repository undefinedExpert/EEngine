/**
  * @desc Placing camera into scene
  * @function camera
 * @param {object} position - set initial position of the camera
 * @param {number} fov - camera Field of View value
  * @return bool - camera object
 */
//TODO: interaction comment
function click(button, fn) {
  //Interaction with square button
  button.addEventListener('click', () => {
    fn();
  });

  return button;
}

export default click;