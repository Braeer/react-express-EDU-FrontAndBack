import { User as NextUiUser } from "@nextui-org/react"
import { BASE_URL } from "../../constants"

type Props = {
  name: string
  avatarUrl: string
  description?: string
  className?: string
}

const User: React.FC<Props> = ({
  name = "",
  avatarUrl = "",
  description = "",
  className = "",
}) => {
  return (
    <NextUiUser
      name={name}
      className={className}
      description={description}
      avatarProps={{ src: `${BASE_URL}/api${avatarUrl}` }}
    />
  )
}

export default User
