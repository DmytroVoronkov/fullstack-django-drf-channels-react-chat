from rest_framework import viewsets
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Account
from .serializers import AccountSerializer
from .schemas import list_accounts_docs


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
