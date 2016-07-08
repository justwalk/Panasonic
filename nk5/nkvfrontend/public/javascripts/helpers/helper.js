Helpers = {};

Helpers.capitalize = function(string) {
  if(typeof string === 'string'){
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return '';
};

Helpers.truncate = function(string, number) {
  if(typeof number != 'number'){
    number = 15;
  }
  if(typeof string === 'string'){
    return string.substring(0, number);
  }
  return '';
};