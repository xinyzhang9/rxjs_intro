# import requests
# from requests.auth import HTTPBasicAuth
import urllib2, base64
FormFreeBaseUri = "https://api.accountchek.net"
VodFinancialInstitutionsUri = "/api/FinancialInstitution/List"
url = FormFreeBaseUri+VodFinancialInstitutionsUri

username = "jennifer.arnold@midamericamortgage.com"
password = "Mam123"

# r = requests.get(FormFreeBaseUri+VodFinancialInstitutionsUri,auth=HTTPBasicAuth(username,password))
# print r

# import requests
# resp = requests.post(FormFreeBaseUri+VodFinancialInstitutionsUri,data={},auth=(username,password))
# print resp



request = urllib2.Request(url)
base64string = base64.b64encode('%s:%s' % (username, password))
request.add_header("Authorization", "Basic %s" % base64string)   
result = urllib2.urlopen(request)
