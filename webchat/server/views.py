# from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.request import Request
from rest_framework.response import Response

from .models import Server
from .serializers import ServerSerializer


class ServerListViewSet(viewsets.ViewSet):
    queryset = Server.objects.all()

    def list(self, request: Request) -> Response:
        category = request.query_params.get("category")

        if category:
            self.queryset = self.queryset.filter(category__name=category)

        serializer = ServerSerializer(self.queryset, many=True)
        return Response(serializer.data)
