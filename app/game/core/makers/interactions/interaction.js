import click from './recipes/click';

/**
   * @desc Adding interactions to elements
   * @class Interaction
 */
class Interaction {

  constructor() {}

  /**
     * @desc Creating click event
     * @function click()
     * @return click interaction
     * @param {object} button - DOM Button
     * @param {function} fn - function which run on click
   */
  click(button, fn){
    return click(button, fn);
  }
}

let interaction = new Interaction();

export default interaction;
