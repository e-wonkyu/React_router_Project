import {useCallback, useEffect, useState} from "react";
import {RequestGet} from "../modules/RequestURL.jsx";
import {CardBoard} from "./CardBoard.jsx";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";

const salt = 'SogeumGabsibissada';
export function IndexRayout({title})
{
    const [active,setActive] = useState(false);
    const [isOpen,setIsOpen] = useState(false);

    const [isOpenLogin,setisOpenLogin] = useState(false);
    const [isOpenRegister,setisOpenRegister] = useState(false);

    function HandleMenuButton()
    {
        if(!active){
            showModal();
            setActive(true);
        }
        else{

            closeModal();
            setActive(false);
        }
    }

    function showModal()
    {
        setIsOpen(true);
        window.document.body.classList.add('background');
    }
    function closeModal()
    {
        setIsOpen(false);
        window.document.body.classList.remove('background');
    }

    function HandleLogin()
    {
        alert('onclick login');
        closeModal();
        window.document.body.classList.add('background');
        setisOpenLogin(true);
    }
    function HandleRegisterPage()
    {
        window.document.body.classList.remove('background');
        setisOpenLogin(false);
        window.document.body.classList.add('background');
        setisOpenRegister(true);
    }


    const data = [
        {user:'이xx',views:'10',lastmod:'1시간전',comments:'20',title:'김장철 고춧가루는 금춧가루라고 하죠'},
        {user:'박xx',views:'13',lastmod:'3시간전',comments:'1',title:'소금보다 배추가 비쌉니다.'},
        {user:'김xx',views:'1021',lastmod:'2시간전',comments:'4',title:'솔트값이 비싸더라도 김장은 해야합니다.'},
        {user:'김xx',views:'23',lastmod:'5시간전',comments:'7',title:'솔트값은 해시함수와 함께'},
        {user:'강xx',views:'8',lastmod:'10시간전',comments:'9',title:'2023-4-12 신안소금 20kg 한포는 28,800원'},
    ]
    return(
        <>
            <header>
                <Header title={title} HandleMenu={HandleMenuButton}/>
            </header>
            <main className="main" >
                <div id="content" style={{width:"100%",height:"100%" ,display:"flex"}}>
                    {/*MenuModal*/}
                    {isOpen && <MenuModal isOpen={setIsOpen}LoginButton={HandleLogin} RegisterButton={setisOpenRegister}/>}
                    {isOpenLogin && <LoginModal isopenlogin={setisOpenLogin} HandleRegister={HandleRegisterPage}/>}
                    {isOpenRegister && <RegisterModal isopenregister={setisOpenRegister}/>}

                    {/*LeftBanner*/}
                    <div className="border" id="left" style={{width:"20%"}}>left banner</div>

                    {/*Contents*/}
                    <div className="border" style={{width:"100%",display:"flex",flexWrap:"wrap"}}>
                        <div className="border" style={{padding:20,width:300,height:"400px"}}>
                            <CardBoard title={'테스트'} dataset={data}/>
                        </div>
                        <div className="border"style={{padding:20,width:300,height:"400px"}}>
                            <CardBoard title={'테스트'} dataset={data}/>
                        </div>
                    </div>

                    {/*rightBanner*/}
                    <div id="right"style={{width:"20%"}}>right banner</div>
                </div>
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    )
}

export function RegisterModal({isopenregister})
{
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [pwvalid,setPwvalid] = useState('');
    // const [validation,setvalidation] = useState({email:false,password:false,pwcheck:false});
    const navigate=useNavigate();
    const re_email = new RegExp('[a-z0-9]+@[a-z]+\\.[a-z]{2,3}');
    const re_pw = new RegExp('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,15}$');

    async function AuthValidation(email,password)
    {
        let check_pw = false;
        let check_email = false;


        if(re_pw.exec(password))
        {
            check_pw = true;
        }
        else
        {
            check_email = false;
            alert('패스워드를 확인해주세요');
            return false;
        }

        if(re_email.exec(email))
        {
            check_email = true;
        }
        else
        {
            check_email = false;
            alert('이메일을 확인해주세요');
            return false;
        }

        const encoder = new TextEncoder();
        const data = encoder.encode(password+salt);
        const hash = await crypto.subtle.digest("SHA-256",data);
        const hasharr = Array.from(new Uint8Array(hash));
        const hex = hasharr.map((b)=> b.toString(16).padStart(2,"0"))
            .join("")

        let res = await fetch(`http://localhost:5000/register/user?email=${email}&password=${hex}`)
            .catch(error => alert(error));

        if(res.ok){
            return true;
        }
        else
        {
            return false;
            alert('다시 시도해주세요');
        }
    }

    function HandleRegister()
    {
        event.preventDefault();
        if(password === pwvalid) {
            AuthValidation(email,password).then(res => {
                if(res)
                {
                    alert('회원가입에 성공했습니다.')
                    // navigate('/');
                    closeModal();
                }
                else
                {

                }
            })
        }
        else{

        }
    }
    function closeModal()
    {
        isopenregister(false);
        window.document.body.classList.remove('background');
    }
    function OnUpdateInput(event)
    {
        if(event.target.getAttribute('type') === 'email')
        {
            if (event.target.value.includes('>'))
            {
                alert('특정 문자는 사용할 수 없습니다.');
                setEmail("");
            }else if(event.target.value.includes('<'))
            {
                alert('특정 문자는 사용할 수 없습니다.');
                setEmail("");
            }
            else if(event.target.value.includes('='))
            {
                alert('특정 문자는 사용할 수 없습니다.');
                setEmail("");
            }
            else
            {
                setEmail(event.target.value);
            }

        }
        else if(event.target.getAttribute('name') === 'password')
        {
            if (event.target.value.includes('>'))
            {
                alert('특정 문자는 사용할 수 없습니다.');
                setPassword("");
            }else if(event.target.value.includes('<'))
            {
                alert('특정 문자는 사용할 수 없습니다.');
                setPassword("");
            }
            else if(event.target.value.includes('='))
            {
                alert('특정 문자는 사용할 수 없습니다.');
                setPassword("");
            }
            else
            {
                setPassword(event.target.value);
            }

        }
        else if(event.target.getAttribute('name') === 'pwvalid')
        {
            if (event.target.value.includes('>'))
            {
                alert('특정 문자는 사용할 수 없습니다.');
                setPwvalid("");
            }else if(event.target.value.includes('<'))
            {
                alert('특정 문자는 사용할 수 없습니다.');
                setPwvalid("");
            }
            else if(event.target.value.includes('='))
            {
                alert('특정 문자는 사용할 수 없습니다.');
                setPwvalid("");
            }
            else
            {
                setPwvalid(event.target.value);
            }
        }
    }

    return(
        <div className="registermodal" style={{alignItems:"center"}}>
            <button onClick={closeModal} style={{borderRadius:10,border:"none",backgroundColor:"black",color:"white",margin:10}}>X</button>
            <div style={{border:"black 1px solid",borderRadius:"10px", margin:30 ,height:430}}>
                <h2 style={{textAlign:"center"}}>회원가입 페이지</h2>

                <div  style={{/*border:"black 1px solid" ,borderRadius:"10px",*/display:"flex",margin:5}}>

                    <div style={{textAlign:"center",width:"30%"}}>
                        <div style={{height:50,padding:10,borderBottom:"black 1px solid"}}>
                            <img style={{paddingTop:6}} src="src/assets/mail_24px.png"/>
                        </div>
                        <div style={{height:50,padding:10,borderBottom:"black 1px solid"}}>
                            <img style={{paddingTop:6}} src="src/assets/key_24px.png"/>
                        </div>
                        <div style={{height:50,padding:10,borderBottom:"black 1px solid"}}>
                            <img style={{paddingTop:6}} src="src/assets/check_24px.png"/>
                        </div>
                    </div>

                    <div style={{textAlign:"center",width:"70%"}}>
                        <div style={{height:50 ,padding:10,borderBottom:"black 1px solid" }}>
                            <input type="email"
                                   onChange={OnUpdateInput}
                                   value={email}
                                   style={{height:30,borderRadius:"10px",border: "1px solid"}}/><br/>
                            <div id="emailmsg" style={{fontSize:12,color:"red"}}>
                                {re_email.exec(email) ? '':'이메일 형식이 일치하지 않습니다.'}

                            </div>
                        </div>

                        <div  style={{height:50,padding:10,borderBottom:"black 1px solid"}}>
                            <input type="password"
                                   value={password}
                                   onChange={OnUpdateInput}
                                   minLength='7'
                                   maxLength='15'
                                   name="password"
                                   style={{height:30,borderRadius:"10px",border: "1px solid"}}/><br/>
                            <div id="pwmsg" style={{fontSize:12,color:"red"}}>
                                {re_pw.exec(password) ? '':'패스워드를 확인해주세요'}
                            </div>
                        </div>


                        <div  style={{height:50,padding:10,borderBottom:"black 1px solid"}}>
                            <input type="password"
                                   value={pwvalid}
                                   onChange={OnUpdateInput}
                                   minLength='7'
                                   maxLength='15'
                                   name="pwvalid"
                                   style={{height:30,borderRadius:"10px",border: "1px solid"}}/><br/>
                            <div id="pwcheckmsg"style={{fontSize:12,color:"red"}}>
                                {password===pwvalid && (password.length !=0) ? '':'패스워드가 일치하지 않습니다.'}

                            </div>
                        </div>

                    </div>

                </div>
                {/*<div id="state" style={{ display:"none",backgroundColor:"green",borderRadius:20,textAlign:"center"}}>{statusmsg}</div>*/}
                <div style={{display:"flex" ,padding:10, width:"317px",textAlign:"center"}}>

                    <div id="registerbtn" style={{width:"50%"}}>
                        <button onClick={HandleRegister} style={{borderRadius:"20px",width:130,height:40 ,backgroundColor:"lightgray" ,border:"none"}} >회원가입</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function LoginModal({isopenlogin,HandleRegister})
{

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const[statusmsg,setMsg] = useState('');
    const [cookie,setCookie] = useCookies(['name']);

    async function LoginValidation(email,password)
    {
        alert(email+password);
        const re_pw = new RegExp('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,15}$');
        const re_email = new RegExp('[a-z0-9]+@[a-z]+\\.[a-z]{2,3}');
        let check_pw = false;
        let check_email = false;

        if(re_pw.exec(password))
        {
            check_pw = true;
        }
        else
        {
            check_email = false;
            alert('패스워드를 확인해주세요');
            return false;
        }
        if(re_email.exec(email))
        {
            check_email = true;
        }
        else
        {
            check_email = false;
            alert('이메일을 확인해주세요');
            return false;
        }

        const encoder = new TextEncoder();
        const data = encoder.encode(password+salt);
        const hash = await crypto.subtle.digest("SHA-256",data);
        const hasharr = Array.from(new Uint8Array(hash));
        const hex = hasharr.map((b)=> b.toString(16).padStart(2,"0"))
            .join("");

        let res = await fetch(`http://localhost:5000/verification/user?email=${email}&password=${hex}`)
            .catch(error => alert(error));

        if(res.ok){
            return true;
        }
        else
        {
            return false;
            alert('다시 시도해주세요');
        }
    }
    function closeModal()
    {
        isopenlogin(false);
        window.document.body.classList.remove('background');
    }
    function OnUpdateInput(event)
    {
        if(event.target.getAttribute('type') === 'email')
        {
            if (event.target.value.includes('>'))
            {
                alert('특정 문자는 사용할 수 없습니다.');
                setEmail("");
            }else if(event.target.value.includes('<'))
            {
                alert('특정 문자는 사용할 수 없습니다.');
                setEmail("");
            }
            else if(event.target.value.includes('='))
            {
                alert('특정 문자는 사용할 수 없습니다.');
                setEmail("");
            }
            else
            {
                setEmail(event.target.value);
            }
        }
        else if(event.target.getAttribute('type') === 'password')
        {
            if (event.target.value.includes('>'))
            {
                alert('특정 문자는 사용할 수 없습니다.');
                setPassword("");
            }else if(event.target.value.includes('<'))
            {
                alert('특정 문자는 사용할 수 없습니다.');
                setPassword("");
            }
            else if(event.target.value.includes('='))
            {
                alert('특정 문자는 사용할 수 없습니다.');
                setPassword("");
            }
            else
            {
                setPassword(event.target.value);
            }
        }
    }
    function KakaoLogin()
    {
        alert('on click kakao');
    }
    function NaverLogin()
    {
        alert('on click Naver');
    }
    function GoogleLogin()
    {
        alert('on click Google');
    }
    function GithubLogin()
    {
        alert('on click github');
    }

    function FormLogin()
    {
        // alert(email+password);
        LoginValidation(email,password)
            .then(res =>{
                if(res)
                {
                    const expires = new Date();
                    expires.setMinutes(expires.getMinutes() + 60);
                    sessionStorage.setItem('user',email);
                    setCookie('name',email,{path:'/',expires});
                    alert('로그인 되었습니다.')
                    closeModal();

                }
            })
    }


    return(
        <div className="loginmodal" style={{alignItems:"center"}}>
            <button onClick={closeModal} style={{borderRadius:10,border:"none",backgroundColor:"black",color:"white",margin:10}}>X</button>
            <div style={{borderRadius:"10px", margin:30 ,height:430}}>
                <h2 style={{textAlign:"center"}}>로그인 페이지</h2>
                <div  style={{display:"flex",margin:5}}>

                    <div style={{textAlign:"center",width:"30%",padding:4}}>
                        <div style={{height:40,padding:4}}>
                            <img style={{paddingTop:6}} src="src/assets/mail_24px.png"/>
                        </div>
                        <div style={{height:40,padding:4}}>
                            <img style={{paddingTop:6}} src="src/assets/key_24px.png"/>
                        </div>
                    </div>


                    <div style={{textAlign:"center",width:"70%"}}>
                        <div style={{height:40 ,padding:7 }}>
                            <input type="email"
                                   onChange={OnUpdateInput}
                                   value={email}
                                   style={{height:30,borderRadius:"10px",border: "1px solid"}}/><br/>
                        </div>
                        <div  style={{height:30,padding:7}}>
                            <input type="password"
                                   value={password}
                                   onChange={OnUpdateInput}
                                   minLength='7'
                                   maxLength='15'
                                   title="password"
                                   style={{height:30,borderRadius:"10px",border: "1px solid"}}/><br/>
                        </div>
                    </div>

                </div>
                <div id="state" style={{ display:"none",backgroundColor:"green",borderRadius:20,textAlign:"center"}}>{statusmsg}</div>
                <div style={{display:"flex" ,padding:10, width:"317px",textAlign:"center"}}>
                    <div id="loginbtn" style={{width:"50%"}}>
                        <button  onClick={FormLogin}
                                 style={{borderRadius:"20px",width:130,height:40 ,backgroundColor:"lightgray" ,border:"none"}}>로그인</button>                    </div>
                    <div id="registerbtn" style={{width:"50%"}}>
                        <button onClick={HandleRegister} style={{borderRadius:"20px",width:130,height:40 ,backgroundColor:"lightgray" ,border:"none"}} >회원가입</button>
                    </div>
                </div>


                <div id="sociallogin" style={{ textAlign:"center" ,paddingBottom:10}}>
                    <div style={{textAlign:"center"}}>
                        <div style={{textAlign:"center",display:"block",padding:2}}>
                            <button onClick={KakaoLogin} style={{width:200, height:45, borderRadius:30,border:"none"}}>
                                <img src="src/assets/kakaotalk_24px.png"/>
                                <div>
                                    <text style={{}}>카카오 계정으로 로그인</text>
                                </div>
                            </button>

                        </div>
                        <div style={{textAlign:"center",display:"block",padding:2}}>
                            <button onClick={NaverLogin} style={{width:200, height:45, borderRadius:30,border:"none"}}>
                                <img src="src/assets/naver_24px.png"/>
                                <div>
                                    <text style={{}}>네이버 계정으로 로그인</text>
                                </div>
                            </button>

                        </div>
                        <div style={{textAlign:"center",display:"block",padding:2}}>
                            <button onClick={GoogleLogin} style={{width:200, height:45, borderRadius:30,border:"none"}}>
                                <img src="src/assets/google_24.png"/>
                                <div>
                                    <text style={{}}>구글 계정으로 로그인</text>
                                </div>
                            </button>
                        </div>
                        <div style={{textAlign:"center",display:"block",padding:2}}>
                            <button onClick={GithubLogin} style={{width:200, height:45, borderRadius:30,border:"none"}}>
                                <img src="src/assets/github_24px.png"/>
                                <div>
                                    <text style={{}}>깃허브 계정으로 로그인</text>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function MenuModal({isOpen,LoginButton,RegisterButton})
{
    function closeModal()
    {
        isOpen(false);
    }
    function HandleRegisterPage()
    {
        closeModal(false);
        RegisterButton(true);
    }

    return(
        <div className="menumodal">
            <div style={{textAlign:'right'}}>
                <button onClick={closeModal} style={{borderRadius:"20px",border: "none",backgroundColor:"black",color:"white"}}>닫기</button>
            </div>
            <div style={{textAlign:"center"}}>
                <h3>메뉴</h3>
            </div>

            <div style={{textAlign:"center"}}>
                서브메뉴1
            </div>
            <div id="menu">
                <div id="menu1">
                    메뉴1
                </div>
                <div id="menu1">
                    메뉴2
                </div>
                <div id="menu1">
                    메뉴3
                </div>
                <div id="menu1">
                    메뉴4
                </div>
            </div>
            <div style={{height:'200px'}}>

            </div>
            <div style={{display:'flex'}}>
                <div style={{width:"50%",height:"60px",textAlign:"center"}}>
                    <div>로그인</div>

                    <img style={{paddingTop:10}} onClick={LoginButton} src="src/assets/enter_24px.png"/>
                    {/*<a href="/board">*/}
                    {/*</a>*/}
                </div>
                <div style={{width:"50%",height:"60px",textAlign:"center"}}>
                    <div>회원가입</div>

                        <img style={{paddingTop:10}} onClick={HandleRegisterPage} src="src/assets/join_24px.png"/>
                    {/*<a href="/board">*/}
                    {/*</a>*/}
                </div>
            </div>

        </div>
    )
}


export function Header({title,HandleMenu})
{

    return(
        <div id='header' className='navbar' style={{display:"flex",textAlign:"center",width:"100%",height:70}}>

            <div style={{width:400}}>
                <h3 style={{fontFamily:"'Oswald',sans-serif"}}>{title}</h3>
            </div>
            <div style={{width:"100%" ,textAlign:"center"}}></div>

            <div style={{display:"flex" }}>
                <div style={{width:"30px"}}>
                    <img style={{paddingTop:20}} onClick={HandleMenu} src="src/assets/menu_24px.png"/>
                </div>
            </div>
        </div>
    )
}

export function Footer()
{
    return(
        <>
            <div id="footer_top"className="" style={{textAlign:"center"}}>

                <div id="footer">
                    <div className="" id="footerleft" style={{}}>
                        <div>LOGO</div>
                        <div id="footernav">
                            <a href="/introduce">소개 </a>
                            <a href="/introduce">공지사항 </a>
                            <a href="/introduce">연락처 </a>
                            <a href="/introduce">광고 </a>
                            <a href="/introduce">채용 </a>
                        </div>
                        <div>
                            <div id="sns">
                                <a href="/facebook">sns1 </a>
                                <a href="/facebook">sns2 </a>
                                <a href="/facebook">sns3 </a>
                            </div>
                        </div>
                    </div>
                    <div className="" id="footercenter">
                        <div>
                            상호:. |
                            대표명:. |
                            사업자등록번호: xxx-xx-xxxxx |
                            문의:xxxx@xxxx.xxx
                        </div>
                        <div>
                            통신판매업 신고번호:제 xxxx-xxxx-xxxxxx호 |
                            주소 :  xxx xxx xxxx |
                            사업자등록번호: xxx-xx-xxxxx |
                            copyright : copyright
                        </div>
                    </div>
                    <div className="" id="footerright">
                        <div>
                            <div>Infomation</div>
                            <a href="#">Logo </a><br/>
                            <a href="#">Logo </a><br/>
                            <a href="#">Logo </a><br/>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
