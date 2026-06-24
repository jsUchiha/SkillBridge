from django.db import models
from users.models import Users
from courses.models import Courses

class Announcement(models.Model):

    title=models.CharField(
        max_length=200
    )

    message=models.TextField()

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