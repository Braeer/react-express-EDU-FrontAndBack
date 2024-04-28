import { Link } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"
import { selectCurrent } from "../../features/user/userSlice"
import { Card, CardBody } from "@nextui-org/react"
import User from "../../components/user"

const Followers = () => {
  const currentUser = useAppSelector(selectCurrent)

  if (!currentUser) {
    return null
  }
  return currentUser.followers.length > 0 ? (
    <div className="gap-5 flex flex-col">
      {currentUser.followers.map(user => (
        <Link to={`/user/${user.follower.id}`} key={user.follower.id}>
          <Card>
            <CardBody className="block">
              <User
                name={user.follower.name ?? ""}
                avatarUrl={user.follower.avatarUrl ?? ""}
                description={user.follower.bio}
              />
            </CardBody>
          </Card>
        </Link>
      ))}
    </div>
  ) : (
    <h1>У вас нет подписчиков</h1>
  )
}

export default Followers
