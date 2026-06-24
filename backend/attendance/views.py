from datetime import timedelta
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Attendance
from courses.models import Courses
from enrollments.models import Enrollment
from users.models import Users


@api_view(['GET'])
def attendance_page_data(request, teacher_id):

    course = Courses.objects.filter(
        teacher_id=teacher_id
    ).first()

    if not course:

        return Response({
            "message":"No Course Assigned"
        })

    students = Enrollment.objects.filter(
        course=course
    )

    student_data = []

    for item in students:

        student_data.append({

            "id":item.student.id,

            "name":item.student.name,

            "email":item.student.email

        })

    dates = []

    current_date = course.start_date

    while current_date <= course.end_date:

        dates.append(
            current_date.strftime("%Y-%m-%d")
        )

        current_date += timedelta(days=1)

    return Response({

        "course_id":course.id,

        "course_title":course.title,

        "dates":dates,

        "students":student_data

    })

@api_view(['GET'])
def teacher_attendance_courses(
    request,
    teacher_id
):

    courses = Courses.objects.filter(
        teacher_id=teacher_id
    )

    data = []

    for course in courses:

        data.append({

            "id": course.id,

            "title": course.title,

            "duration": course.duration,

            "start_date": course.start_date,

            "end_date": course.end_date

        })

    return Response(data)

@api_view(['GET'])
def attendance_sheet(request, course_id):

    course = Courses.objects.get(
        id=course_id
    )

    enrollments = Enrollment.objects.filter(
        course=course
    )

    dates = Attendance.objects.filter(
        course=course
    ).values_list(
        'attendance_date',
        flat=True
    ).distinct().order_by(
        'attendance_date'
    )

    students = []

    for enrollment in enrollments:

        records = Attendance.objects.filter(
            student=enrollment.student,
            course=course
        ).order_by(
            'attendance_date'
        )

        row = []

        for record in records:

            row.append({

                "id": record.id,

                "status": record.status,

                "date": record.attendance_date

            })

        students.append({

            "student_id":
            enrollment.student.id,

            "student_name":
            enrollment.student.name,

            "records":
            row

        })

    return Response({

        "course":
        course.title,

        "dates":
        dates,

        "students":
        students

    })

@api_view(['PUT'])
def update_attendance(
    request,
    attendance_id
):

    attendance = Attendance.objects.get(
        id=attendance_id
    )

    attendance.status = request.data.get(
        "status"
    )

    attendance.save()

    return Response({

        "message":
        "Attendance Updated"

    })

@api_view(['GET'])
def student_attendance(request, student_id):

    enrollment = Enrollment.objects.filter(
        student_id=student_id
    ).first()

    if not enrollment:

        return Response({

            "message":
            "No Course Assigned"

        })

    attendance_records = Attendance.objects.filter(

        student_id=student_id,

        course=enrollment.course

    ).order_by(
        'attendance_date'
    )

    present = attendance_records.filter(
        status='Present'
    ).count()

    absent = attendance_records.filter(
        status='Absent'
    ).count()

    working_days = present + absent

    percentage = 0

    if working_days > 0:

        percentage = round(

            (present / working_days) * 100,

            2

        )

    records = []

    for item in attendance_records:

        if item.status != "None":

            records.append({

                "date":
                item.attendance_date,

                "status":
                item.status

            })

    return Response({

        "course":
        enrollment.course.title,

        "percentage":
        percentage,

        "present":
        present,

        "absent":
        absent,

        "working_days":
        working_days,

        "records":
        records

    })