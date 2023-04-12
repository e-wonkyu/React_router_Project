import {useState} from "react";
import {redirect, useLocation} from "react-router-dom";
import {RequestGetParams} from "../modules/RequestURL.jsx";
import "../table.css";

function transformVodMeta(data) {
    const id = data.id;
    const date = data.date;
    const title = data.title;
    const playlistid = data.playlistid;
    const vodid = data.vodid;
    const viewcount = data.viewcount;
    const description = data.description;
    return {id,playlistid,vodid,title,viewcount,description,date};
}

export const requestVodMetadata = (url) => {
    return RequestGetParams(url).then(data => {
        var map = data.map(transformVodMeta);
        return map;
    });
};
export function BoardController()
{
    const location = useLocation();
    const searchParam = new URLSearchParams(location.search);

    const boardid = searchParam.get("id");
    return(
        <>
            <Board pageid={boardid}></Board>
        </>
    );
}

function Table_Content({id,title,url,views,date})
{
    return(
        <tr>
            <td>{id}</td>
            <td>{title}</td>
            <td>{url}</td>
            <td>{views}</td>
            <td>{date}</td>
        </tr>
    )
}

export function BoardApiIOTest()
{

    // data.then(value => {console.log(value)});

    requestVodMetadata('http://127.0.0.1:5000/kbs/vod?page=1&limit=100').then(value => {
        for (let i=0;i<value.length;i++)
        {
            console.log(value[i].id);
            console.log(value[i].title);

        }
        return(
            <>
                <div>test</div>
            </>
        )
    })



}


function Pagenation({page,totalPosts,limit,setPage})
{
    const numPages = Math.ceil(totalPosts/limit)
    const [currentpage,setCurrentPage] = useState(1)
    let firstNum = currentpage - (currentpage % 5) + 1
    let lastNum = currentpage - (currentpage % 5) + 5

    return(
        <div className="pagenation">
            <button
                onClick={() => {setPage(page-1); setCurrentPage(page-2);}}
                disabled={page===1}>
                &lt;
            </button>
            <button
                onClick={() => setPage(firstNum)}
                aria-current={page === firstNum ? "page" : null}>
                {firstNum}
            </button>
            {Array(4).fill().map((_, i) =>{
                if(i <=2){
                    return (
                        <button
                            border="true"
                            key={i+1}
                            onClick={() => {setPage(firstNum+1+i)}}
                            aria-current={page === firstNum+1+i ? "page" : null}>
                            {firstNum+1+i}
                        </button>
                    )
                }
                else if(i>=3){
                    return (
                        <button
                            border="true"
                            key ={i+1}
                            onClick={() => setPage(lastNum)}
                            aria-current={page === lastNum ? "page" : null}>
                            {lastNum}
                        </button>
                    )
                }
            })}
            <button
                onClick={() => {setPage(page+1); setCurrentPage(page);}}
                disabled={page===numPages}>
                &gt;
            </button>
        </div>
    );
}

export function Board({pageid})
{
    const pagearr = [(1,'title','https://test.com/?',7890,'2023-01-01'),
        (2,'title','https://test.com/?',7890,'2023-01-01'),
        (3,'title','https://test.com/?',7890,'2023-01-01'),
        (4,'title','https://test.com/?',7890,'2023-01-01'),
        (5,'title','https://test.com/?',7890,'2023-01-01')
    ];


    const [viewcnt, setViewcount] = useState(7223);
    //   {page,totalPosts,limit,setPage}
    //post
    const [posts, setPosts] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(pageid);
    const offset = (page - 1) * limit;


    const total = 100;
    const numPages = Math.ceil(total / limit);
    // let data = requestVodMetadata(`http://127.0.0.1:5000/kbs/vod?page=${page}&limit=${limit}`);
    // console.log(data);
    // eslint-disable-next-line no-unused-expressions
    // let elem = document.getElementsByClassName('tbl-header')[0];
    // // elem.scrollWidth
    //   let el = elem.scrollWidth;

    function HandlePage(page)
    {
        alert("Handle Page"+page);
        setPage(page);
    }

    return(
        <div className="table">
            <section className="body">
                <div className="table-header">
                    <table cellPadding="0" cellSpacing="0" border="0">
                        <thead>
                        <tr style={{textAlign:"center"}}>
                            <th>ID</th>
                            <th>Title</th>
                            <th>URL</th>
                            <th>View Count</th>
                            <th>Broadcast Date</th>
                        </tr>
                        </thead>
                    </table>
                </div>
                <div className="table-content">
                    <table cellPadding="0" cellSpacing="0" border="0">
                        <tbody>
                        {Array(limit).fill().map((_, i) =>
                            (<Table_Content id={i} url={'url'} title={'title'} date={'2023-01-01'} views={i*100}></Table_Content>))
                        }
                        </tbody>
                    </table>
                </div>

                {/*게시물 가져올 때 한계값 설정*/}
                <label>
                    <select type="number" value={limit} onChange={({target:{value}}) => setLimit(Number(value))}>
                        <option value="10">10</option>
                        <option value="12">12</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </label>
                <Pagenation page={page} setPage={HandlePage} limit={limit} totalPosts={total}></Pagenation>
                <div>Pagenation : {page}</div>

            </section>

        </div>

    );
}

export function UserStatus(){
    const [isOnline, setIsOnline] = useState(true);
    const set_Online = () => {
        if(isOnline == 1){
            setIsOnline(0);
        }else {
            setIsOnline(1);
        }
    }
    return(
        <>
            <div>is online? {isOnline}</div>
            <button onClick={()=>set_Online()}>button</button>
        </>
    );
}

