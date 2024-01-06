import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./directory.scss";
import Loading from "../UI/loading/Loading";

const Directory = () => {
  const [users, setUsers] = useState([]);
  const [isLoading,setIsLoading] = useState(true)

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        // Fetch post count for each user
        const promises = response.data.map((user) =>
          axios.get(
            `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`
          )
        );

        Promise.all(promises)
          .then((postsResponses) => {
            const usersWithPostCount = response.data.map((user, index) => ({
              ...user,
              postCount: postsResponses[index].data.length,
            }));
            setUsers(usersWithPostCount);
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  }, []);

  if(isLoading){
    return (<Loading setIsLoading={setIsLoading} />)
  }

  return (
    <div className="directoryWrapper">
      <ul>
        {users?.map((user) => (
          <div>
            <li key={user.id}>
              <span>
                
                <Link to={`/user/${user.id}`}>{user.name}</Link>
              </span>
              <span>
                
                <Link to={`/user/${user.id}`}>Posts: {user.postCount}</Link>
              </span>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Directory;
