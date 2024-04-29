import 'package:easy_localization/easy_localization.dart';
import 'package:edt/src/extensions/build_context_extensions.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:grouped_list/sliver_grouped_list.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

import '../../../constants/app_sizes.dart';
import '../../../constants/locale_keys.dart';
import '../../common/presentation/shimmer/shimmer_list.dart';
import '../../profile/data/profile_repository.dart';
import '../../profile/presentation/components/profile_avatar.dart';
import '../data/poll_repository.dart';
import 'components/loading_poll_list_item.dart';
import 'components/poll_list_item.dart';
import 'poll_create_screen.dart';

class PollListScreen extends ConsumerWidget {
  static const route = "/polls";
  static const name = "Polls";
  const PollListScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final profile = ref.watch(getCurrentUserProfileProvider);
    final polls = ref.watch(watchPollsProvider);
    final isLoadingPolls = polls.maybeWhen(data: (_) => false, orElse: () => true);

    return Scaffold(
      appBar: AppBar(
        title: Text(LocaleKeys.polls_title.tr()),
        leading: Padding(padding: const EdgeInsets.all(Sizes.p8), child: ProfileAvatar(profile)),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => context.pushNamed(PollCreateScreen.name),
        child: const Icon(Icons.add),
      ),
      body: isLoadingPolls
          ? const ShimmerList(item: LoadingPollListItem())
          : CustomScrollView(
              slivers: [
                if (polls.requireValue.isEmpty)
                  SliverFillRemaining(
                    child: Center(
                      child: Text.rich(
                        textAlign: TextAlign.center,
                        TextSpan(
                          children: [
                            TextSpan(text: LocaleKeys.polls_empty_title.tr(), style: context.textTheme.titleLarge),
                            const TextSpan(text: "\n"),
                            TextSpan(text: LocaleKeys.polls_empty_description.tr(), style: context.textTheme.titleMedium),
                          ],
                        ),
                      ),
                    ),
                  ),
                if (polls.requireValue.isNotEmpty)
                  SliverGroupedListView(
                    elements: polls.requireValue,
                    groupBy: (element) => element.isClosed,
                    sort: true,
                    groupComparator: (a, b) => a ? 1 : -1,
                    itemComparator: (a, b) => a.createdAt.compareTo(b.createdAt),
                    separator: gapH16,
                    groupHeaderBuilder: (element) => Padding(
                      padding: const EdgeInsets.only(top: Sizes.p16),
                      child: AppBar(
                        automaticallyImplyLeading: false,
                        primary: false,
                        scrolledUnderElevation: 0,
                        title: Text(element.isClosed ? LocaleKeys.polls_closedTitle.tr() : LocaleKeys.polls_openTitle.tr()),
                      ),
                    ),
                    itemBuilder: (context, element) => PollListItem(element),
                  ),
                const SliverToBoxAdapter(child: gapH32),
              ],
            ),
    );
  }
}
