import React from 'react'
import Header from './Header'
import Footer from './Footer'

type Props = {
    children: React.ReactNode
}

const MainLayout = (props: Props) => {
  return (
    <div className='flex flex-col justify-between w-full p-6 h-screen'>
        <div className='flex flex-col gap-6'>
            <Header />
            {props.children}
        </div>
        <Footer />
    </div>
  )
}

export default MainLayout