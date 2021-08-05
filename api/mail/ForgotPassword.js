/* eslint-disable max-len */
module.exports = async (req, email, token) => {
	const forgotPasswordMail = {
		from: '"MDP Services" <ertugrul@mdpgroup.com>', 
		to: email,
		subject: 'MDP Services Forgot Password Mail',
		text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
        'http://' + req.headers.host + '/account/v1/Password/Reset/' + token + '\n\n' +
        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
	};
	return forgotPasswordMail;
};