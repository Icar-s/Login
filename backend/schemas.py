# Certifica que as entradas receberão a tipagem certa

from pydantic import BaseModel, EmailStr

# Dados que o usuário envia no cadastro
class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str