from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Courses
from users.models import Users
from .serializers import CoursesSerializer
from users.serializers import UsersSerializer
from attendance.models import Attendance
from enrollments.models import Enrollment
from datetime import timedelta

@api_view(['POST'])
def create_course(request):

    admin_id = request.data.get(
        "admin_id"
    )

    if not admin_id:

        return Response({

            "message":
            "Admin ID Missing"

        })

    try:

        admin = Users.objects.get(
            id=admin_id
        )

    except Users.DoesNotExist:

        return Response({

            "message":
            "Admin Not Found"

        })

    serializer = CoursesSerializer(
        data=request.data
    )

    if serializer.is_valid():

        serializer.save(
            organization=
            admin.organization
        )

        return Response(
            serializer.data
        )

    return Response(
        serializer.errors
    )
@api_view(['GET'])
def get_courses(request, admin_id):

    admin = Users.objects.get(
        id=admin_id
    )

    courses = Courses.objects.filter(

        organization=
        admin.organization

    )

    serializer = CoursesSerializer(

        courses,

        many=True

    )

    return Response(
        serializer.data
    )

@api_view(['GET'])
def get_course(request,pk):
    course=Courses.objects.get(id=pk)
    serializer=CoursesSerializer(
        course
    )
    return Response(serializer.data)



@api_view(['PUT'])
def edit_course(request,pk):

    course = Courses.objects.get(
        id=pk
    )

    serializer = CoursesSerializer(

        course,

        data=request.data
    )

    if serializer.is_valid():

        serializer.save()

        course.refresh_from_db()

        Attendance.objects.filter(
        course=course,
        attendance_date__lt=course.start_date
        ).delete()

        Attendance.objects.filter(
        course=course,
        attendance_date__gt=course.end_date
        ).delete()

        Attendance.objects.filter(

            course=course,

            attendance_date__gt=
            course.end_date

        ).delete()

        enrollments = Enrollment.objects.filter(
            course=course
        )

        for enrollment in enrollments:

            current_date = course.start_date

            while current_date <= course.end_date:

                Attendance.objects.get_or_create(

                    student=
                    enrollment.student,

                    course=course,

                    attendance_date=
                    current_date,

                    defaults={

                        "status":
                        "None"

                    }

                )

                current_date += timedelta(
                    days=1
                )

        return Response(
            serializer.data
        )

    return Response(
        serializer.errors
    )




@api_view(['GET'])
def get_available_teachers(request, pk):

    course = Courses.objects.get(id=pk)

    teachers = Users.objects.filter(

    role="teacher",

    organization=
    course.organization

    )
    available_teachers = []

    current_program = (
        course.title
        .split("(")[0]
        .strip()
        .lower()
    )

    for teacher in teachers:
        if course.teacher == teacher:
            continue
        assigned_courses = Courses.objects.filter(
        teacher=teacher
        ).exclude(
        id=course.id
        )

        
        if not assigned_courses.exists():

            available_teachers.append(
                teacher
            )

        else:

            same_course_allowed = False

            for assigned_course in assigned_courses:

                assigned_program = (
                    assigned_course.title
                    .split("(")[0]
                    .strip()
                    .lower()
                )

                if (
                    assigned_program == current_program
                    and
                    assigned_course.mode == course.mode
                ):

                    same_course_allowed = True
                    break

            if same_course_allowed:

                available_teachers.append(
                    teacher
                )

    serializer = UsersSerializer(
        available_teachers,
        many=True
    )

    return Response(
        serializer.data
    )

@api_view(['PUT'])
def assign_teacher(request,pk):
    course=Courses.objects.get(id=pk)
    teacher_id=request.data.get('teacher')
    if teacher_id=="":
        course.teacher=None
    else:
        teacher=Users.objects.get(id=teacher_id)
        course.teacher=teacher
    course.save()
    return Response({
        "message":"Teacher Assigned Successfully"
    })

@api_view(['GET'])
def my_course(request,teacher_id):

    course=Courses.objects.filter(
        teacher_id=teacher_id
    ).first()

    if not course:

        return Response({
            "message":"No Course Assigned"
        })

    return Response({

        "id":course.id,
        "title":course.title,
        "description":course.description,
        "fees":course.fees,
        "duration":course.duration,
        "location":course.location,
        "room_no":course.room_no,
        "mode":course.mode,

    })