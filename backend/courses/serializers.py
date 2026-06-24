from rest_framework import serializers
from .models import Courses

class CoursesSerializer(serializers.ModelSerializer):
    teacher_name=serializers.CharField(
        source='teacher.name',
        read_only=True
    )
    class Meta:
        model=Courses
        fields=[
            'id',
            'title',
            'description',
            'fees',
            'duration',
            'mode',
            'location',
            'room_no',
            'start_date',
            'end_date',
            'teacher',
            'teacher_name'
        ]
