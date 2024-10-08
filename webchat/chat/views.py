from django.shortcuts import render
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from .models import Conversation
from .schema import list_message_docs
from .serializers import MessageSerializer


# Create your views here.
class MessageListViewSet(ViewSet):
    @list_message_docs
    def list(self, request: Request) -> Response:
        channel_id = request.query_params.get("channel_id")
        try:
            conversation = Conversation.objects.get(channel_id=channel_id)
            messages = conversation.message.all()
            serializer = MessageSerializer(messages, many=True)
            return Response(serializer.data)
        except Conversation.DoesNotExist:
            return Response([])

        
