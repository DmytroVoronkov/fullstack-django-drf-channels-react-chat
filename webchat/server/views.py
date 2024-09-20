# from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.exceptions import ValidationError, AuthenticationFailed
from rest_framework.request import Request
from rest_framework.response import Response

from .models import Server
from .serializers import ServerSerializer


class ServerListViewSet(viewsets.ViewSet):
    queryset = Server.objects.all()

    def list(self, request: Request) -> Response:
        category = request.query_params.get("category")
        qty = request.query_params.get("qty")
        by_user = request.query_params.get("by_user")
        by_server_id = request.query_params.get("by_server_id")

        if (by_user or by_server_id) and not request.user.is_authenticated:
            raise AuthenticationFailed("You are not authenticated")

        if category:
            self.queryset = self.queryset.filter(category__name=category)

        if by_user and by_user.lower() == "true":
            user_id = request.user.id
            self.queryset = self.queryset.filter(member=user_id)

        if qty:
            self.queryset = self.queryset[: int(qty)]

        if by_server_id:
            try:
                self.queryset = self.queryset.filter(id=by_server_id)
                if not self.queryset.exists():
                    raise ValidationError(
                        detail=f"Server with id {by_server_id} does not exist"
                    )
            except ValueError:
                raise ValidationError(detail="Server value error")

        serializer = ServerSerializer(self.queryset, many=True)
        return Response(serializer.data)
