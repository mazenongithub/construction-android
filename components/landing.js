import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { MyStylesheet } from './styles';
import Construction from './construction'
import Profile from './profile'

class Landing {

    getimages() {

        const myimages = [
            {
                imageid: 'main_slide',
                uri: require('../slides/main_slide.png'),
                capt: 'Construction Management by CivilEngineer.io. The Best Construction Management Program in the Google Play Store. See the Slideshow',
                title: 'Construction Management'

            },
            {
                imageid: 'schedule',
                uri: require('../slides/schedule.jpg'),
                capt: 'Schedule and Actual Components enter your labor, equipment, and materials for the project',
                title: 'Schedule'

            },
            {
                imageid: 'actual',
                uri: require('../slides/actual.jpg'),
                capt: 'Actual Components records actual labor, equipment, and materials separate from the schedule. These are actual direct costs that go into invoices. ',
                title: 'Actual'

            },

            {
                imageid: 'scheduleview',
                uri: require('../slides/scheduleview.jpg'),
                capt: 'Schedule View graphic view of Equipment and Labor Schedule. This was made to make scheduling easier and more accurate ',
                title: 'Schedule View'

            },
            {
                imageid: 'proposals',
                uri: require('../slides/proposals.jpg'),
                capt: 'Add your schedule items to the proposals. Add the profit percentage to the item. ',
                title: 'Proposals'

            },
            {
                imageid: 'invoices',
                uri: require('../slides/invoices.jpg'),
                capt: 'Create Invoies. Add actual costs to your invoice. Add your profit percentage to your actual items  ',
                title: 'Invoices'

            },

            {
                imageid: 'viewproposal',
                uri: require('../slides/viewproposal.jpg'),
                capt: 'View Proposals summarizes your schedule and puts it into construction format. Simply add your quantities and unit to produce unit prices ',
                title: 'View Proposal'


            },
            {
                imageid: 'viewinvoice',
                uri: require('../slides/viewinvoice.jpg'),
                capt: 'View Invoice summarizes your actual costs in construction format. Add your quantities to produce invoice level unit prices  ',
                title: 'View Invoice'

            },

            {
                imageid: 'bidschedule',
                uri: require('../slides/bidschedule.jpg'),
                capt: 'Bid Schedule shows project level costs per bid item. Add your  quantities to produce the project level unit cost ',
                title: 'Bid Schedule'

            },
            {
                imageid: 'bid',
                uri: require('../slides/bid.jpg'),
                capt: 'Bid Produces project level bid amounts. Just add the quantities to produce project level unit prices ',
                title: 'Bid '

            },
            {
                imageid: 'milestones',
                uri: require('../slides/milestones.jpg'),
                capt: 'View Milestones from the Project Manager with Critical Path diagram. This is for communicating schedule better.  ',
                title: 'Milestones'

            },
            {
                imageid: 'equipment',
                uri: require('../slides/equipment.jpg'),
                capt: 'Equipment components for adding your ownership and rental equipment. Connect your Equipment to an account.  ',
                title: 'Equipment'

            },
            {
                imageid: 'equipmentownership',
                uri: require('../slides/ownership.jpg'),
                capt: 'Equipment Ownership variables are used to determine the default equipment rates when adding schedule and actual equipment  ',
                title: 'Equipment Ownership'

            },
            {
                imageid: 'viewaccount',
                uri: require('../slides/viewaccount.jpg'),
                capt: 'View Account gives the account summary for each account  ',
                title: 'View Account'

            },
            {
                imageid: 'specifications',
                uri: require('../slides/specifications.jpg'),
                capt: 'View Specifications created during design by the Engineering Team.  ',
                title: 'Specifications'
            }




        ];
        return myimages;
    }

    showimage(image) {
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this)
        const headerFont = construction.getHeaderFont.call(this)
        const menu = construction.getnavigation.call(this)
        const styles = MyStylesheet()
        const marginLeft = () => {
            if (menu.open) {
                return ({ marginLeft: 30 })
            } else {
                return ({ marginLeft: 60 })
            }

        }
        const alignSlide = () => {
            if (!menu.open) {
                return (styles.alignContentCenter)
            } 
        }
        const slideimage = () => {
            if (this.state.width > 1200) {

                return ({ width: 696, height: 1113 })

            } else if (this.state.width > 600) {
                return ({ width: 416, height: 666 })

            } else {
                return ({ width: 264, height: 264 })

            }
        }
        return (
            <View style={[styles.generalFlex, styles.bottomMargin30]}>
                <View style={[styles.flex1,alignSlide()]}>
                    <Image source={image.uri}
                        resizeMethod='scale'
                        style={[slideimage(), marginLeft()]}
                        key={image.imageid}
                    />
                    <Text style={[headerFont, styles.alignCenter]}>{image.title}</Text>
                    <Text style={[regularFont, styles.alignCenter]}>{image.capt}</Text>
                </View>
            </View>)

    }

    showiconimage(image) {
        const styles = MyStylesheet()
        const iconimage = () => {
            if (this.state.width > 1200) {
                return ({ width: 324, height: 519 })
            } else if (this.state.width > 600) {
                return ({ width: 229, height: 367 })
            } else {
                return ({ width: 137, height: 220 })
            }
        }

        return (

            <TouchableOpacity onPress={() => { this.setState({ activeimage: image.imageid }) }}>
                <Image source={image.uri}
                    resizeMethod='scale'
                    style={[iconimage()]}
                    key={image.imageid}
                />
            </TouchableOpacity>)

    }
    getactiveimage() {
        const landing = new Landing();
        const images = landing.getimages.call(this)
        let myimage = false;
        images.map(image => {
            if (image.imageid === this.state.activeimage) {
                myimage = image;
            }
        })
        return myimage;
    }
    showactiveimage() {
        const landing = new Landing();
        const activeimage = landing.getactiveimage.call(this)
        if (activeimage) {
            return (landing.showimage.call(this, activeimage))
        }
    }
    showimages() {

        const landing = new Landing();
        const images = landing.getimages.call(this);
        let myimage = [];


        images.map(image => {

            myimage.push(landing.showimage.call(this, image))


        })


        return myimage;
    }

    showiconimages() {
        const construction = new Construction();
        const styles = MyStylesheet();
        const landing = new Landing();
        const images = landing.getimages.call(this)
        const myimages = [];
        const regularFont = construction.getRegularFont.call(this)
        const menu = construction.getnavigation.call(this)
        images.map((image, i) => {
            if (!menu.open) {
                if (i % 2 === 0 || i == 0) {

                    if (i < images.length - 1) {

                        myimages.push(
                            <View style={[styles.generalFlex, styles.bottomMargin10]} key={`icon${image.imageid}`}>
                                <View style={[styles.flex1, styles.alignContentCenter]}>
                                    {landing.showiconimage.call(this, image)}
                                    <Text style={[regularFont, styles.alignCenter]}>{image.title}</Text>
                                </View>
                                <View style={[styles.flex1, styles.alignContentCenter]}>
                                    {landing.showiconimage.call(this, images[i + 1])}
                                    <Text style={[regularFont, styles.alignCenter]}>{images[i + 1].title}</Text>
                                </View>

                            </View>
                        )
                    } else {
                        myimages.push(
                            <View style={[styles.generalFlex, styles.bottomMargin10]} key={`icon${image.imageid}`}>
                                <View style={[styles.flex1, styles.alignContentCenter]}>
                                    {landing.showiconimage.call(this, image)}
                                    <Text style={[regularFont, styles.alignCenter]}>{image.title}</Text>
                                </View>
                                <View style={[styles.flex1]}>

                                </View>

                            </View>
                        )
                    }
                }

            } else {


                myimages.push(
                    <View style={[styles.generalFlex, styles.bottomMargin10]} key={`icon${image.imageid}`}>
                        <View style={[styles.flex1, styles.alignContentCenter]}>
                            {landing.showiconimage.call(this, image)}
                            <Text style={[regularFont, styles.alignCenter]}>{image.title}</Text>
                        </View>

                    </View>)
            }


        })


        return myimages;
    }
    showlanding() {
        const construction = new Construction();
        const styles = MyStylesheet();
        const landing = new Landing();
        const profile = new Profile();

        const justify = () => {
            return ({ justifyContent: 'center' })
        }
        const myuser = construction.getuser.call(this);
        if (myuser) {
            return (profile.showmyprofile.call(this))
        } else {
            return (
                <View style={[styles.generalFlex]}>
                    <View style={[styles.flex1]}>


                        <View style={[styles.generalFlex]}>
                            <View style={[styles.flex1, justify(), styles.topMargin35]}>

                                {landing.showactiveimage.call(this)}

                            </View>

                        </View>


                        {landing.showiconimages.call(this)}



                    </View>

                </View>


            )
        }
    }
}
export default Landing;