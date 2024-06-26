import 'package:easy_localization/easy_localization.dart';
import 'package:edt/src/features/profile/data/profile_repository.dart';
import 'package:edt/src/features/profile/presentation/components/profile_avatar.dart';
import 'package:edt/src/features/startup/application/startup_providers.dart';
import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

import '../../../constants/app_sizes.dart';
import '../../../constants/locale_keys.dart';

class HomeScreen extends ConsumerWidget {
  static const route = "/";
  static const name = "Home";

  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final profile = ref.watch(getCurrentUserProfileProvider);

    return Scaffold(
      appBar: AppBar(
        title: Text(LocaleKeys.home_title.tr()),
        leading: Padding(padding: const EdgeInsets.all(Sizes.p8), child: ProfileAvatar(profile)),
        actions: [IconButton(icon: const Icon(Icons.logout), onPressed: () => ref.read(supabaseProvider).auth.signOut())],
      ),
      body: const Center(),
    );
  }
}
