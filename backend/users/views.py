from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UsersSerializer
from .models import Users
from organizations.models import Organization
from django.contrib.auth.hashers import (
    make_password,
    check_password
)
from profiles.models import Profile

@api_view(['POST'])
def register_user(request):

    organization_code = request.data.get(
        "organization_code"
    )

    try:

        organization = Organization.objects.get(
            code=organization_code
        )

    except Organization.DoesNotExist:

        return Response({

            "success":False,

            "message":
            "Invalid Organization Code"

        })

    if Users.objects.filter(

        email=request.data.get(
            "email"
        ),

        organization=organization

    ).exists():

        return Response({

            "success":False,

            "message":
            "Email Already Registered"

        })

    user = Users.objects.create(

        organization=organization,

        name=request.data.get(
            "name"
        ),

        email=request.data.get(
            "email"
        ),

        password=make_password(

            request.data.get(
                "password"
            )

        ),

        role="student"

    )

    serializer = UsersSerializer(
        user
    )

    return Response({

        "success":True,

        "data":serializer.data

    })

@api_view(['POST'])
def create_organization(request):

    organization = Organization.objects.create(

        name=request.data.get(
            "organization_name"
        )

    )

    admin = Users.objects.create(

        organization=organization,

        name=request.data.get(
            "admin_name"
        ),

        email=request.data.get(
            "email"
        ),

        password=make_password(
        request.data.get(
        "password"
        )
        ),

        role="admin"

    )

    return Response({

        "success":True,

        "organization_code":
        organization.code

    })

@api_view(['POST'])
def login_user(request):

    email = request.data.get(
        "email"
    )

    password = request.data.get(
        "password"
    )

    try:

        user = Users.objects.get(
            email=email
        )

        if check_password(

            password,

            user.password

        ):

            profile_completed = False

            try:

                profile = Profile.objects.get(
                    user=user
                )

                profile_completed = (
                    profile.profile_completed
                )

            except Profile.DoesNotExist:

                pass

            return Response({

                "success": True,

                "message":
                "Login Successful",

                "id": user.id,

                "name": user.name,

                "email": user.email,

                "role": user.role,

                "profile_completed":
                profile_completed

            })

        return Response({

            "success": False,

            "message":
            "Invalid Password"

        })

    except Users.DoesNotExist:

        return Response({

            "success": False,

            "message":
            "User Not Found"

        })
    
@api_view(['POST'])
def create_teacher(request):

    admin = Users.objects.get(
        id=request.data.get(
            "admin_id"
        )
    )

    if Users.objects.filter(

        email=request.data.get(
            "email"
        ),

        organization=
        admin.organization

    ).exists():

        return Response({

            "success":False,

            "message":
            "Email Already Registered"

        })

    teacher = Users.objects.create(

        organization=
        admin.organization,

        name=request.data.get(
            "name"
        ),

        email=request.data.get(
            "email"
        ),

        password=make_password(

            request.data.get(
                "password"
            )

        ),

        role="teacher"

    )

    serializer = UsersSerializer(
        teacher
    )

    return Response({

        "success":True,

        "data":
        serializer.data

    })


@api_view(['GET'])
def get_teachers(request, admin_id):

    admin = Users.objects.get(
        id=admin_id
    )

    teachers = Users.objects.filter(

        role="teacher",

        organization=
        admin.organization

    )

    serializer = UsersSerializer(

        teachers,

        many=True

    )

    return Response(
        serializer.data
    )


@api_view(['DELETE'])
def delete_teacher(request, teacher_id):

    Users.objects.filter(
        id=teacher_id,
        role="teacher"
    ).delete()

    return Response({

        "message":
        "Mentor Deleted"

    })