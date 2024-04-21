// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'poll_vote_repository.dart';

// **************************************************************************
// RiverpodGenerator
// **************************************************************************

String _$pollVoteRepositoryHash() =>
    r'00f2122a0921261e4a7b01fc6999e60c59af4518';

/// See also [pollVoteRepository].
@ProviderFor(pollVoteRepository)
final pollVoteRepositoryProvider =
    AutoDisposeProvider<PollVoteRepository>.internal(
  pollVoteRepository,
  name: r'pollVoteRepositoryProvider',
  debugGetCreateSourceHash: const bool.fromEnvironment('dart.vm.product')
      ? null
      : _$pollVoteRepositoryHash,
  dependencies: null,
  allTransitiveDependencies: null,
);

typedef PollVoteRepositoryRef = AutoDisposeProviderRef<PollVoteRepository>;
String _$watchVotesByPollIdHash() =>
    r'78174055b6d45386fed7c1c4018f7e556fc85a18';

/// Copied from Dart SDK
class _SystemHash {
  _SystemHash._();

  static int combine(int hash, int value) {
    // ignore: parameter_assignments
    hash = 0x1fffffff & (hash + value);
    // ignore: parameter_assignments
    hash = 0x1fffffff & (hash + ((0x0007ffff & hash) << 10));
    return hash ^ (hash >> 6);
  }

  static int finish(int hash) {
    // ignore: parameter_assignments
    hash = 0x1fffffff & (hash + ((0x03ffffff & hash) << 3));
    // ignore: parameter_assignments
    hash = hash ^ (hash >> 11);
    return 0x1fffffff & (hash + ((0x00003fff & hash) << 15));
  }
}

/// See also [watchVotesByPollId].
@ProviderFor(watchVotesByPollId)
const watchVotesByPollIdProvider = WatchVotesByPollIdFamily();

/// See also [watchVotesByPollId].
class WatchVotesByPollIdFamily extends Family<AsyncValue<List<PollVote>>> {
  /// See also [watchVotesByPollId].
  const WatchVotesByPollIdFamily();

  /// See also [watchVotesByPollId].
  WatchVotesByPollIdProvider call(
    String pollId,
  ) {
    return WatchVotesByPollIdProvider(
      pollId,
    );
  }

  @override
  WatchVotesByPollIdProvider getProviderOverride(
    covariant WatchVotesByPollIdProvider provider,
  ) {
    return call(
      provider.pollId,
    );
  }

  static const Iterable<ProviderOrFamily>? _dependencies = null;

  @override
  Iterable<ProviderOrFamily>? get dependencies => _dependencies;

  static const Iterable<ProviderOrFamily>? _allTransitiveDependencies = null;

  @override
  Iterable<ProviderOrFamily>? get allTransitiveDependencies =>
      _allTransitiveDependencies;

  @override
  String? get name => r'watchVotesByPollIdProvider';
}

/// See also [watchVotesByPollId].
class WatchVotesByPollIdProvider
    extends AutoDisposeStreamProvider<List<PollVote>> {
  /// See also [watchVotesByPollId].
  WatchVotesByPollIdProvider(
    String pollId,
  ) : this._internal(
          (ref) => watchVotesByPollId(
            ref as WatchVotesByPollIdRef,
            pollId,
          ),
          from: watchVotesByPollIdProvider,
          name: r'watchVotesByPollIdProvider',
          debugGetCreateSourceHash:
              const bool.fromEnvironment('dart.vm.product')
                  ? null
                  : _$watchVotesByPollIdHash,
          dependencies: WatchVotesByPollIdFamily._dependencies,
          allTransitiveDependencies:
              WatchVotesByPollIdFamily._allTransitiveDependencies,
          pollId: pollId,
        );

  WatchVotesByPollIdProvider._internal(
    super._createNotifier, {
    required super.name,
    required super.dependencies,
    required super.allTransitiveDependencies,
    required super.debugGetCreateSourceHash,
    required super.from,
    required this.pollId,
  }) : super.internal();

  final String pollId;

  @override
  Override overrideWith(
    Stream<List<PollVote>> Function(WatchVotesByPollIdRef provider) create,
  ) {
    return ProviderOverride(
      origin: this,
      override: WatchVotesByPollIdProvider._internal(
        (ref) => create(ref as WatchVotesByPollIdRef),
        from: from,
        name: null,
        dependencies: null,
        allTransitiveDependencies: null,
        debugGetCreateSourceHash: null,
        pollId: pollId,
      ),
    );
  }

  @override
  AutoDisposeStreamProviderElement<List<PollVote>> createElement() {
    return _WatchVotesByPollIdProviderElement(this);
  }

  @override
  bool operator ==(Object other) {
    return other is WatchVotesByPollIdProvider && other.pollId == pollId;
  }

  @override
  int get hashCode {
    var hash = _SystemHash.combine(0, runtimeType.hashCode);
    hash = _SystemHash.combine(hash, pollId.hashCode);

    return _SystemHash.finish(hash);
  }
}

mixin WatchVotesByPollIdRef on AutoDisposeStreamProviderRef<List<PollVote>> {
  /// The parameter `pollId` of this provider.
  String get pollId;
}

class _WatchVotesByPollIdProviderElement
    extends AutoDisposeStreamProviderElement<List<PollVote>>
    with WatchVotesByPollIdRef {
  _WatchVotesByPollIdProviderElement(super.provider);

  @override
  String get pollId => (origin as WatchVotesByPollIdProvider).pollId;
}
// ignore_for_file: type=lint
// ignore_for_file: subtype_of_sealed_class, invalid_use_of_internal_member, invalid_use_of_visible_for_testing_member
