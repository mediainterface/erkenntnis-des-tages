import 'dart:math';

import 'package:badges/badges.dart' as badges;
import 'package:collection/collection.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:edt/src/constants/locale_keys.dart';
import 'package:edt/src/extensions/build_context_extensions.dart';
import 'package:edt/src/features/polls/data/poll_repository.dart';
import 'package:edt/src/features/polls/data/poll_vote_repository.dart';
import 'package:edt/src/features/polls/extensions/poll_extensions.dart';
import 'package:edt/src/features/profile/presentation/components/profile_avatar.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

import '../../profile/data/profile_repository.dart';
import '../data/poll_option_repository.dart';
import 'components/vote_result_pie_chart.dart';

class PollResultScreen extends ConsumerWidget {
  static const route = ':id/results';
  static const name = 'PollResults';

  final String pollId;

  const PollResultScreen(this.pollId, {super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final poll = ref.watch(getPollByIdProvider(pollId));
    final votes = ref.watch(watchVotesByPollIdProvider(pollId));
    final voteOptions = ref.watch(listPollOptionsByPollIdProvider(pollId));
    final isLoading =
        votes.maybeWhen(data: (_) => false, orElse: () => true) || voteOptions.maybeWhen(data: (_) => false, orElse: () => true);

    if (isLoading) return const Scaffold(body: Center(child: CircularProgressIndicator()));

    final votedOptions = groupBy(votes.value!, (value) => voteOptions.value!.firstWhere((element) => element.id == value.pollOptionId));
    voteOptions.value!
        .sortByCompare((element) => element, (a, b) => (votedOptions[b]?.length ?? 0).compareTo(votedOptions[a]?.length ?? 0));

    return Scaffold(
      appBar: AppBar(
        title: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(LocaleKeys.polls_results_title.tr()),
            Text(poll.title, style: context.textTheme.bodySmall),
          ],
        ),
      ),
      body: CustomScrollView(
        slivers: [
          SliverToBoxAdapter(child: VoteResultPieChart(votedOptions)),
          SliverList.builder(
            itemCount: voteOptions.value!.length,
            itemBuilder: (context, index) {
              final option = voteOptions.value![index];
              final votesByOption = votedOptions[voteOptions.value![index]] ?? [];
              final hasWon = (votedOptions[voteOptions.value!.first]?.length ?? 0) == votesByOption.length;
              return Card(
                margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                child: ListTile(
                  leading: badges.Badge(
                      badgeContent: Transform.rotate(
                        angle: pi / 5,
                        child: const FaIcon(FontAwesomeIcons.crown, size: 16, color: Colors.amber),
                      ),
                      showBadge: hasWon,
                      badgeStyle: const badges.BadgeStyle(
                        badgeColor: Colors.transparent,
                      ),
                      position: badges.BadgePosition.topEnd(top: -10, end: -10),
                      child: ProfileAvatar(ref.watch(getProfileByIdProvider(option.userId)))),
                  title: Text(option.content, style: context.textTheme.titleLarge),
                  subtitle: Text(
                    style: context.textTheme.bodySmall!.copyWith(color: Colors.grey),
                    LocaleKeys.polls_results_votes.plural(
                      votesByOption.length,
                      args: [votesByOption.length.toString(), votes.value!.length.toString()],
                    ),
                  ),
                ),
              );
            },
          )
        ],
      ),
    );
  }
}
