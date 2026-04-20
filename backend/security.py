from passlib.context import CryptContext 
import hashlib

# Configura o algoritmo de hash
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Função pra gerar hash da senha
def hash_password(password: str):
    return pwd_context.hash(password)

# Função pra verificar senha (vamos usar no login depois)
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)