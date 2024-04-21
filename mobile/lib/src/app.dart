import 'package:easy_localization/easy_localization.dart';
import 'package:flex_color_scheme/flex_color_scheme.dart';
import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

import 'constants/locale_keys.dart';
import 'routing/router.dart';

class App extends ConsumerStatefulWidget {
  const App({super.key});

  @override
  ConsumerState<App> createState() => _AppState();
}

class _AppState extends ConsumerState<App> {
  @override
  Widget build(BuildContext context) {
    final router = ref.watch(routerProvider);

    return MaterialApp.router(
      debugShowCheckedModeBanner: false,
      localizationsDelegates: [
        ...context.localizationDelegates,
      ],
      supportedLocales: context.supportedLocales,
      locale: context.locale,
      onGenerateTitle: (_) => LocaleKeys.app_title.tr(),
      routerConfig: router,
      theme: FlexThemeData.light(scheme: FlexScheme.jungle, useMaterial3: true, useMaterial3ErrorColors: true),
      darkTheme: FlexThemeData.dark(scheme: FlexScheme.jungle, useMaterial3: true, useMaterial3ErrorColors: true),
    );
  }
}
