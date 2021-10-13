
export const productsView = (req, res) => {
 
  res.sendFile('products.html', { root: './public' }) 
}

export const loginView = (req, res) => {

  if (req.session.nombre) {

    res.redirect('/products')
    
  } else {

    res.sendFile('login.html', { root: './public' }) 
  }
}

export const logoutView = (req, res) => {

  if (req.session.nombre) {

    res.sendFile('logout.html', { root: './public' })
    
  } else {

    res.redirect('/login')
  }
}

