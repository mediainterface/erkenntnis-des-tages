import 'package:flutter/material.dart';

class ShimmerList extends StatelessWidget {
  final Widget item;

  const ShimmerList({required this.item, super.key});

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      physics: const NeverScrollableScrollPhysics(),
      itemCount: 10,
      itemBuilder: (_, __) => item,
    );
  }
}
