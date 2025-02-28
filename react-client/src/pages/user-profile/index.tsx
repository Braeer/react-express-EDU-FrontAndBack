import { Button, Card, Image, useDisclosure } from "@nextui-org/react"
import { useParams } from "react-router-dom"
import { resetUser, selectCurrent } from "../../features/user/userSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  useGetUserByIdQuery,
  useLazyCurrentQuery,
  useLazyGetUserByIdQuery,
} from "../../app/services/userApi"
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "../../app/services/followApi"
import { useEffect } from "react"
import GoBack from "../../components/go-back"
import { BASE_URL } from "../../constants"
import {
  MdOutlinePersonAddAlt1,
  MdOutlinePersonAddDisabled,
} from "react-icons/md"
import { CiEdit } from "react-icons/ci"
import ProfileInfo from "../../components/profile-info"
import { formatToClientDate } from "../../utils/format-to-client-date"
import CountInfo from "../../components/count-info"
import { hasErrorField } from "../../utils/has-error-field"
import EditProfile from "../../components/edit-profile"

const UserProfile = () => {
  const { id } = useParams<{ id: string }>()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const currentUser = useAppSelector(selectCurrent)
  const { data } = useGetUserByIdQuery(id ?? "")
  const [followUser] = useFollowUserMutation()
  const [unfollowUser] = useUnfollowUserMutation()
  const [triggerGetUserByIdQuery] = useLazyGetUserByIdQuery()
  const [triggerCurrentQuery] = useLazyCurrentQuery()

  const dispatch = useAppDispatch()

  useEffect(
    () => () => {
      dispatch(resetUser())
    },
    [],
  )

  const handleFollow = async () => {
    try {
      if (id) {
        data?.isFollowing
          ? await unfollowUser(id).unwrap()
          : await followUser({ followingId: id }).unwrap()

        await triggerGetUserByIdQuery(id)

        await triggerCurrentQuery()
      }
    } catch (error) {
      if (hasErrorField(error)) {
        console.log(error.data.error)
      } else {
        console.log(error)
      }
    }
  }

  const handleClose = async () => {
    try {
      if (id) {
        await triggerGetUserByIdQuery(id)
        await triggerCurrentQuery()
        onClose()
      }
    } catch (error) {
      console.error(error)
    }
  }

  if (!data) {
    return null
  }

  return (
    <>
      <GoBack />
      <div className="flex userprofile-user items-center gap-4">
        <Card className="flex  userprofile-user-1  flex-col items-center text-center space-y-4 p-5 flex-2">
          <Image
            src={`${BASE_URL}/api${data?.avatarUrl}`}
            alt={data?.name}
            width={200}
            height={200}
            className="border-4 border-white"
          />
          <div className="flex flex-col text-2xl font-bold gap-4 item-center">
            {data.name}
            {currentUser?.id !== id ? (
              <Button
                color={data.isFollowing ? "default" : "primary"}
                variant="flat"
                className="gap-2"
                onClick={handleFollow}
                endContent={
                  data.isFollowing ? (
                    <MdOutlinePersonAddDisabled />
                  ) : (
                    <MdOutlinePersonAddAlt1 />
                  )
                }
              >
                {data.isFollowing ? "Отписаться" : "Подписаться"}
              </Button>
            ) : (
              <Button endContent={<CiEdit />} onClick={() => onOpen()}>
                Редактировать
              </Button>
            )}
          </div>
        </Card>
        <Card className="flex userprofile-user-1 flex-col space-y-4 p-5 flex-1">
          <ProfileInfo title="Почта" info={data.email} />
          <ProfileInfo title="Местоположение" info={data.location} />
          <ProfileInfo
            title="Дата рождения"
            info={formatToClientDate(data.dateOfBirth)}
          />
          <ProfileInfo title="Обо мне" info={data.bio} />

          <div className="flex gap-2">
            <CountInfo count={data.followers.length} title="Подписчики" />
            <CountInfo count={data.following.length} title="Подписки" />
          </div>
        </Card>
      </div>
      <EditProfile isOpen={isOpen} onClose={handleClose} user={data} />
    </>
  )
}

export default UserProfile
