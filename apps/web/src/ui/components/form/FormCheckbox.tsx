import { useId, useState } from 'react';

import { Checkbox } from '@/ui/primitives/checkbox';
import { Label } from '@/ui/primitives/label';

interface FormCheckboxProps {
  label?: string;
  name: string;
}

function FormCheckbox({ label, name }: FormCheckboxProps) {
  const randomID = useId();
  const id = `${name}-${randomID}`;
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <input type="hidden" name={name} value={checked ? 'true' : 'false'} />
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={() => setChecked(!checked)}
      />
      {label && (
        <Label htmlFor={id} className="text-muted-foreground font-normal">
          {label}
        </Label>
      )}
    </div>
  );
}

export { FormCheckbox };
