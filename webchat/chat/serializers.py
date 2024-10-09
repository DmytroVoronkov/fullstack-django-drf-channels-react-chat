from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from .models import Message


class MessageSerializer(ModelSerializer):
    sender = serializers.StringRelatedField()

    class Meta:
        model = Message
        fields = ["id", "sender", "content", "timestamp"]
