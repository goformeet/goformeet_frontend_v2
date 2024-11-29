"use client";
import React, { useState } from "react";
import "./index.css";
import ReactPlayer from "react-player";
import { videos } from "@/constants";
interface Video {
  id: string;
  title: string;
}

const Podcast: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);

  
  const openModal = (videoId: string) => {
    setCurrentVideo(videoId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentVideo(null);
  };

  return (
    <div className="podcastMainContainer">
      <h1 className="podcastTitle">Goformeet Podcast</h1>
      <div className="containerSizes">
        {videos.map((video) => (
          <div key={video.id} className="videoContainer">
            <img
              src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
              alt="title"
              className="thumbnail"
              onClick={() => openModal(video.id)}
            />
            <p className="videoTitle">{video.title}</p>
          </div>
        ))}
      </div>

      {showModal && currentVideo && (
        <div className="modalOverlay" onClick={closeModal}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${currentVideo}`} controls className="videoPlayer" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Podcast;