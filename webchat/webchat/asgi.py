import os

from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "webchat.settings")

django_app = get_asgi_application()

from chat.middleware import JWTAuthMidlleware  # noqa isort:skip

from . import urls  # noqa isort:skip


application = ProtocolTypeRouter(
    {
        "http": get_asgi_application(),
        "websocket": JWTAuthMidlleware(URLRouter(urls.websocket_urlpatterns)),
    }
)
