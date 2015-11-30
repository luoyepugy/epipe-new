
# 检查用户名和密码
checkAccount = (i, name) ->
    v = i.validity
    if v.valueMissing
        if name == 'email'
            i.setCustomValidity '请输入邮箱！'
        else 
            i.setCustomValidity '请输入密码！'
    else if v.typeMismatch || v.patternMismatch
        if name == 'email'
            i.setCustomValidity '请输入正确的邮箱格式！'
        else 
            i.setCustomValidity '请输入至少6位密码！'
    else
        i.setCustomValidity ''
        return

# 检查两次密码是否输入一致
confirmPwd = (i) ->
    v = i.validity
    pwd = document.getElementById "pwd"
    conPwd = document.getElementById "conmPwd"
    if v.valueMissing
        i.setCustomValidity '请再次输入密码!'
    else if pwd.value != conPwd.value 
        i.setCustomValidity '两次密码输入不一致!'
    else 
        i.setCustomValidity ''
        return
    
# 点击确认按钮时检查
check = ->
    email = document.getElementById "email"
    pwd = document.getElementById "pwd"
    conPwd = document.getElementById "conmPwd"
    if conPwd
        confirmPwd #{conPwd}
    
    checkAccount email, 'email'
    checkAccount pwd, 'pwd'
    return





    