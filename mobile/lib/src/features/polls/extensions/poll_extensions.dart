import 'package:easy_localization/easy_localization.dart';
import 'package:edt/src/constants/locale_keys.dart';

import '../domain/poll.dart';

extension PollExtensions on Poll {
  String get title => LocaleKeys.polls_itemTitle.tr(args: [DateFormat.yMMMd().format(createdAt)]);
}
