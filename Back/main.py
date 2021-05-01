from typing import Optional
from fastapi import FastAPI
from datetime import datetime
from pydantic import BaseModel

from fastapi import Depends

from fastapi.middleware import Middleware
from fastapi.middleware.cors import CORSMiddleware

import mysql.connector
import json
import base64

middleware = [ Middleware(CORSMiddleware, allow_origins=['*'], allow_credentials=True, allow_methods=['*'], allow_headers=['*'])]

app = FastAPI(middleware=middleware)




##### BOOOOOKS ENDPOINTS


@app.get("/newprods")
def get_prods():
  mydb = mysql.connector.connect(host="localhost",user="root",password="",database="bookshop")
  mycursor = mydb.cursor()
  mycursor.execute(
        f"SELECT book_id, book_title,price, date_ajout,rating FROM book where new = 1;" )
  #row_headers=[x[0]for x in mycursor.description]
  row_headers = ['id', 'name', 'price', 'date', 'stars']
  result = mycursor.fetchall()
  json_data=[]

  for res in result:
    json_data.append(dict(zip(row_headers,res)))

  y=json_data[:4]
  print(y)
  return y


@app.get("/bestselling")
def get_best():

  mydb = mysql.connector.connect(host="localhost",user="root",password="",database="bookshop")
  mycursor = mydb.cursor()
  mycursor.execute(
        f"SELECT book_id, book_title,price, date_ajout,rating FROM book where bestselling = 1;" )
  #row_headers=[x[0]for x in mycursor.description]
  row_headers = ['id', 'name', 'price', 'date', 'stars']

  result = mycursor.fetchall()
  json_data=[]

  for res in result:
    json_data.append(dict(zip(row_headers,res)))

  y=json_data
  return y

@app.get("/book")
def get_best(bookid : str):

  mydb = mysql.connector.connect(host="localhost",user="root",password="",database="bookshop")
  mycursor = mydb.cursor()
  mycursor.execute(
        f"SELECT book_id, book_title,price, date_ajout,rating, book_description, book_writer FROM book where book_id = '{bookid}';" )
  #row_headers=[x[0]for x in mycursor.description]
  row_headers = ['id', 'title', 'price', 'date_ajout', 'stars', 'description','products_details','author_name' ]

  result = mycursor.fetchall()
  json_data=[]

  for res in result:
    json_data.append(dict(zip(row_headers,res)))

  y=json_data[0]
  return y

@app.get("/products")
def get_like(name_like : str):

  mydb = mysql.connector.connect(host="localhost",user="root",password="",database="bookshop")
  mycursor = mydb.cursor()
  mycursor.execute(
        f"SELECT book_id, book_title,price, date_ajout,rating FROM book where book_title like '{name_like}%' ;" )
  #row_headers=[x[0]for x in mycursor.description]
  row_headers = ['id', 'name', 'price', 'date', 'stars']

  result = mycursor.fetchall()
  json_data=[]

  for res in result:
    json_data.append(dict(zip(row_headers,res)))

  y=json_data
  print(y)
  return y

  '''
  mydb = mysql.connector.connect(host="localhost",user="root",password="",database="bookshop")
  mycursor = mydb.cursor()
  mycursor.execute(
        f"SELECT book_id, book_title,price, date_ajout,rating FROM book where bestselling = 1;" )
  print(mycursor.description)
  row_headers=[x[0]for x in mycursor.description]

  result = mycursor.fetchall()
  #json_data=[]

  #payload = []
  #content ={}
  #for res in result:
    #content = {'id' :res[0], 'name':res[1], 'price':res[2], 'date':res[3], 'stars':res[4]}
    #payload.append(content)
   # content={}  
    #json_data.append(dict(zip(row_headers,res)))

  #y=payload
  #print(y)
  #return y
'''

################ CONTACT FORM ENDPOINT 

class Message(BaseModel):
	contactFormName:  str
	contactFormEmail : str 
	contactFormSubjects : str
	contactFormMessage : str
	contactFormCopy : str




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
