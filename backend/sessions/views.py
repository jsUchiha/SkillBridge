from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import OnlineSession
from .serializers import OnlineSessionSerializer

from users.models import Users
from courses.models import Courses
from enrollments.models import Enrollment

@api_view(['POST'])
def create_session(request):

    serializer=OnlineSessionSerializer(
        data=request.data
    )

    if serializer.is_valid():

        serializer.save()

        return Response(
            serializer.data
        )

    return Response(
        serializer.errors
    )

@api_view(['GET'])
def teacher_sessions(
    request,
    teacher_id
):

    sessions=OnlineSession.objects.filter(
        teacher_id=teacher_id
    )

    serializer=OnlineSessionSerializer(
        sessions,
        many=True
    )

    return Response(
        serializer.data
    )


@api_view(['GET'])
def student_sessions(
    request,
    student_id
):

    enrollments = Enrollment.objects.filter(
        student_id=student_id
    )

    if not enrollments.exists():

        return Response([])

    teacher_ids = Courses.objects.filter(

        id__in=enrollments.values_list(
            'course_id',
            flat=True
        )

    ).values_list(
        'teacher_id',
        flat=True
    )

    sessions = OnlineSession.objects.filter(
        teacher_id__in=teacher_ids
    ).distinct()

    serializer = OnlineSessionSerializer(
        sessions,
        many=True
    )

    return Response(
        serializer.data
    )
@api_view(['GET'])
def get_session(request,id):

    session = OnlineSession.objects.get(
        id=id
    )

    serializer = OnlineSessionSerializer(
        session
    )

    return Response(
        serializer.data
    )

@api_view(['PUT'])
def update_session(request,id):

    session = OnlineSession.objects.get(
        id=id
    )

    serializer = OnlineSessionSerializer(

        session,

        data=request.data,

        partial=True

    )

    if serializer.is_valid():

        serializer.save()

        return Response(
            serializer.data
        )

    return Response(
        serializer.errors,
        status=400
    )

@api_view(['DELETE'])
def delete_session(request,id):

    session = OnlineSession.objects.get(
        id=id
    )

    session.delete()

    return Response({

        "message":
        "Session Deleted"

    })