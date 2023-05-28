import { TextField } from '@mui/material';
import { type BaseSyntheticEvent } from 'react';
import TitleRequired from 'gametest/components/ui-components/TitleRequired';

interface TextFieldWithTitleProps {
  description?: string;
  title?: string;
  id: string;
  required?: boolean;
  subtitle?: string;
  containerClassName?: string;
  type: string;
  onChange: (e: BaseSyntheticEvent) => void;
  defaultValue?: string;
  inputProps: { accept?: string[]; multiple: boolean;};
}

export const TextFieldWithTitle = ({
  title,
  onChange,
  required,
  id,
  containerClassName,
  subtitle,
  type,
  defaultValue,
  inputProps
}: TextFieldWithTitleProps) => {
  return (

    <div className={`my-5 w-full ${containerClassName ?? ''}`}>
      <TitleRequired id={id} title={title} required={required} />

      <div className="my-3 flex w-full items-center rounded-lg bg-slate-100 shadow shadow-slate-400">
        <TextField required={required} onChange={onChange} defaultValue={defaultValue} type={type} className="w-full" inputProps={inputProps} />
      </div>
      <p className="border-b text-right text-[10px] text-primary">{subtitle}</p>
    </div>
  );
};
export default TextFieldWithTitle;
