import 'package:edt/src/extensions/build_context_extensions.dart';
import 'package:edt/src/features/common/presentation/shimmer/shimmer_text.dart';
import 'package:edt/src/features/profile/presentation/components/profile_avatar.dart';
import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

import '../../../../constants/app_sizes.dart';

class LoadingVotePollOptionWidget extends StatelessWidget {
  const LoadingVotePollOptionWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.symmetric(horizontal: Sizes.p16, vertical: Sizes.p8),
      clipBehavior: Clip.antiAlias,
      child: RadioListTile(
        value: null,
        groupValue: null,
        title: ShimmerText(width: context.mediaQuery.size.width * .6, height: context.textTheme.bodyMedium!.fontSize),
        secondary: const ProfileAvatar(AsyncLoading()),
        onChanged: null,
      ),
    );
  }
}
