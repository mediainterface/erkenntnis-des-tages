import 'package:freezed_annotation/freezed_annotation.dart';

part 'poll.freezed.dart';
part 'poll.g.dart';

@freezed
class Poll with _$Poll {
  const factory Poll(
    String id,
    @JsonKey(name: "is_closed", defaultValue: false) bool isClosed,
    @JsonKey(name: "created_at") DateTime createdAt,
  ) = _Poll;

  factory Poll.fromJson(Map<String, dynamic> json) => _$PollFromJson(json);
}
