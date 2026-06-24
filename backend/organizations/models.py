from django.db import models
import uuid

class Organization(models.Model):

    name=models.CharField(
        max_length=200
    )

    code=models.CharField(
        max_length=10,
        unique=True,
        blank=True
    )

    created_at=models.DateTimeField(
        auto_now_add=True
    )

    def save(self,*args,**kwargs):

        if not self.code:

            self.code=str(
                uuid.uuid4()
            )[:8].upper()

        super().save(
            *args,
            **kwargs
        )

    def __str__(self):

        return self.name