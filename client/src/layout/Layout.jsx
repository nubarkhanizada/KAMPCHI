import React from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

if (!localStorage.getItem('favorites')) {
  localStorage.setItem('favorites', JSON.stringify([]));
}

if (!localStorage.getItem('saved')) {
  localStorage.setItem('saved', JSON.stringify([]));
}

if (!localStorage.getItem('products')) {
  localStorage.setItem('products', JSON.stringify([]));
}

if (!localStorage.getItem('tours')) {
  localStorage.setItem('tours', JSON.stringify([]));
}

const Layout = (props) => {
  return (
    <div className='layout'>
      <Header />
      <main>
        {props.children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout