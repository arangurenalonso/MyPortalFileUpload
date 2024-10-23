import {
  Control,
  Controller,
  FieldError,
  FieldPathValue,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { useEffect, useState } from 'react';
// import { convertFromRaw, EditorState, RawDraftContentState } from 'draft-js';
import RichTextEditor from './RichTextEditor/RichTextEditor';
import BaseControlledField, {
  DependentField,
} from '../common/BaseControlledField';

type InternalControllerComponentProps = {
  value: any;
  plainText: string;
  onChange: (...event: any[]) => void;
  onBlur: () => void;
  isBlur: boolean;
  setErrorTextPlain: React.Dispatch<
    React.SetStateAction<FieldError | undefined>
  >;
  error: FieldError | undefined;
};

const InternalControllerComponent = ({
  value,
  plainText,
  onChange,
  onBlur,
  isBlur,
  setErrorTextPlain,
  error,
}: InternalControllerComponentProps) => {
  useEffect(() => {
    if (!value && plainText) {
      onChange(plainText);
    }
  }, [value, plainText, onChange]);

  useEffect(() => {
    if (isBlur) {
      onBlur();
    }
  }, [isBlur, onBlur]);

  useEffect(() => {
    onChange(plainText);
  }, [plainText, onChange]);

  useEffect(() => {
    setErrorTextPlain(error);
  }, [error, setErrorTextPlain]);

  return null;
};

type RichTextEditorControlledFieldProps<T extends FieldValues> = {
  watch: UseFormWatch<T>;
  setValue: UseFormSetValue<T>;
  dependentFields?: DependentField<T>[];
  control: Control<T>;
  name: Path<T>;
  disabled?: boolean;
  defaultValue?: FieldPathValue<T, Path<T>>;
  rules:
    | Omit<
        RegisterOptions<FieldValues, Path<T>>,
        'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
      >
    | undefined;

  label?: string;
  helperText?: string;
  informationText?: string;
  isFromArrayForm?: boolean;

  // valueToSet?: FieldPathValue<T, Path<T>> | string | undefined | null;

  namePlainText: Path<T>;
  placeholder?: string | null;
};
const RichTextEditorControlledField = <T extends FieldValues>({
  watch,
  // setValue,
  control,
  dependentFields,
  name,
  disabled,
  defaultValue,
  rules,

  label,
  helperText = ' ',
  informationText,
  isFromArrayForm,

  // valueToSet,

  namePlainText,
  placeholder,
}: RichTextEditorControlledFieldProps<T>) => {
  const [errorTextPlain, setErrorTextPlain] = useState<
    FieldError | undefined
  >();
  const [isBlur, setIsBlur] = useState(false);
  const [plainText, setPlainText] = useState('');
  // useEffect(() => {
  //   if (valueToSet) {
  //     try {
  //       if (typeof valueToSet === 'string') {
  //         const rawContent = JSON.parse(valueToSet) as RawDraftContentState;
  //         const contentState = convertFromRaw(rawContent);
  //         const editorState = EditorState.createWithContent(contentState);
  //         const plainText = editorState.getCurrentContent().getPlainText();
  //         setValue(name, editorState as PathValue<T, Path<T>>);

  //         // const currentContent = editorState.getCurrentContent();
  //         // const rawContentState: RawDraftContentState =
  //         //   convertToRaw(currentContent);

  //         setValue(namePlainText, plainText as PathValue<T, Path<T>>);
  //       }
  //     } catch (error) {
  //       console.error('Invalid JSON value provided:', error);
  //     }
  //   }
  // }, [valueToSet]);
  return (
    <>
      <BaseControlledField
        watch={watch as UseFormWatch<FieldValues>}
        dependentFields={dependentFields}
        name={name}
        control={control as Control<FieldValues>}
        disabled={disabled}
        defaultValue={defaultValue}
        // valueToSet={valueToSet}
        // rules={rules}
        render={({
          value,
          onChange,
          onBlur,
          // error,
          disabled,
        }) => {
          return (
            <>
              <RichTextEditor
                placeholder={placeholder || ''}
                onChange={(editorState) => {
                  onChange(editorState);
                }}
                onChangePlaneText={(plainText) => {
                  setPlainText(plainText);
                }}
                isFromArrayForm={isFromArrayForm}
                disabled={disabled}
                value={value}
                // valueToSet={valueToSet}
                error={!!errorTextPlain}
                errorMessage={errorTextPlain?.message}
                onBlur={() => {
                  setIsBlur(true);
                  onBlur();
                }}
                label={label}
                helperText={helperText}
                informationText={informationText}
              />
            </>
          );
        }}
      />
      <Controller
        name={namePlainText}
        rules={rules}
        defaultValue={defaultValue}
        control={control as Control<FieldValues>}
        render={({
          field: { onBlur, onChange, value },
          fieldState: { error },
        }) => (
          <InternalControllerComponent
            value={value}
            plainText={plainText}
            onChange={onChange}
            onBlur={onBlur}
            isBlur={isBlur}
            setErrorTextPlain={setErrorTextPlain}
            error={error}
          />
        )}
      />
    </>
  );
};

export default RichTextEditorControlledField;
