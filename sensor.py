
from flask import Flask
import requests
from flask_cors import CORS

app = Flask(__name__)

CORS(app, resources={r'/*': {'origins': '*'}})


@app.route('/getData')
def hello_world():
    url = "http://center.koamise.com/msg/recent/100000006a1aa27d"
    headers = {'serviceKey':'d495777b-b67e-4198-8881-fa5207b13136 '}
    rs = requests.get(url=url,headers=headers,verify = False)

    rs_code = rs.status_code 

    if int(rs_code) == 200: 
        rs_text = rs.text 
        data = (rs_text) 
    else : 
        data = (rs_code)
    
    return data

if __name__ == "__main__":
    app.run()

