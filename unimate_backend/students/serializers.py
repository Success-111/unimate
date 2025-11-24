from rest_framework import serializers
from django.contrib.auth.models import User
from .models import (
    University, Faculty, Department, Level, Semester, Profile
)

# -------------------- UNIVERSITY → SEMESTER SERIALIZERS --------------------

class UniversitySerializer(serializers.ModelSerializer):
    class Meta:
        model = University
        fields = ("id", "name")


class FacultySerializer(serializers.ModelSerializer):
    class Meta:
        model = Faculty
        fields = ("id", "name", "university")


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ("id", "name", "faculty")


class LevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Level
        fields = ("id", "name", "department")


class SemesterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Semester
        fields = ("id", "name", "level")


# ----------------------------- PROFILE SERIALIZER -----------------------------

class ProfileSerializer(serializers.ModelSerializer):

    university = UniversitySerializer(read_only=True)
    faculty = FacultySerializer(read_only=True)
    department = DepartmentSerializer(read_only=True)
    level = LevelSerializer(read_only=True)
    semester = SemesterSerializer(read_only=True)

    university_id = serializers.PrimaryKeyRelatedField(
        queryset=University.objects.all(), write_only=True, required=False, source="university"
    )
    faculty_id = serializers.PrimaryKeyRelatedField(
        queryset=Faculty.objects.all(), write_only=True, required=False, source="faculty"
    )
    department_id = serializers.PrimaryKeyRelatedField(
        queryset=Department.objects.all(), write_only=True, required=False, source="department"
    )
    level_id = serializers.PrimaryKeyRelatedField(
        queryset=Level.objects.all(), write_only=True, required=False, source="level"
    )
    semester_id = serializers.PrimaryKeyRelatedField(
        queryset=Semester.objects.all(), write_only=True, required=False, source="semester"
    )

    class Meta:
        model = Profile
        fields = (
            "university", "faculty", "department",
            "level", "semester",
            "university_id", "faculty_id",
            "department_id", "level_id", "semester_id",
        )


# ----------------------------- USER SERIALIZER -----------------------------

class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ("id", "username", "email", "first_name", "last_name", "profile")


# --------------------------- REGISTER SERIALIZER ---------------------------

class RegisterSerializer(serializers.ModelSerializer):
    university_id = serializers.PrimaryKeyRelatedField(
        queryset=University.objects.all(), write_only=True, allow_null=True
    )
    faculty_id = serializers.PrimaryKeyRelatedField(
        queryset=Faculty.objects.all(), write_only=True, allow_null=True
    )
    department_id = serializers.PrimaryKeyRelatedField(
        queryset=Department.objects.all(), write_only=True, allow_null=True
    )
    level_id = serializers.PrimaryKeyRelatedField(
        queryset=Level.objects.all(), write_only=True, allow_null=True
    )
    semester_id = serializers.PrimaryKeyRelatedField(
        queryset=Semester.objects.all(), write_only=True, allow_null=True
    )

    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = (
            "username", "password", "email",
            "first_name", "last_name",
            "university_id", "faculty_id", "department_id",
            "level_id", "semester_id",
        )

    def create(self, validated_data):
        uni = validated_data.pop("university_id", None)
        faculty = validated_data.pop("faculty_id", None)
        department = validated_data.pop("department_id", None)
        level = validated_data.pop("level_id", None)
        semester = validated_data.pop("semester_id", None)

        password = validated_data.pop("password")

        user = User(**validated_data)
        user.set_password(password)
        user.save()

        Profile.objects.create(
            user=user,
            university=uni,
            faculty=faculty,
            department=department,
            level=level,
            semester=semester,
        )

        return user
