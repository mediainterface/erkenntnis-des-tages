import 'package:edt/src/features/polls/presentation/poll_create_screen.dart';
import 'package:edt/src/features/polls/presentation/poll_list_screen.dart';
import 'package:edt/src/features/polls/presentation/poll_vote_screen.dart';
import 'package:edt/src/features/statistics/presentation/statistics_screen.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

import '../features/authentication/presentation/login_screen.dart';
import '../features/home/presentation/home_screen.dart';
import '../features/profile/data/profile_repository.dart';
import '../features/profile/presentation/create_profile_screen.dart';
import '../features/startup/application/startup_providers.dart';
import 'go_router_refresh_stream.dart';
import 'navigation/scaffold_with_nested_navigation.dart';

part 'router.g.dart';

final _rootNavigatorKey = GlobalKey<NavigatorState>();
final _homeShellNavigatorKey = GlobalKey<NavigatorState>(debugLabel: 'home');
final _pollsShellNavigatorKey = GlobalKey<NavigatorState>(debugLabel: 'polls');
final _statisticsShellNavigatorKey = GlobalKey<NavigatorState>(debugLabel: 'statistics');

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
        name: LoginScreen.name,
        path: LoginScreen.route,
        pageBuilder: (context, state) => const NoTransitionPage(child: LoginScreen()),
      ),
      GoRoute(
        name: CreateProfileScreen.name,
        path: CreateProfileScreen.route,
        pageBuilder: (context, state) => NoTransitionPage(key: state.pageKey, child: const CreateProfileScreen()),
      ),
      StatefulShellRoute.indexedStack(
        builder: (context, state, navigationShell) => ScaffoldWithNestedNavigation(navigationShell: navigationShell),
        branches: [
          StatefulShellBranch(
            navigatorKey: _homeShellNavigatorKey,
            routes: [
              GoRoute(
                name: HomeScreen.name,
                path: HomeScreen.route,
                pageBuilder: (context, state) => const NoTransitionPage(child: HomeScreen()),
              ),
            ],
          ),
          StatefulShellBranch(
            navigatorKey: _pollsShellNavigatorKey,
            routes: [
              GoRoute(
                name: PollListScreen.name,
                path: PollListScreen.route,
                pageBuilder: (context, state) => const NoTransitionPage(child: PollListScreen()),
                routes: [
                  GoRoute(
                    name: PollCreateScreen.name,
                    path: PollCreateScreen.route,
                    pageBuilder: (context, state) => const NoTransitionPage(child: PollCreateScreen()),
                  ),
                  GoRoute(
                    name: PollVoteScreen.name,
                    path: PollVoteScreen.route,
                    pageBuilder: (context, state) => NoTransitionPage(child: PollVoteScreen(state.pathParameters['id']!)),
                  ),
                ],
              ),
            ],
          ),
          StatefulShellBranch(
            navigatorKey: _statisticsShellNavigatorKey,
            routes: [
              GoRoute(
                name: StatisticsScreen.name,
                path: StatisticsScreen.route,
                pageBuilder: (context, state) => const NoTransitionPage(child: StatisticsScreen()),
              ),
            ],
          ),
        ],
      )
    ],
  );
}
