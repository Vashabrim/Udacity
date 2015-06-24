var formattedName = HTMLheaderName.replace("%data%", "Doug Stubbs");

var role = "Web Developer";
var formattedRole = HTMLheaderRole.replace("%data%", role);

$("#header").prepend(formattedRole);
$("#header").prepend(formattedName);

var skills = ["Awesomeness", "Web Development", "Desktop Support"];
$("#main").append(skills);