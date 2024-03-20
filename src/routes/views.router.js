const {Router} = require('express');

const viewsRouter = Router();

const publicAccess = (req, res, next)=>{
    if(req.session.user) return res.redirect('/')

    next();
}

const privateAccess = (req, res, next)=>{
    if(!req.session.user) {
        console.log("Not logged in yet")
        return res.redirect('/login')
    }
    next();
}


viewsRouter.get('/register', publicAccess, (req, res)=>{
    res.render('register', {})
})


viewsRouter.get('/login', publicAccess, (req, res)=>{
    res.render('login')
})


viewsRouter.get('/', privateAccess, (req, res)=>{
    res.render('products', {user: req.session.user})
})



module.exports = viewsRouter;