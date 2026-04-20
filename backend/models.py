from sqlalchemy import Column, Integer, String
from database import Base

# Classe que representa a tabela "users"
class User(Base):
    __tablename__ = "users"  # nome da tabela no banco

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)