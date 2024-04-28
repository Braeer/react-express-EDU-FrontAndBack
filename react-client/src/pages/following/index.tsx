import React from "react"
import { useAppSelector } from "../../app/hooks"
import { Link } from "react-router-dom"
import { Card, CardBody } from "@nextui-org/react"
import User from "../../components/user"
import { selectCurrent } from "../../features/user/userSlice"

const Following = () => {
  const currentUser = useAppSelector(selectCurrent)

  if (!currentUser) {
    return null
  }
  return currentUser.following.length > 0 ? (
    <div className="gap-5 flex flex-col">
      {currentUser.following.map(user => (
        <Link to={`/user/${user.following.id}`} key={user.following.id}>
          <Card>
            <CardBody className="block">
              <User
                name={user.following.name ?? ""}
                avatarUrl={user.following.avatarUrl ?? ""}
                description={user.following.bio}
              />
            </CardBody>
          </Card>
        </Link>
      ))}
    </div>
  ) : (
    <h1>У вас нет подписок</h1>
  )
}

export default Following
