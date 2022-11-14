import pickle
import datetime
from typing import List
import pandas as pd
from abc import ABC, abstractmethod


class FootfallPredictor(ABC):
    def __init__(self, model) -> None:
        """
        Loads the model from the given file
        """
        with open(model, "rb",) as fin:
            try:
                self.model = pickle.load(fin)
            except (OSError, FileNotFoundError, TypeError):
                print("wrong path/ model not available")
                exit(-1)

    def calculate_next_date(self, prev_date):
        """
        Calculates next date
        date_format = yyyy-mm-dd
        """
        self.next_date = datetime.datetime(
            *list(map(lambda x: int(x), prev_date.split("-")))
        ) + datetime.timedelta(
            days=1
        )  # next date

    def get_next_date(self, prev_date):
        try:
            return self.next_date.strftime("%y-%m-%d")
        except NameError:
            self.calculate_next_date(prev_date)

    @abstractmethod
    def predictday(self, prev_date) -> List:
        pass

    @abstractmethod
    def predictweek(self, prev_date) -> List:
        pass

    @abstractmethod
    def preprocess_inputs(self, prev_date):
        pass

    @abstractmethod
    def postprocess_outputs(self, output_from_model) -> List:
        pass



#FB Prophet Model
class FBProphetPredictor(FootfallPredictor):
    def __init__(self,model) -> None:
        """
        Load the Model from file models/fbprophet.pckl
        """
        super().__init__(model)

    def preprocess_inputs(self, prev_date):
            """
            Model takes in an input as a pandas dataframe having index 
            as the day to be predicted
            """
            self.calculate_next_date(prev_date)  # get the self.next_date var
            next_date_series = pd.DataFrame(
                {"ds": pd.date_range(start=self.next_date, end=self.next_date)}
            )
            return next_date_series

    def postprocess_outputs(self, output_from_model) -> List:
            """
            Return the yhat in the list format
            """
            return output_from_model["yhat"].tolist()

    def predictday(self, prev_date) -> List:

        curr_date = datetime.datetime(
            *list(map(lambda x: int(x), prev_date.split("-")))
        )

        next_date_series = pd.DataFrame(
            {"ds": pd.date_range(start= curr_date, end= curr_date)}
        )
       
        pred = self.model.predict(next_date_series)  # prediction
        pred = self.postprocess_outputs(pred)  # postprocess prediction
        
        pred[0] = round(pred[0])

        return pred  # return prediction    

    def predictweek(self, prev_date) -> List:

        output = []

        curr_date = datetime.datetime(
            *list(map(lambda x: int(x), prev_date.split("-")))
        )

        next_date_series = pd.DataFrame(
            {"ds": pd.date_range(start= curr_date, end= curr_date + datetime.timedelta(days=6))}
        )
        pred = self.model.predict(next_date_series)  # prediction
        pred = self.postprocess_outputs(pred)  # postprocess prediction

        for i in range(7):
            output.append(round(pred[i]))

        return output  # return prediction  