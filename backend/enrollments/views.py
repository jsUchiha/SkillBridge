from users.models import Users
from courses.models import Courses
from .models import Enrollment
from rest_framework.decorators import api_view
from rest_framework.response import Response
from datetime import timedelta
from attendance.models import Attendance


@api_view(['GET'])
def get_available_students(request, pk):

    course = Courses.objects.get(
    id=pk
    )

    assigned_students = Enrollment.objects.values_list(
    'student_id',
    flat=True
    )

    students = Users.objects.filter(

    role='student',

    organization=
    course.organization

    ).exclude(

    id__in=assigned_students

    )   

    data = []

    for student in students:

        data.append({

            'id': student.id,

            'name': student.name,

            'email': student.email

        })

    return Response(data)

@api_view(['GET'])
def get_enrolled_students(request, pk):

    enrollments = Enrollment.objects.filter(
        course_id=pk
    )

    data = []

    for enrollment in enrollments:

        data.append({

            'id': enrollment.student.id,

            'name': enrollment.student.name,

            'email': enrollment.student.email

        })

    return Response(data)

@api_view(['POST'])
def assign_student(request, pk):

    student_id = request.data.get(
        'student'
    )

    student = Users.objects.get(
        id=student_id
    )

    course = Courses.objects.get(
        id=pk
    )

    if Enrollment.objects.filter(
    student=student
    ).exists():

        return Response({

        "message":
        "Learner Already Assigned To Another Program"

        })

    Enrollment.objects.create(

    student=student,

    course=course

    )

    current_date = course.start_date

    while current_date <= course.end_date:

        Attendance.objects.get_or_create(

            student=student,

            course=course,

            attendance_date=current_date,

            defaults={

                "status": "None"

            }

        )

        current_date += timedelta(
            days=1
        )

    return Response({

        "message":
        "Student Assigned Successfully"

    })

@api_view(['DELETE'])
def remove_student(
    request,
    course_id,
    student_id
):

    Enrollment.objects.filter(

        course_id=course_id,

        student_id=student_id

    ).delete()

    return Response({

        "message":
        "Student Removed Successfully"

    })

@api_view(['GET'])
def teacher_students(request, teacher_id):

    courses = Courses.objects.filter(
        teacher_id=teacher_id
    )

    if not courses.exists():

        return Response([])

    enrollments = Enrollment.objects.filter(
        course__in=courses
    )

    data = []

    for enrollment in enrollments:

        data.append({

            "id": enrollment.student.id,

            "name": enrollment.student.name,

            "email": enrollment.student.email,

            "course": enrollment.course.title

        })

    return Response(data)

@api_view(['GET'])
def student_course(request,student_id):

    enrollment=Enrollment.objects.filter(
        student_id=student_id
    ).first()

    if not enrollment:

        return Response({

            "message":
            "No Course Assigned"

        })

    course=enrollment.course

    return Response({

        "title":course.title,

        "description":course.description,

        "fees":course.fees,

        "duration":course.duration,

        "location":course.location,

        "room_no":course.room_no,

        "start_date":course.start_date,

        "end_date":course.end_date,
        
        "mode":course.mode

    })