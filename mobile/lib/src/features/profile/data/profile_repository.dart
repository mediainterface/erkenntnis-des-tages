import 'dart:async';
import 'dart:io';

import 'package:path/path.dart' as p;
import 'package:riverpod_annotation/riverpod_annotation.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

import '../../startup/application/startup_providers.dart';
import '../domain/profile.dart';

part 'profile_repository.g.dart';

@riverpod
ProfileRepository profileRepository(ProfileRepositoryRef ref) {
  return ProfileRepository();
}

@riverpod
Future<Profile> getCurrentUserProfile(GetCurrentUserProfileRef ref) async {
  final supabase = ref.watch(supabaseProvider);
  final profiles = ref.watch(profileRepositoryProvider);
  return profiles.getByIdAsync(supabase.auth.currentUser!.id);
}

@riverpod
Future<Profile?> findCurrentUserProfile(FindCurrentUserProfileRef ref) async {
  final supabase = ref.watch(supabaseProvider);
  final profiles = ref.watch(profileRepositoryProvider);
  return profiles.findByIdAsync(supabase.auth.currentUser!.id);
}

@riverpod
Future<Profile> getProfileById(GetProfileByIdRef ref, String id) async {
  return ref.watch(profileRepositoryProvider).getByIdAsync(id);
}

@riverpod
Stream<List<Profile>> watchProfiles(WatchProfilesRef ref) {
  return ref.watch(profileRepositoryProvider).watchAsync();
}

class ProfileRepository {
  final supabase = Supabase.instance.client;
  final table = 'profiles';
  final storage = 'user_data';

  Stream<List<Profile>> watchAsync() {
    return supabase.from(table).stream(primaryKey: ["user_id"]).map((event) => event.map((e) => Profile.fromJson(e)).toList());
  }

  Future<Profile?> findByIdAsync(String id) async {
    final response = await supabase.from(table).select("*").eq('user_id', id).maybeSingle();
    return response == null ? null : Profile.fromJson(response);
  }

  Future<Profile> getByIdAsync(String id) async {
    final response = await supabase.from(table).select("*").eq('user_id', id).single();
    return Profile.fromJson(response);
  }

  Future<String> updateAvatarAsync(File file) async {
    final extension = p.extension(file.path);
    final path = '${supabase.auth.currentUser!.id}/avatar$extension';

    final userData = await supabase.storage.from(storage).list(path: supabase.auth.currentUser!.id);
    if (userData.any((e) => e.name == "avatar$extension")) {
      await supabase.storage.from(storage).update(path, file);
    } else {
      await supabase.storage.from(storage).upload(path, file);
    }
    return supabase.storage.from(storage).getPublicUrl(path);
  }

  Future<Profile> updateAsync(String id, String username, String? avatarUrl) async {
    final response = await supabase
        .from(table)
        .upsert({
          'user_id': id,
          'username': username,
          'avatar_url': avatarUrl,
          'order': -1,
        })
        .select()
        .single();

    return Profile.fromJson(response);
  }

  Future deleteAsync(String id) async {
    await supabase.from(table).delete().eq('id', id);
  }
}
