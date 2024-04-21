import 'package:easy_localization/easy_localization.dart';
import 'package:edt/src/constants/app_sizes.dart';
import 'package:edt/src/extensions/async_value_extensions.dart';
import 'package:edt/src/features/polls/application/create_poll_controller.dart';
import 'package:edt/src/features/polls/presentation/components/create_poll_option_widget.dart';
import 'package:edt/src/features/profile/data/profile_repository.dart';
import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

import '../../../constants/locale_keys.dart';
import '../application/poll_option_state_controller.dart';

class PollCreateScreen extends ConsumerStatefulWidget {
  static const route = 'create';
  static const name = 'CreatePoll';

  const PollCreateScreen({super.key});

  @override
  ConsumerState createState() => _PollCreateScreenState();
}

class _PollCreateScreenState extends ConsumerState<PollCreateScreen> {
  final _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    final users = ref.watch(listProfilesProvider);
    final _ = ref.watch(pollOptionStateControllerProvider);
    final isLoading = users.maybeWhen(data: (_) => false, orElse: () => true);

    ref.listen(createPollControllerProvider, (_, next) {
      next.showToastOnError(context);
      next.showToastOnSuccess(context, message: "Poll created successfully!", shouldPop: true);
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
