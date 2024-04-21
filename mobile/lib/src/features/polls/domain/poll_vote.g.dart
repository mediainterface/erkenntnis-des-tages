// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'poll_vote.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$PollVoteImpl _$$PollVoteImplFromJson(Map<String, dynamic> json) =>
    _$PollVoteImpl(
      json['user_id'] as String,
      json['poll_id'] as String,
      json['poll_option_id'] as String,
      DateTime.parse(json['created_at'] as String),
    );

Map<String, dynamic> _$$PollVoteImplToJson(_$PollVoteImpl instance) =>
    <String, dynamic>{
      'user_id': instance.userId,
      'poll_id': instance.pollId,
      'poll_option_id': instance.pollOptionId,
      'created_at': instance.createdAt.toIso8601String(),
    };
