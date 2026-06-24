from django.db import models
from courses.models import Courses
from users.models import Users

class OnlineSession(models.Model):

    title=models.CharField(
        max_length=200
    )

    description=models.TextField()

    meet_link=models.URLField()

    session_date=models.DateField()

    session_time=models.TimeField()

    course=models.ForeignKey(
        Courses,
        on_delete=models.CASCADE
    )

    teacher=models.ForeignKey(
        Users,
        on_delete=models.CASCADE
    )

    created_at=models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):

        return self.title