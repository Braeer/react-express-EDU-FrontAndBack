import { useEffect } from "react"
import Container from "../container"
import NavBar from "../nav-bar"
import { Link, Outlet, useNavigate } from "react-router-dom"
import Profile from "../profile"
import {
  selectUser,
  selectIsAuthenticated,
} from "../../features/user/userSlice"
import Header from "../header"
import { useAppSelector } from "../../app/hooks"

const Layout = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const user = useAppSelector(selectUser)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth")
    }
  }, [])

  console.log(user)

  return (
    <>
      <Header />
      <Container>
        <div className="flex-2 p-4">
          <NavBar />
        </div>
        <div className="flex-1 p-4">
          <Outlet />
        </div>
        <div className="flex-2 p-4">
          <div className="flex-col flex gap-5">{!user && <Profile />}</div>
        </div>
      </Container>
    </>
  )
}

export default Layout
