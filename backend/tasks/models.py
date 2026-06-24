from django.db import models
from courses.models import Courses
from users.models import Users

class Task(models.Model):

    title=models.CharField(max_length=100)

    description=models.TextField()

    due_date=models.DateField()

    course=models.ForeignKey(
        Courses,
        on_delete=models.CASCADE
    )

    teacher=models.ForeignKey(
        Users,
        on_delete=models.CASCADE
    )


    def __str__(self):
        return self.title
    



class TaskSubmission(models.Model):

    SUBMISSION_CHOICES=[
        ('Github','Github'),
        ('Google Drive','Google Drive'),
        ('Other','Other')
    ]

    task=models.ForeignKey(
        Task,
        on_delete=models.CASCADE
    )

    student=models.ForeignKey(
        Users,
        on_delete=models.CASCADE
    )

    submission_type=models.CharField(
        max_length=50,
        choices=SUBMISSION_CHOICES
    )

    submission_link=models.URLField()

    submitted_at=models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.student.name