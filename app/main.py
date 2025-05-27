from pyramid.config import Configurator
from pyramid.events import NewRequest
from pyramid.response import Response
from sqlalchemy import engine_from_config
from .models import Base

# ✅ Tambah CORS headers ke setiap response
def add_cors_headers_response_callback(event):
    def cors_headers(request, response):
        response.headers.update({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST,GET,PUT,DELETE,OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type,Authorization',
        })
    event.request.add_response_callback(cors_headers)

# ✅ Handler khusus untuk OPTIONS preflight
def options_view(request):
    return Response(status=200)

# ✅ Fungsi utama konfigurasi aplikasi
def main(global_config, **settings):
    config = Configurator(settings=settings)

    # Aktifkan handler CORS global
    config.add_subscriber(add_cors_headers_response_callback, NewRequest)

    # Koneksi ke database
    engine = engine_from_config(settings, 'sqlalchemy.')
    Base.metadata.bind = engine
    Base.metadata.create_all(engine)

    # Tambah dukungan Jinja2 (kalau kamu pakai)
    config.include('pyramid_jinja2')

    # ✅ Semua route utama
    config.add_route('get_users', '/api/users')
    config.add_route('get_produk', '/api/produk')
    config.add_route('get_produk_by_id', '/api/produk/{id}')
    config.add_route('login', '/api/login')
    config.add_route('register', '/api/register')
    config.add_route('sync_fakestore', '/api/sync-fakestore')
    config.add_route('update_produk', '/api/produk')          # PUT
    config.add_route('delete_produk', '/api/produk/{id}')     # DELETE

    # ✅ Semua route OPTIONS untuk CORS
    config.add_route('produk_options', '/api/produk', request_method='OPTIONS')
    config.add_view(options_view, route_name='produk_options')

    config.add_route('produk_by_id_options', '/api/produk/{id}', request_method='OPTIONS')
    config.add_view(options_view, route_name='produk_by_id_options')

    config.add_route('login_options', '/api/login', request_method='OPTIONS')
    config.add_view(options_view, route_name='login_options')

    config.add_route('register_options', '/api/register', request_method='OPTIONS')
    config.add_view(options_view, route_name='register_options')

    config.add_route('sync_options', '/api/sync-fakestore', request_method='OPTIONS')
    config.add_view(options_view, route_name='sync_options')

    # ✅ Scan semua view
    config.scan('app.views')

    # ✅ Info startup server
    print("✅ Server running at http://localhost:6543")
    return config.make_wsgi_app()
