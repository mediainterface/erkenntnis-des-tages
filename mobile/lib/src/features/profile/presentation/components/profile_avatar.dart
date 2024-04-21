import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

import '../../../common/presentation/shimmer/shimmer_avatar.dart';
import '../../domain/profile.dart';

class ProfileAvatar extends StatelessWidget {
  final AsyncValue<Profile> profile;
  final double? size;

  const ProfileAvatar(this.profile, {this.size, super.key});

  @override
  Widget build(BuildContext context) {
    return profile.maybeWhen(
        data: (data) => data.avatarUrl == null
            ? CircleAvatar(radius: size, child: const Icon(Icons.person))
            : CachedNetworkImage(
                imageUrl: data.avatarUrl!,
                imageBuilder: (context, imageProvider) => ShimmerAvatar(backgroundImage: imageProvider, size: size),
                placeholder: (context, url) => ShimmerAvatar(size: size),
                errorWidget: (context, url, error) => ShimmerAvatar(size: size),
              ),
        orElse: () => const ShimmerAvatar());
  }
}
