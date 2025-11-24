from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    RegisterView, UserDetailView,
    UniversityListView, FacultyListView,
    DepartmentListView, LevelListView, SemesterListView
)

urlpatterns = [
    # AUTH
    path("api/auth/register/", RegisterView.as_view()),
    path("api/auth/login/", TokenObtainPairView.as_view()),
    path("api/auth/refresh/", TokenRefreshView.as_view()),
    path("api/auth/user/", UserDetailView.as_view()),

    # LOOKUPS
    path("universities/", UniversityListView.as_view(), name="universities"),
    path("faculties/", FacultyListView.as_view(), name="faculties"),
    path("departments/", DepartmentListView.as_view(), name="departments"),
    path("levels/", LevelListView.as_view(), name="levels"),
    path("semesters/", SemesterListView.as_view(), name="semesters"),
]
