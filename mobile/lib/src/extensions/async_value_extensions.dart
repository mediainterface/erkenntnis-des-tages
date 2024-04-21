import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:toastification/toastification.dart';

import '../constants/locale_keys.dart';

extension AsyncValueExtensions on AsyncValue {
  void showToastOnError(BuildContext context, {bool shouldPop = false}) {
    if (!isRefreshing && hasError) {
      if (shouldPop) context.pop();
      toastification.show(
        context: context,
        type: ToastificationType.error,
        title: Text(LocaleKeys.error_unknown.tr()),
        autoCloseDuration: const Duration(seconds: 3),
        alignment: Alignment.bottomCenter,
      );
    }
  }

  void showToastOnSuccess(BuildContext context, {required String message, bool shouldPop = false}) {
    if (!isRefreshing && valueOrNull != null) {
      if (shouldPop) context.pop();
      toastification.show(
        context: context,
        type: ToastificationType.success,
        title: Text(message),
        autoCloseDuration: const Duration(seconds: 3),
        alignment: Alignment.bottomCenter,
      );
    }
  }
}
