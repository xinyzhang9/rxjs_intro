var FormFreeBaseUri = "https://api.accountchek.net";
var VodFinancialInstitutionsUri = "/api/FinancialInstitution/List";

var username = "jennifer.arnold@midamericamortgage.com";
var password = "Mam123"

function task(){
	$.ajax({
		type: 'GET',
		xhrFields: {
			withCredentials: true
		},
		dataType: 'jsonp',
		contentType: 'application/javascript',
		crossDomain: true,
        url: FormFreeBaseUri+VodFinancialInstitutionsUri,
       	beforeSend: function(xhr){
       		xhr.setRequestHeader('Authorization','Basic '+btoa(username+':'+password))
       	},
        success: function(data){
        	console.log(data);
        },
        error: function(error){
        	console.log(error);
        }

    })
}

task();
