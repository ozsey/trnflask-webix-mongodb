from requests import get

result = get ("http://localhost:5000").json()
print (result)