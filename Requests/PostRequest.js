import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
var Data;
export function PostRequest(url, requestBody, ) {
    const user = useSelector(state => state.userDetails)
    fetch(`${url}`, {
        method: "POST",
        headers: {
            Authorization: "Bearer " + `${user.userToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
    })
        .then((res) => res.json())
        .then((resp) => {
            Data = resp
        });
    return Data;
}

export  function GetRequest(url,token) {
    fetch(`${url}`, {
        headers: {
            Authorization: "Bearer " + `${token}`,
        },
    })
        .then((response) => response.json())
        .then((responseJson) => {
            Data = responseJson;
        });
    console.log(Data);
    return Data;
} 