from django.db import models
from users.models import Users
from courses.models import Courses

class Enrollment(models.Model):

    student = models.ForeignKey(
        Users,
        on_delete=models.CASCADE,
        limit_choices_to={
            'role':'student'
        }
    )

    course = models.ForeignKey(
        Courses,
        on_delete=models.CASCADE
    )

    def __str__(self):

        return (
            f"{self.student.name}"
            f" - "
            f"{self.course.title}"
        )