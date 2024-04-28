import 'package:edt/src/extensions/build_context_extensions.dart';
import 'package:edt/src/features/profile/presentation/components/profile_avatar.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

import '../../../profile/data/profile_repository.dart';
import '../../../profile/domain/profile.dart';
import '../../domain/poll_option.dart';
import '../../domain/poll_vote.dart';

class VoteResultPieChart extends HookConsumerWidget {
  final Map<PollOption, List<PollVote>> data;

  const VoteResultPieChart(this.data, {super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final touchedIndex = useState(-1);

    return AspectRatio(
      aspectRatio: 1.3,
      child: PieChart(
        PieChartData(
          pieTouchData: PieTouchData(
            touchCallback: (FlTouchEvent event, pieTouchResponse) {
              if (!event.isInterestedForInteractions || pieTouchResponse == null || pieTouchResponse.touchedSection == null) {
                touchedIndex.value = -1;
                return;
              }
              touchedIndex.value = pieTouchResponse.touchedSection!.touchedSectionIndex;
            },
          ),
          borderData: FlBorderData(
            show: false,
          ),
          sectionsSpace: 5,
          centerSpaceRadius: 0,
          sections: List.generate(data.keys.length, (i) {
            final isTouched = i == touchedIndex.value;
            final fontSize = isTouched ? 20.0 : 16.0;
            final radius = isTouched ? 110.0 : 100.0;
            final widgetSize = isTouched ? 55.0 : 40.0;
            const shadows = [Shadow(color: Colors.black, blurRadius: 2)];

            return PieChartSectionData(
              value: data.values.elementAt(i).length.toDouble(),
              title: data.values.elementAt(i).length.toString(),
              radius: radius,
              borderSide: const BorderSide(color: Colors.black),
              color: i % 3 == 2
                  ? context.colorScheme.primary
                  : i % 3 == 1
                      ? context.colorScheme.secondary
                      : context.colorScheme.tertiary,
              titleStyle: context.textTheme.titleLarge!.copyWith(fontSize: fontSize, shadows: shadows),
              badgeWidget: _Badge(
                ref.watch(getProfileByIdProvider(data.keys.elementAt(i).userId)),
                size: widgetSize,
              ),
              badgePositionPercentageOffset: .98,
            );
          }),
        ),
      ),
    );
  }
}

class _Badge extends StatelessWidget {
  const _Badge(
    this.profile, {
    required this.size,
  });
  final AsyncValue<Profile> profile;
  final double size;

  @override
  Widget build(BuildContext context) {
    return AnimatedContainer(
      duration: PieChart.defaultDuration,
      width: size,
      height: size,
      decoration: BoxDecoration(
        color: Colors.white,
        shape: BoxShape.circle,
        boxShadow: <BoxShadow>[
          BoxShadow(
            color: Colors.black.withOpacity(.5),
            offset: const Offset(3, 3),
            blurRadius: 3,
          ),
        ],
      ),
      child: ProfileAvatar(profile),
    );
  }
}
