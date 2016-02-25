/**
 * This file has been created by Emanuel Slotwinski on 2016-02-25
 */
function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

