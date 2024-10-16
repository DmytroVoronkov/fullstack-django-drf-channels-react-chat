from django.conf import settings
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .models import Account
from .schemas import list_accounts_docs
from .serializers import AccountSerializer


# Create your views here.
class AccountViewSet(viewsets.ViewSet):
    queryset = Account.objects.all()
    permission_classes = [IsAuthenticated]

    @list_accounts_docs
    def list(self, request: Request):
        user_id = request.query_params.get("user_id")
        queryset = Account.objects.get(id=user_id)
        serializer = AccountSerializer(queryset, many=False)
        return Response(serializer.data)


class JWTSetCookieMixin:
    def finalize_response(self, request: Request, response: Response, *args, **kwargs):
        if response.data["refresh"]:
            response.set_cookie(
                settings.SIMPLE_JWT["REFRESH_TOKEN_NAME"],
                response.data["refresh"],
                max_age=settings.SIMPLE_JWT["REFRESH_TOKEN_LIFETIME"],
                httponly=True,
                samesite=settings.SIMPLE_JWT["JWT_COOKIE_SAMESITE"]
            )
        if response.data["access"]:
            response.set_cookie(
                settings.SIMPLE_JWT["ACCESS_TOKEN_NAME"],
                response.data["access"],
                max_age=settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"],
                httponly=True,
                samesite=settings.SIMPLE_JWT["JWT_COOKIE_SAMESITE"]
            )    
        
        del response.data["access"]
        
        return super().finalize_response(request, response, *args, *kwargs)


class JWTCookieTokenRefreshView(JWTSetCookieMixin, TokenRefreshView):
    pass


class JWTCookieTokenObtainPairView(JWTSetCookieMixin, TokenObtainPairView):
    pass
