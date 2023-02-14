from rest_framework import serializers

from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = (
            'category',
            'cost',
            'title',
            'photo',
            'desc',
            'brand',
            'yuid'
        )

    def create(self, validated_data):
        return super().create(validated_data)

    def validate(self, attrs):
        attrs['owner'] = self.context['request'].user
        return attrs

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['owner'] = str(instance.owner)
        return data
