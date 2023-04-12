import {useState} from "react";
import '../maintable.css'
export function Content({user,views,lastmod,comments,title})
{
    return(
        <>
            <div className="" style={{paddingBottom:10}}>
                <div className="" style={{display:"flex",paddingBottom:10}}>
                    <div className="" style={{width:100}}>
                        {user}
                    </div>
                    <div className="" style={{width:50}}>
                        {views}
                    </div>
                    <div className="" style={{width:80}}>
                        {lastmod}
                    </div>
                    <div className="" style={{width:60}}>
                        {comments}
                    </div>

                </div>
                <div style={{display:"flex",borderBottom:"1px solid lightgrey"}}>
                    <div className=""style={{width:300,paddingBottom:10}}>
                        {title}
                    </div>

                </div>
            </div>

        </>

    )
}

export function CardBoard({boardtitle,dataset})
{

    return(
        <div className="table">
            <section className="body">
                <div className="table-content">
                    <div className="border"style={{display:"flex",borderRadius:10,width:300,height:40,textAlign:"left"}}>
                        <div className="border"style={{width:30}}>

                        </div>
                        <div className="border"style={{}}>
                            {boardtitle}
                        </div>
                    </div>
                    <table cellPadding="0" cellSpacing="0" border="0">
                        <tbody>
                        {Array(dataset.length).fill().map((j, i) =>
                            (
                                <Content user={dataset[i].user} views={dataset[i].views} lastmod={dataset[i].lastmod} comments={dataset[i].comments} title={dataset[i].title}/>
                            ))
                        }
                        </tbody>
                    </table>
                </div>



            </section>

        </div>

    );
}