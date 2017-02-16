import requests
from requests.auth import HTTPBasicAuth

user = 'xinyzhang9@gmail.com'
password = 'zxy17320'
r = requests.get('https://api.github.com/user', auth=HTTPBasicAuth(user, password))
print r