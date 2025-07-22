import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProfileThunk, updateProfileThunk } from '../../../store/slice/authSlice/auth.thunk'

const ProfilePage = () => {
    const { user } = useSelector(state => state.authReducer)
    const dispatch = useDispatch()
    const [editing, setEditing] = useState(false)
    const [formData, setFormData] = useState({
        fullName: user?.fullName || "",
        username: user?.username || "",
    })
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");

    const avatar = user?.avatar || `https://api.dicebear.com/6.x/avataaars/svg?seed=${user?.username || "unknown"}`

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        const payload = {
            fullName: formData.fullName,
            username: formData.username,
        };
        if (newPassword) {
            if (!currentPassword) {
                setError("Please enter your current password to set a new password.");
                return;
            }
            payload.newPassword = newPassword;
            payload.currentPassword = currentPassword;
        }
        dispatch(updateProfileThunk(payload));
        dispatch(getProfileThunk());
        setEditing(false);
        setCurrentPassword("");
        setNewPassword("");
    };

    if (!user) {
        return (
            <div className="max-w-2xl p-6 mx-auto mt-20 text-center text-white">
                <h2 className="mb-4 text-xl font-bold">No user profile found</h2>
                <p className="mb-4 text-gray-400">Please log in to view or edit your profile.</p>
            </div>
        );
    }
    return (
        <div className="max-w-2xl p-6 mx-auto mt-20 text-white">
            <div className="flex flex-col items-center gap-2 p-6 shadow-lg bg-gray-950/30 rounded-3xl">
                <img src={avatar} alt="Avatar" className="w-24 h-24 mb-4 border-l-4 rounded-full border-l-blue-600" />
                {!editing ? (
                    <>
                        <h2 className="text-xl font-bold">{user.fullName}</h2>
                        <p className="text-sm text-gray-400">@{user.username}</p>
                        <button
                            className="px-4 py-2 mt-4 text-sm text-white transition bg-blue-600 rounded-full hover:bg-blue-700 hover:scale-105"
                            onClick={() => setEditing(true)}
                        >
                            Edit Profile
                        </button>
                    </>
                ) : (
                    <form className="flex flex-col items-center w-full gap-4" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            className="w-full px-4 py-2 text-sm text-white bg-gray-900 rounded-full outline-none placeholder:text-gray-500"
                        />
                        <input
                            type="text"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            className="w-full px-4 py-2 text-sm text-white bg-gray-900 rounded-full outline-none placeholder:text-gray-500"
                        />
                        <input
                            type="password"
                            placeholder='current password'
                            value={currentPassword}
                            onChange={e => setCurrentPassword(e.target.value)}
                            className="w-full px-4 py-2 text-sm text-white bg-gray-900 rounded-full outline-none placeholder:text-gray-500"
                        />
                        <input
                            type="password"
                            placeholder='new password'
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                            className="w-full px-4 py-2 text-sm text-white bg-gray-900 rounded-full outline-none placeholder:text-gray-500"
                        />
                        {error && <p className="text-sm text-red-400">{error}</p>}
                        <button
                            type="submit"
                            className="px-6 py-2 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-full hover:bg-blue-700 hover:scale-[1.02]"
                        >
                            Save Changes
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}

export default ProfilePage
