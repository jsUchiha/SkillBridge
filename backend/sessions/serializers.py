from rest_framework import serializers
from .models import OnlineSession

class OnlineSessionSerializer(
    serializers.ModelSerializer
):

    class Meta:

        model=OnlineSession

        fields="__all__"