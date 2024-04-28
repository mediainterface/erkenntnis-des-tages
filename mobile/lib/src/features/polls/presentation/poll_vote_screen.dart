import 'package:easy_localization/easy_localization.dart';
import 'package:edt/src/constants/locale_keys.dart';
import 'package:edt/src/features/common/presentation/shimmer/shimmer_list.dart';
import 'package:edt/src/features/polls/domain/poll_option.dart';
import 'package:edt/src/features/polls/presentation/components/vote_poll_option_widget.dart';
import 'package:edt/src/features/startup/application/startup_providers.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

import '../../../constants/app_sizes.dart';
import '../../../extensions/async_value_extensions.dart';
import '../application/vote_controller.dart';
import '../data/poll_option_repository.dart';
import '../data/poll_repository.dart';
import '../data/poll_vote_repository.dart';
import '../extensions/poll_extensions.dart';
import 'components/loading_vote_poll_option_item.dart';
import 'poll_result_screen.dart';

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

    final isLoading =
        pollOptions.maybeWhen(data: (_) => false, orElse: () => true) || votes.maybeWhen(data: (_) => false, orElse: () => true);

    final ValueNotifier<PollOption?> vote = useState(null);
    final hasVoted = votes.valueOrNull?.any((element) => element.userId == ref.watch(supabaseProvider).auth.currentUser!.id) ?? false;
    final ownVote =
        !hasVoted ? null : votes.valueOrNull?.firstWhere((element) => element.userId == ref.watch(supabaseProvider).auth.currentUser!.id);

    ref.listen(voteControllerProvider, (_, next) {
      next.showToastOnError(context, message: LocaleKeys.polls_voteError.tr());
      next.showToastOnSuccess(context, message: LocaleKeys.polls_voteSuccess.tr());
    });

    if (hasVoted && pollOptions.maybeWhen(data: (_) => true, orElse: () => false)) {
      final votedOption = pollOptions.requireValue.firstWhere((element) => element.id == ownVote?.pollOptionId);
      if (votedOption != vote.value) {
        vote.value = pollOptions.requireValue.firstWhere((element) => element.id == ownVote!.pollOptionId);
      }
    }

    return Scaffold(
      appBar: AppBar(title: Text(poll.title)),
      body: isLoading
          ? const Padding(padding: EdgeInsets.only(top: Sizes.p16), child: ShimmerList(item: LoadingVotePollOptionWidget()))
          : CustomScrollView(
              slivers: [
                const SliverToBoxAdapter(child: gapH16),
                SliverList.builder(
                  itemCount: pollOptions.requireValue.length,
                  itemBuilder: (context, index) =>
                      VotePollOptionWidget(item: pollOptions.requireValue[index], selectedValue: vote, votedValue: ownVote),
                ),
                const SliverToBoxAdapter(child: gapH16),
                SliverToBoxAdapter(
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: Sizes.p16),
                    child: ElevatedButton(
                      onPressed: hasVoted ? null : () => ref.read(voteControllerProvider.notifier).vote(pollId, vote.value!.id),
                      child: Text((hasVoted ? LocaleKeys.polls_votedButton : LocaleKeys.polls_voteButton).tr()),
                    ),
                  ),
                ),
                const SliverToBoxAdapter(child: gapH8),
                SliverToBoxAdapter(
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: Sizes.p16),
                    child: ElevatedButton(
                      onPressed:
                          !hasVoted ? null : () => context.pushReplacementNamed(PollResultScreen.name, pathParameters: {"id": pollId}),
                      child: Text(LocaleKeys.polls_resultsButton.tr()),
                    ),
                  ),
                )
              ],
            ),
    );
  }
}
