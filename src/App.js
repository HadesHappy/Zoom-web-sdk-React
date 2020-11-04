import React, { useEffect, useState } from "react";
import { ZoomMtg } from "@zoomus/websdk";
import apiKeys from "./config/config";

let meetConfig = {
  apiKey: apiKeys.apiKey,
  userName: "Attendee",
  userEmail: "attendee@example.com", // must be the attendee email address
  role: 0, // change it to 1 for host
};

function App() {
  function joinMeeting(signature, meetConfig) {
    ZoomMtg.init({
      leaveUrl: "https://zoom.us/",
      isSupportAV: true,
      success: function (success) {
        console.log("Init Success ", success);
        ZoomMtg.join({
          meetingNumber: meetConfig.meetingNumber,
          userName: meetConfig.userName,
          signature: signature,
          apiKey: meetConfig.apiKey,
          passWord: meetConfig.passWord,
          success: (success) => {
            console.log(success);
          },
          error: (error) => {
            alert('Please join with a valid meetingId and password');
            console.log(error);
          },
        });
      },
    });
  }

  const startMeeting = () => {
    console.log("Meeting Config: \n", meetConfig);
    /**
     * You should not visible api secret key on frontend
     * Signature must be generated on server
     * https://marketplace.zoom.us/docs/sdk/native-sdks/web/essential/signature
     */
    ZoomMtg.generateSignature({
      meetingNumber: meetConfig.meetingNumber,
      apiKey: meetConfig.apiKey,
      apiSecret: apiKeys.apiSecret,
      role: meetConfig.role,
      success: function (res) {
        console.log("res", res);

        setTimeout(() => {
          joinMeeting(res.result, meetConfig);
        }, 1000);
      },
    });
  };

  useEffect(() => {
    ZoomMtg.setZoomJSLib("https://source.zoom.us/1.7.10/lib", "/av");
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();

    let search = window.location.search;
    let params = new URLSearchParams(search);
    let meetingNumber = params.get("id");
    let passWord = params.get("password");
    let userName = params.get("userName") || meetConfig.userName;
    let userEmail = params.get("userEmail") || meetConfig.userEmail;
    console.log(meetingNumber, passWord, userName, userEmail);
    if (meetingNumber && passWord) {
      meetConfig = {
        ...meetConfig,
        meetingNumber,
        passWord,
        userName,
        userEmail,
      };
      setTimeout(() => {
        console.log("Meeting Config: \n", meetConfig);
        startMeeting();
      }, 2000);
    } else alert("Please join with a valid meetingId and password");
  }, []);

  return <div className="App">Zoom Testing</div>;
}

export default App;
