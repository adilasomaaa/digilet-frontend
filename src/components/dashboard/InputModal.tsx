import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem, Textarea, NumberInput, Autocomplete, AutocompleteItem, DatePicker } from '@heroui/react';
import ImageUploadField from './ImageUploadField'
import type { UploadFieldProps } from './ImageUploadField';
import type { FormFieldConfig } from '@/types';

interface InputModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fields: FormFieldConfig[];
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isLoading: boolean;
  register: any;
  errors: any;
  setValue: any;
  watch: any;
  autocompleteProps?: Record<string, {
        inputValue: string;
        items: SelectOption[];
        onInputChange: (value: string) => void;
        onSelectionChange?: (key: string | number) => void; 
        selectedKey?: string | number;
    }>;
}

const getValueByDotNotation = (obj: Record<string, any>, path: string) => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

const isUploadField = (field: FormFieldConfig): field is UploadFieldProps => field.type === 'upload';

const InputModal = ({ isOpen, 
  onClose, 
  title, 
  fields, 
  onSubmit, 
  isLoading, 
  register, 
  errors,
  setValue,
  watch,
  autocompleteProps
}: InputModalProps) => {
  
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} placement="center">
      <ModalContent>
        {(onClose) => (
          <form onSubmit={onSubmit}>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody className="max-h-[60vh] overflow-y-scroll">
              {fields.map((field) => {
                if (isUploadField(field)) {
                  return (
                    <ImageUploadField
                      key={field.key}
                      field={field}
                      register={register}
                      errors={errors}
                      watch={watch}
                      setValue={setValue}
                    />
                  );
                }
                const defaultOnSelectionChange = (key: string | number) => {
                  setValue(field.key, key, { shouldValidate: true })
                };
                switch (field.type) {
                  case 'autocomplete':
                    const fieldKey = field.key;
                    const customProps = autocompleteProps?.[fieldKey];
                    const isControlled = !!customProps;
                    
                    const defaultOptions = field.options || [];
                    const currentSelectedKey = watch(fieldKey);
                    
                    let displayValue = undefined; 
                    
                    if (isControlled) {
                        displayValue = customProps.inputValue;
                    } else {
                        const selectedItem = defaultOptions.find(item => String(item.value) === String(currentSelectedKey));
                        displayValue = selectedItem?.label;
                    }
                    
                    const selectionChangeHandler = isControlled && customProps?.onSelectionChange 
                        ? customProps.onSelectionChange 
                        : defaultOnSelectionChange;
                    
                    let autocompletePropsFinal: Record<string, any> = {
                        items: isControlled ? customProps.items : defaultOptions, // Gunakan filtered items jika controlled
                        selectedKey: currentSelectedKey,
                        onSelectionChange: selectionChangeHandler, 
                        isInvalid: !!errors[fieldKey],
                        errorMessage: errors[fieldKey]?.message as string,
                    };

                    if (isControlled) {
                        autocompletePropsFinal = {
                            ...autocompletePropsFinal,
                            inputValue: customProps.inputValue,
                            onInputChange: customProps.onInputChange,
                        };
                    } else {
                        autocompletePropsFinal = {
                          ...autocompletePropsFinal,
                          defaultInputValue: displayValue,
                        };
                    }
                    
                    return (
                      <Autocomplete
                          key={fieldKey}
                          label={field.label}
                          placeholder={field.placeholder}
                          variant='bordered'
                          {...autocompletePropsFinal}
                      >
                         {(item: any) => { 
                            if ((field as any).renderItem) {
                                return (field as any).renderItem(item);
                            }
                            return (
                                <AutocompleteItem key={String(item.value)}>
                                    {item.label}
                                </AutocompleteItem>
                            );
                        }}
                      </Autocomplete>
                    );
                  case 'select':
                    return (
                      <Select
                        isRequired={field.isRequired}
                        key={field.key}
                        label={field.label}
                        variant='bordered'
                        placeholder={field.placeholder}
                        selectedKeys={watch(field.key) ? [String(watch(field.key))] : []}
                        onSelectionChange={(keys) => {
                          const value = Array.from(keys)[0];
                          setValue(field.key, value, { shouldValidate: true });
                        }}
                        isInvalid={!!errors[field.key]}
                        errorMessage={errors[field.key]?.message as string}
                      >
                        {field.options?.map((option) => (
                          <SelectItem key={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </Select>
                    );
                  case 'multi-select':
                    return (
                      <Select
                        isRequired={field.isRequired}
                        key={field.key}
                        label={field.label}
                        placeholder={field.placeholder}
                        selectionMode="multiple"
                        variant='bordered'
                        selectedKeys={watch(field.key) !== undefined ? [String(watch(field.key))] : []}
                        onSelectionChange={(keys) => {
                          const rawValue = Array.from(keys)[0] as string;
                          
                          let finalValue: any = rawValue;
                          if (rawValue === "true") finalValue = true;
                          else if (rawValue === "false") finalValue = false;
                          else if (!isNaN(Number(rawValue)) && rawValue.trim() !== "") finalValue = Number(rawValue);
                          
                          setValue(field.key, finalValue, { shouldValidate: true });
                        }}
                        isInvalid={!!errors[field.key]}
                        errorMessage={errors[field.key]?.message as string}
                      >
                        {field.options?.map((option) => (
                          // 3. Hapus properti 'value', cukup 'key' saja
                          <SelectItem key={String(option.value)}> 
                            {option.label}
                          </SelectItem>
                        ))}
                      </Select>
                    );
                  case 'date':
                    return (
                      <div key={field.key}>
                        <DatePicker
                          showMonthAndYearPickers
                          isRequired={field.isRequired}
                          label={field.label} 
                          variant='bordered'
                          value={watch(field.key)} 
                          onChange={(date) => {
                            setValue(field.key, date, { shouldValidate: true });
                          }}
                          isInvalid={!!errors[field.key]}
                          errorMessage={errors[field.key]?.message as string} />
                      </div>
                    );
                  case 'textarea':
                    return (
                      <div key={field.key}>
                        <Textarea 
                          isRequired={field.isRequired}
                          label={field.label} 
                          variant='bordered'
                          placeholder={field.placeholder}
                          {...register(field.key)}
                          isInvalid={!!errors[field.key]}
                          errorMessage={errors[field.key]?.message as string} />
                      </div>
                    );
                  case 'number':
                    return (
                      <div key={field.key}>
                        <Input 
                          type="number"
                          variant='bordered'
                          isRequired={field.isRequired}
                          label={field.label} 
                          placeholder={field.placeholder}
                          {...register(field.key, { valueAsNumber: true })}
                          isInvalid={!!errors[field.key]}
                          errorMessage={errors[field.key]?.message as string} 
                        />
                      </div>
                    );
                  default:
                    return (
                      <div key={field.key}>
                        <Input
                          isRequired={field.isRequired}
                          type={field.type}
                          label={field.label}
                          variant='bordered'
                          placeholder={field.placeholder}
                          {...register(field.key)}
                          isInvalid={!!errors[field.key]}
                          errorMessage={errors[field.key]?.message as string}
                        />
                      </div>
                    );
                }
              })}
            </ModalBody>
            <ModalFooter>
              <Button color="default" variant="flat" onPress={onClose}>
                Batal
              </Button>
              <Button color="primary" type="submit" isLoading={isLoading}>
                Simpan
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};

export default InputModal;