import React from "react";

export function ThrowError()
{
    throw new Response("Not Found",{status:404});
    return(
        <>
            <div>Test</div>
        </>
    );
}
