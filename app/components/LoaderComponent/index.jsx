'use client'

import './style.css';
import React from "react";
import { Spinner } from "@nextui-org/react";

class Loader extends React.Component {
    render() {
        return (
            <div className='loader-container'>
                <Spinner />
            </div>
        )
    }
}

export default Loader;