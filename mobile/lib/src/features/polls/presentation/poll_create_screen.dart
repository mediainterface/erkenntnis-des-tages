import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

import '../../../constants/app_sizes.dart';
import '../../../constants/locale_keys.dart';
import '../../../extensions/async_value_extensions.dart';
import '../../profile/data/profile_repository.dart';
import '../application/create_poll_controller.dart';
import '../application/poll_option_state_controller.dart';
import 'components/create_poll_option_widget.dart';
import 'poll_vote_screen.dart';

class PollCreateScreen extends ConsumerWidget {
  static const route = 'create';
  static const name = 'CreatePoll';

  const PollCreateScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final users = ref.watch(listProfilesProvider);
    final _ = ref.watch(pollOptionStateControllerProvider);
    final isLoading = users.maybeWhen(data: (_) => false, orElse: () => true);

    ref.listen(createPollControllerProvider, (_, next) {
      next.showToastOnError(context, message: LocaleKeys.polls_createdError.tr());
      next.showToastOnSuccess(context, message: LocaleKeys.polls_createdSuccess.tr());
      if (next.hasValue && next.value != null) {
        context.pushReplacementNamed(PollVoteScreen.name, pathParameters: {"id": next.value!.id});
      }
    });

    // todo: implement shimmer loading
    if (isLoading) {
      return const Center(child: CircularProgressIndicator());
    }

    return Scaffold(
      appBar: AppBar(
        title: Text(LocaleKeys.polls_itemTitle.tr(args: [DateFormat.yMMMd().format(DateTime.now())])),
      ),
      body: CustomScrollView(
        slivers: [
          const SliverToBoxAdapter(child: gapH16),
          SliverList.builder(
            itemCount: users.requireValue.length,
            itemBuilder: (context, index) => CreatePollOptionWidget(
              user: users.requireValue[index],
              onChange: (state) => ref.read(pollOptionStateControllerProvider.notifier).updatePollOption(state),
            ),
          ),
          const SliverToBoxAdapter(child: gapH16),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: Sizes.p16),
              child: ElevatedButton(onPressed: ref.watch(createPollControllerProvider.notifier).createPoll, child: const Text("Create")),
            ),
          ),
          const SliverToBoxAdapter(child: gapH16),
        ],
      ),
    );
  }
}
