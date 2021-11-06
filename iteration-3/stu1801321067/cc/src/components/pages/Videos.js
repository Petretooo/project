import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { storage } from "../../firebase";

import { uploadVideo, fetchVideos } from "../../actions/controller";
import { setVideoUrl } from "../../actions/index";

const Videos = () => {
  const videoUrl = useSelector((state) => state.videoUrl);
  const videos = useSelector((state) => state.videos);
  const dispatch = useDispatch();

  const [videoUploadProgress, setVideoUploadProgress] = useState(null);

  useEffect(() => {
    const getVideos = async () => {
      await fetchVideos();
    };

    getVideos();
  }, []);

  useEffect(() => {
    const upload = async () => {
      await uploadVideo(videoUrl);
    };

    if (videoUrl) {
      upload();
    }
  }, [videoUrl]);

  const onVideoChangeHandler = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const videoName = uuidv4() + "" + file.name;
    const storageRef = ref(storage, "/videos/" + videoName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        setVideoUploadProgress(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          dispatch(setVideoUrl(url));
          setVideoUploadProgress(null);
        });
      }
    );
  };

  return (
    <div className="text-center mt-32">
      <h1 className="text-3xl">My uploads</h1>
      <div className="mt-8 bg-grey-lighter">
        <label className="w-64 m-auto flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer">
          {videoUploadProgress ? (
            <div>{videoUploadProgress} %</div>
          ) : (
            <>
              <svg
                className="w-8 h-8"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <span className="mt-2 text-base leading-normal">
                Upload a video
              </span>
            </>
          )}
          <input
            key={uuidv4()}
            type="file"
            className="hidden"
            accept="video/mp4,video/x-m4v,video/*"
            onChange={onVideoChangeHandler}
          />
        </label>
      </div>
      <div className="mt-8 ml-16 mr-16">
        {videos && videos.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {videos.map((video) => {
              return (
                <div key={video.videoId}>
                  <video src={video.videoUrl} controls />
                </div>
              );
            })}
          </div>
        ) : (
          <div>You haven't uploaded any videos yet</div>
        )}
      </div>
    </div>
  );
};

export default Videos;
