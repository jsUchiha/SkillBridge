from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Announcement
from .serializers import AnnouncementSerializer

from users.models import Users
from courses.models import Courses
from enrollments.models import Enrollment


@api_view(['POST'])
def create_announcement(request):

    teacher = Users.objects.get(
        id=request.data.get(
            'teacher'
        )
    )

    course = Courses.objects.filter(
        teacher=teacher
    ).first()

    if not course:

        return Response({

            "message":
            "No Course Assigned"

        })

    announcement = Announcement.objects.create(

        title=request.data.get(
            'title'
        ),

        message=request.data.get(
            'message'
        ),

        teacher=teacher,

        course=course

    )

    serializer = AnnouncementSerializer(
        announcement
    )

    return Response(
        serializer.data
    )


@api_view(['GET'])
def student_announcements(
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

    announcements = Announcement.objects.filter(
        teacher_id__in=teacher_ids
    ).distinct()

    serializer = AnnouncementSerializer(
        announcements,
        many=True
    )

    return Response(
        serializer.data
    )


@api_view(['GET'])
def teacher_announcements(
    request,
    teacher_id
):

    announcements = Announcement.objects.filter(
        teacher_id=teacher_id
    )

    serializer = AnnouncementSerializer(
        announcements,
        many=True
    )

    return Response(
        serializer.data
    )


@api_view(['DELETE'])
def delete_announcement(
    request,
    pk
):

    announcement = Announcement.objects.get(
        id=pk
    )

    announcement.delete()

    return Response({

        "message":
        "Announcement Deleted Successfully"

    })


@api_view(['GET'])
def get_announcement(
    request,
    pk
):

    announcement = Announcement.objects.get(
        id=pk
    )

    serializer = AnnouncementSerializer(
        announcement
    )

    return Response(
        serializer.data
    )


@api_view(['PUT'])
def update_announcement(
    request,
    pk
):

    announcement = Announcement.objects.get(
        id=pk
    )

    serializer = AnnouncementSerializer(

        announcement,

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