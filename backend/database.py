# Importa ferramentas do SQLAlchemy
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# URL do banco (SQLite)
# "sqlite:///./test.db" → cria um arquivo test.db na pasta
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")

# Cria o motor de conexão com o banco
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False}  # necessário para o SQLite funcionar com FastAPI
)

# Cria uma fábrica de sessões (conexões com o banco)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base que vai ser usada pra criar modelos (tabelas)
Base = declarative_base()

