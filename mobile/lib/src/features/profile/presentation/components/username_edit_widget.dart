import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

import '../../../../extensions/build_context_extensions.dart';

class UsernameEditWidget extends HookWidget {
  final String? initialValue;
  final bool isLoading;
  final Function(String value) onSubmit;

  const UsernameEditWidget({super.key, required this.initialValue, required this.isLoading, required this.onSubmit});

  @override
  Widget build(BuildContext context) {
    final isEditing = useState(false);
    final controller = useTextEditingController(text: initialValue);

    return isEditing.value
        ? TextField(
            controller: controller,
            autofocus: true,
            onSubmitted: (value) {
              onSubmit(value);
              isEditing.value = false;
            },
            decoration: InputDecoration(
              suffix: IconButton(
                onPressed: () {
                  if (controller.text != initialValue) onSubmit(controller.text);
                  isEditing.value = false;
                },
                icon: const Icon(Icons.check),
              ),
            ))
        : initialValue == null
            ? const CircularProgressIndicator()
            : Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  SizedBox(width: context.theme.iconTheme.size),
                  Text(initialValue!, style: context.textTheme.headlineMedium),
                  IconButton(onPressed: () => isEditing.value = true, icon: const Icon(Icons.edit)),
                ],
              );
  }
}
