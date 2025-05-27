from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Boolean

Base = declarative_base()

class Produk(Base):
    __tablename__ = 'produk'
    id = Column(Integer, primary_key=True)
    nama = Column(String)
    harga = Column(Integer)
    gambar = Column(String)        # URL gambar
    deskripsi = Column(String)     # Deskripsi produk

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    username = Column(String)
    email = Column(String)
    is_admin = Column(Boolean, default=False)