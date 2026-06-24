from django.db import models
from organizations.models import Organization

class Users(models.Model):

    organization=models.ForeignKey(

        Organization,

        on_delete=models.CASCADE,

        null=True,

        blank=True

    )

    name=models.CharField(
        max_length=100
    )

    email=models.EmailField()

    password=models.CharField(
        max_length=100
    )

    role=models.CharField(

        max_length=20,

        choices=[

            ('admin','Admin'),

            ('teacher','Teacher'),

            ('student','Student')

        ],

        default='student'

    )

    def __str__(self):

        return self.name