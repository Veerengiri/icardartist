import React,{useEffect, useState} from "react";
import "../../../Css/Contact.css";
import "../../../Css/EventForm.css";
import FestivalOutlinedIcon from "@mui/icons-material/FestivalOutlined";
import AddLocationAltRoundedIcon from "@mui/icons-material/AddLocationAltRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import DateRangeRoundedIcon from "@mui/icons-material/DateRangeRounded";
import Person2Icon from "@mui/icons-material/Person2";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PhoneIcon from "@mui/icons-material/Phone";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import NumbersIcon from "@mui/icons-material/Numbers";
import FestivalIcon from "@mui/icons-material/Festival";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import ModeIcon from "@mui/icons-material/Mode";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

const EventForm = (props) => {
  const eventId = "takefrom prosp";
  const backend = "http://localhost:8080"
  const [gname,setGname]=useState("");
  const [totalpart,setTotalpart]=useState(1);
  const [inputfild,setInputfild]=useState([]);
  const [inputName,setInputName]= useState([]);
  const [inputGender,setInputGender]=useState([]);
  const [inputEmail,setInputEmail]=useState([]);
  const [inputPhoneNo,setInputPhoneNo]=useState([]);
  const [doa,setDoa]=useState("");
  const [focid,setFocid]=useState("");
  const [psp,setPsp]=useState(null);
  const [gp,setGp]=useState(null);
  const [adhar,setAdhar]=useState(null);
  const [sign,setSign]=useState(null);
  const [psptype,setPsptype]=useState("");
  const [gptype,setGptype]=useState("");
  const [adhartype,setAdhartype]=useState("");
  const [signtype,setSigntype]=useState("");
  const [submit,setSubmit]=useState("Submit");

  const checkdetails=()=>{
      if(psp && gp && adhar && sign){
        if(gname == "" || inputfild.length==0 || inputName.length==0 || inputGender.length ==0 || inputPhoneNo.length ==0  ){
          return false;
        }
        if(doa == ""){
          setDoa("No")
        }
        if(focid== ""){
          setFocid("No");
        }
        return true;
      }else{
        return false;
      }
    }
  const openfiled = (no)=>{
    let ab = [];
    for(let i=0;i<no;i++){
      ab.push(i);
    }
    setInputfild(ab);
    setInputName([]);
    setInputGender([]);
    setInputEmail([]);
    setInputPhoneNo([]);
    setTotalpart(no);
  }
  const uploadfile = async (filenam,file)=>{
    let fn  = filenam.split('.');
    let filetyep = fn[fn.length-1];
    const res = await fetch(`${backend}/api/geturl/${filetyep}`);
    const data = await res.json();
    const url=data.url;
    await fetch(url,{
      method:"PUT",
      headers:{
        "content-type":"multipart/form-data"
      },
      body:file[0]
    })
    const imgurl = url.split('?')[0];
    // setImagesourse(imgurl)
    return imgurl;
  }
  const handlesubmit = async (e)=>{
    e.preventDefault();
    if(!checkdetails){
      alert("invalid credentials");
      return;
    }
    setSubmit("Just A Sec...");
    let name = [];
    for(let i=0;i<totalpart;i++){
      let obj = {
        name: inputName[i],
        gender: inputGender[i],
        email: inputEmail[i],
        phoneNo: inputPhoneNo[i],
      }
      name.push(obj);
    }
    const gphoto = await uploadfile(gptype,gp);
    const img = await uploadfile(psptype,psp);
    const adharcard = await uploadfile(adhartype,adhar);
    const signf = await uploadfile(signtype,sign);
    const tnartist = totalpart;
    const TOP = "no";
    const res = await fetch(`${backend}/api/regforevent`,{
      method:"POST",
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify({
        gname,
        name,
        tnartist,
        eventId,
        TOP,
        FOICD: focid,
        DOA: doa,
        gphoto: gphoto.toString(),
        img: img.toString(),
        adhar: adharcard.toString(),
        sign: signf.toString()
      })
    })
    const data = await res.json();
    alert(data.status);


    setSubmit("Submit");
  }


  return (
    <div>
      <header className="event-sec">
        <div className="e-title">
          Apply
          <span id="golden"> For </span>
          Event
        </div>
      </header>
      <div className="message">
        <form action="" className="contactus">
          
          <div className="input">
            <label className="icon">
              <PeopleAltIcon />
            </label>
            <input type="text"
            value={gname}
            onChange={(d)=>{setGname(d.target.value)}}
            className="name" placeholder="Group Name" />
          </div>
          <div className="input">
            <label className="icon">
              <FestivalIcon />
            </label>
            <select className="name" onClick={(e)=>{openfiled(e.target.value)}} >
              <option value="-1" >
                No of participents
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          
          {/* ARTIST PARTICIPANTS */}
          {inputfild.map((e)=>{
            return <div style={{margin:'50px'}} key={e}>
            <div className="input">
              <label className="icon">
                <Person2Icon />
              </label>
              <input
                type="text"
                className="name"
                value={inputName[e]}
                onChange={(d)=>{
                  d.preventDefault();
                  const values = inputName;
                  values[e]=d.target.value;
                  setInputName(values);
                }}

                placeholder={`${e==0?"leader":`participate ${e}`} Name`}
              />
            </div>
            <div className="input">
              <label className="icon">
                <Person2Icon />
              </label>
              male
              <input
                type="radio"
                name={`gender${e}`}
                className="name"
                value="male"
                onChange={(d)=>{
                  d.preventDefault();
                  const values = inputGender;
                  values[e]=d.target.value;
                  setInputGender(values);
                 
                }}
                placeholder={`${e==0?"leader":`participate${e}`} gender`}
              />
              female
              <input
                type="radio"
                name={`gender${e}`}
                className="name"
                value="female"
                onChange={(d)=>{
                  d.preventDefault();
                  const values = inputGender;
                  values[e]=d.target.value;
                  setInputGender(values);
                  
                }}
                placeholder={`${e==0?"leader":`participate${e}`} gender`}
              />
            </div>
            <div className="input">
              <label className="icon">
                <Person2Icon />
              </label>
              <input
                type="email"
                className="name"
                value={inputEmail[e]}
                onChange={(d)=>{
                  d.preventDefault();
                  const values = inputEmail;
                  values[e]=d.target.value;
                  setInputEmail(values);
                }}
                placeholder={`${e==0?"leader":`participate${e}`} email`}
              />
            </div>
            <div className="input">
              <label className="icon">
                <Person2Icon />
              </label>
              <input
                type="text"
                className="name"
                value={inputPhoneNo[e]}
                onChange={(d)=>{
                  d.preventDefault();
                  const values = inputPhoneNo;
                  values[e]=d.target.value;
                  setInputPhoneNo(values);
                }}
                placeholder={`${e==0?"leader":`participate${e}`} phoneNo`}
              />
            </div>
          </div>
          })}

          {/* GROUP INFO */}
          <div className="inmsg">
            <label className="icon msicon">
              <EmojiEventsIcon />
            </label>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              className="msg"
              value={doa}
              onChange={(d)=>{setDoa(d.target.value)}}
              placeholder="Details of Awards / Honors"
            />
          </div>
          <div className="inmsg">
            <label className="icon msicon">
              <DescriptionRoundedIcon />
            </label>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              className="msg"
              value={focid}
              onChange={(d)=>{setFocid(d.target.value)}}
              placeholder="Have you performed at District, State, National or International Level? If Yes, Provide Details"
            />
          </div>

          {/* APPROVAL DETIALS */}
          <div className="input">
            <label className="icon">
              <AddAPhotoIcon />
            </label>
            <div className="nn2">
              <div className="tx">Passport Size Image </div>
              <input type="file"
                onChange={(d)=>{setPsp(d.target.files);
                setPsptype(d.target.value)}}
                name="" id="" />
            </div>
          </div>
          <div className="input">
            <label className="icon">
              <CreditScoreIcon />
            </label>
            <div className="nn2">
              <div className="tx">Upload GroupPhoto </div>
              <input type="file"
              onChange={(d)=>{setGp(d.target.files);
                setGptype(d.target.value)}}
              name="" id="" />
            </div>
          </div>
          <div className="input">
            <label className="icon">
              <CreditScoreIcon />
            </label>
            <div className="nn2">
              <div className="tx">Upload Aadhar-Card </div>
              <input type="file"
              onChange={(d)=>{setAdhar(d.target.files)
                setAdhartype(d.target.value)}}
              name="" id="" />
            </div>
          </div>
          <div className="input">
            <label className="icon">
              <ModeIcon />
            </label>
            <div className="nn2">
              <div className="tx">Upload The Signature</div>
              <input type="file"
              onChange={(d)=>{setSign(d.target.files)
                setSigntype(d.target.value)}}
              name="" id="" />
            </div>
          </div>
          <div className="wpp">
            <div className="forbtn">
              <div className="btn submit" onClick={handlesubmit}>{submit}</div>
            </div>
            <div className="forbtn">
              <input type="reset" value="Reset" onClick={(e)=>{
                window.location.href =window.location.href;
              }} className="btn reset" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
