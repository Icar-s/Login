from fastapi import FastAPI

app = FastAPI()

# Decorator
@app.get("/") # Quando o cliente fizer GET na rota raiz (http://127.0.0.1:8000/) a função será executada
def read_root():

    
    return {"message": "API rodando"} # Retorna um json