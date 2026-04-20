from fastapi import FastAPI
from database import engine, Base
import models

# Cria todas as tabelas no banco
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Decorator
@app.get("/") # Quando o cliente fizer GET na rota raiz (http://127.0.0.1:8000/) a função será executada
def read_root():

    
    return {"message": "API rodando"} # Retorna um json