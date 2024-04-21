import 'package:easy_localization/easy_localization.dart';
import 'package:edt/src/app.dart';
import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

import 'src/features/startup/presentation/app_startup_widget.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await EasyLocalization.ensureInitialized();

  runApp(
    EasyLocalization(
      supportedLocales: const [Locale("en", "US"), Locale("de", "DE")],
      fallbackLocale: const Locale("en", "US"),
      path: "assets/translation",
      useOnlyLangCode: false,
      child: ProviderScope(child: AppStartupWidget(onLoaded: (_) => const App())),
    ),
  );
}
