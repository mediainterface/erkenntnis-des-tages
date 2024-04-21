import 'dart:io';

import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';
import 'package:flutter_gravatar/flutter_gravatar.dart';
import 'package:form_builder_validators/form_builder_validators.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:image_picker_widget/image_picker_widget.dart';

import '../../../constants/app_sizes.dart';
import '../../../constants/locale_keys.dart';
import '../../home/presentation/home_screen.dart';
import '../../startup/application/startup_providers.dart';
import '../application/update_profile_controller.dart';

class CreateProfileScreen extends ConsumerStatefulWidget {
  static const route = "/create-profile";
  static const name = "CreateProfile";

  const CreateProfileScreen({super.key});

  @override
  ConsumerState createState() => _CreateProfileScreenState();
}

class _CreateProfileScreenState extends ConsumerState<CreateProfileScreen> {
  final _formKey = GlobalKey<FormBuilderState>();

  _onSubmit() {
    if (_formKey.currentState?.saveAndValidate() == true) {
      final name = _formKey.currentState?.fields["username"]?.value as String;
      final avatar = _formKey.currentState?.fields["image"]?.value as File?;

      ref.read(updateProfileControllerProvider.notifier).updateProfile(name, avatar);
    }
  }

  @override
  Widget build(BuildContext context) {
    ref.listen(updateProfileControllerProvider, (_, next) {
      if (next.hasError) {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(next.error.toString())));
      }
      if (next.hasValue && next.value != null) {
        context.goNamed(HomeScreen.name);
      }
    });

    final gravatar = Gravatar(ref.watch(supabaseProvider).auth.currentUser!.email!);
    return Scaffold(
      appBar: AppBar(),
      body: Padding(
        padding: const EdgeInsets.all(Sizes.p24),
        child: FormBuilder(
          key: _formKey,
          child: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(LocaleKeys.profile_completionHeadline.tr(), style: Theme.of(context).textTheme.headlineMedium),
                gapH12,
                FormBuilderField<File>(
                  name: "image",
                  builder: (field) {
                    return ImagePickerWidget(
                      diameter: 180,
                      initialImage: gravatar.imageUrl(),
                      isEditable: true,
                      shouldCrop: true,
                      onChange: (image) => field.didChange(image),
                    );
                  },
                ),
                FormBuilderTextField(
                  name: "username",
                  validator: FormBuilderValidators.required(),
                  decoration: InputDecoration(labelText: LocaleKeys.profile_name.tr()),
                ),
                gapH12,
                TextButton(onPressed: _onSubmit, child: const Text("Save")),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
