import React from 'react';
import BasketCart from './BasketCart';
import Search from './Search';
import Categories from './Categories';
import Departments from './Departments';

export const SideBar = ()=>{
    return(
        <div>
            <BasketCart/>
            <Search/>
            <Categories/>
            <Departments/>
        </div>
    );
};