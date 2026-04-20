from jose import JWTError, jwt
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from datetime import datetime, timedelta
from passlib.context import CryptContext 
import hashlib

SECRET_KEY = "super-secret-key"  # depois vamos esconder isso
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def create_access_token(data: dict):
    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})

    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# Define como o token será recebido
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        # Decodifica o token
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")

        if email is None:
            raise HTTPException(status_code=401, detail="Token inválido")

        return email

    except JWTError:
        raise HTTPException(status_code=401, detail="Token inválido")
    
# Configura o algoritmo de hash
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Função pra gerar hash da senha
def hash_password(password: str):
    return pwd_context.hash(password)

# Função pra verificar senha (vamos usar no login depois)
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)