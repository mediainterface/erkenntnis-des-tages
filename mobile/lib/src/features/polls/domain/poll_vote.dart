import 'package:freezed_annotation/freezed_annotation.dart';

part 'poll_vote.freezed.dart';
part 'poll_vote.g.dart';

@freezed
class PollVote with _$PollVote {
  const factory PollVote(
    @JsonKey(name: "user_id") String userId,
    @JsonKey(name: "poll_id") String pollId,
    @JsonKey(name: "poll_option_id") String pollOptionId,
    @JsonKey(name: "created_at") DateTime createdAt,
  ) = _PollVote;

  factory PollVote.fromJson(Map<String, dynamic> json) => _$PollVoteFromJson(json);
}
