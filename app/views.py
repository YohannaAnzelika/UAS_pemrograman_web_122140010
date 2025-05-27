import requests
from pyramid.view import view_config
from sqlalchemy.orm import sessionmaker
from sqlalchemy import engine_from_config
from pyramid.threadlocal import get_current_registry
from pyramid.response import Response
from .models import User, Produk

print("✅ views.py loaded")

# 🔧 Ambil session DB
def get_session():
    settings = get_current_registry().settings
    engine = engine_from_config(settings, 'sqlalchemy.')
    Session = sessionmaker(bind=engine)
    return Session()

# 🔐 Token check
def is_authenticated(request):
    auth_header = request.headers.get("Authorization")
    return auth_header == "Bearer token123"

# 🔐 Admin check
def is_admin_token(request):
    auth_header = request.headers.get("Authorization")
    return auth_header == "Bearer token123"

# ✅ REGISTER endpoint
@view_config(route_name='register', renderer='json', request_method='POST')
def register_view(request):
    session = get_session()
    data = request.json_body
    username = data.get('username')
    email = data.get('email')
    is_admin = data.get('is_admin', False)

    user = User(username=username, email=email, is_admin=is_admin)
    session.add(user)
    session.commit()
    return {"message": "User berhasil terdaftar", "is_admin": is_admin}

# ✅ LOGIN endpoint
@view_config(route_name='login', renderer='json', request_method='POST')
def login_view(request):
    session = get_session()
    data = request.json_body
    username = data.get('username')
    email = data.get('email')

    user = session.query(User).filter_by(username=username, email=email).first()
    if user:
        return {
            "token": "token123",
            "role": "admin" if user.is_admin else "user"
        }
    else:
        request.response.status = 401
        return {"error": "Login gagal. Username/email salah."}

# ✅ GET USERS
@view_config(route_name='get_users', renderer='json')
def get_users_view(request):
    session = get_session()
    users = session.query(User).all()
    return {
        "users": [
            {"id": u.id, "username": u.username, "email": u.email, "is_admin": u.is_admin}
            for u in users
        ]
    }

# ✅ GET PRODUK
@view_config(route_name='get_produk', renderer='json')
def get_produk_view(request):
    if request.method == 'OPTIONS':
        return {}

    if not is_authenticated(request):
        request.response.status = 403
        return {"error": "Unauthorized. Token tidak valid."}

    session = get_session()
    produk = session.query(Produk).all()

    return {
        "produk": [
            {
                "id": p.id,
                "nama": p.nama,
                "harga": p.harga,
                "gambar": p.gambar,
                "deskripsi": p.deskripsi
            }
            for p in produk
        ]
    }

# ✅ GET PRODUK BY ID
@view_config(route_name='get_produk_by_id', renderer='json', request_method='GET')
def get_produk_by_id(request):
    if not is_authenticated(request):
        request.response.status = 403
        return {"error": "Unauthorized. Token tidak valid."}

    produk_id = request.matchdict.get('id')
    session = get_session()
    produk = session.query(Produk).get(produk_id)

    if not produk:
        request.response.status = 404
        return {"error": "Produk tidak ditemukan"}

    return {
        "id": produk.id,
        "nama": produk.nama,
        "harga": produk.harga,
        "gambar": produk.gambar,
        "deskripsi": produk.deskripsi
    }

# ✅ SYNC FAKESTORE
@view_config(route_name='sync_fakestore', renderer='json', request_method='POST')
def sync_fakestore(request):
    session = get_session()
    session.query(Produk).delete()
    session.commit()

    response = requests.get("https://fakestoreapi.com/products")
    data = response.json()

    for item in data:
        produk = Produk(
            nama=item['title'],
            harga=int(float(item['price']) * 15000),
            gambar=item['image'],
            deskripsi=item['description']
        )
        session.add(produk)

    session.commit()
    return {"message": f"{len(data)} produk berhasil disimpan"}

# ✅ UPDATE produk
@view_config(route_name='update_produk', renderer='json', request_method='PUT')
def update_produk(request):
    session = get_session()
    data = request.json_body
    try:
        produk_id = int(data.get('id'))
    except (TypeError, ValueError):
        request.response.status = 400
        return {"error": "ID produk tidak valid"}

    produk = session.query(Produk).get(produk_id)
    if not produk:
        request.response.status = 404
        return {"error": "Produk tidak ditemukan"}

    produk.nama = data.get('nama', produk.nama)
    produk.harga = data.get('harga', produk.harga)
    produk.gambar = data.get('gambar', produk.gambar)
    produk.deskripsi = data.get('deskripsi', produk.deskripsi)

    session.commit()
    return {"message": "Produk berhasil diupdate"}

# ✅ DELETE produk
@view_config(route_name='delete_produk', renderer='json', request_method='DELETE')
def delete_produk(request):
    session = get_session()
    produk_id = request.matchdict.get('id')

    try:
        produk_id = int(produk_id)
    except (TypeError, ValueError):
        request.response.status = 400
        return {"error": "ID produk tidak valid"}

    produk = session.query(Produk).get(produk_id)
    if not produk:
        request.response.status = 404
        return {"error": "Produk tidak ditemukan"}

    session.delete(produk)
    session.commit()
    return {"message": "Produk berhasil dihapus"}

# ✅ FIX CORS - Handler untuk OPTIONS /api/produk/{id}
@view_config(route_name='produk_by_id_options', request_method='OPTIONS')
def produk_by_id_options_view(request):
    return Response(status=200)
