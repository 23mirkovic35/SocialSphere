import React, { useEffect, useRef, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import VideoPlayer from "./VideoPlayer";
import "../styles/CallRoom.css";
import { useUserAndSocket } from "../pages/MySphere";
const APP_ID = "49044f3e7a0a4861bfb1620b9c16801c";
const TOKEN =
  "007eJxTYPj3Vd7w0K9T4gK1YYfuX9BXav3TYtOZxVQiMbdZ0b1ogoECg4mlgYlJmnGqeaJBoomFmWFSWpKhmZFBkmWyoZmFgWGyRDB/akMgI0PryzRWRgYIBPF5GIrzkzMTc4oLMlKLUhkYAAt6IQM=";
const CHANEL = "socialsphere";

const client = AgoraRTC.createClient({
  mode: "rtc",
  codec: "vp8",
});

function CallRoom() {
  const { myData, socket } = useUserAndSocket();
  const [users, setUsers] = useState([]);
  const userMe = [];
  const [localTracks, setLocalTracks] = useState([]);
  useEffect(() => {
    client.on("user-published", handleUserJoined);
    client.on("user-left", handleUserLeft);

    client
      .join(APP_ID, CHANEL, TOKEN, null)
      .then((uid) => {
        return Promise.all([AgoraRTC.createMicrophoneAndCameraTracks(), uid]);
      })
      .then(([tracks, uid]) => {
        const [audioTrack, videoTrack] = tracks;
        setLocalTracks(tracks);
        setUsers((previousUsers) => [
          ...previousUsers,
          {
            uid,
            videoTrack,
            audioTrack,
          },
        ]);
        userMe.push(true);
        client.publish(tracks);
      });
    return () => {
      for (let localTrack of localTracks) {
        localTrack.stop();
        localTrack.close();
      }
      client.off("user-published", handleUserJoined);
      client.off("user-left", handleUserLeft);
      // client.unpublish(tracks).then(() => client.leave());
    };
  }, []);

  const handleUserJoined = async (user, mediaType) => {
    await client.subscribe(user, mediaType);
    if (mediaType === "video") {
      setUsers((previousUsers) => [...previousUsers, user]);
      userMe.push(false);
    }
    if (mediaType === "audio") {
      user.audioTrack.play();
    }
  };

  const handleUserLeft = (user) => {
    setUsers((previousUsers) =>
      previousUsers.filter((u) => u.uid !== user.uid)
    );
  };

  const leave = () => {
    window.location.href = `http://localhost:3000/mySphere/messages/${myData.username}`;
  };

  return (
    <div className="CallRoom">
      {users &&
        users.map((user, index) => (
          <div className="wrapper">
            <VideoPlayer key={user.uid} user={user} />
          </div>
        ))}

      <button
        onClick={() => {
          leave();
        }}
      >
        Leave
      </button>
    </div>
  );
}

export default CallRoom;
