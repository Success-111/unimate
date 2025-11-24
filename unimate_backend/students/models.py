from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class University(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return f"{self.name}"

class Faculty(models.Model):
    university = models.ForeignKey(University, on_delete=models.CASCADE, related_name="faculties")
    name = models.CharField(max_length=200)    

    def __str__(self):
        return f"{self.name} - {self.university.name}"
    
class Department(models.Model):
    faculty = models.ForeignKey(Faculty, on_delete=models.CASCADE, related_name="departments")
    name = models.CharField(max_length=200)

    def __str__(self):
        return f"{self.name} - {self.faculty.name}"
    
class Level(models.Model):
    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name="levels")
    name = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.name} - {self.department.name}"
    
class Semester(models.Model):
    level = models.ForeignKey(Level, on_delete=models.CASCADE, related_name="semesters")
    name = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.name} Semester - {self.level.name}"
    
class Course(models.Model):
    semester = models.ForeignKey(Semester, on_delete=models.SET_NULL, null=True, related_name="courses")
    title = models.CharField(max_length=255)
    course_code = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.course_code} - {self.title}"
    
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    faculty = models.ForeignKey(Faculty, on_delete=models.SET_NULL, null=True, blank=True)
    university = models.ForeignKey(University, on_delete=models.SET_NULL, null=True, blank=True)
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, blank=True)
    level = models.ForeignKey(Level, on_delete=models.SET_NULL, null=True, blank=True)
    semester = models.ForeignKey(Semester, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"{self.user.username} Profile"
