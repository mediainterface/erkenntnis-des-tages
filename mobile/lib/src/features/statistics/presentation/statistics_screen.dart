import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

import '../../../constants/app_sizes.dart';
import '../../profile/data/profile_repository.dart';
import '../../profile/presentation/components/profile_avatar.dart';

class StatisticsScreen extends ConsumerWidget {
  static const route = "/statistics";
  static const name = "Statistics";

  const StatisticsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final profile = ref.watch(getCurrentUserProfileProvider);

    return Scaffold(
      appBar: AppBar(
        title: const Text("Statistics"),
        leading: Padding(padding: const EdgeInsets.all(Sizes.p8), child: ProfileAvatar(profile)),
      ),
      body: const Center(child: Text("Statistics")),
    );
  }
}
