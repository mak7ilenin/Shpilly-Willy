exports.unregisteredHeader = async function() {
    const header = `
    <header>
        <div class="empty_div"></div>
        <a href="/" class="logo">
            <h1>SHPILLY</h1>
            <div class="logo_line"></div>
            <h1>WILLY</h1>    
        </a>
        <div class="empty_div">
            <div class="user">
                <div class="user_btn_container">
                    <button><a href="/login">Login</a></button>
                </div>
                <div class="user_btn_container">
                    <button><a href="/registration">Sign up</a></button>
                </div>
            </div>
        </div>
    </header>`
    return header;
}

exports.loggedHeader = async function(authUser) {
    const header = `
    <header>
        <div class="empty_div">
            <button class="chats_btn"><a href="/chats">Chats</a></button>
        </div>
        <a href="/" class="logo">
            <h1>SHPILLY</h1>
            <div class="logo_line"></div>
            <h1>WILLY</h1>    
        </a>
        <div class="empty_div">
            <div class="user_info">
                <div class="photo_container">
                    <img src="/upload/private/`+ authUser.photo +`" alt="">
                </div>
                <div class="right_side">
                    <p>`+ authUser.fullName +`</p>
                    <button><a href="/profile">Manage account</a></button>
                    <button><a href="/logout">Log out</a></button>
                </div>
            </div>
        </div>
    </header>`;
    return header;
}