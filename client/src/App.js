import React from 'react';
import {GlobalStyle} from './global.styles';
import Homepage from './pages/homepage/homepage.component';
import {Switch ,  Route , Redirect} from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInSignUpPage from './pages/signin-signup/signin-signup.component';
import CheckoutPage from './pages/checkout/checkout.component';
import {useEffect} from 'react';
import { connect} from'react-redux';
import { checkUserSession} from './redux/user/user.actions';
import { selectUtilizatorCurent } from './redux/user/user.selectors';
import { createStructuredSelector} from 'reselect';
import ContactPage from './pages/contact/contact.component';

const  App =({checkUserSession, utilizatorCurent})=> {

  useEffect(()=>{
    checkUserSession()
  },[checkUserSession]);
    return (
      <div>
      <GlobalStyle />
      <Header  />
        <Switch>
        <Route exact path = '/' component={Homepage}></Route>
        <Route path = '/shop' component={ShopPage}></Route>
        <Route exact path = '/contact' component = {ContactPage}></Route>
        <Route exact path ='/signin'  render= {()=> utilizatorCurent ? (<Redirect to= '/' />) : (<SignInSignUpPage />)}  />
        <Route exact path = '/checkout'render = {() => !utilizatorCurent? (<Redirect to ='signin' />) : (<CheckoutPage />)}></Route>
        </Switch>
       
        </div>
    );
    }
 
  const mapStateToProps = createStructuredSelector({
    utilizatorCurent: selectUtilizatorCurent

  });
 const mapDispatchToProps = dispatch =>({
   checkUserSession: ()=> dispatch(checkUserSession())
 })
export default connect(mapStateToProps,mapDispatchToProps)(App);