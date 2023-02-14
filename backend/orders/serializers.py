from rest_framework import serializers

from .models import Order


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = (
            'product_yuid',
            'yuid',
            'quantity'
        )

    def create(self, validated_data):
        return super().create(validated_data)

    def validate(self, attrs):
        attrs['customer'] = self.context['request'].user
        return attrs
