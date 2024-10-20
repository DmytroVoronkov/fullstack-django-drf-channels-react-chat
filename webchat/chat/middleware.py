import jwt
from channels.db import database_sync_to_async
from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser
from django.core.handlers.asgi import ASGIHandler


@database_sync_to_async
def get_user(scope):
    token = scope["token"]
    User = get_user_model()
    
    try:
        if not token:
            raise User.DoesNotExist
        
        user_id = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])["user_id"]

        return User.objects.get(id=user_id)
    except User.DoesNotExist:
        scope["group"] = "anonymous"
        return AnonymousUser()


class JWTAuthMidlleware:

    def __init__(self, app: ASGIHandler):
        self.app = app

    async def __call__(self, scope, recieve, send):
        headers_dict = dict(scope["headers"])
        cookies_str: str = headers_dict.get(b"cookie", b"").decode()
        cookies = {
            cookie.split("=")[0]: cookie.split("=")[1]
            for cookie in cookies_str.split("; ")
        }
        access_token = cookies.get(settings.SIMPLE_JWT["ACCESS_TOKEN_NAME"])

        scope["token"] = access_token 
        scope["user"] = await get_user(scope)

        return await self.app(scope, recieve, send)
