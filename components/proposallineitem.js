import React from 'react'
import { View, Text } from 'react-native'
import Construction from './construction'
import { MyStylesheet } from './styles'
import {inputUTCStringForLaborID,calculatetotalhours,formatDateStringDisplay,DirectCostForLabor,DirectCostForMaterial,DirectCostForEquipment} from './functions';

class ProposalLineItem {
    getlaboritems() {
        const proposallineitem = new ProposalLineItem();
        const construction = new Construction();
        const myproject = construction.getactiveproject.call(this);
        const projectid = myproject.projectid;
        const schedule = construction.getAllSchedule.call(this,projectid)
        const csiid = myproject.proposal.csiid;
        const proposalid = myproject.proposalid;
        let laboritems = [];
        let items = [];
        // eslint-disable-next-line
        schedule.map(item => {
            if ((item.hasOwnProperty("laborid")) && (item.csiid === csiid) && (item.proposalid === proposalid)) {
                laboritems.push(item)
            }
        })
    
        if (laboritems.length > 0) {
            // eslint-disable-next-line
            laboritems.map(mylabor => {
                items.push(proposallineitem.showlaborid.call(this,mylabor))
            })
    
        }
        return items;
    }
    
    showlaborid(mylabor) {
        const styles = MyStylesheet();
        const construction = new Construction();
        let employee = construction.getemployeebyproviderid.call(this, mylabor.providerid)
        let hourlyrate = mylabor.laborrate;
        const regularFont = construction.getRegularFont.call(this)
    
        return (
            <View style={[styles.generalFlex]} key={mylabor.laborid}>
                <View style={[styles.flex1]}>
                    <Text style={[regularFont]}>  {employee.firstname} {employee.lastname} {mylabor.description}
            From {inputUTCStringForLaborID(mylabor.timein)} to {inputUTCStringForLaborID(mylabor.timeout)}
            ${Number(hourlyrate).toFixed(2)}/Hr x {calculatetotalhours(mylabor.timeout, mylabor.timein)} Hrs = ${(Number(calculatetotalhours(mylabor.timeout, mylabor.timein)) * Number(hourlyrate)).toFixed(2)}</Text>
                </View>
            </View> 
 )
    }

    getequipmentitems() {

        const construction = new Construction();
        const myproject = construction.getactiveproject.call(this)
        const projectid = myproject.projectid;
        const schedule = construction.getAllSchedule.call(this,projectid)
        const csiid = myproject.proposal.csiid;
        const proposallineitem = new ProposalLineItem();
        const proposalid = myproject.proposalid;
        let equipmentitems = []
        let items = [];
        // eslint-disable-next-line
        schedule.map(item => {
            if ((item.hasOwnProperty("equipmentid")) && item.csiid === csiid && (item.proposalid === proposalid)) {
                equipmentitems.push(item)
            }
        })
    
        if (equipmentitems.length > 0) {
            // eslint-disable-next-line
            equipmentitems.map(myequipment => {
                items.push(proposallineitem.showequipmentid.call(this,myequipment))
            })
    
        }
        return items;
    
    }
    
    showequipmentid(equipment) {
        const styles = MyStylesheet();
        const construction = new Construction();
        const myequipment = construction.getmyequipmentbyid.call(this, equipment.myequipmentid);
        const amount = Number(calculatetotalhours(equipment.timeout, equipment.timein) * (Number(equipment.equipmentrate))).toFixed(2)
        const regularFont = construction.getRegularFont.call(this)
        return(
        <View style={[styles.generalFlex]} key={equipment.equipmentid}>
            <View style={[styles.flex1]}>
                <Text style={[regularFont]}> {myequipment.equipment} From: {inputUTCStringForLaborID(equipment.timein)} to {inputUTCStringForLaborID(equipment.timeout)} ${equipment.equipmentrate} x ${calculatetotalhours(equipment.timeout, equipment.timein)} = ${amount}</Text>
            </View>
        </View>)
      
    }

    getmaterialitems() {
        const construction = new Construction();
        const myproject = construction.getactiveproject.call(this)
        const projectid = myproject.projectid;
        const schedule = construction.getAllSchedule.call(this,projectid)
        const csiid = myproject.proposal.csiid;
        const proposallineitem = new ProposalLineItem();
        const proposalid = myproject.proposalid;
        let laboritems = [];
        let items = [];
        // eslint-disable-next-line
        schedule.map(item => {
            if ((item.hasOwnProperty("materialid")) && item.csiid === csiid && (item.proposalid === proposalid)) {
                laboritems.push(item)
            }
        })
    
        if (laboritems.length > 0) {
            // eslint-disable-next-line
            laboritems.map(mymaterial => {
                items.push(proposallineitem.showmaterialid.call(this,mymaterial))
            })
    
        }
        return items;
    
    }
    
    showmaterialid(mymaterial) {
        const styles = MyStylesheet();
        const construction = new Construction();
        const material = construction.getmymaterialbyid.call(this, mymaterial.mymaterialid)
        const regularFont = construction.getRegularFont.call(this)
        return(
        <View style={[styles.generalFlex]} key={mymaterial.materialid}>
            <View style={[styles.flex1]}>
                <Text style={[regularFont]}>{material.material} {formatDateStringDisplay(mymaterial.timein)} {mymaterial.quantity}  x ${mymaterial.unitcost}/{mymaterial.unit} = ${(mymaterial.quantity * mymaterial.unitcost).toFixed(2)}</Text>
            </View>
        </View>
        )
       
    }

    getlabor() {
        const construction = new Construction();
        const myproject = construction.getactiveproject.call(this)
        const projectid = myproject.projectid;
        const schedule = construction.getAllSchedule.call(this,projectid)
        const csiid = myproject.proposal.csiid;
        
        const proposalid = myproject.proposalid;
        let laboritems = [];
        // eslint-disable-next-line
        schedule.map(item => {
            if ((item.hasOwnProperty("laborid")) && (item.csiid === csiid) && (item.proposalid === proposalid)) {
                laboritems.push(item)
            }
        })
    
    
        return laboritems;
    }
    getlabortotal() {
        const proposallineitem = new ProposalLineItem();
        let items = proposallineitem.getlabor.call(this);
        let cost = 0;
        if (items.length > 0) {
            // eslint-disable-next-line
            items.map(item => {
                cost += DirectCostForLabor(item)
            })
        }
        return cost;
    }

    getmaterial() {
        const construction = new Construction();
        const myproject = construction.getactiveproject.call(this)
        const projectid = myproject.projectid;
        const schedule = construction.getAllSchedule.call(this,projectid)
        const csiid = myproject.proposal.csiid;
        const proposalid = myproject.proposalid
        let materialitems = [];
        // eslint-disable-next-line
        schedule.map(item => {
            if ((item.hasOwnProperty("materialid")) && item.csiid === csiid && (item.proposalid === proposalid)) {
                materialitems.push(item)
            }
        })
    
    
        return materialitems;
    
    }
    getmaterialtotal() {
        const proposallineitem = new ProposalLineItem();
        let items = proposallineitem.getmaterial.call(this);
        let cost = 0;
        if (items.length > 0) {
            // eslint-disable-next-line
            items.map(item => {
                cost += DirectCostForMaterial(item)
            })
        }
        return cost;
    }

    getequipment() {
        const construction = new Construction();
            const myproject = construction.getactiveproject.call(this)
            const projectid = myproject.projectid;
            const schedule = construction.getAllSchedule.call(this,projectid)
            const csiid = myproject.proposal.csiid;
            const proposalid = myproject.proposalid
        let equipmentitems = [];
        // eslint-disable-next-line
        schedule.map(item => {
            if ((item.hasOwnProperty("equipmentid")) && item.csiid === csiid && (item.proposalid === proposalid)) {
                equipmentitems.push(item)
            }
        })
    
        return equipmentitems;
    
    }
    getequipmenttotal() {
        const proposallineitem = new ProposalLineItem();
        let items = proposallineitem.getequipment.call(this);
        let cost = 0;
        if (items.length > 0) {
            // eslint-disable-next-line
            items.map(item => {
                cost += DirectCostForEquipment(item)
            })
        }
        return (cost)
    }
    
    showproposallineitem() {
        const construction = new Construction();
        const styles = MyStylesheet();
        const project = construction.getactiveproject.call(this)
        const projectid = project.projectid;
        const myproject = construction.getprojectbyid.call(this,projectid)
        const proposalid = project.proposalid;
        const csi = construction.getcsibyid.call(this, project.proposal.csiid)
        const proposallineitem = new ProposalLineItem();
        const labortotal = proposallineitem.getlabortotal.call(this)
        const materialtotal = proposallineitem.getmaterialtotal.call(this)
        const equipmenttotal = proposallineitem.getequipmenttotal.call(this)
        const total = (labortotal + materialtotal + equipmenttotal).toFixed(2)
        const myuser = construction.getuser.call(this)
        const regularFont = construction.getRegularFont.call(this)
        const headerFont = construction.getHeaderFont.call(this)
        if(myuser) {

            const checkmanager = construction.checkmanager.call(this)
            if (checkmanager) {
        return (
            <View style={[styles.generalFlex]}>
                <View style={[styles.flex1]}>

                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1]}>
                            <Text style={[headerFont, styles.boldFont, styles.alignCenter]}>/{myproject.title}/proposal/{proposalid}/csi/{csi.csi}-{csi.title}</Text>
                        </View>
                    </View>

                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1, styles.showBorder]}>
                            <Text style={[headerFont, styles.alignCenter]}> Labor </Text>
                        </View>
                    </View>
                    {proposallineitem.getlaboritems.call(this)}



                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1, styles.showBorder]}>
                            <Text style={[headerFont, styles.alignCenter]}> Equipment </Text>
                        </View>
                    </View>

                    {proposallineitem.getequipmentitems.call(this)}

                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1, styles.showBorder]}>
                            <Text style={[headerFont, styles.alignCenter]}> Materials </Text>
                        </View>
                    </View>

                    {proposallineitem.getmaterialitems.call(this)}

                    <View style={[styles.generalFlex, styles.bottomMargin10]}>
                        <View style={[styles.flex1, styles.showBorder]}>
                            <Text style={[regularFont]}> Total Labor ${labortotal.toFixed(2)}  </Text>
                            <Text style={[regularFont]}> Total Materials ${materialtotal.toFixed(2)}  </Text>
                            <Text style={[regularFont]}> Total Equipment ${equipmenttotal.toFixed(2)} </Text>
                            <Text style={[regularFont]}> Total ${total} </Text>
                        </View>
                    </View>

                </View>
            </View>
        )
            } else {
                return (<Text style={[regularFont]}>Only Managers can view proposal line item</Text>)
            }
        } else {
            return(construction.loginMessage.call(this,"Proposal Line Item"))
        }
    }
}

export default ProposalLineItem