import React from 'react';
import {  View, Text,TouchableOpacity,StyleSheet, TextInput, Image, KeyboardAvoidingView,Modal,ScrollView} from 'react-native';
import * as firebase from 'firebase';
import db from '../config'

export default class WelcomeScreen extends React.Component{
    constructor(){
        super();
        this.state=({
            emailId:'',
            password:'',
            firstName:'',
            lastName:'',
            address:'',
            contact:'',
            confirmPassword:'',
            isModalVisible:false
        })
    }

    showModal=()=>{
        return(
            <Modal animationType="fade" transparent={true} visible={this.state.isModalVisible} >
                <View style={styles.modalContainer}>
                    <ScrollView style={{width:'100%'}}>
                        <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
                            <TextInput style={styles.formTextInput} placeholder={"firstName"} maxLength={8} onChangeText={(text)=>{this.setState({
                                firstName:text
                            })}}>

                            </TextInput>

                            <TextInput style={styles.formTextInput} placeholder={"lastName"} maxLength={8} onChangeText={(text)=>{this.setState({
                                lastName:text
                            })}}>

                            </TextInput>

                            <TextInput style={styles.formTextInput} placeholder={"contact"} maxLength={10} keyboardType={'numeric'} onChangeText={(text)=>{this.setState({
                                contact:text
                            })}}>

                            </TextInput>

                            <TextInput style={styles.formTextInput} placeholder={"address"} multiline={true} onChangeText={(text)=>{this.setState({
                                address:text
                            })}}>

                            </TextInput>

                            <TextInput style={styles.formTextInput} placeholder={"E-mail"} keyboardType={'email-address'} onChangeText={(text)=>{this.setState({
                                emailId:text
                            })}}>

                            </TextInput>

                            <TextInput style={styles.formTextInput} placeholder={"password"} secureTextEntry={true} onChangeText={(text)=>{this.setState({
                                password:text
                            })}}>

                            </TextInput>

                            <TextInput style={styles.formTextInput} placeholder={"confirm password"} secureTextEntry={true} onChangeText={(text)=>{this.setState({
                                confirmPassword:text
                            })}}>

                            </TextInput>
                            <View style={styles.modalBackButton}>
                                <TouchableOpacity style={styles.registerButton} onPress={()=>{
                                    this.userSignUp(this.state.emailId,this.state.password,this.state.confirmPassword)
                                }}>
                                    <Text style={styles.registerButtonText}>
                                        register
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.modalBackButton}>
                                <TouchableOpacity style={styles.cancelButton} onPress={()=>{
                                    this.setState({
                                        isModalVisible:false
                                    })
                                }}>
                                    <Text style={{color:'black'}}>
                                        cancel
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
                
            </Modal>
        )
    }

    userLogin=(email,password)=>{
        firebase.auth().signInWithEmailAndPassword(email,password).then(
            ()=>{
                return alert("Successfully Login")
            }
        ).catch((error)=>{
            var errorCode=error.code
            var errorMessage=error.message
            return alert(errorMessage)
        })
        
    }

    userSignUp=(email,password,confirmPassword)=>{
        if(password!=confirmPassword){
            return alert("Passwords do not match")
        }
        else{
            firebase.auth().createUserWithEmailAndPassword(email,password).then(()=>{
                db.collection('users').add({
                    first_name:this.state.firstName,
                    last_name:this.state.lastName,
                    contact:this.state.contact,
                    email_id:this.state.emailId,
                    address:this.state.address
                })
                return alert("User added successfully",
                '',
                [
                    {text:"OK",onPress:()=>{
                    this.setState({
                       isModalVisible:false
                    })
                }}])
            })
        
        
        
            
        .catch((error)=>{
            var errorCode=error.code
            var errorMessage=error.message
            return alert(errorMessage)
        })
    }
}
    render(){
        return(
            <KeyboardAvoidingView style={
                styles.container
            }>
                <View style={styles.profileContainer}>
                    <Image
                    source={
                        require("../assets/barter.jpg")
                    }
                    style={{
                        width:200,
                        height:200
                    }}/>
                    <Text style={
                        styles.title
                    }>Barter System</Text>
                </View>{this.showModal()}

           <View style={styles.buttonContainer}>
               
               <TextInput 
               placeholder="abc@example.com"
               keyboardType="email-address"
               onChangeText={(text)=>{
                   this.setState({
                       emailId:text
                   })
               }}
               style={styles.loginBox}/>

               <TextInput
               placeholder='password'
               secureTextEntry={true}
               onChangeText={(text)=>{
                   this.setState({
                       password:text
                   })
               }}
               style={styles.loginBox}/>

           </View> 

           <View>
               <TouchableOpacity
               style={[styles.button,{marginBottom:20,marginTop:20}]}
               onPress={()=>{
                this.userLogin(this.state.emailId,this.state.password)
            }}>
                <Text style={
                   styles.buttonText
                }>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={()=>{
                this.setState({
                    isModalVisible:true
                })
            }} style={styles.button}>
                <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>
           </View>

           </KeyboardAvoidingView>
           
        )
    }
}

const styles = StyleSheet.create({
    container:{
     flex:1,
     backgroundColor:'#F8BE85',
     alignItems: 'center',
     justifyContent: 'center'
   },
   profileContainer:{
     flex:1,
     justifyContent:'center',
     alignItems:'center',
   },
   title :{
     fontSize:65,
     fontWeight:'300',
     paddingBottom:30,
     color : '#ff3d00'
   },
   loginBox:{
     width: 300,
     height: 40,
     borderBottomWidth: 1.5,
     borderColor : '#ff8a65',
     fontSize: 20,
     margin:10,
     paddingLeft:10
   },
   KeyboardAvoidingView:{
     flex:1,
     justifyContent:'center',
     alignItems:'center'
   },
   modalTitle :{
     justifyContent:'center',
     alignSelf:'center',
     fontSize:30,
     color:'#ff5722',
     margin:50
   },
   modalContainer:{
     flex:1,
     borderRadius:20,
     justifyContent:'center',
     alignItems:'center',
     backgroundColor:"#ffff",
     marginRight:30,
     marginLeft : 30,
     marginTop:80,
     marginBottom:80,
   },
   formTextInput:{
     width:"75%",
     height:35,
     alignSelf:'center',
     borderColor:'#ffab91',
     borderRadius:10,
     borderWidth:1,
     marginTop:20,
     padding:10
   },
   registerButton:{
     width:200,
     height:40,
     alignItems:'center',
     justifyContent:'center',
     borderWidth:1,
     borderRadius:10,
     marginTop:30
   },
   registerButtonText:{
     color:'#ff5722',
     fontSize:15,
     fontWeight:'bold'
   },
   cancelButton:{
     width:200,
     height:30,
     justifyContent:'center',
     alignItems:'center',
     marginTop:5,
   },
  
   button:{
     width:300,
     height:50,
     justifyContent:'center',
     alignItems:'center',
     borderRadius:25,
     backgroundColor:"#ff9800",
     shadowColor: "#000",
     shadowOffset: {
        width: 0,
        height: 8,
     },
     shadowOpacity: 0.30,
     shadowRadius: 10.32,
     elevation: 16,
     padding: 10
   },
   buttonText:{
     color:'#ffff',
     fontWeight:'200',
     fontSize:20
   }
  })