import 'package:riverpod_annotation/riverpod_annotation.dart';

import '../data/poll_option_repository.dart';
import '../data/poll_repository.dart';
import '../domain/poll.dart';
import 'poll_option_state_controller.dart';

part 'create_poll_controller.g.dart';

@riverpod
class CreatePollController extends _$CreatePollController {
  @override
  FutureOr<Poll?> build() async => null;

  Future<void> createPoll() async {
    state = const AsyncLoading();

    state = await AsyncValue.guard(() async {
      final poll = await ref.watch(pollRepositoryProvider).createAsync();
      final pollOptions = ref.watch(pollOptionStateControllerProvider).values.where((element) => element.value.isNotEmpty).toList();
      for (final option in pollOptions) {
        await ref.watch(pollOptionRepositoryProvider).createAsync(poll.id, option.userId, option.value);
      }

      return poll;
    });
  }
}
