from rest_framework import serializers

# Import the Server and Channel models
from .models import Server, Channel

# Serializer for the Channel model
class ChannelSerializer(serializers.ModelSerializer):
    """Serializer for the Channel model, serializing all fields."""
    
    class Meta:
        model = Channel  # Specifies the model to be serialized
        fields = "__all__"  # Serializes all fields of the model


# Serializer for the Server model
class ServerSerializer(serializers.ModelSerializer):
    """Serializer for the Server model with a custom 'num_members' field and nested 'channel_server' field."""

    # Custom field that will be computed using the get_num_members method
    num_members = serializers.SerializerMethodField()
    
    # Nested serializer for related Channel objects (many=True implies multiple related objects)
    channel_server = ChannelSerializer(many=True)
    
    category = serializers.StringRelatedField()

    class Meta:
        model = Server  # Specifies the model to be serialized
        exclude = ("member",)  # Exclude the 'member' field from serialization

    def get_num_members(self, obj):
        """
        Get the number of members for the server.
        
        Args:
            obj: The Server object being serialized.
        
        Returns:
            int: The number of members if available, otherwise None.
        """
        if hasattr(obj, "num_members"):
            return obj.num_members
        return None

    def to_representation(self, instance):
        """
        Customize the serialized representation of the Server instance.

        Removes the 'num_members' field from the output if not present in the serialization context.

        Args:
            instance: The Server object being serialized.
        
        Returns:
            dict: The serialized data for the Server instance, possibly with 'num_members' removed.
        """
        # Call the base class's representation method
        data = super().to_representation(instance)
        
        # Get the 'num_members' from the context (passed during serialization)
        num_members = self.context.get("num_members")
        
        # If 'num_members' is not present in the context, remove the 'num_members' field from the output
        if not num_members:
            data.pop("num_members", None)
        
        # Return the modified data
        return data
