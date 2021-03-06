from typing import Optional
from fastapi import FastAPI ,Request
from datetime import datetime
from pydantic import BaseModel
from fastapi import Depends
from fastapi.middleware import Middleware
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector
import json
import base64


app = FastAPI() 
origins = ['http://localhost:4200',] 
app.add_middleware(     
  CORSMiddleware,     
  allow_origins=origins,     
  allow_credentials=True,     
  allow_methods=["*"],     
  allow_headers=["*"], )



##### BOOOOOKS ENDPOINTS


@app.get("/newprods")
def get_prods():
  mydb = mysql.connector.connect(host="localhost",user="root",password="",database="bookshop")
  mycursor = mydb.cursor()
  mycursor.execute(
        f"SELECT book_id, book_title,price, date_ajout,rating, imageurl FROM book where new = 1;" )
  #row_headers=[x[0]for x in mycursor.description]
  row_headers = ['id', 'name', 'price', 'date', 'stars', 'imageurl']
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
        f"SELECT book_id, book_title,price, date_ajout,rating, imageurl FROM book where bestselling = 1;" )
  #row_headers=[x[0]for x in mycursor.description] 
  row_headers = ['id', 'name', 'price', 'date', 'stars', 'imageurl']

  result = mycursor.fetchall()
  json_data=[]

  for res in result:
    json_data.append(dict(zip(row_headers,res)))

  y=json_data
  return y

@app.get("/book")
def get_book(bookid : str):

  mydb = mysql.connector.connect(host="localhost",user="root",password="",database="bookshop")
  mycursor = mydb.cursor()
  mycursor.execute(
        f"SELECT book_id, book_title,price, date_ajout,rating, book_description,book_writer, imageurl FROM book where book_id = '{bookid}';" )
  #row_headers=[x[0]for x in mycursor.description]
  row_headers = ['id', 'title', 'price', 'date', 'stars', 'description','author_name', 'imageurl' ]

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




@app.post("/register")
async def reg(request:Request):
    mydb = mysql.connector.connect(host = "localhost" , user = "root" , password = "" , database = "bookshop")
    mycursor = mydb.cursor()
    body = json.loads(await request.body())
    mycursor.execute(f"SELECT * FROM client WHERE email = '{body['user']}'")
    rv = mycursor.fetchone()
    mycursor.execute(f"SELECT max(id_client) FROM client")
    rs = int(mycursor.fetchone()[0])
    print (rs)
    if (rv):
        return '{"Email already exists!"}'
    else:
        mycursor.execute(f"INSERT INTO `client` (`id_client`, `nom_client`, `prenom_client`, `ville`, `email`, `age`, `date_naissance`, `code_postal`, `phone`, `password` ) VALUES ('{rs+1}', '{body['last']}', '{body['first']}', '', '{body['user']}', '', '', '', '{body['phone']}', '{body['pwd']}');")
        mydb.commit()
        mycursor.execute(f"SELECT id_client FROM client WHERE email = '{body['user']}'")
        row_headers=[x[0] for x in mycursor.description] 
        rv = mycursor.fetchall()
        json_data=[]
        for result in rv:
            json_data.append(dict(zip(row_headers,result)))
        return json_data

@app.post("/login")
async def db_test(request : Request):

    mydb = mysql.connector.connect(host = "localhost" , user = "root" , password = "" , database = "bookshop")
    mycursor = mydb.cursor()
    body = json.loads(await request.body())
    print (body)
    mycursor.execute(f"select CL.email, CO.password from compte CO, client CL where (CO.client_id  = CL.id_client) and (CL.email = '{body['user']}' ) and (CO.password = '{body['pwd']}')")
    row_headers=[x[0] for x in mycursor.description] 
    rv = mycursor.fetchall()
    json_data=[]
    for result in rv:
            json_data.append(dict(zip(row_headers,result)))
    return json_data
