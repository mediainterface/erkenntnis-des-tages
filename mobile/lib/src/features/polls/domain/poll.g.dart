// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'poll.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$PollImpl _$$PollImplFromJson(Map<String, dynamic> json) => _$PollImpl(
      json['id'] as String,
      json['is_closed'] as bool? ?? false,
      DateTime.parse(json['created_at'] as String),
    );

Map<String, dynamic> _$$PollImplToJson(_$PollImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'is_closed': instance.isClosed,
      'created_at': instance.createdAt.toIso8601String(),
    };
