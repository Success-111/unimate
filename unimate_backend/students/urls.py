from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    RegisterView, UserDetailView,
    UniversityListView, FacultyListView,
    DepartmentListView, LevelListView, SemesterListView, VerifyView
)

urlpatterns = [
    # AUTH
    path("auth/register/", RegisterView.as_view(), name="register"),
    path("auth/login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("auth/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("auth/user/", UserDetailView.as_view(), name="user_detail"),
    path("auth/verify/", VerifyView.as_view(), name="verify"),

    # LOOKUPS
    path("universities/", UniversityListView.as_view(), name="universities"),
    path("faculties/", FacultyListView.as_view(), name="faculties"),
    path("departments/", DepartmentListView.as_view(), name="departments"),
    path("levels/", LevelListView.as_view(), name="levels"),
    path("semesters/", SemesterListView.as_view(), name="semesters"),
]
