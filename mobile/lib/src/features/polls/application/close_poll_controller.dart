import 'package:riverpod_annotation/riverpod_annotation.dart';

import '../data/poll_repository.dart';

part 'close_poll_controller.g.dart';

@riverpod
class ClosePollController extends _$ClosePollController {
  @override
  FutureOr<void> build(String pollId) async {}

  Future<void> close() async {
    state = const AsyncLoading();
    state = await AsyncValue.guard(() => ref.watch(pollRepositoryProvider).update(pollId, isClosed: true));
  }
}
