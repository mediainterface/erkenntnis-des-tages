import 'package:freezed_annotation/freezed_annotation.dart';

part 'poll_option.freezed.dart';
part 'poll_option.g.dart';

@freezed
class PollOption with _$PollOption {
  const factory PollOption(
    String id,
    @JsonKey(name: "user_id") String userId,
    @JsonKey(name: "poll_id") String pollId,
    String content,
    @JsonKey(name: "created_at") DateTime createdAt,
  ) = _PollOption;

  factory PollOption.fromJson(Map<String, dynamic> json) => _$PollOptionFromJson(json);
}
