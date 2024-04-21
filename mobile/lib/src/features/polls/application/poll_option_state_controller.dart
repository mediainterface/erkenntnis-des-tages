import 'package:edt/src/features/polls/application/poll_option_state.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'poll_option_state_controller.g.dart';

@riverpod
class PollOptionStateController extends _$PollOptionStateController {
  @override
  Map<String, PollOptionState> build() {
    return {};
  }

  updatePollOption(PollOptionState pollOptionState) {
    state = {...state, pollOptionState.userId: pollOptionState};
  }
}
