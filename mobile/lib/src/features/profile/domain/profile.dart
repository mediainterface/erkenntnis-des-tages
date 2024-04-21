import 'package:freezed_annotation/freezed_annotation.dart';

part 'profile.freezed.dart';
part 'profile.g.dart';

@freezed
class Profile with _$Profile {
  const factory Profile(
    @JsonKey(name: "user_id") String id,
    String username,
    @JsonKey(name: "avatar_url") String? avatarUrl,
    @JsonKey(name: "order_id") int order,
  ) = _Profile;

  factory Profile.fromJson(Map<String, dynamic> json) => _$ProfileFromJson(json);
}
