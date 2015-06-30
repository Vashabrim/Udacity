var bio = {
	name: "Doug Stubbs",
	role: "Web Developer",
	contacts:{
		mobile: "515-491-9020",
		email: "stubbs.doug@gmail.com",
		github: "vashabrim",
		twitter: "@1TrueDAS",
		location: "Des Moines"
	},
	welcomeMessage: "An experienced IT professional with proven skills in web development, desktop support, and helpdesk. Self-starter with a passion to initiate action through concise communication and collaboration within a team environment. A non-stop learner.",
	skills: ["HTML5", "CSS","Bootstrap","JavaScript","Java","Python","Powershell","Adobe Creative Suite","Active Directory","GitHub version control","Microsoft Office Suite","Microsoft Exchange","Microsoft Sharepoint","Microsoft Visual Studio","Microsoft Windows 7,8, and 10"],
	bioPic:"images/fry.jpg"
};

var formattedName = HTMLheaderName.replace("%data%", bio.name);
var formattedRole = HTMLheaderRole.replace("%data%", bio.role);

$("#header").prepend(formattedRole);
$("#header").prepend(formattedName);

var formattedMobile = HTMLmobile.replace("%data%", bio.contacts.mobile);
$("#topContacts").append(formattedMobile);

var formattedemail = HTMLemail.replace("%data%", bio.contacts.email);
$("#topContacts").append(formattedemail);

var formattedgithub = HTMLgithub.replace("%data%", bio.contacts.github);
$("#topContacts").append(formattedgithub);

var formattedTwitter = HTMLtwitter.replace("%data%", bio.contacts.twitter);
$("#topContacts").append(formattedTwitter);

var formattedLocation = HTMLlocation.replace("%data%", bio.contacts.location);
$("#topContacts").append(formattedLocation);

var formattedbioPic = HTMLbioPic.replace("%data%", bio.bioPic);
$("#header").append(formattedbioPic);

var formattedMsg = HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage);
$("#header").append(formattedMsg);

var work = {
	"jobs": [
	{
		employer:"Nationwide Insurance",
		title:"Senior Analyst",
		location:"Des Moines, IA",
		dates:"2011-",
		description:"Primary responsibilities included desktop support, as well as support of corporate customer base. Enhanced team engagement by creating a web based activity for use after staff meetings. The project increased engagement, as well as attention and focus for the team during meetings"
	},
	{
		employer:"TEKSystems",
		title:"Contractor",
		location:"Des Moines, IA",
		dates:"2000-2005, 2010-2011",
		description:"Contractor for various companies around Des Moines, including Iowa Methodist Hospital, Farm Bureau Insurance, and Nationwide Insurance"
	},
	{
		employer:"Kelly IT Services",
		title:"Contractor",
		location:"Des Moines, IA",
		dates:"2009-2010",
		description:"Quality assurance position at Pioneer Hi-Bred for a new field sales system software, then moved to technical support for users in the field after use. Problem-solved software issues with developers and field users."
	},
	{
		employer:"Principal Financial Group",
		title:"Helpdesk Technician",
		location:"Des Moines, IA",
		dates:"2005-2009",
		description:"Resolved help desk calls and incident tickets and provided excellent customer service in a second-level support role. I was a lead for the department in OS migration, mobile devices including BlackBerry, Microsoft Exchange, and Active Director management"
	}
	]
};

work.display = function() {
	work.jobs.forEach(function (job){
		$("#workExperience").append(HTMLworkStart);
		var formattedEmployer = HTMLworkEmployer.replace("%data%", job.employer);
		var formattedTitle = HTMLworkTitle.replace("%data%", work.jobs[job].title);
		var formattedDates = HTMLworkDates.replace("%data%", work.jobs[job].dates);
		var formattedDescription = HTMLworkDescription.replace("%data%", work.jobs[job].description);
		var formattedEmployerTitle = formattedEmployer + formattedTitle;
		$(".work-entry:last").append(formattedEmployerTitle);
		$(".work-entry:last").append(formattedDates);
		$(".work-entry:last").append(formattedDescription);

	})
}
/* function displayWork(){
 for (job in work.jobs){
 	$("#workExperience").append(HTMLworkStart);
 	var formattedEmployer = HTMLworkEmployer.replace("%data%", work.jobs[job].employer);
 	var formattedTitle = HTMLworkTitle.replace("%data%", work.jobs[job].title);
 	
 	var formattedEmployerTitle = formattedEmployer + formattedTitle;
 	$(".work-entry:last").append(formattedEmployerTitle);
 	
 	var formattedDates = HTMLworkDates.replace("%data%", work.jobs[job].dates);
 	$(".work-entry:last").append(formattedDates);

 	var formattedDescription = HTMLworkDescription.replace("%data%", work.jobs[job].description);
 	$(".work-entry:last").append(formattedDescription);
 }
}
displayWork();
*/


var education = {
    schools: [
        {
            name: "Marshalltown Community College",
            city: "Marshalltown, IA",
            degree: "Associates",
            major: ["General Studies"],
            dates: "1996",
            url:"http://www.iavalley.edu/mcc/"
        },
        {
            name: "Des Moines Area Community College",
            city: "Des Moines, IA",
            degree: "Web Development certificate- Incomplete",
            major: ["Web Development certificate"],
            dates:"2014",
            url:"http://www.dmacc.edu"
        }
        ],
        onlineCourses: [
        {
        	title: "Front End Web Developer Nanodegree",
        	school:"Udacity",
        	dates:"2015",
        	url:"http://www.udacity.com"
        }]
};

var projects = {
	projects: [
	{
		title:"HDI Iowa website",
		dates:"2010-",
		description:"I maintain and update the website for the HDI chapter of Iowa",
		images:["images\capture.PNG"]
	}]
};

/*	name = (bio.name).trim().split(" ");
	name[1] = name[1].toUpperCase();
	name[0] = name[0].slice(0,1).toUpperCase() + name[0].slice(1).toLowerCase();
	return name[0] + " "+name[1];
}
$("#main").append(internationalizeButton)
*/
projects.display = function() {
	for (project in projects.projects){
		$("#projects").append(HTMLprojectStart);

		var formattedTitle = HTMLprojectTitle.replace("%data%", projects.projects[project].title);
		$(".project-entry:last").append(formattedTitle);

		var formattedDates = HTMLprojectDates.replace("%data%",projects.projects[project].dates);
		$(".project-entry:last").append(formattedDates);

		var formattedDescription = HTMLprojectDescription.replace("%data%", projects.projects[project].description);
		$(".project-entry:last").append(formattedDescription);

		if (projects.projects[project].images.length > 0) {
			for (image in projects.projects[project].images) {
				var formattedImage = HTMLprojectImage.replace("%data%", projects.projects[project].images[image]);
				$(".project-entry:last").append(formattedImage);
			}
		}
	}
}
/* function locationizer(work_obj) {
 	var locationArray = [];

 	for (job in work_obj.jobs) {
 		var newLocation = work_obj.jobs[job].location;
 		locationArray.push(newLocation);
 	}
 	return locationArray;
 }*/
//$("#eduation").append(education.schoools[name])

$("#mapDiv").append(googleMap);