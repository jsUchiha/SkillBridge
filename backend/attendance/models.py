from django.db import models
from users.models import Users
from courses.models import Courses

class Attendance(models.Model):

    STATUS_CHOICES = [

        ('Present', 'Present'),
        ('Absent', 'Absent'),
        ('None', 'None')

    ]

    student = models.ForeignKey(
        Users,
        on_delete=models.CASCADE
    )

    course = models.ForeignKey(
        Courses,
        on_delete=models.CASCADE
    )

    attendance_date = models.DateField()

    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='None'
    )

    class Meta:

        unique_together = (
            'student',
            'course',
            'attendance_date'
        )

    def __str__(self):

        return (

            f"{self.student.name}"

            f" - "

            f"{self.attendance_date}"

            f" - "

            f"{self.status}"

        )