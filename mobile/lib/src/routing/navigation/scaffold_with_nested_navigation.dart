import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../constants/locale_keys.dart';

class ScaffoldWithNestedNavigation extends StatelessWidget {
  const ScaffoldWithNestedNavigation({
    Key? key,
    required this.navigationShell,
  }) : super(key: key ?? const ValueKey('ScaffoldWithNestedNavigation'));
  final StatefulNavigationShell navigationShell;

  void _goBranch(int index) {
    navigationShell.goBranch(
      index,
      initialLocation: index == navigationShell.currentIndex,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: navigationShell,
      bottomNavigationBar: NavigationBar(
        selectedIndex: navigationShell.currentIndex,
        destinations: [
          NavigationDestination(label: LocaleKeys.home_title.tr(), icon: const Icon(Icons.home)),
          NavigationDestination(label: LocaleKeys.polls_title.tr(), icon: const Icon(Icons.poll)),
          NavigationDestination(label: LocaleKeys.statistics_title.tr(), icon: const Icon(Icons.auto_graph)),
        ],
        onDestinationSelected: _goBranch,
      ),
    );
  }
}
