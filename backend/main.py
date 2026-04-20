from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
import models, schemas

# Cria todas as tabelas no banco
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Dependência: cria uma sessão de banco pra cada request
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Decorator
@app.get("/") # Quando o cliente fizer GET na rota raiz (http://127.0.0.1:8000/) a função será executada
def read_root():

    
    return {"message": "API rodando"} # Retorna um json

# Cadastro

@app.post("/register")
def register(user: schemas.UserCreate, db:Session = Depends(get_db)):
    # Cria um novo usuario
    new_user = models.User(
        email=user.email, hashed_password=user.password # Corrigir hash depois
    )

    # Adiciona no banco
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "Usuário criado com sucesso"}