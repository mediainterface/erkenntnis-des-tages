// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'poll_tag.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models');

PollTag _$PollTagFromJson(Map<String, dynamic> json) {
  return _PollTag.fromJson(json);
}

/// @nodoc
mixin _$PollTag {
  String get id => throw _privateConstructorUsedError;
  String get value => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $PollTagCopyWith<PollTag> get copyWith => throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $PollTagCopyWith<$Res> {
  factory $PollTagCopyWith(PollTag value, $Res Function(PollTag) then) =
      _$PollTagCopyWithImpl<$Res, PollTag>;
  @useResult
  $Res call({String id, String value});
}

/// @nodoc
class _$PollTagCopyWithImpl<$Res, $Val extends PollTag>
    implements $PollTagCopyWith<$Res> {
  _$PollTagCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? value = null,
  }) {
    return _then(_value.copyWith(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as String,
      value: null == value
          ? _value.value
          : value // ignore: cast_nullable_to_non_nullable
              as String,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$PollTagImplCopyWith<$Res> implements $PollTagCopyWith<$Res> {
  factory _$$PollTagImplCopyWith(
          _$PollTagImpl value, $Res Function(_$PollTagImpl) then) =
      __$$PollTagImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({String id, String value});
}

/// @nodoc
class __$$PollTagImplCopyWithImpl<$Res>
    extends _$PollTagCopyWithImpl<$Res, _$PollTagImpl>
    implements _$$PollTagImplCopyWith<$Res> {
  __$$PollTagImplCopyWithImpl(
      _$PollTagImpl _value, $Res Function(_$PollTagImpl) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? value = null,
  }) {
    return _then(_$PollTagImpl(
      null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as String,
      null == value
          ? _value.value
          : value // ignore: cast_nullable_to_non_nullable
              as String,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$PollTagImpl implements _PollTag {
  const _$PollTagImpl(this.id, this.value);

  factory _$PollTagImpl.fromJson(Map<String, dynamic> json) =>
      _$$PollTagImplFromJson(json);

  @override
  final String id;
  @override
  final String value;

  @override
  String toString() {
    return 'PollTag(id: $id, value: $value)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$PollTagImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.value, value) || other.value == value));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(runtimeType, id, value);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$PollTagImplCopyWith<_$PollTagImpl> get copyWith =>
      __$$PollTagImplCopyWithImpl<_$PollTagImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$PollTagImplToJson(
      this,
    );
  }
}

abstract class _PollTag implements PollTag {
  const factory _PollTag(final String id, final String value) = _$PollTagImpl;

  factory _PollTag.fromJson(Map<String, dynamic> json) = _$PollTagImpl.fromJson;

  @override
  String get id;
  @override
  String get value;
  @override
  @JsonKey(ignore: true)
  _$$PollTagImplCopyWith<_$PollTagImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
