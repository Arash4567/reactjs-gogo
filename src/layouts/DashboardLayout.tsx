import React from 'react';

const DashboardLayout =(props: any) =>{
    return(
        <>
        <header>Header</header>
        <main>{props.children}</main>
        <footer>Footer</footer>
        </>
    )
}

export default DashboardLayout;