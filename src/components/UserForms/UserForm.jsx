import React from 'react'
import './UserForm.scss'
import { useDispatch } from 'react-redux'
export default function UserForm(props) {
    const dispatch = useDispatch();
    return (
        <div className='userForm_container'>
            <form className='forms' onSubmit={(event) => {
                event.preventDefault(); // ngăn chặn hành vị gọi action của form
                if (event.target.userName.value == "") {
                    alert("Vui lòng điền user name")
                    return
                }
                let newUser = {
                    name: event.target.userName.value,
                    email: event.target.userEmail.value,
                    phonenumber: event.target.userphoneNumber.value,
                    block: props.dataForm.preData != null ? props.dataForm.preData.block : false
                }

                if (props.dataForm.type == "add") {
                    dispatch(props.dataForm.functionSubmit(newUser))
                }

                if (props.dataForm.type == "update") {
                    dispatch(props.dataForm.functionSubmit(
                        {
                            userId: props.dataForm.preData.id,
                            editData: newUser
                        }
                    ))
                }

                //reset form
                event.target.userName.value = "";
                event.target.userEmail.value = "";
                event.target.userphoneNumber.value = "";


                event.target.cancel.click();
            }}>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">
                            User Name
                        </span>
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        name="userName"
                        defaultValue={props.dataForm.preData != null ? props.dataForm.preData.name : ""}
                    />

                </div>
                {/* input user name */}
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">
                            User Email
                        </span>
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        name="userEmail"
                        defaultValue={props.dataForm.preData != null ? props.dataForm.preData.email : ""}

                    />

                </div>
                {/* input User Phone Number */}
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">
                            User Phone Number
                        </span>
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        name="userphoneNumber"
                        defaultValue={props.dataForm.preData != null ? props.dataForm.preData.phonenumber : ""}

                    />

                </div>
                {/* Submid */}
                <button style={{ marginRight: "10px" }} type="submit" className="btn btn-primary">
                    {props.dataForm.type == "add" ? "Add" : "Save"}
                </button>
                {/* Hủy tắt form */}
                <button onClick={() => {
                    props.dataForm.functionCloseForm(false)
                }} name='cancel' type="button" className="btn btn-secondary">Cancel</button>
            </form>
        </div>
    )
}
