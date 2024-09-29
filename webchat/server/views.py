from django.db.models import Count
from rest_framework import viewsets
from rest_framework.exceptions import AuthenticationFailed, ValidationError
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Server
from .schema import server_list_docs
from .serializers import ServerSerializer


class ServerListViewSet(viewsets.ViewSet):
    queryset = Server.objects.all()
    # permission_classes = [IsAuthenticated]

    @server_list_docs
    def list(self, request: Request) -> Response:
        """
        Retrieves a filtered list of servers based on optional query parameters.

        This method allows filtering servers by category, limiting the number of servers
        returned, filtering by user membership, filtering by server ID, and including 
        the number of members in each server.

        Args:
            request (Request): The HTTP request object, which may include the following 
                query parameters:
                - `category` (str, optional): Filter servers by the given category name.
                - `qty` (int, optional): Limit the number of servers in the response.
                - `by_user` (str, optional): If "true", filter by the authenticated user's 
                    membership.
                - `by_server_id` (int, optional): Filter by a specific server ID.
                - `with_num_members` (str, optional): If "true", include the number of 
                    members for each server.

        Returns:
            Response: A serialized response containing the filtered list of servers.

        Raises:
            AuthenticationFailed: If the `by_user` or `by_server_id` parameter is provided, 
                but the user is not authenticated.
            ValidationError: If the `by_server_id` value is invalid or the server with the 
                specified ID does not exist.
        """

        category = request.query_params.get("category")
        qty = request.query_params.get("qty")
        by_user = request.query_params.get("by_user")
        by_server_id = request.query_params.get("by_server_id")
        with_num_members = request.query_params.get("with_num_members")

        # Filter by category
        if category:
            self.queryset = self.queryset.filter(category__name=category)

        # Filter by user membership if authenticated
        if by_user and by_user.lower() == "true":
            if not request.user.is_authenticated:
                raise AuthenticationFailed("You are not authenticated")
            self.queryset = self.queryset.filter(member=request.user.id)

        # Annotate number of members if requested
        if with_num_members and with_num_members.lower() == "true":
            self.queryset = self.queryset.annotate(num_members=Count("member"))

        # Limit the number of results
        if qty:
            self.queryset = self.queryset[: int(qty)]

        # Filter by server ID
        if by_server_id:
            try:
                self.queryset = self.queryset.filter(id=by_server_id)
                if not self.queryset.exists():
                    raise ValidationError(detail=f"Server with id {by_server_id} does not exist")
            except ValueError:
                raise ValidationError(detail="Invalid server ID format")

        # Serialize and return the filtered queryset
        serializer = ServerSerializer(
            self.queryset, many=True, context={"num_members": with_num_members}
        )
        return Response(serializer.data)
