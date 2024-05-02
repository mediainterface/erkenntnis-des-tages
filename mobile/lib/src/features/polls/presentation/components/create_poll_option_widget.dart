import 'package:easy_localization/easy_localization.dart';
import 'package:edt/src/constants/locale_keys.dart';
import 'package:edt/src/features/polls/application/poll_option_state.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

import '../../../../constants/app_sizes.dart';
import '../../../profile/domain/profile.dart';
import '../../../profile/presentation/components/profile_avatar.dart';

class CreatePollOptionWidget extends HookConsumerWidget {
  final Profile user;
  final Function(PollOptionState)? onChange;

  const CreatePollOptionWidget({required this.user, this.onChange, super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = useState<PollOptionState>(PollOptionState(userId: user.id, value: ""));

    return SizedBox(
      height: 130,
      child: Card(
        margin: const EdgeInsets.symmetric(horizontal: Sizes.p16, vertical: Sizes.p8),
        child: Padding(
          padding: const EdgeInsets.only(left: Sizes.p16, right: Sizes.p16, top: Sizes.p8, bottom: Sizes.p4),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Expanded(
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Column(
                      mainAxisSize: MainAxisSize.min,
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        ProfileAvatar(AsyncData(user), size: 30),
                        gapH4,
                        Text(user.username, overflow: TextOverflow.ellipsis),
                      ],
                    ),
                    gapW16,
                    Expanded(
                      child: TextField(
                        onChanged: (value) => onChange?.call(state.value.copyWith(value: value)),
                        decoration: InputDecoration(hintText: LocaleKeys.polls_optionHint.tr()),
                      ),
                    ),
                  ],
                ),
              ),
              const Row(
                mainAxisSize: MainAxisSize.max,
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  // Chip(
                  //   label: Text("Option 1"),
                  //   visualDensity: VisualDensity.compact,
                  //   padding: EdgeInsets.zero,
                  //   labelPadding: EdgeInsets.symmetric(horizontal: 4, vertical: 0),
                  // ),
                ],
              )
            ],
          ),
        ),
      ),
    );
  }
}
