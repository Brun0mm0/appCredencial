const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const helpers = {};

helpers.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);
    return hash;
}

helpers.matchPassword = async (password, savedPassword) => {
    try{
       return await bcrypt.compare(password, savedPassword);
    } catch(e){
        console.log(e);
    }
}

helpers.tokenCreate = () => {
    let tokens = {}
    
    const token = crypto.randomBytes(32).toString('hex');
    const encryptToken = crypto.createHash('sha256')
                                    .update(token)
                                    .digest('hex')
    tokens.token = token
    tokens.encrypt = encryptToken
    
    return tokens 
}

helpers.encryptToken = (id) => {
    const encryptToken = crypto.createHash('sha256')
    .update(id)
    .digest('hex')

    return encryptToken
}

module.exports = helpers;
// module.exports = tokenConfirm;