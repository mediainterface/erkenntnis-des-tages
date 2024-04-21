// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'poll_option_state.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models');

PollOptionState _$PollOptionStateFromJson(Map<String, dynamic> json) {
  return _PollOptionState.fromJson(json);
}

/// @nodoc
mixin _$PollOptionState {
  String get userId => throw _privateConstructorUsedError;
  String get value => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $PollOptionStateCopyWith<PollOptionState> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $PollOptionStateCopyWith<$Res> {
  factory $PollOptionStateCopyWith(
          PollOptionState value, $Res Function(PollOptionState) then) =
      _$PollOptionStateCopyWithImpl<$Res, PollOptionState>;
  @useResult
  $Res call({String userId, String value});
}

/// @nodoc
class _$PollOptionStateCopyWithImpl<$Res, $Val extends PollOptionState>
    implements $PollOptionStateCopyWith<$Res> {
  _$PollOptionStateCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? userId = null,
    Object? value = null,
  }) {
    return _then(_value.copyWith(
      userId: null == userId
          ? _value.userId
          : userId // ignore: cast_nullable_to_non_nullable
              as String,
      value: null == value
          ? _value.value
          : value // ignore: cast_nullable_to_non_nullable
              as String,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$PollOptionStateImplCopyWith<$Res>
    implements $PollOptionStateCopyWith<$Res> {
  factory _$$PollOptionStateImplCopyWith(_$PollOptionStateImpl value,
          $Res Function(_$PollOptionStateImpl) then) =
      __$$PollOptionStateImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({String userId, String value});
}

/// @nodoc
class __$$PollOptionStateImplCopyWithImpl<$Res>
    extends _$PollOptionStateCopyWithImpl<$Res, _$PollOptionStateImpl>
    implements _$$PollOptionStateImplCopyWith<$Res> {
  __$$PollOptionStateImplCopyWithImpl(
      _$PollOptionStateImpl _value, $Res Function(_$PollOptionStateImpl) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? userId = null,
    Object? value = null,
  }) {
    return _then(_$PollOptionStateImpl(
      userId: null == userId
          ? _value.userId
          : userId // ignore: cast_nullable_to_non_nullable
              as String,
      value: null == value
          ? _value.value
          : value // ignore: cast_nullable_to_non_nullable
              as String,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$PollOptionStateImpl implements _PollOptionState {
  const _$PollOptionStateImpl({required this.userId, required this.value});

  factory _$PollOptionStateImpl.fromJson(Map<String, dynamic> json) =>
      _$$PollOptionStateImplFromJson(json);

  @override
  final String userId;
  @override
  final String value;

  @override
  String toString() {
    return 'PollOptionState(userId: $userId, value: $value)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$PollOptionStateImpl &&
            (identical(other.userId, userId) || other.userId == userId) &&
            (identical(other.value, value) || other.value == value));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(runtimeType, userId, value);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$PollOptionStateImplCopyWith<_$PollOptionStateImpl> get copyWith =>
      __$$PollOptionStateImplCopyWithImpl<_$PollOptionStateImpl>(
          this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$PollOptionStateImplToJson(
      this,
    );
  }
}

abstract class _PollOptionState implements PollOptionState {
  const factory _PollOptionState(
      {required final String userId,
      required final String value}) = _$PollOptionStateImpl;

  factory _PollOptionState.fromJson(Map<String, dynamic> json) =
      _$PollOptionStateImpl.fromJson;

  @override
  String get userId;
  @override
  String get value;
  @override
  @JsonKey(ignore: true)
  _$$PollOptionStateImplCopyWith<_$PollOptionStateImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
