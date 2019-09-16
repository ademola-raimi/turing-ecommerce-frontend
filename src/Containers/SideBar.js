import React from 'react';
import BasketCart from './BasketCart';
import Search from './Search';
import Attributes from './Attributes';
import Categories from './Categories';
import Departments from './Departments';

export const SideBar = ()=>{
    return(
        <div className="side">
            <BasketCart/>
            <Search/>
            <Attributes/>
            <Categories/>
            <Departments/>
        </div>
    );
};