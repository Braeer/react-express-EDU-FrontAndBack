import { useParams } from "react-router-dom"
import { useGetPostByIdQuery } from "../../app/services/postsApi"
import Card from "../../components/card"
import GoBack from "../../components/go-back"
import CreateComment from "../../components/create-comment"
import type { Comment } from "../../app/types"

const CurrentPost = () => {
  const params = useParams<{ id: string }>()
  const { data } = useGetPostByIdQuery(params?.id ?? "")

  if (!data) {
    return <h2>Поста не существует</h2>
  }

  const {
    content,
    id,
    authorId,
    comments,
    likes,
    likedByUser,
    createdAt,
    author,
  } = data

  return (
    <>
      <GoBack />
      <Card
        content={content}
        cardFor={"current-post"}
        avatarUrl={author.avatarUrl ?? ""}
        name={author.name ?? ""}
        likesCount={likes.length}
        commentsCount={comments.length}
        authorId={authorId}
        id={id}
        likeByUser={likedByUser}
        createdAt={createdAt}
      />
      <div className="mt-10">
        <CreateComment />
      </div>
      <div className="mt-10">
        {data.comments
          ? data.comments.map((comment: Comment) => (
              <Card
                cardFor="comment"
                key={comment.id}
                avatarUrl={comment.user.avatarUrl ?? ""}
                content={comment.content}
                name={comment.user.name ?? ""}
                authorId={comment.user.id}
                commentId={comment.id}
                id={id}
              ></Card>
            ))
          : null}
      </div>
    </>
  )
}

export default CurrentPost
