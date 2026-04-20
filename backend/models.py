from sqlalchemy import Column, Integer, String
from database import Base

# Classe que representa a tabela "users"
class User(Base):
    __tablename__ = "users"  # nome da tabela no banco

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True # Impede emails duplicados
                   , index=True, nullable=False # Campo obrigatorio
                   )
    hashed_password = Column(String, nullable=False)