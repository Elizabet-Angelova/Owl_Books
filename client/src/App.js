import React from 'react';
import './App.css';
import LandingPage from './LandingPage/LandingPage';
import { BooksPage, ProfilePage, IndividualBookPage, PremiumPage, UsersPage, CreteBookPage, UpdatePage, SearchPage } from './MainPage/MainPage';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom'
import ErrorPage, { fourOfourPage } from './OtherPages/Error';
import FormInput from './LandingPage/ComponentsLandingPage/Form/input/input';


function App() {

  return (

    <BrowserRouter>
      <Switch>
        <Redirect path="/" exact to="/home" />
        <Route path="/home" exact component={LandingPage} />
        <Route path="/login" component={FormInput} />
        <Route path="/register" component={FormInput} />
        <Route exact path="/books"
          component={BooksPage} />
        <Route exact path="/books/create" component={CreteBookPage} />
        <Route path="/trending"
          component={BooksPage} />
        <Route path="/profile"
          component={ProfilePage} />
        <Route exact path="/books/:id"
          component={IndividualBookPage} />
        <Route exact path="/update/:id"
          component={UpdatePage} />
        <Route exact path="/search/:searchString"
          component={SearchPage} />
        <Route path="/premium"
          component={PremiumPage} />
        <Route path="/users"
          component={UsersPage} />
        <Route path="/error" exact component={ErrorPage} />
        <Route path="*" component={fourOfourPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default App;
