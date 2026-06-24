from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Task
from .serializers import TaskSerializer

from users.models import Users
from courses.models import Courses
from enrollments.models import Enrollment
from .models import TaskSubmission
from .serializers import TaskSubmissionSerializer

@api_view(['POST'])
def create_task(request):

    teacher_id=request.data.get(
        'teacher'
    )

    teacher=Users.objects.get(
        id=teacher_id
    )

    course=Courses.objects.filter(
        teacher=teacher
    ).first()

    if not course:

        return Response({
            "message":"No Course Assigned"
        })

    task=Task.objects.create(

        title=request.data.get(
            'title'
        ),

        description=request.data.get(
            'description'
        ),

        due_date=request.data.get(
            'due_date'
        ),

        teacher=teacher,

        course=course

    )

    serializer=TaskSerializer(task)

    return Response(
        serializer.data
    )

@api_view(['GET'])
def get_tasks(request):

    tasks=Task.objects.all()

    serializer=TaskSerializer(
        tasks,
        many=True
    )

    return Response(
        serializer.data
    )

@api_view(['GET'])
def get_task(request,pk):

    task=Task.objects.get(
        id=pk
    )

    serializer=TaskSerializer(task)

    return Response(
        serializer.data
    )
@api_view(['GET'])
def teacher_tasks(request,teacher_id):

    tasks=Task.objects.filter(
        teacher_id=teacher_id
    )

    serializer=TaskSerializer(
        tasks,
        many=True
    )

    return Response(
        serializer.data
    )

@api_view(['GET'])
def student_tasks(request, student_id):

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

    tasks = Task.objects.filter(
        teacher_id__in=teacher_ids
    ).distinct()

    serializer = TaskSerializer(
        tasks,
        many=True
    )

    return Response(
        serializer.data
    )

@api_view(['POST'])
def submit_task(request):

    serializer=TaskSubmissionSerializer(
        data=request.data
    )

    if serializer.is_valid():

        serializer.save()

        return Response({

            "message":
            "Task Submitted Successfully"

        })

    return Response(
        serializer.errors
    )

@api_view(['GET'])
def view_submissions(request,teacher_id):

    submissions=TaskSubmission.objects.filter(
        task__teacher_id=teacher_id
    )

    data=[]

    for submission in submissions:

        data.append({

            "id":submission.id,

            "task_title":
            submission.task.title,

            "student_name":
            submission.student.name,

            "student_email":
            submission.student.email,

            "submission_type":
            submission.submission_type,

            "submission_link":
            submission.submission_link,

            "submitted_at":
            submission.submitted_at

        })

    return Response(data)

@api_view(['PUT'])
def update_task(request,pk):

    task=Task.objects.get(
        id=pk
    )

    serializer=TaskSerializer(
        task,
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

@api_view(['DELETE'])
def delete_task(request,pk):

    task=Task.objects.get(
        id=pk
    )

    task.delete()

    return Response({

        "message":
        "Task Deleted Successfully"

    })