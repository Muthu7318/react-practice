function PostCard({ card }) {
  return (
    <div
      style={{
        background: "LightGray",
        borderRadius: "10px",
        margin: "10px",
        padding: "10px",
      }}
    >
      <strong>{card.title}</strong>
      <p>{card.body}</p>
      {card.tags.map((item) => {
        return (
          <span
            style={{
              color: "blue",
              fontSize: "12px",
              marginBottom: "20px",
              display: "inline-block",
              marginRight: "10px",
            }}
          >
            #{item}
            {"   "}
          </span>
        );
      })}
      <br></br>
      <span>👍{card.reactions.likes}</span> |{" "}
      <span>👎{card.reactions.dislikes}</span> | <span>👁️ {card.views}</span>
    </div>
  );
}

export default PostCard;

//👍 likes | 👎 dislikes |  views
