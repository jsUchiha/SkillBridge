from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Profile
from .serializers import ProfileSerializer

from users.models import Users


@api_view(['GET'])
def check_profile(request,user_id):

    try:

        profile = Profile.objects.get(
            user_id=user_id
        )

        return Response({

            "completed":
            profile.profile_completed

        })

    except Profile.DoesNotExist:

        return Response({

            "completed":
            False

        })


@api_view(['POST'])
def create_profile(request):

    user = Users.objects.get(

        id=request.data.get(
            "user"
        )

    )

    profile,created = Profile.objects.get_or_create(

        user=user

    )

    serializer = ProfileSerializer(

        profile,

        data=request.data,

        partial=True

    )

    if serializer.is_valid():

        serializer.save(

            profile_completed=True

        )

        return Response(

            serializer.data

        )

    return Response(

        serializer.errors

    )


@api_view(['GET'])
def get_profile(request,user_id):

    profile = Profile.objects.get(
        user_id=user_id
    )

    serializer = ProfileSerializer(
        profile
    )

    return Response(
        serializer.data
    )

@api_view(['PUT'])
def update_profile(request,user_id):

    profile = Profile.objects.get(
        user_id=user_id
    )

    serializer = ProfileSerializer(

        profile,

        data=request.data,

        partial=True

    )

    if serializer.is_valid():

        serializer.save()

        return Response({

            "success":True,

            "message":
            "Profile Updated Successfully",

            "data":
            serializer.data

        })

    return Response({

        "success":False,

        "errors":
        serializer.errors

    })
