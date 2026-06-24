from django.db import models
from users.models import Users
from organizations.models import Organization

class Courses(models.Model):

    organization=models.ForeignKey(
        Organization,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )

    title=models.CharField(max_length=100)

    description=models.TextField()

    fees=models.IntegerField()

    duration=models.CharField(max_length=20)

    location=models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    room_no=models.CharField(
        max_length=20,
        blank=True,
        null=True
    )

    start_date=models.DateField()

    end_date=models.DateField()

    teacher=models.ForeignKey(
        Users,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        limit_choices_to={
            'role':'teacher'
        }
    )

    MODE_CHOICES=[
        ('Online','Online'),
        ('Hybrid','Hybrid')
    ]

    mode=models.CharField(
        max_length=20,
        choices=MODE_CHOICES,
        default='Hybrid'
    )

    def __str__(self):
        return self.title