import { Link } from "react-router-dom"
import Button from "../button"

type Props = {
  children: React.ReactNode
  icon: JSX.Element
  href: string
}

const NavButton: React.FC<Props> = ({ children, icon, href }) => {
  return (
    <Button
      className="navbar-button-user flex justify-start text-xl"
      icon={icon}
    >
      <Link to={href}>{children}</Link>
    </Button>
    // <Link to={href}>
    //   <Button className="flex justify-start text-xl" icon={icon}>
    //     {children}
    //   </Button>
    // </Link>
  )
}

export default NavButton
