// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'poll_option_tag.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models');

PollOptionTag _$PollOptionTagFromJson(Map<String, dynamic> json) {
  return _PollOptionTag.fromJson(json);
}

/// @nodoc
mixin _$PollOptionTag {
  @JsonKey(name: "poll_option_id")
  String get pollOptionId => throw _privateConstructorUsedError;
  @JsonKey(name: "poll_tag_id")
  String get pollTagId => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $PollOptionTagCopyWith<PollOptionTag> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $PollOptionTagCopyWith<$Res> {
  factory $PollOptionTagCopyWith(
          PollOptionTag value, $Res Function(PollOptionTag) then) =
      _$PollOptionTagCopyWithImpl<$Res, PollOptionTag>;
  @useResult
  $Res call(
      {@JsonKey(name: "poll_option_id") String pollOptionId,
      @JsonKey(name: "poll_tag_id") String pollTagId});
}

/// @nodoc
class _$PollOptionTagCopyWithImpl<$Res, $Val extends PollOptionTag>
    implements $PollOptionTagCopyWith<$Res> {
  _$PollOptionTagCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? pollOptionId = null,
    Object? pollTagId = null,
  }) {
    return _then(_value.copyWith(
      pollOptionId: null == pollOptionId
          ? _value.pollOptionId
          : pollOptionId // ignore: cast_nullable_to_non_nullable
              as String,
      pollTagId: null == pollTagId
          ? _value.pollTagId
          : pollTagId // ignore: cast_nullable_to_non_nullable
              as String,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$PollOptionTagImplCopyWith<$Res>
    implements $PollOptionTagCopyWith<$Res> {
  factory _$$PollOptionTagImplCopyWith(
          _$PollOptionTagImpl value, $Res Function(_$PollOptionTagImpl) then) =
      __$$PollOptionTagImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {@JsonKey(name: "poll_option_id") String pollOptionId,
      @JsonKey(name: "poll_tag_id") String pollTagId});
}

/// @nodoc
class __$$PollOptionTagImplCopyWithImpl<$Res>
    extends _$PollOptionTagCopyWithImpl<$Res, _$PollOptionTagImpl>
    implements _$$PollOptionTagImplCopyWith<$Res> {
  __$$PollOptionTagImplCopyWithImpl(
      _$PollOptionTagImpl _value, $Res Function(_$PollOptionTagImpl) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? pollOptionId = null,
    Object? pollTagId = null,
  }) {
    return _then(_$PollOptionTagImpl(
      null == pollOptionId
          ? _value.pollOptionId
          : pollOptionId // ignore: cast_nullable_to_non_nullable
              as String,
      null == pollTagId
          ? _value.pollTagId
          : pollTagId // ignore: cast_nullable_to_non_nullable
              as String,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$PollOptionTagImpl implements _PollOptionTag {
  const _$PollOptionTagImpl(@JsonKey(name: "poll_option_id") this.pollOptionId,
      @JsonKey(name: "poll_tag_id") this.pollTagId);

  factory _$PollOptionTagImpl.fromJson(Map<String, dynamic> json) =>
      _$$PollOptionTagImplFromJson(json);

  @override
  @JsonKey(name: "poll_option_id")
  final String pollOptionId;
  @override
  @JsonKey(name: "poll_tag_id")
  final String pollTagId;

  @override
  String toString() {
    return 'PollOptionTag(pollOptionId: $pollOptionId, pollTagId: $pollTagId)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$PollOptionTagImpl &&
            (identical(other.pollOptionId, pollOptionId) ||
                other.pollOptionId == pollOptionId) &&
            (identical(other.pollTagId, pollTagId) ||
                other.pollTagId == pollTagId));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(runtimeType, pollOptionId, pollTagId);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$PollOptionTagImplCopyWith<_$PollOptionTagImpl> get copyWith =>
      __$$PollOptionTagImplCopyWithImpl<_$PollOptionTagImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$PollOptionTagImplToJson(
      this,
    );
  }
}

abstract class _PollOptionTag implements PollOptionTag {
  const factory _PollOptionTag(
          @JsonKey(name: "poll_option_id") final String pollOptionId,
          @JsonKey(name: "poll_tag_id") final String pollTagId) =
      _$PollOptionTagImpl;

  factory _PollOptionTag.fromJson(Map<String, dynamic> json) =
      _$PollOptionTagImpl.fromJson;

  @override
  @JsonKey(name: "poll_option_id")
  String get pollOptionId;
  @override
  @JsonKey(name: "poll_tag_id")
  String get pollTagId;
  @override
  @JsonKey(ignore: true)
  _$$PollOptionTagImplCopyWith<_$PollOptionTagImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
