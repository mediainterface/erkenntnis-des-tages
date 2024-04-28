import 'package:edt/src/features/profile/data/profile_repository.dart';
import 'package:edt/src/features/profile/presentation/components/profile_avatar.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

import '../../../../extensions/build_context_extensions.dart';
import '../../domain/poll_option.dart';
import '../../domain/poll_vote.dart';

class VoteResultBarChart extends ConsumerWidget {
  final Map<PollOption, List<PollVote>> data;

  const VoteResultBarChart(this.data, {super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return BarChart(
      BarChartData(
        barTouchData: BarTouchData(
          enabled: false,
          touchTooltipData: BarTouchTooltipData(
            getTooltipColor: (group) => Colors.transparent,
            tooltipPadding: EdgeInsets.zero,
            tooltipMargin: 8,
            getTooltipItem: (BarChartGroupData group, int groupIndex, BarChartRodData rod, int rodIndex) {
              return BarTooltipItem(
                rod.toY.round().toString(),
                TextStyle(color: context.colorScheme.primary, fontWeight: FontWeight.bold),
              );
            },
          ),
        ),
        gridData: const FlGridData(show: true, drawVerticalLine: false, horizontalInterval: .999),
        titlesData: FlTitlesData(
          bottomTitles: AxisTitles(
            sideTitles: SideTitles(
              showTitles: true,
              reservedSize: 60,
              getTitlesWidget: (index, meta) {
                final option = data.keys.elementAt(index.toInt());
                return SideTitleWidget(axisSide: meta.axisSide, child: ProfileAvatar(ref.watch(getProfileByIdProvider(option.userId))));
              },
            ),
          ),
          leftTitles: const AxisTitles(
            sideTitles: SideTitles(
              showTitles: true,
              reservedSize: 30,
              interval: 1,
            ),
          ),
          topTitles: const AxisTitles(sideTitles: SideTitles(showTitles: false)),
          rightTitles: const AxisTitles(sideTitles: SideTitles(showTitles: true, reservedSize: 30, interval: 1)),
        ),
        barGroups: [
          for (int index = 0; index < data.keys.length; index++)
            BarChartGroupData(
              x: index,
              barRods: [
                BarChartRodData(
                  toY: data.values.elementAt(index).length.toDouble(),
                  width: 20,
                  borderRadius: const BorderRadius.only(topLeft: Radius.circular(8), topRight: Radius.circular(8)),
                  color: context.colorScheme.primary,
                ),
              ],
            ),
        ],
      ),
    );
  }
}
