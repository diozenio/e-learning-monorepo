import { Checkbox } from "@/ui/primitives/checkbox";
import { Label } from "@/ui/primitives/label";
import { useId } from "react";

interface FormCheckboxProps {
  label?: string;
  name: string;
}

function FormCheckbox({ label, name }: FormCheckboxProps) {
  const randomID = useId();
  const id = `${name}-${randomID}`;

  return (
    <div className="flex items-center gap-2">
      <Checkbox id={id} />
      {label && (
        <Label htmlFor={id} className="font-normal text-muted-foreground">
          {label}
        </Label>
      )}
    </div>
  );
}

export { FormCheckbox };
