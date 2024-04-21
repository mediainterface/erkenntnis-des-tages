import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
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
    final polls = ref.watch(watchOpenPollsProvider);
    final isLoadingPolls = polls.maybeWhen(data: (_) => false, orElse: () => true);

    return Scaffold(
      floatingActionButton: FloatingActionButton(
        onPressed: () => context.pushNamed(PollCreateScreen.name),
        child: const Icon(Icons.add),
      ),
      body: isLoadingPolls
          ? const ShimmerList(item: LoadingPollListItem())
          : CustomScrollView(
              slivers: [
                SliverAppBar(
                  title: Text(LocaleKeys.polls_title.tr()),
                  leading: Padding(padding: const EdgeInsets.all(Sizes.p8), child: ProfileAvatar(profile)),
                ),
                const SliverAppBar(automaticallyImplyLeading: false, primary: false, title: Text("OpenPolls")),
                SliverList.builder(
                  itemCount: polls.requireValue.length,
                  itemBuilder: (context, index) => PollListItem(
                    polls.requireValue[index],
                  ),
                ),
              ],
            ),
    );
  }
}
