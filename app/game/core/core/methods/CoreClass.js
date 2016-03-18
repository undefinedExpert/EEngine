const config = function(method, cb){

  var index = classList.indexOf(method),
      classMethods = classList[index + 1];
  //run method
  classMethods.classConfiguration(cb);

};

export default{
  config
};
