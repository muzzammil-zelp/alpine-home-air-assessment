import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Photos.module.css";

type Photo = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

function Photos() {
  const router = useRouter();
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    fetch(
      `https://jsonplaceholder.typicode.com/photos?albumId=${router.query.albumId}`
    )
      .then((data) => data.json())
      .then((data) => setPhotos(data));
  }, []);

  return (
    <div>
      <div className={styles.toolbar}>Photos</div>
      <div className={styles.container}>
        {photos.map((photo) => (
          <div key={photo.id} className={styles.card}>
            <img src={photo.thumbnailUrl} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Photos;
