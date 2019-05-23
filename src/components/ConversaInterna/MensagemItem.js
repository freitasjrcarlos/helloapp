import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default class MensagemItem extends Component {

  constructor(props){
    super(props);

    //Background e align
    let bgColor = '#eeeeee';
    let align = 'flex-start';
    let textAlign = 'left';

    if(this.props.data.uid == this.props.me){
      bgColor = '#9999ff',
      align = 'flex-end',
      textAlign = 'right'
    }

    this.state = {
      bgColor: bgColor,
      align: align,
      textAlign: textAlign,
      dateMsg:this.getFormatteDate(this.props.data.date)
    };
  }

  //Formatando data e comparando com a data atual
  getFormatteDate(originalDate){

    let cDate = new Date();
    let mDate = originalDate.split(' ');
    let todayDate = cDate.getFullYear()+'-'+(cDate.getMonth()+1)+'-'+cDate.getDate();

    let newDate = mDate[1].split(':');
    newDate = ((newDate[0]<10)?'0'+newDate[0]:newDate[0])+':'+((newDate[1]<10)?'0'+newDate[1]:newDate[1]);

    if(todayDate != mDate[0]){
      let newDateDays = mDate[0].split('-');

      newDate = newDateDays[2]+'/'+newDateDays[1]+'/'+newDateDays[0]+' '+newDate;
    }

    return newDate;


  }

  render(){
   return(
     <View style={[MensagemItemStyles.area, {alignSelf:this.state.align,backgroundColor:this.state.bgColor}]}>
       {  this.props.data.msgType == 'text' &&
          <Text style={{textAlign:this.state.textAlign}}>{this.props.data.m}</Text>
        }
      { this.props.data.msgType == 'image' && 
        <Image style={MensagemItemStyles.image} source={{uri:this.props.data.imgSource}} />
      }

      <Text style={MensagemItemStyles.dateTxt}>{this.state.dateMsg}</Text>
     </View>
   );
  }
}

//Estilos
const MensagemItemStyles = StyleSheet.create({
  area: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    maxWidth: '80%',
    borderRadius: 5,
  },
  dateTxt: {
    fontSize: 11,
    textAlign: 'right',
  },
  image: {
    width: 200,
    height: 200,
  }
});