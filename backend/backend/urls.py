"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from users.views import *
from courses.views import *
from enrollments.views import *
from tasks.views import *
from announcements.views import *
from sessions.views import *
from attendance.views import *
from users.views import create_organization
from profiles.views import *
from organizations.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('register/',register_user),
    path('login/',login_user),
    path('create-course/',create_course),
    path('get-courses/<int:admin_id>/',get_courses),
    path('get-course/<int:pk>/',get_course),
    path('edit-course/<int:pk>/',edit_course),
    path('get-available-teachers/<int:pk>/',get_available_teachers),
    path('assign-teacher/<int:pk>/',assign_teacher),
    path('available-students/<int:pk>/',get_available_students),
    path('enrolled-students/<int:pk>/',get_enrolled_students),
    path('assign-student/<int:pk>/',assign_student),
    path('remove-student/<int:course_id>/<int:student_id>/',remove_student),
    path('create-task/',create_task),
    path('my-course/<int:teacher_id>',my_course),
    path('teacher-students/<int:teacher_id>',teacher_students),
    path('teacher-tasks/<int:teacher_id>',teacher_tasks),
    path('student-tasks/<int:student_id>',student_tasks),
    path('submit-task/',submit_task),
    path('student-course/<int:student_id>',student_course),
    path('view-submissions/<int:teacher_id>',view_submissions),
    path('update-task/<int:pk>/',update_task),
    path('delete-task/<int:pk>/',delete_task),
    path('get-task/<int:pk>/',get_task),
    path('get-tasks/<int:pk>/',get_tasks),
    path('create-announcement/',create_announcement),
    path('student-announcements/<int:student_id>/',student_announcements),
    path('teacher-announcements/<int:teacher_id>/',teacher_announcements),
    path('delete-announcement/<int:pk>/',delete_announcement),
    path('get-announcement/<int:pk>/',get_announcement),
    path('update-announcement/<int:pk>/',update_announcement),
    path('create-session/',create_session),
    path('teacher-sessions/<int:teacher_id>/',teacher_sessions),
    path('student-sessions/<int:student_id>/',student_sessions),
    path("delete-session/<int:id>/",delete_session),
    path("update-session/<int:id>/",update_session),
    path("get-session/<int:id>/",get_session),
    path("attendance-data/<int:teacher_id>/",attendance_page_data),
    path('teacher-attendance-courses/<int:teacher_id>/',teacher_attendance_courses),
    path('attendance-sheet/<int:course_id>/',attendance_sheet),
    path('update-attendance/<int:attendance_id>/',update_attendance),
    path('student-attendance/<int:student_id>/',student_attendance),
    path('create-organization/',create_organization),
    path('create-teacher/',create_teacher),
    path('get-teachers/<int:admin_id>/',get_teachers),
    path('delete-teacher/<int:teacher_id>/',delete_teacher),
    path('check-profile/<int:user_id>/',check_profile),
    path('create-profile/',create_profile),
    path('get-profile/<int:user_id>/',get_profile),
    path('profile/<int:user_id>/',get_profile),
    path('update-profile/<int:user_id>/',update_profile),
    path('organization-details/<int:admin_id>/',organization_details)
    
]
