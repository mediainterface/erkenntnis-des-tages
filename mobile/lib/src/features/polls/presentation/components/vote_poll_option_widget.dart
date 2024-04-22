import 'package:edt/src/features/polls/domain/poll_option.dart';
import 'package:edt/src/features/profile/data/profile_repository.dart';
import 'package:edt/src/features/profile/presentation/components/profile_avatar.dart';
import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

import '../../../../constants/app_sizes.dart';
import '../../../startup/application/startup_providers.dart';
import '../../domain/poll_vote.dart';

class VotePollOptionWidget extends ConsumerWidget {
  final PollOption item;
  final ValueNotifier<PollOption?> selectedValue;
  final PollVote? votedValue;

  const VotePollOptionWidget({required this.item, required this.selectedValue, this.votedValue, super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final profile = ref.watch(getProfileByIdProvider(item.userId));

    bool isOwnOption = item.userId == ref.watch(supabaseProvider).auth.currentUser!.id;
    bool isSelected = votedValue != null && votedValue!.pollOptionId == item.id;
    return Card(
      margin: const EdgeInsets.symmetric(horizontal: Sizes.p16, vertical: Sizes.p4),
      clipBehavior: Clip.antiAlias,
      child: RadioListTile<PollOption>(
        value: item,
        groupValue: selectedValue.value,
        title: Text(item.content),
        secondary: ProfileAvatar(profile),
        onChanged: (votedValue != null && !isSelected) || isOwnOption ? null : (value) => selectedValue.value = value!,
      ),
    );
  }
}
