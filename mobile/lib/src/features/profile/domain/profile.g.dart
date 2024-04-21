// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'profile.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$ProfileImpl _$$ProfileImplFromJson(Map<String, dynamic> json) =>
    _$ProfileImpl(
      json['user_id'] as String,
      json['username'] as String,
      json['avatar_url'] as String?,
      json['order_id'] as int,
    );

Map<String, dynamic> _$$ProfileImplToJson(_$ProfileImpl instance) =>
    <String, dynamic>{
      'user_id': instance.id,
      'username': instance.username,
      'avatar_url': instance.avatarUrl,
      'order_id': instance.order,
    };
