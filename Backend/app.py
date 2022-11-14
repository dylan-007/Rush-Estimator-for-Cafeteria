# Import libraries
from cgitb import reset
import datetime
from dis import dis
from statistics import mode
from prophet import Prophet 
import pickle
import json
from flask import Flask, jsonify, request
from csv import writer
import pandas as pd
import utils
from pymongo import MongoClient
import certifi
import boto3
import os
import csv
from flask_cors import CORS
from bson.objectid import ObjectId


#MONGODB ATLAS
cluster = MongoClient("mongodb+srv://dylan-007:dylan123@cluster0.fzf93ic.mongodb.net/?retryWrites=true&w=majority",tlsCAFile=certifi.where())
db = cluster["DB"]
Restaurents = db.restaurents
Dishes = db.dishes


#AWS S3
s3 = boto3.client('s3' , aws_access_key_id= "AKIAZRW76HU76ODLQKXQ",
   aws_secret_access_key= "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",
   region_name="ap-south-1")

bucketname = 'ibm-bucket1'



models = {
      "fb_prophet": utils.FBProphetPredictor  
}

app = Flask(__name__)
CORS(app)

#helpers
def getPreviousDay(date):
    today = datetime.date.fromisoformat(date)
    yesterday = today - datetime.timedelta(days=1)
    return yesterday.isoformat()

def getPercentDiff(num1, num2):
    return round((num2-num1)/num1 * 100,2)


@app.route('/',methods=['GET'])
def func():
    return '<h1>Hello</h1>'


@app.route('/register',methods=['POST'])
def registerUser():
    try:
        data = request.get_json()
        obj = Restaurents.find_one({'email': data['email']})
        if obj is None:
            obj = {
                'email': data['email'],
                'password': data['password'],
                'name': data['name'],
                'address': data['address'],
            }
            r_id = Restaurents.insert_one(obj).inserted_id
            
            restaurantID = str(r_id)

            #upload file
            filename1= 'starter.csv'
            filename2= 'starter.pckl'

            des_filename1 = restaurantID + '.csv'
            des_filename2 = restaurantID + '.pckl'

            s3.upload_file(filename1,bucketname,des_filename1)
            s3.upload_file(filename2,bucketname,des_filename2)


            return {
                'email': data['email'],
                'restaurent_id': str(r_id),
                'restaurent_name': data['name']
            }, 200
        return {'message': 'User Alredy Exist'}, 401
    except Exception as e:
        return {'message': 'Server Error' + str(e)}, 500



@app.route('/login',methods=['POST'])
def loginUser():
    try:
        data = request.get_json()
        obj = Restaurents.find_one({'email': data['email']})
        print("Restaurent : ",str(obj['_id']))

        if obj is None:
            return {'message': 'User doesn\'t exist.'}
        if obj['password'] == data['password']:
            return {
                'email': obj['email'],
                'restaurent_id': str(obj['_id']),
                'restaurent_name': obj['name']
            }, 200
        return {"message": 'Invalid credentials'}, 401
    except Exception as e:
        return {'message': 'Server Error' + str(e)}, 500
    


#Make prediction of 1 day
@app.route('/predict/day',methods=['POST'])
def predict_day():
    
    # Get the data from the POST request.
    data = request.get_json(force=True)
    restaurantID = data["restaurantID"]

    #Get pickle file of the restaurant 
    filename = restaurantID + '.pckl'

    try:
        s3.download_file(bucketname, filename, filename)
        model = models["fb_prophet"](filename)

    except:
        model = models["fb_prophet"]('starter.pckl')

    output = model.predictday(data['date'])
    prev = model.predictday(getPreviousDay(data['date']))

    x = {
    "prediction": output[0],
    "comment": getPercentDiff(prev[0], output[0])
    }

    #Delete the pickle file of the restaurant
    if os.path.exists(filename):
        os.remove(filename)

    # convert into JSON:
    y = json.dumps(x)

    return y


#Make prediction of 1 week
@app.route('/predict/week',methods=['POST'])
def predict_week():
    # Get the data from the POST request.
    data = request.get_json(force=True)
    restaurantID = data["restaurantID"]

    #Get pickle file of the restaurant 
    filename = restaurantID + '.pckl'


    try:
        s3.download_file(bucketname, filename, filename)
        model = models["fb_prophet"](filename)

    except:
        model = models["fb_prophet"]('starter.pckl')

    output = model.predictweek(data['date'])

    x = {
    "prediction": output
    }

    #Delete the pickle file of the restaurant
    if os.path.exists(filename):
        os.remove(filename)

    # convert into JSON:
    y = json.dumps(x)

    return y  


#Update Model with new data
@app.route('/updateModel',methods=['POST'])
def updateModel():     

    # Get the data from the POST request.
    data = request.get_json(force=True)

    date = data["date"]
    count = data["count"]
    restaurantID = data["restaurantID"]

    #download csv of restaurant

    #Get csv file of the restaurant 
    filename1 = restaurantID + '.csv'
    filename2 = restaurantID + '.pckl'

    model = models["fb_prophet"]('starter.pckl')

    found = False

    try:
        s3.download_file(bucketname, filename1, filename1)
        found = True

    except:
        found = False


    if found:
        #Update CSV with new data

        x = [1000,date, count]
        with open(filename1,'a+', newline='') as fd:
            writer = csv.writer(fd)
            writer.writerow(x)
            fd.close()


        #retrain the model
        df = pd.read_csv(filename1, index_col=0)

        prophet_model = Prophet()
    
        prophet_model.fit(df) #---> add custom seasonality and params for Prophet Model

        #Save the model
        with open(filename2, 'wb') as fout: 
            pickle.dump(prophet_model, fout)


        #delete existing csv and pckl files on s3
        s3.delete_object(Bucket=bucketname,Key= filename1)
        s3.delete_object(Bucket=bucketname,Key= filename2)

        #upload new csv and pckl
        s3.upload_file(filename1,bucketname,filename1)
        s3.upload_file(filename2,bucketname,filename2)

        #delete from server
        os.remove(filename1)
        os.remove(filename2)


    #Add new data to mongo DB atlas
    collection = db["footfall"]
    collection.insert_one({"restaurantID" : restaurantID, "date" : date , "count" : count})

    return "Success"




#chatbot post requests
#Make prediction of 1 day
@app.route('/predict-chatbot/day',methods=['POST'])
def predict_chatbot_day():
    
    # Get the data from the POST request.
    data = request.get_json(force=True)
    name = data['name']

    obj = Restaurents.find_one({'name': name})

    if obj is None:
        return {'message': 'Restaurant doesn\'t exist.'}

    restaurantID = str(obj['_id'])

    #Get pickle file of the restaurant 
    filename = restaurantID + '.pckl'


    try:
        s3.download_file(bucketname, filename, filename)
        model = models["fb_prophet"](filename)

    except:
        model = models["fb_prophet"]('starter.pckl')

    output = model.predictday(data['date'])


    #Delete the pickle file of the restaurant
    if os.path.exists(filename):
        os.remove(filename)

    # convert into JSON:
    y = json.dumps(output[0])

    return y


#Make prediction of 1 week
@app.route('/predict-chatbot/week',methods=['POST'])
def predict_chatbot_week():
  
   # Get the data from the POST request.
    data = request.get_json(force=True)
    
    name = data['name']

    obj = Restaurents.find_one({'name': name})

    if obj is None:
        return {'message': 'Restaurant doesn\'t exist.'}

    restaurantID = str(obj['_id'])

    #Get pickle file of the restaurant 
    filename = restaurantID + '.pckl'


    try:
        s3.download_file(bucketname, filename, filename)
        model = models["fb_prophet"](filename)

    except:
        model = models["fb_prophet"]('starter.pckl')

    output = model.predictweek(data['date'])


    #Delete the pickle file of the restaurant
    if os.path.exists(filename):
        os.remove(filename)

    # convert into JSON:
    y = json.dumps(output)

    return y  


@app.route("/predict-grocery-chatbot", methods = ['POST']) 
def predict_grocery_chatbot() :

 # Get the data from the POST request.
    data = request.get_json(force=True)
    name = data['name']
    date = data['date']

    temp_date =  datetime.datetime.strptime(date, '%Y-%m-%d')
    day = temp_date.strftime("%A")

    obj = Restaurents.find_one({'name': name})

    if obj is None:
        return {'message': 'Restaurant doesn\'t exist.'}

    restaurantID = str(obj['_id'])

    #Get pickle file of the restaurant 
    filename = restaurantID + '.pckl'

    try:
        s3.download_file(bucketname, filename, filename)
        model = models["fb_prophet"](filename)

    except:
        model = models["fb_prophet"]('starter.pckl')

    footfall = model.predictday(data['date'])
    footfall  = footfall[0]

    dish = Dishes.find_one({"speciality" : day})

    ingredients = dish['ingredients']

    output = []

    for item in ingredients:
        quantity = item['quantity']
        if type(quantity) == str:
            quantity = quantity.split(' ')
            quantity = float(quantity[0])
        # print(footfall, quantity)
        output.append({'name' : item['name'] , 'quantity': footfall*quantity })

    if os.path.exists(filename):
        os.remove(filename)
        
    return {'output' : output}



@app.route("/history-footfall" , methods = ['POST'])
def history_footfall():

    #actual vs #predicted
    data = request.get_json(force=True)
    
    restaurantID = data['restaurantID']

    today = datetime.date.today()
    weekday = today.weekday()
    previous = today - datetime.timedelta(days=weekday, weeks=1)

    #previous_date = previous.strftime('%Y-%m-%d')  --> change later

    previous_date = '2022-08-10'

    predicted = []
    actual = []

    #Get csv and pickle file of the restaurant 
    filename1 = restaurantID + '.csv'
    filename2 = restaurantID + '.pckl'

    try:
        s3.download_file(bucketname, filename1, filename1)
        s3.download_file(bucketname, filename2, filename2)

        model = models["fb_prophet"](filename2)

    except:
        model = models["fb_prophet"]('starter.pckl')


    predicted = model.predictweek(previous_date)    

    count = 0
    with open(filename1) as f:
        reader = csv.reader(f)
        for row in reader:

            if count == 7:
                break

            if(row[1] ==  previous_date):  

                actual.append(row[2])

                temp = datetime.datetime.strptime(previous_date, '%Y-%m-%d') + datetime.timedelta(1)
                previous_date =  temp.strftime('%Y-%m-%d')
                count = count + 1

    if os.path.exists(filename1):
        os.remove(filename1)

    if os.path.exists(filename2):
            os.remove(filename2)


    #if previous week doesnt exist           
    if(len(actual) == 0) :
        return {
                    'actual' : [] ,
                    'predicted' : []
                }

    return {
        'actual' : actual ,
        'predicted' : predicted
    }    

#JOY
@app.route("/add-dish" , methods = ['POST'])
def restaurant_dish_add():
    try:
        data = request.get_json()
        obj = {
            'name': data['name'],
            'image': data['image'],
            'speciality': data['speciality'],
            'restaurant_id': data['restaurant_id'],
            'price' : data['price'],
            'ingredients': []
        }
        Dishes.insert_one(obj)
        return {"message": 'Dish Added'}, 200
    except Exception as e:
        return {'message': 'Server Error' + str(e)}, 500

@app.route("/update-dish" , methods = ['PUT'])
def restaurant_dish_update():
    try:
        data = request.get_json()
        newvalue = { "$push": {'ingredients': {'$each' :data['ingredients']}} }
        Dishes.update_one({'_id': ObjectId(data['dish_id'])}, newvalue)
        return {"message": 'Dish Updated'}, 200
    except Exception as e:
        return {'message': 'Server Error' + str(e)}, 500
    

@app.route("/get-dishes" , methods = ['GET'])
def restaurant_dish_get():
    try:
        dishes = Dishes.find()
        
        special_dishes = {}
        other_dishes = []
        for dish in dishes:
            item = {
                'dish_id': str(dish['_id']),
                'name': dish['name'],
                'image': dish['image'],
                'ingredients': dish['ingredients'],
                'price' : dish['price']
            }
            if dish['speciality'] != '':
                special_dishes[dish['speciality']] = item
            else:
                other_dishes.append(item)
        return {"special_dishes": special_dishes, "other_dishes": other_dishes}, 200
    except Exception as e:
        return {'message': 'Server Error' + str(e)}, 500



@app.route("/predict-revenue-day" , methods = ['POST'])
def predict_revenue_day():

    #(price of dish 1 day)*(number of ppl on that day)

    # Get the data from the POST request.
    data = request.get_json(force=True)
    restaurantID = data["restaurantID"]

    date = data['date']
    prev_date = getPreviousDay(data['date'])

    temp_date =  datetime.datetime.strptime(date, '%Y-%m-%d')
    day = temp_date.strftime("%A")

    #Get pickle file of the restaurant 
    filename = restaurantID + '.pckl'

    try:
        s3.download_file(bucketname, filename, filename)
        model = models["fb_prophet"](filename)

    except:
        model = models["fb_prophet"]('starter.pckl')

    footfall = model.predictday(date)

    prev_footfall = model.predictday(prev_date)
    prev_date =  datetime.datetime.strptime(prev_date, '%Y-%m-%d')
    prev_day = prev_date.strftime("%A")

    footfall = footfall[0]
    prev_footfall = prev_footfall[0]
    dish = Dishes.find_one({"speciality" : day})
    prev_dish = Dishes.find_one({"speciality" : prev_day})

    if dish == None:
        price = 1
    else:
        price = dish['price']
        if price == None:
            price =1
        price = float(price)
    if prev_dish == None:
        prev_price = 1
    else:
        prev_price = prev_dish['price']
        if prev_price == None:
            prev_price =1
        prev_price = float(prev_price)
    
    # print(footfall, type(footfall))
    revenue = price * footfall
    prev_revenue = prev_price * prev_footfall

    if os.path.exists(filename):
        os.remove(filename)

    return {
            'revenue': revenue,
            'comment': getPercentDiff(prev_revenue, revenue)
        }



@app.route("/predict-revenue-week" , methods = ['POST'])
def predict_revenue_week():

    #(price of dish 1 day)*(number of ppl on that day) + (price of dish 2nd day)*(number of ppl on that day) + ...
    
    # Get the data from the POST request.
    data = request.get_json(force=True)
    restaurantID = data["restaurantID"]

    date = data['date']

    #Get pickle file of the restaurant 
    filename = restaurantID + '.pckl'

    try:
        s3.download_file(bucketname, filename, filename)
        model = models["fb_prophet"](filename)

    except:
        model = models["fb_prophet"]('starter.pckl')


    revenue = 0
    revenue_arr = []

    for i in range(7):

        temp_date =  datetime.datetime.strptime(date, '%Y-%m-%d')
        day = temp_date.strftime("%A")
       
        footfall = model.predictday(date)

        dish = Dishes.find_one({"speciality" : day})
        if dish == None:
            price = 1
        else:
            price = dish['price']
            if price == None:
                price =1

        #increment date
        temp_date = temp_date + datetime.timedelta(1)
        date =  temp_date.strftime('%Y-%m-%d')
        # print(revenue)
        # print(footfall)
        # print(price)
        revenue = revenue + footfall[0]*float(price)
        revenue_arr.append(footfall[0]*float(price))

    if os.path.exists(filename):
        os.remove(filename)

    return {
        'revenue': revenue,
        'week_revenue': revenue_arr
    }



@app.route("/predict-ingridents-day" , methods = ['POST'])
def predict_ingridents_day():

    # Get the data from the POST request.
    data = request.get_json(force=True)
    restaurantID = data["restaurantID"]

    date = data['date']
    temp_date =  datetime.datetime.strptime(date, '%Y-%m-%d')
    day = temp_date.strftime("%A")


    #Get pickle file of the restaurant 
    filename = restaurantID + '.pckl'

    try:
        s3.download_file(bucketname, filename, filename)
        model = models["fb_prophet"](filename)

    except:
        model = models["fb_prophet"]('starter.pckl')

    footfall = model.predictday(date)
    footfall = footfall[0]

    dish = Dishes.find_one({"speciality" : day})

    ingredients = dish['ingredients']

    output = []

    for item in ingredients:
        quantity = item['quantity']
        if type(quantity) == str:
            quantity = quantity.split(' ')
            quantity = float(quantity[0])
        # print(footfall, quantity)
        output.append({'name' : item['name'] , 'quantity': footfall*quantity })

    if os.path.exists(filename):
        os.remove(filename)
        
    return {'output' : output}





if __name__ == '__main__':
    app.run(host='0.0.0.0',port=8080, debug=True)
