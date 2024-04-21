import 'package:edt/src/extensions/build_context_extensions.dart';
import 'package:edt/src/features/common/presentation/shimmer/shimmer_avatar.dart';
import 'package:edt/src/features/common/presentation/shimmer/shimmer_text.dart';
import 'package:flutter/material.dart';

import '../../../../constants/app_sizes.dart';

class LoadingPollListItem extends StatelessWidget {
  const LoadingPollListItem({super.key});

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.symmetric(horizontal: Sizes.p16, vertical: Sizes.p4),
      child: Padding(
        padding: cardPadding,
        child: ListTile(
          leading: const ShimmerAvatar(),
          title: ShimmerText(width: context.mediaQuery.size.width * .6),
        ),
      ),
    );
  }
}
