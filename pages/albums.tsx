import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "../styles/Albums.module.css";

type Album = {
  userId: number;
  id: number;
  title: string;
};

function Albums() {
  const router = useRouter();
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    fetch(
      `https://jsonplaceholder.typicode.com/albums?userId=${router.query.userId}`
    )
      .then((data) => data.json())
      .then((data) => setAlbums(data));
  }, [router.query]);

  return (
    <div>
      <div className={styles.toolbar}>Albums</div>
      <div className={styles.container}>
        {albums.map((album) => (
          <Link key={album.id} href={`/photos?albumId=${album.id}`}>
            <div className={styles.card}>{album.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Albums;
