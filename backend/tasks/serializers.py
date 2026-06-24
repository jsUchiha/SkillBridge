from rest_framework import serializers
from .models import Task,TaskSubmission

class TaskSerializer(serializers.ModelSerializer):

    class Meta:
        model=Task
        fields="__all__"

class TaskSubmissionSerializer(serializers.ModelSerializer):

    class Meta:
        model=TaskSubmission
        fields="__all__"