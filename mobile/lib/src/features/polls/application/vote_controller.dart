import 'package:riverpod_annotation/riverpod_annotation.dart';

import '../../startup/application/startup_providers.dart';
import '../data/poll_vote_repository.dart';
import '../domain/poll_vote.dart';

part 'vote_controller.g.dart';

@riverpod
class VoteController extends _$VoteController {
  @override
  FutureOr<PollVote?> build() async => null;

  Future<void> vote(String pollId, String optionId) async {
    state = const AsyncLoading();

    final userId = ref.watch(supabaseProvider).auth.currentUser!.id;
    state = await AsyncValue.guard(() => ref.watch(pollVoteRepositoryProvider).createAsync(pollId, userId, optionId));
  }
}
