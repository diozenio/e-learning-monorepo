import { Input } from '@/ui/primitives/input';
import { Label } from '@/ui/primitives/label';
import { useId } from 'react';

interface FormInputProps {
  label?: string;
  name: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
}

function FormInput({
  label,
  name,
  required = true,
  type = 'text',
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
    </div>
  );
}

export { FormInput };
