import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

import '../application/startup_providers.dart';
import 'app_startup_error_widget.dart';
import 'app_startup_loading_widget.dart';

class AppStartupWidget extends ConsumerWidget {
  final WidgetBuilder onLoaded;

  const AppStartupWidget({required this.onLoaded, super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final appStartupState = ref.watch(appStartupProvider);

    return appStartupState.when(
      loading: () => const AppStartupLoadingWidget(),
      error: (e, st) => AppStartupErrorWidget(message: e.toString(), onRetry: () => ref.invalidate(appStartupProvider)),
      data: (_) => onLoaded(context),
    );
  }
}
