// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'poll_repository.dart';

// **************************************************************************
// RiverpodGenerator
// **************************************************************************

String _$pollRepositoryHash() => r'e932871d6e6b638f1c4dc47e82b8a8ce53814ee7';

/// See also [pollRepository].
@ProviderFor(pollRepository)
final pollRepositoryProvider = AutoDisposeProvider<PollRepository>.internal(
  pollRepository,
  name: r'pollRepositoryProvider',
  debugGetCreateSourceHash: const bool.fromEnvironment('dart.vm.product')
      ? null
      : _$pollRepositoryHash,
  dependencies: null,
  allTransitiveDependencies: null,
);

typedef PollRepositoryRef = AutoDisposeProviderRef<PollRepository>;
String _$watchOpenPollsHash() => r'0b1e1962245ee44034e2f0e420065db3cfd88816';

/// See also [watchOpenPolls].
@ProviderFor(watchOpenPolls)
final watchOpenPollsProvider = AutoDisposeStreamProvider<List<Poll>>.internal(
  watchOpenPolls,
  name: r'watchOpenPollsProvider',
  debugGetCreateSourceHash: const bool.fromEnvironment('dart.vm.product')
      ? null
      : _$watchOpenPollsHash,
  dependencies: null,
  allTransitiveDependencies: null,
);

typedef WatchOpenPollsRef = AutoDisposeStreamProviderRef<List<Poll>>;
String _$getPollByIdHash() => r'1dafc9791275a73407b57e86bfcd6b8dabf3eb7f';

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

/// See also [getPollById].
@ProviderFor(getPollById)
const getPollByIdProvider = GetPollByIdFamily();

/// See also [getPollById].
class GetPollByIdFamily extends Family<Poll> {
  /// See also [getPollById].
  const GetPollByIdFamily();

  /// See also [getPollById].
  GetPollByIdProvider call(
    String id,
  ) {
    return GetPollByIdProvider(
      id,
    );
  }

  @override
  GetPollByIdProvider getProviderOverride(
    covariant GetPollByIdProvider provider,
  ) {
    return call(
      provider.id,
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
  String? get name => r'getPollByIdProvider';
}

/// See also [getPollById].
class GetPollByIdProvider extends AutoDisposeProvider<Poll> {
  /// See also [getPollById].
  GetPollByIdProvider(
    String id,
  ) : this._internal(
          (ref) => getPollById(
            ref as GetPollByIdRef,
            id,
          ),
          from: getPollByIdProvider,
          name: r'getPollByIdProvider',
          debugGetCreateSourceHash:
              const bool.fromEnvironment('dart.vm.product')
                  ? null
                  : _$getPollByIdHash,
          dependencies: GetPollByIdFamily._dependencies,
          allTransitiveDependencies:
              GetPollByIdFamily._allTransitiveDependencies,
          id: id,
        );

  GetPollByIdProvider._internal(
    super._createNotifier, {
    required super.name,
    required super.dependencies,
    required super.allTransitiveDependencies,
    required super.debugGetCreateSourceHash,
    required super.from,
    required this.id,
  }) : super.internal();

  final String id;

  @override
  Override overrideWith(
    Poll Function(GetPollByIdRef provider) create,
  ) {
    return ProviderOverride(
      origin: this,
      override: GetPollByIdProvider._internal(
        (ref) => create(ref as GetPollByIdRef),
        from: from,
        name: null,
        dependencies: null,
        allTransitiveDependencies: null,
        debugGetCreateSourceHash: null,
        id: id,
      ),
    );
  }

  @override
  AutoDisposeProviderElement<Poll> createElement() {
    return _GetPollByIdProviderElement(this);
  }

  @override
  bool operator ==(Object other) {
    return other is GetPollByIdProvider && other.id == id;
  }

  @override
  int get hashCode {
    var hash = _SystemHash.combine(0, runtimeType.hashCode);
    hash = _SystemHash.combine(hash, id.hashCode);

    return _SystemHash.finish(hash);
  }
}

mixin GetPollByIdRef on AutoDisposeProviderRef<Poll> {
  /// The parameter `id` of this provider.
  String get id;
}

class _GetPollByIdProviderElement extends AutoDisposeProviderElement<Poll>
    with GetPollByIdRef {
  _GetPollByIdProviderElement(super.provider);

  @override
  String get id => (origin as GetPollByIdProvider).id;
}
// ignore_for_file: type=lint
// ignore_for_file: subtype_of_sealed_class, invalid_use_of_internal_member, invalid_use_of_visible_for_testing_member
