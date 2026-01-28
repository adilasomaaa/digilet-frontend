export interface SelectOption {
  label: string;
  value: string | number | boolean;
}

interface BaseField {
  key: string;
  label: string;
  placeholder?: string;
  defaultValue?: any;
  isRequired?: boolean;
}

// Tipe spesifik untuk berbagai jenis input
interface TextField extends BaseField {
  type: "text" | "email" | "password" | "wysiwyg";
}
interface NumberField extends BaseField {
  type: "number";
}

interface DateField extends BaseField {
  type: "date";
}

interface TextAreaField extends BaseField {
  type: "textarea";
}

interface SelectField extends BaseField {
  type: "select";
  readonly options: readonly SelectOption[];
}

interface AutoCompleteField extends BaseField {
  type: "autocomplete";
  readonly options?: readonly SelectOption[];
  readonly renderItem?: (item: SelectOption) => React.ReactElement<any>;
}

interface MultiSelectField extends BaseField {
  type: "multi-select";

  readonly options: readonly SelectOption[];
}

interface UploadField extends BaseField {
  type: "upload";
  maxSize?: number;
  allowedExtensions?: readonly string[];
  previewUrl?: string;
}

// Gabungkan semua tipe field menjadi satu
export type FormFieldConfig =
  | TextField
  | SelectField
  | MultiSelectField
  | UploadField
  | TextAreaField
  | NumberField
  | AutoCompleteField
  | DateField;

export type DisplayFieldConfig<T> = {
  key: string;
  label: string;
  render?: (item: T) => React.ReactNode;
};
