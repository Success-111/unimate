from rest_framework import generics
from .models import Material
from .serializers import MaterialSerializer

class MaterialListView(generics.ListAPIView):
    serializer_class = MaterialSerializer

    def get_queryset(self):
        qs = Material.objects.all()

        course = self.request.GET.get("course")
        category = self.request.GET.get("category")

        if course:
            qs = qs.filter(course__course_code__iexact=course)

        if category:
            qs = qs.filter(category=category)

        return qs
