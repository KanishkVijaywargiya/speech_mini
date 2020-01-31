import React, { Component } from 'react';
import { TextInput, Text, View, Button, Dimensions, Image, StyleSheet, TouchableOpacity, TouchableHighlight, Picker } from 'react-native';
import Voice from 'react-native-voice';

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

const howAreYou='Nivu hegiddiri';
const whatAreYouDoing='Ninu enu maduttiruve';
const whereAreYouGoing='Nivu ellige hoguttiddira';
const howOldAreYou="Ninna vayas'su estu";
const whatIsYourName='Ninna hesarenu';

export default class HelloWorldApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recognized: '',
      started: '',
      results: [],
      imageId: 0,
      splashy: true,

      languageFrom: "",
      languageTo: "",
      languageCode: 'en',
      inputText: "",
      outputText: "",
      submit: false,
    }
    Voice.onSpeechStart = this.onSpeechStart.bind(this)
    Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this)
    Voice.onSpeechResults = this.onSpeechResults.bind(this)
  }
  // for splash screen
  componentDidMount(){
    setTimeout (() => {
      this.setState({
        splashy: false,
      })
    }, 3000);
  }
  componentWillUnmount() {
    Voice.destroy()
      .then(Voice.removeAllListeners)
  }
  onSpeechStart(e) {
    this.setState({
      started: '√',
    });
  }
  onSpeechRecognized(e) {
    this.setState({
      recognized: '√',
    });
  }
  onSpeechResults(e) {
    console.log("EEEEEE", e)
    this.setState({
      results: e.value,
      imageId: 0
    });
    console.log(this.state.results[0]);
  }
  async _startRecognition(e) {
    this.setState({
      recognized: '',
      started: '',
      results: [],
      imageId: 0,
      outputText:''
    });
    try {
      this.setState({
        imageId: 1
      })
      await Voice.start('en-US');
    } catch (e) {
      console.log(e);
    }
  }
  // meet part
  convert=(resultText)=>{
    console.log("resultText:",resultText);
    if(resultText.includes('how are you')||resultText.includes('WhatsApp')){
      this.setState({
        outputText:howAreYou
      })
    }else if(resultText.includes('what are you doing')||resultText.includes('what you doing')){
      this.setState({
        outputText:whatAreYouDoing
      })
    }else if(resultText.includes('where are you going')||resultText.includes('kahan ja rahe ho')){
      this.setState({
        outputText:whereAreYouGoing
      })
    }else if(resultText.includes('how old are you')||resultText.includes('kitne sal ke ho')){
      this.setState({
        outputText:howOldAreYou
      })
    }else if(resultText.includes('what is your name')||resultText.includes('kya naam hai tumhara')||resultText.includes('ke naam hai Tharo')){
      this.setState({
        outputText:whatIsYourName
      })
    }
    console.log("output: ", this.state.outputText);
  }
  render() {
    // TranslatorConfiguration.setConfig(ProviderTypes.Google,’XXXX’, this.state.languageCode);
    const resultText=this.state.results[0];
    if(this.state.splashy){
      return (
        <View style={{flex:1}}><Image style={{ width: '100%', height: '100%' }} resizeMode='stretch' source={require('./images/splash.png')}/></View>
      )
    }else{

      return (
        <View>
        <Text style={styles.transcript}>Transcript</Text>
        {/** {this.state.results.map((result, index) => <Text style={styles.transcript}>{result}</Text>)}**/}
        <View style={{flex:1, flexDirection: 'row'}}>
          <View style={{flex:1}}>{this.state.results ? <Text style={styles.transcript}>{resultText}</Text> : null}</View>
          <View style={{flex:1}}>{this.state.outputText ? <Text style={styles.transcript}>{this.state.outputText}</Text> : null}</View>
        </View>
        
        {/* <Picker selectedValue={this.state.languageTo} onValueChange={ lang => this.setState({languageTo: lang, languageCode: lang})}>
            {Object.keys(Languages).map(key => (
              <Picker.Item label={Languages[key]} value={key} />
          ))}
        </Picker>
        <View style = {styles.output}>
            {this.state.submit && <PowerTranslator  text={this.state.results[0]} />}
        </View>
        <TouchableOpacity style = {styles.submitButton} onPress = {this.handleTranslate}>
            <Text style = {styles.submitButtonText}> Submit </Text>
            </TouchableOpacity>*/}

        {this.state.imageId === 0 ?
          <View style={{ width: WIDTH, height: HEIGHT - 150 }}>
            <Image style={{ width: WIDTH, height: "100%" }} resizeMode='contain' source={require('./images/mickey1.jpeg')} />
          </View>
          :
          <View>
          {this.state.imageId===2?
            null:
            <View style={{ width: WIDTH, height: HEIGHT - 150 }}>
              <Image style={{ width: WIDTH, height: "100%" }} resizeMode='contain' source={require('./images/mickey2.jpeg')} />
            </View>
          }
          </View>
        }
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity style={styles.button} onPress={this._startRecognition.bind(this)}>
              <View>
                <Text style={{ color: '#fff' }}>Start Recording</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity style={styles.button} onPress={()=>this.convert(resultText)}>
              <View >
                <Text style={{ color: '#fff' }}>Convert</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

      </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  transcript: {
    textAlign: "center",
    color: '#B0171F',
    marginBottom: 1,
    marginTop: 20,
  },
  button: {
    position: 'absolute',
    bottom: 30,
    width: 150,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 30,
    backgroundColor: '#2196F3',
    borderRadius: 50,
  },
  output: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: .5,
    borderColor: '#000',
    borderRadius: 5 ,
    margin: 10,
    height: 80,
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    borderRadius: 5 ,
    height: 40,
  },
  submitButtonText:{
    color: 'white'
  },
})