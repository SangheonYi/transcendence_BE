import React, {useEffect, useState, useCallback, VFC} from "react";
import "./styles/RoomList.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import MakeRoomModal from './MakeRoomModal';
import PwRoomModal from './PwRoomModal';
import NoEntryModal from './NoEntryModal'
import axios from 'axios';
import lock_icon from '../images/private.png'

interface HomeObj{
	userName:any,
	roomName:any,
	setRoomName:(value:any)=>void,
}

const RoomList : VFC<HomeObj>  = ({ userName, roomName, setRoomName}) => {
  const handleRoomNameChange = useCallback((e:any) => {
    setRoomName(e.target.value);
	checkedRoomInfo(e.target.value)
  }, []);

  //password
  const [pw, setPw] = useState("");
  const handPwChange = useCallback((e:any) => {
    setPw(e.target.value);
  }, []);

  const [bChecked, setChecked] = useState(false);
  const checkHandler = useCallback( (e:any) => {
    setChecked(!bChecked);
  },[bChecked]);


  //makeRoomModal
  const [makeRoomModalOpen, setMakeRoomModalOpen] = useState(false);
  const openMakeRoomModal = () => {
	setMakeRoomModalOpen(true);
  }
  const closeMakeRoomModal = () => {
	setMakeRoomModalOpen(false);
  }
  //pwRoomModal
  const [pwRoomModalOpen, setPwRoomModalOpen] = useState(false);
  const openPwRoomModal = () => {
	setPwRoomModalOpen(true);
  }
  const closePwRoomModal = () => {
	setPwRoomModalOpen(false);
	setTryAgain(false)
  }
  //NoEntryModal
  const [noEntryModalOpen, setNoEntryModalOpen] = useState(false);
  const openNoEntryModal = () => {
	setNoEntryModalOpen(true);
  }
  const closeNoEntryModal = () => {
	setNoEntryModalOpen(false);
  }

  sessionStorage.setItem("roomName", roomName);

  const [roomListInfo, setRoomListInfo] = useState<{id:string, password:string, owner_id:string, num:number}[]>();

  useEffect(() => {
	getRoomList()
  }, [])

  async function makeRoom(){
	  userName = userName ? userName : sessionStorage.getItem("userName")
	  await axios.post('/RoomList', {id:roomName, password:pw, owner_id:userName});
  }

  async function getRoomList() {
	  const res = await axios.get('/RoomList/list');
	  setRoomListInfo(res.data)
	  //setRoomListInfo([{id:"r1", password:"1234", owner_id:"oid1", num:1}, {id:"r1", password:"", owner_id:"oid1", num:1}])
  }


  const [roomInfo, setRoomInfo] = useState<{id:String, password:String, owner_id:String, num:number}>();

  function checkedRoomInfo(roomId:string)
  {
	  roomListInfo?.map(room=>{
		  if (room.id === roomId)
		  setRoomInfo(room)
		})
  }


  async function enterRoom()
  {
	await axios.patch('/RoomList/incNum/' + roomName)
	document.location.href = '/Chat';
  }

  async function enterTheRoom() {
	  if (roomInfo)
	  {
			if (roomInfo.num >= 10) //???????????? modal
				openNoEntryModal()
			else if (roomInfo.num < 10 && roomInfo.password == "") //????????? ??????
				enterRoom()
			else //???????????? ?????? modal
				openPwRoomModal()
		}
	}

	//input password check
	const [inputPw, setInputPw] = useState();
	const handleInputPwChange = (e:any) => {
		setInputPw(e.target.value);
	};

	// password try again
	const [tryAgain, setTryAgain] = useState(false);

	async function enterPrivateRoom() {
		if (inputPw === roomInfo?.password)
			enterRoom()
		else
			setTryAgain(true);
	}


  return (
    <div className="RoomList-container">
		<div className="makeRoom-box">
			<a className="btn btn-primary btn-sm makeRoom" onClick={openMakeRoomModal}><b>??? ?????????</b></a>
			<MakeRoomModal open={makeRoomModalOpen} close={closeMakeRoomModal} header="??? ?????????" makeRoom={makeRoom}>
				<label >
					<b>&nbsp;??? ??????&nbsp;&nbsp;&nbsp;</b>
					<input onChange={handleRoomNameChange}></input>
				</label>
				<label>
					&nbsp;&nbsp;<input type="checkbox" checked={bChecked} onChange={(e) => checkHandler(e)} ></input> private
				</label>
				{bChecked ?
					<div className="checkbox-pw">
					<b>????????????&nbsp;</b>
					<input type="password" onChange={handPwChange}></input>
					</div>
					: null
				}
			</MakeRoomModal>
		</div>
		<div className="middle">
			{roomListInfo?.map(room=>
				<label>
					<input type="radio" name="room" value={room.id} onChange={handleRoomNameChange}/>
					<div className="box">
						<div>{room.id}</div>
						<span className="lock-image">{room.password != "" ? <img src={lock_icon} width="20" height="20"></img> : null}</span>
						<span className="room-num">10/{room.num}</span>
					</div>
				</label>
			)}
		</div>
		<div className="Join-button">
			<a className="btn btn-dark" onClick={enterTheRoom}><b>????????????</b></a>
			<NoEntryModal open={noEntryModalOpen} close={closeNoEntryModal} >
				????????? ??? ????????????.
			</NoEntryModal>
			<PwRoomModal open={pwRoomModalOpen} close={closePwRoomModal} header="????????????" enterRoom={enterPrivateRoom}>
				<label>
					<b>????????????&nbsp;</b>
					<input type="password" onChange={handleInputPwChange}></input>
					{tryAgain ? <span className="tryAgain">&nbsp;?????? ??????????????????</span> : null}
				</label>
			</PwRoomModal>
		</div>
    </div>
  );
};

export default RoomList;