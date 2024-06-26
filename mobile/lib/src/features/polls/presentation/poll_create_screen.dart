import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

import '../../../constants/app_sizes.dart';
import '../../../constants/locale_keys.dart';
import '../../../extensions/async_value_extensions.dart';
import '../../common/presentation/shimmer/shimmer_list.dart';
import '../../profile/data/profile_repository.dart';
import '../../startup/application/startup_providers.dart';
import '../application/create_poll_controller.dart';
import '../application/poll_option_state_controller.dart';
import '../extensions/profile_extensions.dart';
import 'components/create_poll_option_widget.dart';
import 'components/loading_create_poll_option_item.dart';
import 'poll_vote_screen.dart';

class PollCreateScreen extends ConsumerWidget {
  static const route = 'create';
  static const name = 'CreatePoll';

  const PollCreateScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final users = ref.watch(listProfilesProvider(includeNegativeOrderId: false));
    final _ = ref.watch(pollOptionStateControllerProvider);
    final isLoading = users.maybeWhen(data: (_) => false, orElse: () => true);

    ref.listen(createPollControllerProvider, (_, next) {
      next.showToastOnError(context, message: LocaleKeys.polls_createdError.tr());
      next.showToastOnSuccess(context, message: LocaleKeys.polls_createdSuccess.tr());
      if (next.hasValue && next.value != null) {
        context.pushReplacementNamed(PollVoteScreen.name, pathParameters: {"id": next.value!.id});
      }
    });

    if (users.hasValue) {
      users.requireValue.sortByOrder(users.requireValue.firstWhere((e) => e.id == ref.watch(supabaseProvider).auth.currentUser!.id).order);
    }

    return Scaffold(
      appBar: AppBar(
        title: Text(LocaleKeys.polls_itemTitle.tr(args: [DateFormat.yMMMd().format(DateTime.now())])),
      ),
      body: isLoading
          ? const Padding(
              padding: EdgeInsets.only(top: Sizes.p16),
              child: ShimmerList(item: LoadingCreatePollOptionWidget()),
            )
          : CustomScrollView(
              slivers: [
                const SliverToBoxAdapter(child: gapH16),
                SliverList.builder(
                  itemCount: users.requireValue.length,
                  itemBuilder: (context, index) => CreatePollOptionWidget(
                    user: users.requireValue[index],
                    isLastItem: index == users.requireValue.length - 1,
                    onChange: (state) => ref.read(pollOptionStateControllerProvider.notifier).updatePollOption(state),
                  ),
                ),
                const SliverToBoxAdapter(child: gapH16),
                SliverToBoxAdapter(
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: Sizes.p16),
                    child:
                        ElevatedButton(onPressed: ref.watch(createPollControllerProvider.notifier).createPoll, child: const Text("Create")),
                  ),
                ),
                const SliverToBoxAdapter(child: gapH16),
              ],
            ),
    );
  }
}
