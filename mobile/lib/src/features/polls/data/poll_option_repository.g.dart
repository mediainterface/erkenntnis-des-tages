// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'poll_option_repository.dart';

// **************************************************************************
// RiverpodGenerator
// **************************************************************************

String _$pollOptionRepositoryHash() =>
    r'b4222400a653312f4914b3e693851f6f4b416ea1';

/// See also [pollOptionRepository].
@ProviderFor(pollOptionRepository)
final pollOptionRepositoryProvider =
    AutoDisposeProvider<PollOptionRepository>.internal(
  pollOptionRepository,
  name: r'pollOptionRepositoryProvider',
  debugGetCreateSourceHash: const bool.fromEnvironment('dart.vm.product')
      ? null
      : _$pollOptionRepositoryHash,
  dependencies: null,
  allTransitiveDependencies: null,
);

typedef PollOptionRepositoryRef = AutoDisposeProviderRef<PollOptionRepository>;
String _$listPollOptionsByPollIdHash() =>
    r'6fe8c5b38c468246b80e421a2dd5f49df0f44694';

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

/// See also [listPollOptionsByPollId].
@ProviderFor(listPollOptionsByPollId)
const listPollOptionsByPollIdProvider = ListPollOptionsByPollIdFamily();

/// See also [listPollOptionsByPollId].
class ListPollOptionsByPollIdFamily
    extends Family<AsyncValue<List<PollOption>>> {
  /// See also [listPollOptionsByPollId].
  const ListPollOptionsByPollIdFamily();

  /// See also [listPollOptionsByPollId].
  ListPollOptionsByPollIdProvider call(
    String pollId,
  ) {
    return ListPollOptionsByPollIdProvider(
      pollId,
    );
  }

  @override
  ListPollOptionsByPollIdProvider getProviderOverride(
    covariant ListPollOptionsByPollIdProvider provider,
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
  String? get name => r'listPollOptionsByPollIdProvider';
}

/// See also [listPollOptionsByPollId].
class ListPollOptionsByPollIdProvider
    extends AutoDisposeFutureProvider<List<PollOption>> {
  /// See also [listPollOptionsByPollId].
  ListPollOptionsByPollIdProvider(
    String pollId,
  ) : this._internal(
          (ref) => listPollOptionsByPollId(
            ref as ListPollOptionsByPollIdRef,
            pollId,
          ),
          from: listPollOptionsByPollIdProvider,
          name: r'listPollOptionsByPollIdProvider',
          debugGetCreateSourceHash:
              const bool.fromEnvironment('dart.vm.product')
                  ? null
                  : _$listPollOptionsByPollIdHash,
          dependencies: ListPollOptionsByPollIdFamily._dependencies,
          allTransitiveDependencies:
              ListPollOptionsByPollIdFamily._allTransitiveDependencies,
          pollId: pollId,
        );

  ListPollOptionsByPollIdProvider._internal(
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
    FutureOr<List<PollOption>> Function(ListPollOptionsByPollIdRef provider)
        create,
  ) {
    return ProviderOverride(
      origin: this,
      override: ListPollOptionsByPollIdProvider._internal(
        (ref) => create(ref as ListPollOptionsByPollIdRef),
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
  AutoDisposeFutureProviderElement<List<PollOption>> createElement() {
    return _ListPollOptionsByPollIdProviderElement(this);
  }

  @override
  bool operator ==(Object other) {
    return other is ListPollOptionsByPollIdProvider && other.pollId == pollId;
  }

  @override
  int get hashCode {
    var hash = _SystemHash.combine(0, runtimeType.hashCode);
    hash = _SystemHash.combine(hash, pollId.hashCode);

    return _SystemHash.finish(hash);
  }
}

mixin ListPollOptionsByPollIdRef
    on AutoDisposeFutureProviderRef<List<PollOption>> {
  /// The parameter `pollId` of this provider.
  String get pollId;
}

class _ListPollOptionsByPollIdProviderElement
    extends AutoDisposeFutureProviderElement<List<PollOption>>
    with ListPollOptionsByPollIdRef {
  _ListPollOptionsByPollIdProviderElement(super.provider);

  @override
  String get pollId => (origin as ListPollOptionsByPollIdProvider).pollId;
}
// ignore_for_file: type=lint
// ignore_for_file: subtype_of_sealed_class, invalid_use_of_internal_member, invalid_use_of_visible_for_testing_member
