import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

import '../../../../constants/app_sizes.dart';
import '../../../profile/data/profile_repository.dart';
import '../../../profile/presentation/components/profile_avatar.dart';
import '../../domain/poll.dart';
import '../../extensions/poll_extensions.dart';
import '../poll_vote_screen.dart';

class PollListItem extends ConsumerWidget {
  final Poll item;

  const PollListItem(this.item, {super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final profile = ref.watch(getProfileByIdProvider(item.userId));
    return Card(
      margin: const EdgeInsets.symmetric(horizontal: Sizes.p16, vertical: Sizes.p4),
      child: InkWell(
        onTap: () => context.pushNamed(PollVoteScreen.name, pathParameters: {'id': item.id}),
        borderRadius: BorderRadius.circular(Sizes.p8),
        child: Padding(
          padding: cardPadding,
          child: ListTile(
            leading: ProfileAvatar(profile),
            title: Text(item.title),
          ),
        ),
      ),
    );
  }
}
