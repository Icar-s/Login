from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
from security import hash_password, verify_password, create_access_token, get_current_user, verify_captcha
import models, schemas

# Cria todas as tabelas no banco
Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
    # Verifica se email existe
    existing_user = db.query(models.User).filter(models.User.email == user.email).first()
    if existing_user:
        return {"error": "Email já cadastrado"}
    
    hashed = hash_password(user.password)

    # Cria um novo usuario
    new_user = models.User(
        email=user.email, hashed_password=hashed # Corrigir hash depois
    )

    # Adiciona no banco
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "Usuário criado com sucesso"}

@app.post("/login")
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
     # procura usuário pelo email
    db_user = db.query(models.User).filter(models.User.email == user.email).first()

    if not db_user:
        return {"error": "Email ou senha inválidos"}
    
    if not verify_captcha(user.captcha):
        return {"error": "Captcha inválido"}

    # verifica senha
    if not verify_password(user.password, db_user.hashed_password):
        return {"error": "Email ou senha inválidos"}

    token = create_access_token({"sub":db_user.email})

    return {"access_token": token, "token_type": "bearer"}

@app.get("/me")
def read_users_me(current_user: str = Depends(get_current_user)):
    return {"user": current_user}