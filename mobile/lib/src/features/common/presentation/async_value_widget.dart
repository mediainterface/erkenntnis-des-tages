import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

class AsyncValueWidget<T> extends StatelessWidget {
  final AsyncValue<T> value;
  final Widget Function(T data) dataBuilder;
  final Widget Function()? loadingBuilder;
  final Widget Function(Object error, StackTrace? stackTrace)? errorBuilder;

  const AsyncValueWidget(this.value, {required this.dataBuilder, this.loadingBuilder, this.errorBuilder, super.key});

  @override
  Widget build(BuildContext context) {
    return value.when(
      data: dataBuilder,
      loading: loadingBuilder != null ? loadingBuilder!.call : () => const CircularProgressIndicator(),
      error: errorBuilder != null ? errorBuilder!.call : (error, stackTrace) => Text('Error: $error'),
    );
  }
}
