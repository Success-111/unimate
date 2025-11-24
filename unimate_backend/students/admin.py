from django.contrib import admin
from .models import University, Faculty, Department, Level, Semester, Course, Profile

# Register your models here.
admin.site.register(University)
admin.site.register(Faculty)
admin.site.register(Department)
admin.site.register(Level)
admin.site.register(Semester)
admin.site.register(Course)
admin.site.register(Profile)