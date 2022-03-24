import React from 'react'
import ComingSoon from '../../components/ComingSoon'
import FooterLayout from '../../components/FooterLayout'
import MainLayout from '../../components/MainLayout'

function forumTemp() {
    return (
        <>
        <MainLayout title="Forum Page" pageTitle="">
          
          <div>
          <ComingSoon/>
          </div>
    
        </MainLayout>
    
        <FooterLayout/>
        </>
    )
}

export default forumTemp
