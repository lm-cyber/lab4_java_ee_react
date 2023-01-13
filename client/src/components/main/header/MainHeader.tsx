import React from 'react';
import {useNavigate} from 'react-router-dom';
import {userAPI} from "../../../api/authService";
import CustomButton from "../../common/CustomButton";

const MainHeader = () => {
    const navigate = useNavigate();
    const [logoutUser] = userAPI.useLogoutUserMutation();

    const logout = () => {
        logoutUser().then(
            () => navigate("/login", {replace: true})
        )
    }

    return (
        <section className="grid-section header">
            <span className="centered">Насибуллин Алан Маратович. P32312. Вариант 33681</span>
            <CustomButton data-test-id="logout-button" label="Logout" onClick={logout}/>
        </section>
    )
};

export default MainHeader;