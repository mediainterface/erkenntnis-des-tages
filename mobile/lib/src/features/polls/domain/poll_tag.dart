import 'package:freezed_annotation/freezed_annotation.dart';

part 'poll_tag.freezed.dart';
part 'poll_tag.g.dart';

@freezed
class PollTag with _$PollTag {
  const factory PollTag(
    String id,
    String value,
  ) = _PollTag;

  factory PollTag.fromJson(Map<String, dynamic> json) => _$PollTagFromJson(json);
}
