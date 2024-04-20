import 'package:freezed_annotation/freezed_annotation.dart';

part 'poll_option_tag.freezed.dart';
part 'poll_option_tag.g.dart';

@freezed
class PollOptionTag with _$PollOptionTag {
  const factory PollOptionTag(
    @JsonKey(name: "poll_option_id") String pollOptionId,
    @JsonKey(name: "poll_tag_id") String pollTagId,
  ) = _PollOptionTag;

  factory PollOptionTag.fromJson(Map<String, dynamic> json) => _$PollOptionTagFromJson(json);
}
