import {useRouteError} from "react-router-dom";
import React from "react";

export function ErrorHandler(){
    const error = useRouteError();

    if(error.status === 400){
        return(
            <div>
                <h1> 401 Bad Request</h1>
                <p>잘못된 요청입니다.</p>
            </div>
        );
    }
    else if(error.status === 401){
        return(
            <div>
                <h1> 401 UnAuthorized</h1>
                <p>인증되지 않은 요청입니다.</p>
            </div>
        );
    }
    else if(error.status === 404){
        return(
            <div>
                <h1> 404 PageNotFound</h1>
                <p>요청한 페이지를 찾을 수 없습니다.</p>
            </div>
        );
    }
    else if(error.status === 429){
        return(
            <div>
                <h1> 429 Too Many Request</h1>
                <p>너무 많은 요청을 보냈습니다.</p>
            </div>
        );
    }
    else if(error.status === 500){
        return(
            <div>
                <h1>500 InterServer Error</h1>
                <p>요청을 처리할 수 없습니다.</p>
            </div>
        );
    }
    else if(error.status === 502){
        return(
            <div>
                <h1>502 Bad Gateway</h1>
                <p>잘못된 게이트웨이 요청입니다.</p>
            </div>
        );
    }
    else if(error.status === 503){
        return(
            <div>
                <h1>503 Service Unavailable</h1>
                <p>서버가 준비되지 않았습니다.</p>
            </div>
        );
    }
    else if(error.status === 504){
        return(
            <div>
                <h1>504 Gateway Timeout</h1>
                <p>서버 응답시간이 지났습니다.</p>
            </div>
        );
    }
    else{
        return(
            <div>
                <h1>Error</h1>
                <p>ERROR</p>
            </div>
        );
    }
}