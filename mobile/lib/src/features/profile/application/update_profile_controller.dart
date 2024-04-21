import 'dart:io';

import 'package:flutter_gravatar/flutter_gravatar.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

import '../../startup/application/startup_providers.dart';
import '../data/profile_repository.dart';
import '../domain/profile.dart';

part 'update_profile_controller.g.dart';

@riverpod
class UpdateProfileController extends _$UpdateProfileController {
  @override
  Future<Profile?> build() async => null;

  Future updateProfile(String username, File? file) async {
    state = const AsyncLoading();

    final supabase = ref.read(supabaseProvider);
    final profiles = ref.read(profileRepositoryProvider);

    final fallBackImage = Gravatar(supabase.auth.currentUser!.email!).imageUrl();
    final avatarUrl = file != null ? await profiles.updateAvatarAsync(file) : fallBackImage;

    state = await AsyncValue.guard(() => profiles.updateAsync(supabase.auth.currentUser!.id, username, avatarUrl));
  }
}
