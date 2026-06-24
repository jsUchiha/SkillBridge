from django.db import models
from users.models import Users

class Profile(models.Model):

    user = models.OneToOneField(
        Users,
        on_delete=models.CASCADE
    )

    profile_completed = models.BooleanField(
        default=False
    )

    date_of_birth = models.DateField(
        null=True,
        blank=True
    )

    phone = models.CharField(
        max_length=20,
        blank=True
    )

    address = models.TextField(
        blank=True
    )

    gender = models.CharField(
        max_length=20,
        blank=True
    )

    college_name = models.CharField(
        max_length=200,
        blank=True
    )

    department = models.CharField(
        max_length=100,
        blank=True
    )

    register_number = models.CharField(
        max_length=100,
        blank=True
    )

    year_of_study = models.CharField(
        max_length=50,
        blank=True
    )

    linkedin = models.URLField(
        blank=True
    )

    github = models.URLField(
        blank=True
    )

    qualification = models.CharField(
        max_length=200,
        blank=True
    )

    specialization = models.CharField(
        max_length=200,
        blank=True
    )

    experience = models.CharField(
        max_length=100,
        blank=True
    )

    bank_account = models.CharField(
        max_length=100,
        blank=True
    )

    ifsc_code = models.CharField(
        max_length=50,
        blank=True
    )

    account_holder = models.CharField(
        max_length=200,
        blank=True
    )

    def __str__(self):

        return self.user.name