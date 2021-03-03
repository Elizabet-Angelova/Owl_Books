import React from 'react';
import './MainPage.css'
import MenuComponent from './ComponentsMainPage/MenuComponent/MenuComponent';
import SearchBarComponent from './ComponentsMainPage/SearchBarComponent/SearchBarComponent';
import PageController from './ComponentsMainPage/PageController/PageController';
import BooksPageContent from '../BooksPageContent/BooksPageContent';
import ProfilePageContent from '../ProfilePageContent/ProfilePageContent';
import IndividualBookContent from '../IndividualBookContent/IndividualBookContent';
import {withRouter} from 'react-router-dom'
import PremiumPageContent from '../OtherPages/PremiumPage/PremiumPage';
import UsersPageContent from './ComponentsMainPage/AdminOptions/UsersPage.js';
import CreateNewBookPage from './ComponentsMainPage/AdminOptions/CreateNewBook';
import UpdateBookPage from './ComponentsMainPage/AdminOptions/UpdateBook';
import SearchPageContent from '../OtherPages/SearchPage/SearchPage'



const MainPage = ({content}) => {
   const ContentComponent = content;
   return (
      <>
         <div className='trending-main-container'>
            <div className='blur-container2'>
            <MenuComponent />
            <SearchBarComponent />
            <ContentComponent />
            </div>

         </div>
      </>
   );
}

export const BooksPage = () => {
   return  <MainPage content={BooksPageContent}/>
}

export const TrendingPage = () => {
   return <MainPage content={BooksPageContent}/>
}

export const ProfilePage = () => {
   return <MainPage content={ProfilePageContent}/>
   
}

export const IndividualBookPage = () => {
   return <MainPage content={IndividualBookContent}/>
   
}

export const PremiumPage = () => {
   return <MainPage content={PremiumPageContent}/>
   
}

export const UsersPage = () => {
   return <MainPage content={UsersPageContent}/>
}

export const CreteBookPage = () => {
   return <MainPage content={CreateNewBookPage}/>
}

export const UpdatePage = () => {
   return <MainPage content={UpdateBookPage}/>
}

export const SearchPage = () => {
   return <MainPage content={SearchPageContent}/>
}
export default withRouter(MainPage);