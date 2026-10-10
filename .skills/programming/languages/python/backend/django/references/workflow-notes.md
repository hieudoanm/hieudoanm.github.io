# Workflow notes

Focused reference for **django-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

```python
from django.db import models

class Order(models.Model):
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=OrderStatus.choices)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [
            models.Index(fields=['user', 'created_at']),
        ]
```

- **Use explicit `on_delete`; index frequently queried fields.**
- **Migrations via `makemigrations`/`migrate` — never hand-alter schema.**
- **QuerySets in managers or services; keep views thin.**

---

## 4. Views & URLs

- **Class-based views for HTTP; URLconf maps to view classes:**

```python
# views.py
from django.views import View
from django.http import JsonResponse

class OrderListView(View):
    def get(self, request):
        orders = Order.objects.filter(user=request.user)
        return JsonResponse({'orders': list(orders.values())})

# urls.py
from django.urls import path
from .views import OrderListView

urlpatterns = [
    path('orders/', OrderListView.as_view(), name='order-list'),
]
```

- **REST views via Django REST Framework (DRF) for APIs:**
- **Thin views; business logic in services or model methods.**
- **URL namespacing per app to avoid conflicts.**

---

## 5. Django REST Framework

- **Serializers for input/output; ViewSets for CRUD:**

```python
from rest_framework import serializers, viewsets

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    queryset = Order.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
```

- **Serializers define API contracts; ViewSets provide standard CRUD.**
- **Permissions via DRF permission classes; authentication via JWT/session.**
- **Routers for ViewSet URL registration.**

---

## 6. Templates & Static Files

- **Templates in app `templates/` dirs; `extends` for base layouts:**
