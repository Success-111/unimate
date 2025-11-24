from rest_framework import generics
from rest_framework.permissions import AllowAny
from .models import University, Faculty, Department, Level, Semester
from .serializers import (
    UniversitySerializer,
    FacultySerializer,
    DepartmentSerializer,
    LevelSerializer,
    SemesterSerializer,
)

# ----- PUBLIC LOOKUP ENDPOINTS -----

class UniversityListView(generics.ListAPIView):
    queryset = University.objects.all()
    serializer_class = UniversitySerializer
    permission_classes = [AllowAny]


class FacultyListView(generics.ListAPIView):
    serializer_class = FacultySerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = Faculty.objects.all()
        university = self.request.query_params.get("university")
        if university:
            queryset = queryset.filter(university_id=university)
        return queryset


class DepartmentListView(generics.ListAPIView):
    serializer_class = DepartmentSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = Department.objects.all()
        faculty = self.request.query_params.get("faculty")
        if faculty:
            queryset = queryset.filter(faculty_id=faculty)
        return queryset


class LevelListView(generics.ListAPIView):
    serializer_class = LevelSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = Level.objects.all()
        department = self.request.query_params.get("department")
        if department:
            queryset = queryset.filter(department_id=department)
        return queryset


class SemesterListView(generics.ListAPIView):
    serializer_class = SemesterSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = Semester.objects.all()
        level = self.request.query_params.get("level")
        if level:
            queryset = queryset.filter(level_id=level)
        return queryset
