from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from users.models import Users


@api_view(['GET'])
def organization_details(
    request,
    admin_id
):

    admin = Users.objects.get(
        id=admin_id
    )

    return Response({

        "organization_name":
        admin.organization.name,

        "organization_code":
        admin.organization.code

    })