import { useId } from 'react';

import { Input } from '@/ui/primitives/input';
import { Label } from '@/ui/primitives/label';

interface FormInputProps {
  label?: string;
  name: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  errors?: string[];
}

function FormInput({
  label,
  name,
  required = true,
  type = 'text',
  errors,
  ...rest
}: FormInputProps) {
  const randomID = useId();
  const id = `${name}-${randomID}`;

  return (
    <div className="space-y-1">
      {label && (
        <Label className="text-xs" htmlFor={id}>
          {label}
        </Label>
      )}
      <Input id={id} name={name} required={required} type={type} {...rest} />
      {errors && errors.length > 0 && (
        <p className="text-xs text-red-500">
          {errors.map((error, index) => (
            <span key={index}>
              {error}
              {index < errors.length - 1 && ', '}
            </span>
          ))}
        </p>
      )}
    </div>
  );
}

export { FormInput };
