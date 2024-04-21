// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'poll_option.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$PollOptionImpl _$$PollOptionImplFromJson(Map<String, dynamic> json) =>
    _$PollOptionImpl(
      json['id'] as String,
      json['user_id'] as String,
      json['poll_id'] as String,
      json['content'] as String,
      DateTime.parse(json['created_at'] as String),
    );

Map<String, dynamic> _$$PollOptionImplToJson(_$PollOptionImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'user_id': instance.userId,
      'poll_id': instance.pollId,
      'content': instance.content,
      'created_at': instance.createdAt.toIso8601String(),
    };
