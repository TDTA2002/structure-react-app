import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { counterActions } from '@stores/slices/counter.slice';
import Loading from '@components/Loadings/Loading';
import UserForm from '@components/UserForms/UserForm';

export default function About() {
    const dispatch = useDispatch();
    const counterStore = useSelector(store => store.counterStore);
    useEffect(() => {
        dispatch(counterActions.findAllUsers());
    }, []);

    const [showUserForm, setShowUserForm] = useState(false);
    const [dataForm, setDataForm] = useState(null);
    return (
        <div>
            {counterStore.loading ? <Loading /> : null}
            {/* <button onClick={() => setShowUserForm(true)}>ADD NEW USER</button> */}
            {showUserForm ? (
                <UserForm dataForm={dataForm} />
            ) : null}

            <h1>About Page</h1>
            <button onClick={() => {
                setShowUserForm(true)
                setDataForm({
                    functionCloseForm: setShowUserForm,
                    type: 'add',
                    functionSubmit: counterActions.createNewUsers,
                    preData: null
                })
            }}>Add New User</button>
            <br />
            {counterStore.users.map((user) =>
                <Fragment key={user.id}>
                    <div onContextMenu={(e) => {
                        e.preventDefault(); dispatch(counterActions.setStatusUser(
                            {
                                userId: user.id,
                                patchData: {
                                    block: !user.block
                                }
                            }
                        ));
                    }} style={{ textDecoration: user.block ? "line-through" : "" }}>
                        UserName: {user.name}, Userid: {user.id}, UserEmail: {user.email}, UserPhonenumber: {user.phonenumber}
                    </div>
                    <button onClick={() => {
                        setShowUserForm(true)
                        setDataForm({
                            functionCloseForm: setShowUserForm,
                            type: 'update',
                            functionSubmit: counterActions.updateUser,
                            preData: user
                        })
                    }} type="button" class="btn btn-info">Edit</button>

                    <button onClick={() => {
                        console.log('delete', user.id);
                        dispatch(counterActions.deleteUserById(user.id))
                    }} type="button" class="btn btn-danger">Delete</button>

                </Fragment>
            )}
            <Outlet />
        </div>
    );
}
