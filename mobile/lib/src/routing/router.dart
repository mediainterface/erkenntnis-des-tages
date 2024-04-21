import 'package:edt/src/features/authentication/presentation/login_screen.dart';
import 'package:edt/src/features/home/presentation/home_screen.dart';
import 'package:edt/src/routing/go_router_refresh_stream.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

import '../features/profile/data/profile_repository.dart';
import '../features/profile/presentation/create_profile_screen.dart';
import '../features/startup/application/startup_providers.dart';

part 'router.g.dart';

final _rootNavigatorKey = GlobalKey<NavigatorState>();

@riverpod
GoRouter router(RouterRef ref) {
  final supabase = ref.watch(supabaseProvider);

  return GoRouter(
    initialLocation: HomeScreen.route,
    navigatorKey: _rootNavigatorKey,
    refreshListenable: GoRouterRefreshStream(supabase.auth.onAuthStateChange),
    redirect: (context, state) async {
      final isLoggedIn = supabase.auth.currentUser != null;
      final onLoginPage = state.matchedLocation == LoginScreen.route;

      if (!isLoggedIn && !onLoginPage) return LoginScreen.route;

      // Check if user has a profile and redirect to create profile screen if not
      if (supabase.auth.currentUser != null) {
        final profile = await ref.read(findCurrentUserProfileProvider.future);
        if (profile == null) return CreateProfileScreen.route;
      }

      if (isLoggedIn && onLoginPage) return HomeScreen.route;
      return null;
    },
    routes: [
      GoRoute(
        name: HomeScreen.name,
        path: HomeScreen.route,
        pageBuilder: (context, state) => const NoTransitionPage(child: HomeScreen()),
      ),
      GoRoute(
        name: LoginScreen.name,
        path: LoginScreen.route,
        pageBuilder: (context, state) => const NoTransitionPage(child: LoginScreen()),
      ),
      GoRoute(
        name: CreateProfileScreen.name,
        path: CreateProfileScreen.route,
        pageBuilder: (context, state) => NoTransitionPage(key: state.pageKey, child: const CreateProfileScreen()),
      ),
    ],
  );
}
