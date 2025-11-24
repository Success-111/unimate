from django.db import models
from students.models import Course

# Create your models here.
class Material(models.Model):
    MATERIAL_TYPES = [
        ('NOTE', 'Note'),
        ('SLIDE', 'Slide'),
        ('PAST', 'Past Question'),
        ('EBOOK', 'Ebook'),
    ]

    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="materials")
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=10, choices=MATERIAL_TYPES)
    pdf = models.FileField(upload_to='materials/pdfs/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.get_category_display()}) for {self.course.course_code}"