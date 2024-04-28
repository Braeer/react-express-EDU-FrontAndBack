import { Input as NextInput } from "@nextui-org/react"
import type { Control } from "react-hook-form"
import { useController } from "react-hook-form"

type Props = {
  name: string
  label: string
  type?: string
  placeholder?: string
  control: Control<any>
  required?: string
  endContent?: JSX.Element
}

const Input: React.FC<Props> = ({
  name,
  label,
  type,
  placeholder,
  control,
  required = "",
  endContent,
}) => {
  const {
    field,
    fieldState: { invalid },
    formState: { errors },
  } = useController({ control, name, rules: { required } })
  return (
    <NextInput
      id={name}
      label={label}
      name={name}
      type={type}
      placeholder={placeholder}
      value={field.value}
      isInvalid={invalid}
      onChange={field.onChange}
      onBlur={field.onBlur}
      errorMessage={`${errors[name]?.message ?? ""}`}
      endContent={endContent}
    ></NextInput>
  )
}

export default Input
