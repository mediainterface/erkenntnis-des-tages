import 'package:edt/src/features/startup/application/startup_providers.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

import '../../../extensions/async_value_extensions.dart';
import '../application/vote_controller.dart';
import '../data/poll_option_repository.dart';
import '../data/poll_repository.dart';
import '../data/poll_vote_repository.dart';
import '../extensions/poll_extensions.dart';

class PollVoteScreen extends HookConsumerWidget {
  static const route = ":id/vote";
  static const name = "PollVote";

  final String pollId;

  const PollVoteScreen(this.pollId, {super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final poll = ref.watch(getPollByIdProvider(pollId));
    final pollOptions = ref.watch(listPollOptionsByPollIdProvider(pollId));
    final votes = ref.watch(watchVotesByPollIdProvider(pollId));

    final isLoading = pollOptions.maybeWhen(data: (_) => false, orElse: () => true) || votes.maybeWhen(data: (_) => false, orElse: () => true);

    final ValueNotifier<String?> vote = useState(null);

    if (isLoading) return const Scaffold(body: Center(child: CircularProgressIndicator()));
    bool hasVoted = votes.requireValue.any((element) => element.userId == ref.watch(supabaseProvider).auth.currentUser!.id);
    final ownVote = !hasVoted ? null : votes.requireValue.firstWhere((element) => element.userId == ref.watch(supabaseProvider).auth.currentUser!.id);

    ref.listen(voteControllerProvider, (_, next) {
      next.showToastOnError(context);
      next.showToastOnSuccess(context, message: "Voted successfully!");
    });

    return Scaffold(
      body: CustomScrollView(
        slivers: [
          SliverAppBar(
            title: Text(poll.title),
          ),
          SliverList.builder(
            itemCount: pollOptions.requireValue.length,
            itemBuilder: (context, index) {
              return RadioListTile<String>(
                selected: hasVoted && ownVote!.pollOptionId == pollOptions.requireValue[index].id,
                value: pollOptions.requireValue[index].id,
                groupValue: vote.value,
                title: Text(pollOptions.requireValue[index].content),
                onChanged: hasVoted ? null : (value) => vote.value = value,
              );
            },
          ),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: ElevatedButton(
                onPressed: hasVoted ? null : () => ref.read(voteControllerProvider.notifier).vote(pollId, vote.value!),
                child: Text(hasVoted ? "Voted" : "Vote"),
              ),
            ),
          )
        ],
      ),
    );
  }
}
