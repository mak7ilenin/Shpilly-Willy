exports.renderHeader = async function() {
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