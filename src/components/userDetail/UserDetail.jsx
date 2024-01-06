import React, { useState, useEffect } from "react";
import axios from "axios";
import PostService from "../../services/PostService";
import { useParams } from "react-router-dom";
import "./userDetail.scss";
import { Container, Row, Col } from "reactstrap";
import PostPopup from "../postPopup/PostPopup";
import Loading from "../UI/loading/Loading"

const UserDetail = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isLoading,setIsLoading]  = useState(true)
  const params = useParams();

  // Function to open the post popup
  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  // Function to close the post popup
  const closePostPopup = () => {
    setSelectedPost(null);
  };

  useEffect(() => {
    const userId = params.id;

    // Fetch user details
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((response) => setUser(response.data))
      .catch((error) => console.error(error));

    // Fetch user posts
    PostService(userId)
      .then((posts) => setPosts(posts))
      .catch((error) => console.error(error));
  }, [params.id, user]);
  
  if(isLoading){
    return (<Loading setIsLoading={setIsLoading} />)
  }

  return (
    <Container>
      {user && (
        <div className="userDetailWrapper">
          <div className="userDetail">
            <div>
              <p>{user.name}</p>
              <p>
                {user.username} | {user.company.catchPhrase}
              </p>
            </div>

            <div>
              <p>
                {user.address.street}, {user.address.suit}, user.address.city}, {user.address.zipcode}
              </p>
         
              <p>
                {user.email} | {user.phone}
              </p>
            </div>
          </div>

          <Container className="postsDetail">
            <Row>
              {posts?.map((post) => (
                <Col
                  md="6"
                  lg="4"
                  xl="4"
                  xxl="4"
                  key={post.id}
                  className="post mb-3"
                >
                  <h4   onClick={() => handlePostClick(post)}
              style={{ cursor: "pointer" }}>{post.title}</h4>
                  <p>{post.body}</p>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      )}

      {selectedPost && (
          <PostPopup post={selectedPost} onClose={closePostPopup} />
      )}
    </Container>
  );
};

export default UserDetail;
