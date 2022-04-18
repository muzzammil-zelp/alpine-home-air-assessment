import { useEffect, useState } from "react";
import styles from "../styles/Users.module.css";
import Link from "next/link";

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
  };
};

function UserData(props: { icon: string; value: string }) {
  return (
    <div className={styles.dataContainer}>
      <img src={props.icon} className={styles.dataIcon} />
      <span className={styles.dataValue}>{props.value}</span>
    </div>
  );
}

function Users() {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((data) => data.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div>
      <div className={styles.toolbar}>Photos</div>
      <div className={styles.container}>
        {users.map((user) => (
          <div key={user.id} className={styles.card}>
            <Link href={`/albums?userId=${user.id}`}>
              <span className={styles.username}>{user.username}</span>
            </Link>
            <div className={styles.data}>
              <div style={{ fontSize: 13 }}>{user.name}</div>
              <UserData icon="/icons/email_black.svg" value={user.email} />
              <UserData
                icon="/icons/business_black.svg"
                value={user.company.name}
              />
              <UserData
                icon="/icons/place_black.svg"
                value={user.address.city}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
