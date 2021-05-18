import jwt from 'jsonwebtoken'

// wants to like a post
// click the like button => auth middleware (next) => like controller ...

const auth = async (req, res, next) => {

    try {
        // Authorization contient les identifiants permettant l'authentification d'un utilisateur auprès d'un serveur, habituellement après que le serveur ait répondu avec un statut 401 Unauthorized et l'en-tête WWW-Authenticate
        const token = req.headers.authorization.split(' ')[1];
        //if token is greater than 500 that is going to be a google auth
        const isCustomAuth = token.length < 500;

        let decodedData;
        // if we have the token and the token is lower than 500
        if(token && isCustomAuth) {
            // give us the username of the person and his id 
            decodedData = jwt.verify(token, 'test'); 
            //now we have the decoded the data, we know which user is logged in and which user liking the post or deleting
            //Store the id 
            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token)
            //sub is google's name for a specific id 
            req.userId = decodedData?.sub 
        }
        next();
    } catch (error) {
        
    }
    
}

export default auth;