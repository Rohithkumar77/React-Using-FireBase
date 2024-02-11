import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { Post as IPost} from "./main"
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { number } from "yup";

// Post.tsx

import React from 'react';
import './post.css';

interface Props {
  post: IPost;
}

interface Like {
  userId: string;
}

export const Post = (props: Props) => {
  const { post } = props;
  const [user] = useAuthState(auth);

  const [like, setLike] = useState<Like[] | null>(null);

  const likesRef = collection(db, 'likes');

  const likeDoc = query(likesRef, where('postId', '==', post.id));

  const getLikes = async () => {
    const data = await getDocs(likeDoc);
    setLike(data.docs.map((doc) => ({ userId: doc.data().userId })));
  };

  const addLike = async () => {
    await addDoc(likesRef, {
      userId: user?.uid,
      postId: post.id,
    });
    if (user) {
      setLike((prev) => (prev ? [...prev, { userId: user?.uid }] : [{ userId: user?.uid }]));
    }
  };

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <div className="posts">
      <div className="title">
        <h1 className="headtitle">{post.title}</h1>
      </div>
      <div className="bc">
        <p className="d1">{post.description}</p>
      </div>
      <div className="footer">
        <p className="un">@{post.username}</p>
        <button onClick={addLike} className={`like ${like ? 'liked' : ''}`}>
          <span className="like-icon">&#128077;</span>
        </button>
        {like && <p className="like-count">Likes: {like?.length}</p>}
      </div>
    </div>
  );
};
