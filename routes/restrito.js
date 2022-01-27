const express = require('express')

const router = express.Router()

const Noticia = require('../models/noticia')


router.use((req, res, next) => {
    if ('user' in req.session) {
      if(req.session.user.roles.indexOf('admin') >= 0){
        return next()

      }else{
        res.redirect('/')

      }
      return next()
    }
    
    res.redirect('/login')
  })

router.get('/', (req, res) => {
    res.send('restrito')

})

router.get('/noticias', async (req, res) => {
    const noticias = await Noticia.find({ category: 'private' })
    res.render('noticias/restrito', {noticias})
})

module.exports = router