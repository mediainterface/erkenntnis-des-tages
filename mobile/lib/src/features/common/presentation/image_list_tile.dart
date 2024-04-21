import 'package:flutter/material.dart';

import '../../../constants/app_sizes.dart';

class ImageListTile extends StatelessWidget {
  final Widget? leading;
  final Widget? title;
  final Widget? content;
  final Widget? trailing;
  final EdgeInsetsGeometry padding;
  final double titleContentSpacing;
  final EdgeInsetsGeometry contentPadding;
  final VoidCallback? onTap;
  final VoidCallback? onLongPress;
  final double height;

  const ImageListTile({
    this.leading,
    this.title,
    this.content,
    this.trailing,
    this.padding = const EdgeInsets.all(Sizes.p8),
    this.titleContentSpacing = 0,
    this.contentPadding = const EdgeInsets.symmetric(horizontal: Sizes.p8),
    this.onTap,
    this.onLongPress,
    this.height = 150,
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: padding,
      height: height,
      child: InkWell(
        onTap: onTap,
        onLongPress: onLongPress,
        borderRadius: BorderRadius.circular(Sizes.p8),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (leading != null) leading!,
            Expanded(
              child: Padding(
                padding: contentPadding,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    if (title != null) title!,
                    if (title != null) SizedBox(height: titleContentSpacing),
                    if (content != null) Expanded(child: content!),
                  ],
                ),
              ),
            ),
            if (trailing != null) trailing!,
          ],
        ),
      ),
    );
  }
}
