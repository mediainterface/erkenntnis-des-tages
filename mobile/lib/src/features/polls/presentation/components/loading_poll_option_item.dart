import 'package:easy_localization/easy_localization.dart';
import 'package:edt/src/features/profile/presentation/components/profile_avatar.dart';
import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

import '../../../../constants/app_sizes.dart';
import '../../../../constants/locale_keys.dart';

class LoadingPollOptionWidget extends StatelessWidget {
  const LoadingPollOptionWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 130,
      child: Card(
        margin: const EdgeInsets.symmetric(horizontal: Sizes.p16, vertical: Sizes.p4),
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
                    const ProfileAvatar(AsyncLoading(), size: 30),
                    gapW16,
                    Expanded(
                      child: TextField(
                        enabled: false,
                        decoration: InputDecoration(hintText: LocaleKeys.polls_optionHint.tr()),
                      ),
                    ),
                  ],
                ),
              ),
              const Row(
                mainAxisSize: MainAxisSize.max,
                mainAxisAlignment: MainAxisAlignment.start,
                children: [],
              )
            ],
          ),
        ),
      ),
    );
  }
}
