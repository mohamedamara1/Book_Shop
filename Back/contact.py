from typing import Optional
from fastapi import FastAPI
from datetime import datetime
from pydantic import BaseModel

from fastapi.middleware import Middleware
from fastapi.middleware.cors import CORSMiddleware

import mysql.connector
import json


class Message(BaseModel):
	contactFormName:  str
	contactFormEmail : str 
	contactFormSubjects : str
	contactFormMessage : str
	contactFormCopy : str


middleware = [ Middleware(CORSMiddleware, allow_origins=['*'], allow_credentials=True, allow_methods=['*'], allow_headers=['*'])]

app = FastAPI(middleware=middleware)

@app.post("/contact/")
def livre( message : Message):

	print(message.contactFormName , message.contactFormEmail , message.contactFormSubjects , message.contactFormMessage)
	mydb = mysql.connector.connect(host="localhost",user="root",password="",database="bookshop")
	mycursor = mydb.cursor()
	query = (f"insert into contact(name, email, subject, message)  values ( '{message.contactFormName}','{message.contactFormEmail}','{message.contactFormSubjects}', '{message.contactFormMessage}')")
	try:
		mycursor.execute(query)
		mydb.commit()
	except Exception as e: 
		mydb.rollback()
		return {"message" : str(e)}

	return {"message": "contact request added successfuly"}
