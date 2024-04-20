import 'package:edt/src/features/home/presentation/home_screen.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'router.g.dart';

final _rootNavigatorKey = GlobalKey<NavigatorState>();

@riverpod
GoRouter router(RouterRef ref) {
  return GoRouter(
    initialLocation: HomeScreen.route,
    navigatorKey: _rootNavigatorKey,
    routes: [
      GoRoute(
        name: HomeScreen.name,
        path: HomeScreen.route,
        pageBuilder: (context, state) => const NoTransitionPage(child: HomeScreen()),
      ),
    ],
  );
}
