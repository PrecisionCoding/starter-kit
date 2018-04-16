//Unobtrusive validation in Chrome won't validate with dd/mm/yyyy
//http://stackoverflow.com/questions/6906725/unobtrusive-validation-in-chrome-wont-validate-with-dd-mm-yyyy
jQuery.validator.methods["date"] = function (value, element) { return true; }