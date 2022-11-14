import pandas as pd
from prophet import Prophet
import pickle

df = pd.read_csv('starter.csv', index_col=0)

prophet_model = Prophet()

prophet_model.fit(df) #---> add custom seasonality and params for Prophet Model

#Save the model
with open('starter.pckl', 'wb') as fout: 
    pickle.dump(prophet_model, fout)