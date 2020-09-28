import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { MyStylesheet } from './styles';
import Construction from './construction';
import ProviderID from './providerid'
import EmailAddress from './emailaddress'
import {returnCompanyList} from './functions';
import Profile from './profile';
import GoogleID from './googleid'


class Register {

    handleregistericon() {
        const construction = new Construction();
        const styles = MyStylesheet();
        const loginNow = construction.getloginnow.call(this)
       
        if(this.state.emailaddresscheck && this.state.profilecheck) {

            if(this.state.clientid || this.state.passwordcheck) {
            
            return(    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                <View style={[styles.flex1, styles.alignContentCenter]}>
                    <TouchableOpacity onPress={() => { construction.loginclient.call(this) }}>
                        <Image source={require('./png/register.png')}
                            resizeMethod='scale'
                            style={loginNow}
                        />
                    </TouchableOpacity>
                </View>
            </View>)

            }
        } else {
            return;
        }
    }

       async registerclient() {
        let emailaddress = this.state.emailaddress;
        let client = this.state.client;
        let clientid = this.state.clientid;
        let profile = this.state.profile;
        let firstname = this.state.firstname;
        const lastname = this.state.lastname;
        const values = { profile, client, clientid, firstname, lastname, emailaddress }
     
        try {
        let response = await ClientLogin(values)
        console.log(response)
        if (response.hasOwnProperty("allusers")) {
            let companys = returnCompanyList(response.allusers);
            this.props.reduxAllCompanys(companys)
            this.props.reduxAllUsers(response.allusers);

        }
        if (response.hasOwnProperty("myuser")) {

            this.props.reduxUser(response.myuser)
            this.setState({client:'',clientid:'',emailaddress:''})
        } else if(response.hasOwnProperty("message")) {
            this.setState({message:response.message})
        }
    } catch(err) {
        alert(err)
    }
    }

    showregister() {
        const construction = new Construction();
        const styles = MyStylesheet();
        const providerid = new ProviderID();
        const emailaddress = new EmailAddress();
        const headerFont = construction.getHeaderFont.call(this)
        const regularFont = construction.getRegularFont.call(this);
        const register = new Register();
        const myuser = construction.getuser.call(this);
        const profile = new Profile();
        const googleid = new GoogleID();

        const showgoogleid = () => {

            if(this.state.profile && this.state.profilecheck) {
                return(googleid.showgoogleid.call(this, "register"))
            }
        }
 
        if(myuser) {
        return(profile.showmyprofile.call(this))
        } else {
        return (
            <View style={[styles.generalFlex]}>
                <View style={[styles.flex1]}>

                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1]}>
                            <Text style={[styles.boldFont, headerFont, styles.alignCenter]}>Register </Text>
                        </View>
                    </View>

                    {providerid.showprofile.call(this)}

                    {showgoogleid()}


                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1]}>
                            <Text style={[regularFont, styles.alignCenter]}>{this.state.message}</Text>
                        </View>
                    </View>

                </View>
            </View>)

        }
    }

}
export default Register;