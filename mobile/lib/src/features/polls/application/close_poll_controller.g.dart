// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'close_poll_controller.dart';

// **************************************************************************
// RiverpodGenerator
// **************************************************************************

String _$closePollControllerHash() =>
    r'a69e81d2b78d2b7acbe04b12207732f4102eec6c';

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

abstract class _$ClosePollController
    extends BuildlessAutoDisposeAsyncNotifier<void> {
  late final String pollId;

  FutureOr<void> build(
    String pollId,
  );
}

/// See also [ClosePollController].
@ProviderFor(ClosePollController)
const closePollControllerProvider = ClosePollControllerFamily();

/// See also [ClosePollController].
class ClosePollControllerFamily extends Family<AsyncValue<void>> {
  /// See also [ClosePollController].
  const ClosePollControllerFamily();

  /// See also [ClosePollController].
  ClosePollControllerProvider call(
    String pollId,
  ) {
    return ClosePollControllerProvider(
      pollId,
    );
  }

  @override
  ClosePollControllerProvider getProviderOverride(
    covariant ClosePollControllerProvider provider,
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
  String? get name => r'closePollControllerProvider';
}

/// See also [ClosePollController].
class ClosePollControllerProvider
    extends AutoDisposeAsyncNotifierProviderImpl<ClosePollController, void> {
  /// See also [ClosePollController].
  ClosePollControllerProvider(
    String pollId,
  ) : this._internal(
          () => ClosePollController()..pollId = pollId,
          from: closePollControllerProvider,
          name: r'closePollControllerProvider',
          debugGetCreateSourceHash:
              const bool.fromEnvironment('dart.vm.product')
                  ? null
                  : _$closePollControllerHash,
          dependencies: ClosePollControllerFamily._dependencies,
          allTransitiveDependencies:
              ClosePollControllerFamily._allTransitiveDependencies,
          pollId: pollId,
        );

  ClosePollControllerProvider._internal(
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
  FutureOr<void> runNotifierBuild(
    covariant ClosePollController notifier,
  ) {
    return notifier.build(
      pollId,
    );
  }

  @override
  Override overrideWith(ClosePollController Function() create) {
    return ProviderOverride(
      origin: this,
      override: ClosePollControllerProvider._internal(
        () => create()..pollId = pollId,
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
  AutoDisposeAsyncNotifierProviderElement<ClosePollController, void>
      createElement() {
    return _ClosePollControllerProviderElement(this);
  }

  @override
  bool operator ==(Object other) {
    return other is ClosePollControllerProvider && other.pollId == pollId;
  }

  @override
  int get hashCode {
    var hash = _SystemHash.combine(0, runtimeType.hashCode);
    hash = _SystemHash.combine(hash, pollId.hashCode);

    return _SystemHash.finish(hash);
  }
}

mixin ClosePollControllerRef on AutoDisposeAsyncNotifierProviderRef<void> {
  /// The parameter `pollId` of this provider.
  String get pollId;
}

class _ClosePollControllerProviderElement
    extends AutoDisposeAsyncNotifierProviderElement<ClosePollController, void>
    with ClosePollControllerRef {
  _ClosePollControllerProviderElement(super.provider);

  @override
  String get pollId => (origin as ClosePollControllerProvider).pollId;
}
// ignore_for_file: type=lint
// ignore_for_file: subtype_of_sealed_class, invalid_use_of_internal_member, invalid_use_of_visible_for_testing_member
