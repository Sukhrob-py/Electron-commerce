from rest_framework import serializers

from .models import Cart


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
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
