import 'package:freezed_annotation/freezed_annotation.dart';

part 'poll_option_state.freezed.dart';
part 'poll_option_state.g.dart';

@freezed
class PollOptionState with _$PollOptionState {
  const factory PollOptionState({
    required String userId,
    required String value,
  }) = _PollOptionState;

  factory PollOptionState.fromJson(Map<String, dynamic> json) => _$PollOptionStateFromJson(json);
}
