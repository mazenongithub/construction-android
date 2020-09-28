import React from 'react'
import {View, Text, Image, TouchableOpacity} from 'react-native'
import { MyStylesheet } from './styles';

class ScheduleLaborTimeIn {

    showdate() {
       
        return (
          
                    <DateTimePicker
                        mode={'datetime'}
                        value={DateobjfromUTCString(this.gettimein())}
                        onChange={(e,newDate) => {
                            this.handletimein(inputDateObjOutputAdjString(newDate))
                        }}
                    />
              
           
        )
    }


}
export default ScheduleLaborTimeIn;