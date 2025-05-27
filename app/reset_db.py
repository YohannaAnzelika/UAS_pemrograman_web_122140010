from app.models import Base
from sqlalchemy import create_engine

# Ganti user, password, host, dan nama DB sesuai kamu
engine = create_engine("postgresql://postgres:admin@localhost/backend_toko")

# Hapus semua tabel (drop) dan buat ulang (create)
Base.metadata.drop_all(engine)
Base.metadata.create_all(engine)

print("✅ Database berhasil di-reset dan struktur tabel disamakan dengan models.py")
