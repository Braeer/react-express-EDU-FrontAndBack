import { Button as NextButton } from "@nextui-org/react"

type Props = {
  children: React.ReactNode
  icon?: JSX.Element
  className?: string
  type?: "button" | "submit" | "reset" | undefined
  fullWidth?: boolean
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | "default"
    | undefined
}

const Button: React.FC<Props> = ({
  children,
  icon,
  className,
  type,
  fullWidth,
  color,
}) => {
  return (
    <NextButton
      startContent={icon}
      size="lg"
      fullWidth={fullWidth}
      color={color}
      variant="light"
      type={type}
      className={className}
    >
      {children}
    </NextButton>
  )
}

export default Button
