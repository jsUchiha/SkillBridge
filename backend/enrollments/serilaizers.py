from rest_framework import serializers
from .models import Enrollment

class EnrollmentSerializer(
    serializers.ModelSerializer
):

    student_name = serializers.CharField(
        source='student.name',
        read_only=True
    )

    course_title = serializers.CharField(
        source='course.title',
        read_only=True
    )

    class Meta:

        model = Enrollment

        fields = "__all__"